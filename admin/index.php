<?php
/**
 * SANJEEV KUMAR MALIK — ADMIN DASHBOARD & BLOG MANAGER
 */
require_once __DIR__ . '/auth.php';
checkAdminAuth();

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

$admin = getCurrentAdmin();
$adminBasePath = getAdminBasePath();
$siteRootPath = getSiteRootPath();

// Filtering and Search params
$search = trim($_GET['search'] ?? '');
$categoryFilter = trim($_GET['category'] ?? '');
$stageFilter = trim($_GET['stage'] ?? '');

// Base query
$query = "SELECT * FROM blogs WHERE 1=1";
$params = [];

if (!empty($search)) {
    $query .= " AND (title LIKE ? OR short_excerpt LIKE ? OR tags LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

if (!empty($categoryFilter)) {
    $query .= " AND category_name = ?";
    $params[] = $categoryFilter;
}

if (!empty($stageFilter)) {
    $query .= " AND publish_stage = ?";
    $params[] = $stageFilter;
}

$query .= " ORDER BY publish_date DESC, id DESC";

$blogs = [];
if ($pdo) {
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $blogs = $stmt->fetchAll();

    // Fetch Stats
    $totalArticles = $pdo->query("SELECT COUNT(*) FROM blogs")->fetchColumn();
    $publishedCount = $pdo->query("SELECT COUNT(*) FROM blogs WHERE publish_stage = 'published'")->fetchColumn();
    $draftCount = $pdo->query("SELECT COUNT(*) FROM blogs WHERE publish_stage = 'draft'")->fetchColumn();
    $categoryCount = $pdo->query("SELECT COUNT(DISTINCT category_name) FROM blogs")->fetchColumn();

    // Fetch unique categories for filter dropdown
    $categories = $pdo->query("SELECT DISTINCT category_name FROM blogs ORDER BY category_name ASC")->fetchAll(PDO::FETCH_COLUMN);
} else {
    $totalArticles = 0;
    $publishedCount = 0;
    $draftCount = 0;
    $categoryCount = 0;
    $categories = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard — Blog Articles Manager</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">
  <link rel="stylesheet" href="../assets/css/style.css?v=6.5">
  <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="admin-body">

  <!-- Sidebar -->
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="admin-sidebar-header">
      <a href="<?= $adminBasePath ?>/index.php" class="admin-brand-link">
        <span class="admin-brand-dot"></span>
        <span>sanjeevkumarmalik</span>
      </a>
    </div>

    <nav class="admin-nav">
      <a href="<?= $adminBasePath ?>/index.php" class="admin-nav-item active">
        <span>📰</span>
        <span>Articles Manager</span>
        <span class="admin-nav-badge"><?= (int)$totalArticles ?></span>
      </a>
      <a href="<?= $adminBasePath ?>/create-blog.php" class="admin-nav-item">
        <span>✍️</span>
        <span>Compose Article</span>
      </a>
      <a href="<?= rtrim($siteRootPath, '/') ?>/blogs" target="_blank" class="admin-nav-item">
        <span>🌐</span>
        <span>View Live Blogs</span>
      </a>
      <a href="<?= $siteRootPath ?>" target="_blank" class="admin-nav-item">
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
      <a href="<?= $adminBasePath ?>/logout.php" class="admin-logout-btn" title="Logout">🚪</a>
    </div>
  </aside>

  <!-- Main Content Wrapper -->
  <div class="admin-main">
    
    <!-- Topbar -->
    <header class="admin-topbar">
      <div>
        <h1 class="admin-topbar-title">Blog Articles Manager</h1>
      </div>
      <div class="admin-topbar-actions">
        <a href="<?= $adminBasePath ?>/create-blog.php" class="btn-primary" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
          <span>+ Compose New Article</span>
        </a>
      </div>
    </header>

    <main class="admin-content-body">

      <!-- Alerts -->
      <?php if (isset($_GET['created'])): ?>
        <div class="alert-box alert-success">
          <span>✅</span>
          <span>Article created and published successfully to MySQL database and live website!</span>
        </div>
      <?php endif; ?>

      <?php if (isset($_GET['updated'])): ?>
        <div class="alert-box alert-success">
          <span>✅</span>
          <span>Article updated successfully!</span>
        </div>
      <?php endif; ?>

      <?php if (isset($_GET['deleted'])): ?>
        <div class="alert-box alert-success">
          <span>🗑️</span>
          <span>Article was deleted successfully from database.</span>
        </div>
      <?php endif; ?>

      <!-- Metric Stats Cards -->
      <div class="admin-stats-grid">
        <div class="stat-card">
          <div class="stat-icon-box">📚</div>
          <div>
            <div class="stat-number"><?= (int)$totalArticles ?></div>
            <div class="stat-label">Total Articles</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box" style="background: #ECFDF5; color: #10B981;">🟢</div>
          <div>
            <div class="stat-number"><?= (int)$publishedCount ?></div>
            <div class="stat-label">Published Live</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box" style="background: #FFFBEB; color: #F59E0B;">📝</div>
          <div>
            <div class="stat-number"><?= (int)$draftCount ?></div>
            <div class="stat-label">Drafts / Private</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box" style="background: #F5F3FF; color: #8B5CF6;">🏷️</div>
          <div>
            <div class="stat-number"><?= (int)$categoryCount ?></div>
            <div class="stat-label">Categories</div>
          </div>
        </div>
      </div>

      <!-- Articles Management Card -->
      <div class="admin-card">
        <div class="card-header-row">
          <h2 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0F172A;">All Authored Articles</h2>

          <!-- Filter & Search Controls -->
          <form method="GET" action="<?= $adminBasePath ?>/index.php" class="table-search-row">
            <div class="search-input-box">
              <span class="search-icon-inside">🔍</span>
              <input type="text" name="search" class="form-input" placeholder="Search by title or tags..." value="<?= htmlspecialchars($search) ?>" style="padding: 0.5rem 0.85rem 0.5rem 2.25rem; font-size: 0.85rem; height: 38px;">
            </div>

            <select name="category" class="form-select" onchange="this.form.submit()" style="padding: 0.5rem 0.85rem; font-size: 0.85rem; height: 38px; border-radius: 8px;">
              <option value="">All Categories</option>
              <?php foreach ($categories as $cat): ?>
                <option value="<?= htmlspecialchars($cat) ?>" <?= $categoryFilter === $cat ? 'selected' : '' ?>>
                  <?= htmlspecialchars($cat) ?>
                </option>
              <?php endforeach; ?>
            </select>

            <select name="stage" class="form-select" onchange="this.form.submit()" style="padding: 0.5rem 0.85rem; font-size: 0.85rem; height: 38px; border-radius: 8px;">
              <option value="">All Stages</option>
              <option value="published" <?= $stageFilter === 'published' ? 'selected' : '' ?>>Published</option>
              <option value="draft" <?= $stageFilter === 'draft' ? 'selected' : '' ?>>Draft</option>
            </select>

            <?php if (!empty($search) || !empty($categoryFilter) || !empty($stageFilter)): ?>
              <a href="<?= $adminBasePath ?>/index.php" class="action-btn" style="height: 38px;">Reset</a>
            <?php endif; ?>
          </form>
        </div>

        <!-- Table -->
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 45%;">Article</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php if (empty($blogs)): ?>
                <tr>
                  <td colspan="5" style="text-align: center; padding: 3rem 1rem; color: #64748B;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
                    <strong>No articles found matching criteria.</strong>
                    <p style="font-size: 0.85rem; margin-top: 0.25rem;">Try adjusting your search or compose a new article.</p>
                  </td>
                </tr>
              <?php else: ?>
                <?php foreach ($blogs as $b): ?>
                  <tr>
                    <td>
                      <div class="table-article-cell">
                        <img src="<?= htmlspecialchars(!empty($b['featured_image']) ? $b['featured_image'] : '../assets/images/Web-Development.webp') ?>" alt="<?= htmlspecialchars($b['title']) ?>" class="table-thumb" onerror="this.src='../assets/images/Web-Development.webp'">
                        <div class="table-article-info">
                          <a href="<?= $adminBasePath ?>/edit-blog.php?id=<?= $b['id'] ?>" class="table-article-title">
                            <?= htmlspecialchars($b['title']) ?>
                          </a>
                          <span class="table-article-slug"><?= rtrim($siteRootPath, '/') ?>/blogs/<?= htmlspecialchars($b['slug']) ?></span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span class="blog-category-tag" style="margin: 0; font-size: 0.72rem;">
                        <?= htmlspecialchars($b['category_name']) ?>
                      </span>
                    </td>

                    <td>
                      <?php if ($b['publish_stage'] === 'published'): ?>
                        <span class="badge-published">● Published</span>
                      <?php else: ?>
                        <span class="badge-draft">● Draft</span>
                      <?php endif; ?>
                    </td>

                    <td>
                      <div style="font-size: 0.82rem; font-weight: 600; color: #334155;">
                        <?= date('M d, Y', strtotime($b['publish_date'])) ?>
                      </div>
                      <div style="font-size: 0.74rem; color: #94A3B8;">
                        <?= (int)$b['read_time'] ?> min read
                      </div>
                    </td>

                    <td style="text-align: right;">
                      <div class="table-actions" style="justify-content: flex-end;">
                        <a href="<?= rtrim($siteRootPath, '/') ?>/blogs/<?= htmlspecialchars($b['slug']) ?>" target="_blank" class="action-btn" title="View live page">
                          <span>👁️</span>
                        </a>
                        <a href="<?= $adminBasePath ?>/edit-blog.php?id=<?= $b['id'] ?>" class="action-btn" title="Edit Article">
                          <span>✏️ Edit</span>
                        </a>
                        <a href="<?= $adminBasePath ?>/delete-blog.php?id=<?= $b['id'] ?>" class="action-btn action-btn-danger" title="Delete Article" onclick="return confirm('Are you sure you want to permanently delete this article?')">
                          <span>🗑️</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>

      </div>

    </main>
  </div>

</body>
</html>
