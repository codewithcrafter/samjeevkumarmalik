<?php
/**
 * SANJEEV KUMAR MALIK — CMS HELPER FUNCTIONS
 * Slug generator, Markdown parser, TOC extractor, Schema generator
 */

function slugify($text) {
    // Replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    // Transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    // Remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);
    // Trim
    $text = trim($text, '-');
    // Remove duplicate -
    $text = preg_replace('~-+~', '-', $text);
    // Lowercase
    $text = strtolower($text);

    return empty($text) ? 'post-' . time() : $text;
}

function parseMarkdown($md) {
    if (empty($md)) return '';

    // If already contains HTML paragraph/div tags, return with minor normalization
    if (strpos($md, '<p>') !== false || strpos($md, '<div') !== false || strpos($md, '<article') !== false) {
        // Ensure headings have id attributes for TOC
        return preg_replace_callback('/<h([2-3])([^>]*)>(.*?)<\/h\1>/i', function($m) {
            $level = $m[1];
            $attrs = $m[2];
            $content = $m[3];
            if (strpos($attrs, 'id=') === false) {
                $id = slugify(strip_tags($content));
                return "<h{$level} id=\"{$id}\"{$attrs}>{$content}</h{$level}>";
            }
            return $m[0];
        }, $md);
    }

    $lines = explode("\n", str_replace(["\r\n", "\r"], "\n", $md));
    $html = '';
    $inCodeBlock = false;
    $codeLang = '';
    $codeBuffer = [];
    $inList = false;
    $listType = 'ul';
    $inTable = false;
    $tableBuffer = [];

    foreach ($lines as $line) {
        $trimmed = trim($line);

        // Fenced code block toggle
        if (preg_match('/^```(\w*)/', $trimmed, $m)) {
            if ($inTable) { $html .= renderMarkdownTable($tableBuffer); $inTable = false; $tableBuffer = []; }
            if ($inCodeBlock) {
                $html .= "<div class=\"code-block-wrapper\"><div class=\"code-header\"><span class=\"code-lang\">" . htmlspecialchars($codeLang ?: 'bash') . "</span><button type=\"button\" class=\"code-copy-btn\">Copy</button></div><pre><code class=\"language-" . htmlspecialchars($codeLang) . "\">" . htmlspecialchars(implode("\n", $codeBuffer)) . "</code></pre></div>\n";
                $inCodeBlock = false;
                $codeBuffer = [];
                $codeLang = '';
            } else {
                if ($inList) { $html .= "</{$listType}>\n"; $inList = false; }
                $inCodeBlock = true;
                $codeLang = $m[1] ?? '';
            }
            continue;
        }

        if ($inCodeBlock) {
            $codeBuffer[] = $line;
            continue;
        }

        // Table detection (| header | ... |)
        if (preg_match('/^\|(.+)\|$/', $trimmed)) {
            if ($inList) { $html .= "</{$listType}>\n"; $inList = false; }
            $inTable = true;
            $tableBuffer[] = $trimmed;
            continue;
        } else {
            if ($inTable) {
                $html .= renderMarkdownTable($tableBuffer);
                $inTable = false;
                $tableBuffer = [];
            }
        }

        // Horizontal Rule
        if (preg_match('/^(---|\*\*\*|___)$/', $trimmed)) {
            if ($inList) { $html .= "</{$listType}>\n"; $inList = false; }
            $html .= "<hr class=\"content-divider\">\n";
            continue;
        }

        // Headings
        if (preg_match('/^(#{1,4})\s+(.+)$/', $trimmed, $m)) {
            if ($inList) { $html .= "</{$listType}>\n"; $inList = false; }
            $level = strlen($m[1]);
            $title = $m[2];
            $id = slugify(strip_tags($title));
            $tag = "h" . min($level + 1, 4); // # -> h2, ## -> h2, ### -> h3
            if ($level === 1) $tag = 'h2';
            $html .= "<{$tag} id=\"{$id}\" class=\"article-heading\">" . formatInlineMarkdown($title) . "</{$tag}>\n";
            continue;
        }

        // Blockquotes
        if (preg_match('/^>\s*(.+)$/', $trimmed, $m)) {
            if ($inList) { $html .= "</{$listType}>\n"; $inList = false; }
            $html .= "<blockquote class=\"article-quote\"><p>" . formatInlineMarkdown($m[1]) . "</p></blockquote>\n";
            continue;
        }

        // Unordered List (- or *)
        if (preg_match('/^[-*]\s+(.+)$/', $trimmed, $m)) {
            if (!$inList || $listType !== 'ul') {
                if ($inList) $html .= "</{$listType}>\n";
                $html .= "<ul class=\"article-list\">\n";
                $inList = true;
                $listType = 'ul';
            }
            $html .= "  <li>" . formatInlineMarkdown($m[1]) . "</li>\n";
            continue;
        }

        // Ordered List (1. )
        if (preg_match('/^\d+\.\s+(.+)$/', $trimmed, $m)) {
            if (!$inList || $listType !== 'ol') {
                if ($inList) $html .= "</{$listType}>\n";
                $html .= "<ol class=\"article-list-ordered\">\n";
                $inList = true;
                $listType = 'ol';
            }
            $html .= "  <li>" . formatInlineMarkdown($m[1]) . "</li>\n";
            continue;
        }

        // Empty line closes lists
        if ($trimmed === '') {
            if ($inList) {
                $html .= "</{$listType}>\n";
                $inList = false;
            }
            continue;
        }

        // Standard Paragraph
        if ($inList) {
            $html .= "</{$listType}>\n";
            $inList = false;
        }
        $html .= "<p>" . formatInlineMarkdown($trimmed) . "</p>\n";
    }

    if ($inTable) {
        $html .= renderMarkdownTable($tableBuffer);
    }
    if ($inList) $html .= "</{$listType}>\n";
    if ($inCodeBlock) {
        $html .= "<pre><code>" . htmlspecialchars(implode("\n", $codeBuffer)) . "</code></pre>\n";
    }

    return $html;
}

