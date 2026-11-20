<?php
/**
 * Seeder: Populates MySQL `blogs` table with the 10 existing flagship blogs.
 */
require_once __DIR__ . '/../config/database.php';

$pdo = getDBConnection();
if (!$pdo) {
    die("Database connection failed.\n");
}

$blogDir = __DIR__ . '/../blogs';
$files = scandir($blogDir);

$blogSlugs = [
    'custom-wordpress-plugin-vs-off-the-shelf',
    'dark-mode-website-design-worth-building',
    'designing-for-trust-ux-patterns',
    'ecommerce-checkout-flow-indian-shoppers',
    'headless-wordpress-when-it-makes-sense',
    'how-ai-overviews-affect-wordpress-seo-2026',
    'micro-interactions-ui-design',
    'multi-currency-multi-language-ecommerce',
    'web-accessibility-wcag-2-2-compliance',
    'wordpress-security-hardening-checklist'
];

$inserted = 0;
$updated = 0;

foreach ($blogSlugs as $slug) {
    $mdFile = "$blogDir/$slug.md";
    $htmlFile = "$blogDir/$slug.html";

    if (!file_exists($mdFile) && !file_exists($htmlFile)) {
        echo "Skipping $slug: no files found.\n";
        continue;
    }

    $title = ucwords(str_replace('-', ' ', $slug));
    $description = '';
    $category = 'WordPress Architecture';
    $readingTime = 5;
    $publishDate = date('Y-m-d');
    $author = 'Sanjeev Kumar Malik';
    $featuredImage = '/assets/images/Web-Development.webp';
    $tags = 'Web Development, Architecture, Sanjeev Kumar Malik';
    $content = '';
    $faqs = [];

    // Parse Frontmatter from .md file if present
    if (file_exists($mdFile)) {
        $mdRaw = file_get_contents($mdFile);
        if (preg_match('/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/', $mdRaw, $matches)) {
            $frontmatter = $matches[1];
            $content = trim($matches[2]);

            // Parse YAML-like fields
            if (preg_match('/title:\s*"([^"]+)"/', $frontmatter, $m)) $title = $m[1];
            if (preg_match('/description:\s*"([^"]+)"/', $frontmatter, $m)) $description = $m[1];
            if (preg_match('/category:\s*"([^"]+)"/', $frontmatter, $m)) $category = $m[1];
            if (preg_match('/reading_time:\s*"(\d+)\s*min/', $frontmatter, $m)) $readingTime = (int)$m[1];
            if (preg_match('/author:\s*"([^"]+)"/', $frontmatter, $m)) $author = $m[1];
        } else {
            $content = $mdRaw;
        }
    }

    // Clean up title suffix like ' — Sanjeev Kumar Malik'
    $cleanTitle = preg_replace('/\s*—\s*Sanjeev Kumar Malik.*$/', '', $title);

    // Parse HTML file for exact featured image, FAQs, tags, or meta description
    if (file_exists($htmlFile)) {
        $htmlRaw = file_get_contents($htmlFile);

        // Featured image
        if (preg_match('/<img[^>]*class="[^"]*article-featured-image[^"]*"[^>]*src="([^"]+)"/i', $htmlRaw, $imgMatch)) {
            $featuredImage = $imgMatch[1];
        } elseif (preg_match('/property="og:image"\s*content="([^"]+)"/i', $htmlRaw, $ogMatch)) {
            $featuredImage = $ogMatch[1];
        }

        // Meta description if empty
        if (empty($description) && preg_match('/<meta\s+name="description"\s+content="([^"]+)"/i', $htmlRaw, $metaMatch)) {
            $description = $metaMatch[1];
        }

        // Parse FAQs from JSON-LD schema or accordion HTML
        if (preg_match('/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i', $htmlRaw, $schemaMatch)) {
            $schemaJson = json_decode($schemaMatch[1], true);
            if (isset($schemaJson['@graph'])) {
                foreach ($schemaJson['@graph'] as $node) {
                    if (isset($node['@type']) && $node['@type'] === 'FAQPage' && isset($node['mainEntity'])) {
                        foreach ($node['mainEntity'] as $faqItem) {
                            $faqs[] = [
                                'question' => $faqItem['name'] ?? '',
                                'answer' => $faqItem['acceptedAnswer']['text'] ?? ''
                            ];
                        }
                    }
                }
            }
        }

        // Also check HTML FAQ accordion if schema didn't yield
        if (empty($faqs)) {
            preg_match_all('/<button[^>]*class="[^"]*faq-question-btn[^"]*"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/button>\s*<div class="faq-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/i', $htmlRaw, $faqMatches, PREG_SET_ORDER);
            foreach ($faqMatches as $fm) {
                $faqs[] = [
                    'question' => trim(strip_tags($fm[1])),
                    'answer' => trim(strip_tags($fm[2]))
                ];
            }
        }
    }

    // Default dates spaced over Oct - Nov 2026
    static $dayOffset = 1;
    $pubDate = date('Y-m-d', strtotime("2026-11-01 + " . ($dayOffset++) . " days"));

    // Check if exists
    $checkStmt = $pdo->prepare("SELECT id FROM blogs WHERE slug = ?");
    $checkStmt->execute([$slug]);
    $existingId = $checkStmt->fetchColumn();

    $faqsJson = !empty($faqs) ? json_encode($faqs, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null;
    $shortExcerpt = !empty($description) ? $description : substr(strip_tags($content), 0, 200) . '...';
    $seoTitle = $cleanTitle . ' | Sanjeev Kumar Malik';
    $metaKeywords = str_replace(' ', ', ', strtolower($category)) . ', web architecture, sanjeev kumar malik';

    if ($existingId) {
        $update = $pdo->prepare("UPDATE blogs SET 
            title = ?, category_name = ?, tags = ?, featured_image = ?, featured_image_alt = ?,
            publish_stage = 'published', publish_date = ?, read_time = ?, author_name = ?,
            seo_title = ?, short_excerpt = ?, meta_description = ?, meta_keywords = ?,
            content = ?, faqs_json = ?
            WHERE id = ?");
        $update->execute([
            $cleanTitle, $category, $tags, $featuredImage, $cleanTitle,
            $pubDate, $readingTime, $author,
            $seoTitle, $shortExcerpt, $description, $metaKeywords,
            $content, $faqsJson, $existingId
        ]);
        $updated++;
        echo "Updated blog: $slug\n";
    } else {
        $insert = $pdo->prepare("INSERT INTO blogs (
            title, slug, category_name, tags, featured_image, featured_image_alt,
            publish_stage, publish_date, read_time, author_name,
            seo_title, short_excerpt, meta_description, meta_keywords,
            schema_type, content, faqs_json
        ) VALUES (
            ?, ?, ?, ?, ?, ?,
            'published', ?, ?, ?,
            ?, ?, ?, ?,
            'automatic', ?, ?
        )");
        $insert->execute([
            $cleanTitle, $slug, $category, $tags, $featuredImage, $cleanTitle,
            $pubDate, $readingTime, $author,
            $seoTitle, $shortExcerpt, $description, $metaKeywords,
            $content, $faqsJson
        ]);
        $inserted++;
        echo "Inserted blog: $slug\n";
    }
}

echo "\nSeeding complete! Inserted: $inserted, Updated: $updated\n";
