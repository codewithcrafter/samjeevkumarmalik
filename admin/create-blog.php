<?php
/**
 * SANJEEV KUMAR MALIK — COMPOSE NEW ARTICLE WORKSPACE
 */
require_once __DIR__ . '/auth.php';
checkAdminAuth();

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

$admin = getCurrentAdmin();
$error = '';
$success = '';

// Load categories & authors
$categories = [];
$authors = [];
if ($pdo) {
    $categories = $pdo->query("SELECT * FROM categories ORDER BY name ASC")->fetchAll();
    $authors = $pdo->query("SELECT * FROM authors ORDER BY name ASC")->fetchAll();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $categoryName = trim($_POST['category'] ?? '');
    $customSlug = trim($_POST['slug'] ?? '');
    $tags = trim($_POST['tags'] ?? '');
    $imageAlt = trim($_POST['featured_image_alt'] ?? '');
    $publishStage = trim($_POST['publish_stage'] ?? 'published');
    $publishDate = trim($_POST['publish_date'] ?? date('Y-m-d'));
    $readTime = (int)($_POST['read_time'] ?? 5);
    $authorName = trim($_POST['author'] ?? 'Sanjeev Kumar Malik');
    $seoTitle = trim($_POST['seo_title'] ?? '');
    $shortExcerpt = trim($_POST['short_excerpt'] ?? '');
    $metaDescription = trim($_POST['meta_description'] ?? '');
    $metaKeywords = trim($_POST['meta_keywords'] ?? '');
    $schemaType = trim($_POST['schema_type'] ?? 'automatic');
    $customSchemaJson = trim($_POST['custom_schema_json'] ?? '');
    $content = trim($_POST['content'] ?? '');

    // FAQs array
    $faqQuestions = $_POST['faq_questions'] ?? [];
    $faqAnswers = $_POST['faq_answers'] ?? [];
    $faqs = [];
    if (!empty($faqQuestions) && is_array($faqQuestions)) {
        for ($i = 0; $i < count($faqQuestions); $i++) {
            $q = trim($faqQuestions[$i]);
            $a = trim($faqAnswers[$i] ?? '');
            if (!empty($q) && !empty($a)) {
                $faqs[] = ['question' => $q, 'answer' => $a];
            }
        }
    }
    $faqsJson = !empty($faqs) ? json_encode($faqs, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : null;

    // Validate Required Fields
    if (empty($title)) {
        $error = 'Article Title is required.';
    } elseif (empty($categoryName)) {
        $error = 'Category is required.';
    } elseif (empty($shortExcerpt)) {
        $error = 'Short Excerpt is required.';
    } elseif (empty($content)) {
        $error = 'Article Body Content is required.';
    } else {
        // Resolve Slug
        $slug = !empty($customSlug) ? slugify($customSlug) : slugify($title);

        // Ensure Unique Slug
        if ($pdo) {
            $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM blogs WHERE slug = ?");
            $checkStmt->execute([$slug]);
            if ($checkStmt->fetchColumn() > 0) {
                $slug .= '-' . time();
            }
        }

        // Handle Featured Image Upload
        $featuredImagePath = '/assets/images/Web-Development.webp'; // Default fallback
        if (isset($_FILES['featured_image']) && $_FILES['featured_image']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['featured_image'];
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

            if (in_array($ext, $allowedExtensions)) {
                if ($file['size'] <= 5 * 1024 * 1024) { // 5MB
                    $newFileName = 'blog-' . $slug . '-' . time() . '.' . $ext;
                    $targetPath = __DIR__ . '/../uploads/blogs/' . $newFileName;
                    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                        $featuredImagePath = '/uploads/blogs/' . $newFileName;
                    }
                } else {
                    $error = 'Featured image exceeds maximum allowed size of 5MB.';
                }
            } else {
                $error = 'Invalid image format. Allowed formats: JPG, PNG, WEBP, SVG.';
            }
        }

        if (empty($seoTitle)) {
            $seoTitle = $title . ' | Sanjeev Kumar Malik';
        }
        if (empty($metaDescription)) {
            $metaDescription = $shortExcerpt;
        }

        if (empty($error) && $pdo) {
            $insert = $pdo->prepare("INSERT INTO blogs (
                title, slug, category_name, tags, featured_image, featured_image_alt,
                publish_stage, publish_date, read_time, author_name,
                seo_title, short_excerpt, meta_description, meta_keywords,
                schema_type, custom_schema_json, content, faqs_json
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?
            )");

            $insert->execute([
                $title, $slug, $categoryName, $tags, $featuredImagePath, $imageAlt ?: $title,
                $publishStage, $publishDate, $readTime, $authorName,
                $seoTitle, $shortExcerpt, $metaDescription, $metaKeywords,
                $schemaType, $customSchemaJson, $content, $faqsJson
            ]);

            header("Location: /admin/index.php?created=1");
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compose New Article — Blog Workspace</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">
  <link rel="stylesheet" href="/assets/css/style.css?v=4.2">
  <link rel="stylesheet" href="/admin/assets/css/admin.css">
</head>
<body class="admin-body">

  <!-- Sidebar -->
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="admin-sidebar-header">
      <a href="/admin/index.php" class="admin-brand-link">
        <span class="admin-brand-dot"></span>
        <span>sanjeevkumarmalik</span>
      </a>
    </div>

    <nav class="admin-nav">
      <a href="/admin/index.php" class="admin-nav-item">
        <span>📰</span>
        <span>Articles Manager</span>
      </a>
      <a href="/admin/create-blog.php" class="admin-nav-item active">
        <span>✍️</span>
        <span>Compose Article</span>
      </a>
      <a href="/blogs" target="_blank" class="admin-nav-item">
        <span>🌐</span>
        <span>View Live Blogs</span>
      </a>
      <a href="/" target="_blank" class="admin-nav-item">
        <span>🏠</span>
        <span>Public Website</span>
      </a>
    </nav>

    <div class="admin-sidebar-footer">
      <div class="admin-user-info">
        <div class="admin-avatar-small">S</div>
        <div class="admin-user-text">
          <span class="admin-user-name"><?= htmlspecialchars($admin['name']) ?></span>
          <span class="admin-user-role">Super Administrator</span>
        </div>
      </div>
      <a href="/admin/logout.php" class="admin-logout-btn" title="Logout">🚪</a>
    </div>
  </aside>

  <!-- Main Content Area -->
  <div class="admin-main">
    
    <!-- Topbar -->
    <header class="admin-topbar">
      <div>
        <h1 class="admin-topbar-title">Compose New Article</h1>
        <p style="font-size: 0.82rem; color: #64748B; margin: 0.2rem 0 0;">Fill in details, tags, and compose content in our rich text editor workspace.</p>
      </div>
      <div class="admin-topbar-actions">
        <a href="/admin/index.php" class="action-btn">Cancel</a>
        <button type="submit" form="composeArticleForm" class="btn-primary" style="padding: 0.65rem 1.35rem; font-size: 0.9rem;">
          Publish Article →
        </button>
      </div>
    </header>

    <main class="admin-content-body">

      <?php if (!empty($error)): ?>
        <div class="alert-box alert-error" role="alert">
          <span>⚠️</span>
          <span><?= htmlspecialchars($error) ?></span>
        </div>
      <?php endif; ?>

      <!-- Form -->
      <form id="composeArticleForm" action="/admin/create-blog.php" method="POST" enctype="multipart/form-data">
        
        <div class="compose-grid">
          
          <!-- LEFT / MAIN WORKSPACE -->
          <div class="compose-main">
            
            <!-- Core Details Card -->
            <div class="admin-card">
              
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label for="articleTitle" style="font-size: 0.95rem; font-weight: 800; color: #0F172A;">Article Title *</label>
                <input type="text" id="articleTitle" name="title" class="form-input" placeholder="e.g. Next.js 15 vs Headless WordPress: Real-World Latency &amp; Conversion Benchmarks" value="<?= htmlspecialchars($_POST['title'] ?? '') ?>" required style="font-size: 1.15rem; font-weight: 700; padding: 0.85rem 1rem;">
              </div>

              <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
                <div class="form-group">
                  <label for="articleCategory" style="font-weight: 700;">Category *</label>
                  <select id="articleCategory" name="category" class="form-select" required>
                    <option value="" disabled selected>Select Category...</option>
                    <?php if (!empty($categories)): ?>
                      <?php foreach ($categories as $cat): ?>
                        <option value="<?= htmlspecialchars($cat['name']) ?>" <?= (($_POST['category'] ?? '') === $cat['name']) ? 'selected' : '' ?>>
                          <?= htmlspecialchars($cat['name']) ?>
                        </option>
                      <?php endforeach; ?>
                    <?php else: ?>
                      <option value="WordPress Architecture">WordPress Architecture</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="E-Commerce & CRO">E-Commerce & CRO</option>
                      <option value="Custom Web Applications">Custom Web Applications</option>
                      <option value="Speed & SEO Engineering">Speed & SEO Engineering</option>
                    <?php endif; ?>
                  </select>
                </div>

                <div class="form-group">
                  <label for="articleSlug" style="font-weight: 700;">Custom Slug (optional)</label>
                  <input type="text" id="articleSlug" name="slug" class="form-input" placeholder="auto-generated-from-title" value="<?= htmlspecialchars($_POST['slug'] ?? '') ?>" style="font-family: var(--font-mono, monospace);">
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label for="articleTags" style="font-weight: 700;">Tags (comma-separated)</label>
                <input type="text" id="articleTags" name="tags" class="form-input" placeholder="Next.js, WordPress, Core Web Vitals, CRO" value="<?= htmlspecialchars($_POST['tags'] ?? '') ?>">
              </div>

              <div class="form-group">
                <label for="shortExcerpt" style="font-weight: 700;">Short Excerpt *</label>
                <textarea id="shortExcerpt" name="short_excerpt" class="form-textarea" rows="3" placeholder="Provide a compelling 2-3 sentence overview that appears on blog cards and search snippets..." required><?= htmlspecialchars($_POST['short_excerpt'] ?? '') ?></textarea>
              </div>

            </div>

            <!-- Markdown / Rich Editor Workspace Card -->
            <div class="editor-workspace-card">
              
              <div class="editor-header-bar">
                <div style="display: flex; align-items: center; gap: 0.85rem;">
                  <span style="font-weight: 800; font-size: 0.92rem; color: #0F172A;">Article Body Content *</span>
                  <div class="editor-view-modes">
                    <button type="button" class="view-mode-btn active" data-mode="write">Write</button>
                    <button type="button" class="view-mode-btn" data-mode="preview">Preview</button>
                    <button type="button" class="view-mode-btn" data-mode="split">Split</button>
                  </div>
                </div>

                <div class="editor-toolbar">
                  <button type="button" class="tool-btn" data-tool="bold" title="Bold">B</button>
                  <button type="button" class="tool-btn" data-tool="italic" title="Italic" style="font-style: italic;">I</button>
                  <button type="button" class="tool-btn" data-tool="h2" title="Heading 2">H2</button>
                  <button type="button" class="tool-btn" data-tool="h3" title="Heading 3">H3</button>
                  <button type="button" class="tool-btn" data-tool="quote" title="Quote">”</button>
                  <button type="button" class="tool-btn" data-tool="code" title="Code">&lt;/&gt;</button>
                  <button type="button" class="tool-btn" data-tool="list" title="Bullet List">• List</button>
                  <button type="button" class="tool-btn" data-tool="link" title="Insert Link">🔗</button>

                  <input type="file" id="mdFileInput" accept=".md,.txt" style="display: none;">
                  <button type="button" id="uploadMdBtn" class="tool-btn" style="background: #EFF6FF; color: #2563EB; border: 1px solid rgba(37, 99, 235, 0.2);" title="Import Markdown File">
                    📂 Import .md
                  </button>
                </div>

                <div class="editor-stats-bar">
                  <span id="wordCountSpan">0 words</span> • <span id="charCountSpan">0 characters</span>
                </div>
              </div>

              <div class="editor-content-area" id="editorContentArea">
                <textarea id="articleBody" name="content" class="editor-textarea" placeholder="Write or paste your article content in Markdown or HTML...&#10;&#10;## 1. Introduction&#10;Start drafting here..." required><?= htmlspecialchars($_POST['content'] ?? '') ?></textarea>
                <div class="editor-preview-pane" id="editorPreviewPane"></div>
              </div>

            </div>

            <!-- Frequently Asked Questions (FAQ) Section -->
            <div class="faq-manager-card">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin: 0;">Frequently Asked Questions (FAQ)</h3>
                  <p style="font-size: 0.8rem; color: #64748B; margin: 0.2rem 0 0;">Configured FAQs automatically render inside the article accordion and generate Google FAQPage Schema.</p>
                </div>
                <button type="button" id="addFaqBtn" class="action-btn" style="background: #EFF6FF; border-color: rgba(37,99,235,0.3); color: #2563EB;">
                  + Add FAQ Item
                </button>
              </div>

              <div class="faq-items-list" id="faqListContainer">
                <!-- Dynamically populated via JS -->
              </div>

              <div class="empty-faq-placeholder" id="emptyFaqPlaceholder">
                <span>💬</span>
                <p style="margin: 0.35rem 0 0;">No FAQs added yet. Click "+ Add FAQ Item" above to attach Google Rich Snippet questions to this post.</p>
              </div>
            </div>

          </div>

          <!-- RIGHT / PUBLISHING SIDEBAR -->
          <div class="compose-sidebar">
            
            <!-- Publish Actions Card -->
            <div class="sidebar-card">
              <div class="sidebar-card-title">
                <span>🚀 Publish Stage</span>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="publishStage" style="font-weight: 700;">Status</label>
                <select id="publishStage" name="publish_stage" class="form-select">
                  <option value="published" <?= (($_POST['publish_stage'] ?? '') === 'published') ? 'selected' : '' ?>>Published (Live Immediately)</option>
                  <option value="draft" <?= (($_POST['publish_stage'] ?? '') === 'draft') ? 'selected' : '' ?>>Draft (Private Preview)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="publishDate" style="font-weight: 700;">Publication Date</label>
                <input type="date" id="publishDate" name="publish_date" class="form-input" value="<?= htmlspecialchars($_POST['publish_date'] ?? date('Y-m-d')) ?>">
                <small style="font-size: 0.72rem; color: #94A3B8; margin-top: 0.25rem; display: block;">Sets the public post date and sorting order.</small>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="readTime" style="font-weight: 700;">Read Time (minutes)</label>
                <input type="number" id="readTime" name="read_time" class="form-input" min="1" max="60" value="<?= htmlspecialchars($_POST['read_time'] ?? '5') ?>">
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label for="articleAuthor" style="font-weight: 700;">Author</label>
                <select id="articleAuthor" name="author" class="form-select">
                  <option value="Sanjeev Kumar Malik" selected>Sanjeev Kumar Malik — Principal Web Architect</option>
                  <?php foreach ($authors as $a): ?>
                    <?php if ($a['name'] !== 'Sanjeev Kumar Malik'): ?>
                      <option value="<?= htmlspecialchars($a['name']) ?>"><?= htmlspecialchars($a['name']) ?> (<?= htmlspecialchars($a['title']) ?>)</option>
                    <?php endif; ?>
                  <?php endforeach; ?>
                </select>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 0.95rem;">
                Publish Article →
              </button>
            </div>

            <!-- Featured Image Card -->
            <div class="sidebar-card">
              <div class="sidebar-card-title">
                <span>🖼️ Featured Image</span>
              </div>

              <div class="image-dropzone" id="imageDropzone">
                <input type="file" id="featuredImage" name="featured_image" accept=".jpg,.jpeg,.png,.webp,.svg" style="display: none;">
                <div class="dropzone-icon">📁</div>
                <div class="dropzone-text">Click to browse or Drag &amp; Drop image</div>
                <div class="dropzone-subtext">Supports JPG, PNG, WEBP, SVG (Max 5MB)</div>
              </div>

              <div class="image-preview-box" id="imagePreviewBox" style="display: block;">
                <img id="imagePreviewImg" src="/assets/images/Web-Development.webp" alt="Featured Image Preview" class="image-preview-img">
                <div class="image-preview-label">Default Fallback Preview</div>
              </div>

              <div class="form-group" style="margin-top: 1rem;">
                <label for="imageAlt" style="font-weight: 700;">Featured Image Alt Text (Optional)</label>
                <input type="text" id="imageAlt" name="featured_image_alt" class="form-input" placeholder="e.g. Next.js 15 App Router Architecture diagram" value="<?= htmlspecialchars($_POST['featured_image_alt'] ?? '') ?>">
                <small style="font-size: 0.72rem; color: #94A3B8; margin-top: 0.25rem; display: block;">Accessibility &amp; SEO: Describe the featured image for screen readers and Google Images.</small>
              </div>
            </div>

            <!-- SEO & Meta Tags Card -->
            <div class="sidebar-card">
              <div class="sidebar-card-title">
                <span>🔍 Search Engine Optimization (SEO)</span>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="seoTitle" style="font-weight: 700;">SEO Title</label>
                <input type="text" id="seoTitle" name="seo_title" class="form-input" placeholder="Leave blank to use Article Title" value="<?= htmlspecialchars($_POST['seo_title'] ?? '') ?>">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="metaDescription" style="font-weight: 700;">Meta Description</label>
                <textarea id="metaDescription" name="meta_description" class="form-textarea" rows="2" placeholder="Recommended: 140–160 characters"><?= htmlspecialchars($_POST['meta_description'] ?? '') ?></textarea>
              </div>

              <div class="form-group">
                <label for="metaKeywords" style="font-weight: 700;">Meta Keywords</label>
                <input type="text" id="metaKeywords" name="meta_keywords" class="form-input" placeholder="web development, next.js, delhi architect" value="<?= htmlspecialchars($_POST['meta_keywords'] ?? '') ?>">
              </div>
            </div>

            <!-- Schema Markup / Structured Data Card -->
            <div class="sidebar-card">
              <div class="sidebar-card-title">
                <span>⚡ Schema Markup / Structured Data</span>
              </div>
              <p style="font-size: 0.78rem; color: #64748B; margin-top: 0; line-height: 1.4;">Configure Google rich snippets and search engine structured data for this blog post.</p>

              <div style="display: flex; gap: 1rem; margin-bottom: 0.75rem;">
                <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
                  <input type="radio" name="schema_type" id="schemaAuto" value="automatic" checked>
                  <span>Automatic (Recommended)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
                  <input type="radio" name="schema_type" id="schemaCustom" value="custom" <?= (($_POST['schema_type'] ?? '') === 'custom') ? 'selected' : '' ?>>
                  <span>Custom JSON-LD</span>
                </label>
              </div>

              <!-- Intelligent Schema Box -->
              <div class="schema-option-box" id="schemaAutoCard">
                <div class="schema-badge">
                  <span>🟢</span>
                  <span>Intelligent Dynamic Schema Generation Active</span>
                </div>
                <div class="schema-desc">
                  BuzzSpire &amp; Sanjeev Kumar Malik automatically generates Schema.org-compliant structured data for this blog post, fully optimized for Google Rich Results.
                </div>
                <ul class="schema-feature-list">
                  <li><span>✓</span> <strong>Primary entity:</strong> BlogPosting with dynamic author, publisher, and timestamp linking.</li>
                  <li><span>✓</span> <strong>Hierarchical breadcrumbs:</strong> BreadcrumbList linking homepage and section pathways.</li>
                  <li><span>✓</span> <strong>Rich snippet FAQs:</strong> FAQPage automatically rendered whenever article FAQs are configured.</li>
                  <li><span>✓</span> <strong>Canonical organization:</strong> Seamlessly connected to the verified #organization entity.</li>
                </ul>
              </div>

              <!-- Custom JSON-LD Textarea Box -->
              <div id="schemaCustomCard" style="display: none; margin-top: 0.75rem;">
                <label for="customSchemaJson" style="font-size: 0.78rem; font-weight: 700; color: #334155; margin-bottom: 0.25rem; display: block;">Paste Raw JSON-LD Script:</label>
                <textarea id="customSchemaJson" name="custom_schema_json" class="form-textarea" rows="6" placeholder="{&#10;  &quot;@context&quot;: &quot;https://schema.org&quot;,&#10;  &quot;@type&quot;: &quot;BlogPosting&quot;&#10;}" style="font-family: var(--font-mono, monospace); font-size: 0.8rem;"><?= htmlspecialchars($_POST['custom_schema_json'] ?? '') ?></textarea>
              </div>

            </div>

          </div>

        </div>

      </form>

    </main>
  </div>

  <script src="/admin/assets/js/admin.js"></script>
</body>
</html>