function renderMarkdownTable(array $rows) {
    if (count($rows) < 2) {
        $out = '';
        foreach ($rows as $r) {
            $out .= "<p>" . formatInlineMarkdown($r) . "</p>\n";
        }
        return $out;
    }

    // Check if second row is separator row (e.g. |:---|:---| or |--|--|)
    $separator = trim($rows[1]);
    if (!preg_match('/^\|[\s\-:|]+\|$/', $separator)) {
        $out = '';
        foreach ($rows as $r) {
            $out .= "<p>" . formatInlineMarkdown($r) . "</p>\n";
        }
        return $out;
    }

    // Headers
    $headerRow = trim($rows[0], '|');
    $headerCells = array_map('trim', explode('|', $headerRow));

    // Alignments from row 1
    $alignRow = trim($rows[1], '|');
    $alignCells = array_map('trim', explode('|', $alignRow));
    $alignments = [];
    foreach ($alignCells as $a) {
        $firstChar = substr($a, 0, 1);
        $lastChar = substr($a, -1);
        if ($firstChar === ':' && $lastChar === ':') {
            $alignments[] = 'center';
        } elseif ($lastChar === ':') {
            $alignments[] = 'right';
        } else {
            $alignments[] = 'left';
        }
    }

    $out = "<div class=\"table-responsive\">\n";
    $out .= "  <table class=\"article-table\">\n";
    $out .= "    <thead>\n      <tr>\n";
    foreach ($headerCells as $idx => $th) {
        $align = $alignments[$idx] ?? 'left';
        $out .= "        <th style=\"text-align: {$align};\">" . formatInlineMarkdown($th) . "</th>\n";
    }
    $out .= "      </tr>\n    </thead>\n";
    $out .= "    <tbody>\n";

    for ($i = 2; $i < count($rows); $i++) {
        $bodyRow = trim($rows[$i], '|');
        $bodyCells = array_map('trim', explode('|', $bodyRow));
        if (empty(implode('', $bodyCells))) continue;

        $out .= "      <tr>\n";
        foreach ($bodyCells as $idx => $td) {
            $align = $alignments[$idx] ?? 'left';
            $out .= "        <td style=\"text-align: {$align};\">" . formatInlineMarkdown($td) . "</td>\n";
        }
        $out .= "      </tr>\n";
    }

    $out .= "    </tbody>\n";
    $out .= "  </table>\n";
    $out .= "</div>\n";

    return $out;
}

function formatInlineMarkdown($text) {
    // Images: ![alt](url)
    $text = preg_replace('/!\[([^\]]*)\]\(([^)]+)\)/', '<img src="$2" alt="$1" class="article-inline-image" loading="lazy">', $text);
    // Links: [text](url)
    $text = preg_replace('/\[([^\]]+)\]\(([^)]+)\)/', '<a href="$2" class="article-link">$1</a>', $text);
    // Inline code: `code`
    $text = preg_replace('/`([^`]+)`/', '<code class="inline-code">$1</code>', $text);
    // Bold: **text** or __text__
    $text = preg_replace('/(\*\*|__)(.*?)\1/', '<strong>$2</strong>', $text);
    // Italic: *text* or _text_
    $text = preg_replace('/(\*|_)(.*?)\1/', '<em>$2</em>', $text);

    return $text;
}

