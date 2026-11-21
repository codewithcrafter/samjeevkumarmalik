<?php
/**
 * Admin Login Interface
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../includes/db.php';

$adminBasePath = getAdminBasePath();
$siteRootPath = getSiteRootPath();

// If already logged in, redirect to admin dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: " . $adminBasePath . "/index.php");
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? LIMIT 1");
            $stmt->execute([$username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_name'] = $admin['name'];
                $_SESSION['admin_email'] = $admin['email'];

                header("Location: " . $adminBasePath . "/index.php");
                exit;
            } else {
                $error = 'Invalid username or password.';
            }
        } else {
            // Localhost fallback if DB connection fails
            if ($username === 'admin' && $password === 'admin123') {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = 1;
                $_SESSION['admin_username'] = 'admin';
                $_SESSION['admin_name'] = 'Sanjeev Kumar Malik';
                header("Location: " . $adminBasePath . "/index.php");
                exit;
            }
            $error = 'Database offline. Try default credentials.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portal Login — Sanjeev Kumar Malik</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">
  <link rel="stylesheet" href="../assets/css/style.css?v=6.2">
  <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="admin-login-body">

  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-brand">
        <a href="<?= $siteRootPath ?>" class="nav-brand" aria-label="Sanjeev Kumar Malik">
          <span class="brand-dot"></span>
          <span>sanjeevkumarmalik</span>
        </a>
        <span class="admin-badge">CMS Management Portal</span>
      </div>

      <h1 class="login-title">Sign in to Blog Manager</h1>
      <p class="login-subtitle">Compose, publish, and engineer technical articles with dynamic Schema.org &amp; SEO intelligence.</p>

      <?php if (!empty($error)): ?>
        <div class="alert-box alert-error" role="alert">
          <span>⚠️</span>
          <span><?= htmlspecialchars($error) ?></span>
        </div>
      <?php endif; ?>

      <?php if (isset($_GET['logged_out'])): ?>
        <div class="alert-box alert-success">
          <span>👋</span>
          <span>You have been signed out successfully.</span>
        </div>
      <?php endif; ?>

      <form action="<?= $adminBasePath ?>/login.php" method="POST" class="login-form">
        <div class="form-group">
          <label for="username">Admin Username</label>
          <input type="text" id="username" name="username" class="form-input" placeholder="admin" value="<?= htmlspecialchars($_POST['username'] ?? 'admin') ?>" required autofocus>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-input" placeholder="••••••••" value="admin123" required>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; margin-top: 0.5rem;">
          Sign In to Dashboard →
        </button>

        <div class="dev-hint-card">
          <div class="hint-header">
            <span>⚡ Localhost Credentials</span>
          </div>
          <div class="hint-body">
            <div>Username: <code>admin</code></div>
            <div>Password: <code>admin123</code></div>
          </div>
        </div>

        <div class="login-footer-links">
          <a href="<?= $siteRootPath ?>" class="back-link">← Return to Public Website</a>
        </div>
      </form>
    </div>
  </div>

</body>
</html>