function extractTocFromHtml($html) {
    $toc = [];
    if (empty($html)) return $toc;

    preg_match_all('/<h([2-3])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/i', $html, $matches, PREG_SET_ORDER);
    foreach ($matches as $m) {
        $toc[] = [
            'level' => (int)$m[1],
            'id'    => $m[2],
            'title' => trim(strip_tags($m[3]))
        ];
    }
    return $toc;
}

function generateBlogSchemaJson($blog, $faqs = []) {
    $slug = htmlspecialchars($blog['slug'] ?? '');
    $url = "https://www.sanjeevkumarmalik.in/blogs/" . $slug;
    $datePublished = !empty($blog['publish_date']) ? date('c', strtotime($blog['publish_date'])) : date('c');
    $dateModified = !empty($blog['updated_at']) ? date('c', strtotime($blog['updated_at'])) : $datePublished;
    $featuredImg = !empty($blog['featured_image']) ? (str_starts_with($blog['featured_image'], 'http') ? $blog['featured_image'] : "https://www.sanjeevkumarmalik.in" . $blog['featured_image']) : "https://www.sanjeevkumarmalik.in/assets/images/Web-Development.webp";

    $graph = [
        [
            "@type" => "BlogPosting",
            "@id" => $url . "#article",
            "headline" => $blog['title'] ?? '',
            "description" => $blog['short_excerpt'] ?? '',
            "url" => $url,
            "datePublished" => $datePublished,
            "dateModified" => $dateModified,
            "image" => $featuredImg,
            "author" => [
                "@type" => "Person",
                "@id" => "https://www.sanjeevkumarmalik.in/#person",
                "name" => $blog['author_name'] ?? 'Sanjeev Kumar Malik',
                "jobTitle" => "Principal Full-Stack Web Development Architect",
                "url" => "https://www.sanjeevkumarmalik.in/about-sanjeev-kumar-malik"
            ],
            "publisher" => [
                "@type" => "Organization",
                "@id" => "https://www.sanjeevkumarmalik.in/#organization",
                "name" => "Sanjeev Kumar Malik — Principal Web Architect",
                "url" => "https://www.sanjeevkumarmalik.in",
                "logo" => [
                    "@type" => "ImageObject",
                    "url" => "https://www.sanjeevkumarmalik.in/assets/images/Sanjeev-Kumar-Malik.webp"
                ]
            ],
            "mainEntityOfPage" => [
                "@type" => "WebPage",
                "@id" => $url
            ]
        ],
        [
            "@type" => "BreadcrumbList",
            "@id" => $url . "#breadcrumb",
            "itemListElement" => [
                [
                    "@type" => "ListItem",
                    "position" => 1,
                    "name" => "Home",
                    "item" => "https://www.sanjeevkumarmalik.in/"
                ],
                [
                    "@type" => "ListItem",
                    "position" => 2,
                    "name" => "Blogs",
                    "item" => "https://www.sanjeevkumarmalik.in/blogs"
                ],
                [
                    "@type" => "ListItem",
                    "position" => 3,
                    "name" => $blog['title'] ?? '',
                    "item" => $url
                ]
            ]
        ]
    ];

    if (!empty($faqs) && is_array($faqs)) {
        $faqEntities = [];
        foreach ($faqs as $faq) {
            if (!empty($faq['question']) && !empty($faq['answer'])) {
                $faqEntities[] = [
                    "@type" => "Question",
                    "name" => $faq['question'],
                    "acceptedAnswer" => [
                        "@type" => "Answer",
                        "text" => $faq['answer']
                    ]
                ];
            }
        }
        if (!empty($faqEntities)) {
            $graph[] = [
                "@type" => "FAQPage",
                "@id" => $url . "#faq",
                "mainEntity" => $faqEntities
            ];
        }
    }

    $schema = [
        "@context" => "https://schema.org",
        "@graph" => $graph
    ];

    return json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function formatBlogDate($dateStr) {
    if (empty($dateStr)) return date('M Y');
    $time = strtotime($dateStr);
    return date('M Y', $time);
}

