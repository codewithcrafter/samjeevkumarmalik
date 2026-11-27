<?php
/**
 * SANJEEV KUMAR MALIK — Local Development Router for PHP Built-in Server
 * Handles clean URLs, static assets, dynamic PHP routing, and Admin portal.
 */

$rawUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($rawUri, PHP_URL_PATH);
$path = '/' . ltrim(urldecode($path), '/');

// 1. If physical file exists and is not a directory, serve directly or execute if PHP
$filePath = __DIR__ . $path;
if ($path !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    if (pathinfo($filePath, PATHINFO_EXTENSION) === 'php') {
        require $filePath;
        exit;
    }
    return false; // Built-in server serves static files (CSS, JS, images, fonts)
}

// 2. Admin portal clean URLs
if (preg_match('#^/admin(?:/([a-zA-Z0-9_-]+))?/?$#', $path, $matches)) {
    $action = !empty($matches[1]) ? $matches[1] : 'index';
    $adminFile = __DIR__ . '/admin/' . $action . '.php';
    if (file_exists($adminFile)) {
        require $adminFile;
        exit;
    }
}

// 3. Dynamic Blogs Listing & Single Articles
if ($path === '/blogs' || $path === '/blogs/') {
    require __DIR__ . '/blogs.php';
    exit;
}

if (preg_match('#^/blogs/([^/]+)/?$#', $path, $matches)) {
    $_GET['slug'] = $matches[1];
    require __DIR__ . '/blog.php';
    exit;
}

// 4. Homepage
if ($path === '/' || $path === '/index.html' || $path === '/index.php') {
    require __DIR__ . '/index.html';
    exit;
}

$cleanPath = rtrim($path, '/');

// 5. Clean URLs for .php files (e.g. /blogs.php)
if (file_exists(__DIR__ . $cleanPath . '.php')) {
    require __DIR__ . $cleanPath . '.php';
    exit;
}

// 6. Clean URLs for .html files (e.g. /about-sanjeev-kumar-malik, /contact-us, /services)
if (file_exists(__DIR__ . $cleanPath . '.html')) {
    require __DIR__ . $cleanPath . '.html';
    exit;
}

// 7. Directory index.html (e.g. /services/wordpress-web-development/ or /services/wordpress-web-development)
if (file_exists(__DIR__ . $cleanPath . '/index.html')) {
    require __DIR__ . $cleanPath . '/index.html';
    exit;
}

// 8. Multi-segment routes for services / other directories
if (preg_match('#^/services/([^/]+)/?$#', $path, $matches)) {
    $serviceSlug = $matches[1];
    if (file_exists(__DIR__ . '/services/' . $serviceSlug . '.html')) {
        require __DIR__ . '/services/' . $serviceSlug . '.html';
        exit;
    }
    if (file_exists(__DIR__ . '/services/' . $serviceSlug . '/index.html')) {
        require __DIR__ . '/services/' . $serviceSlug . '/index.html';
        exit;
    }
}

// 9. If nothing matched, send 404
http_response_code(404);
echo "404 Not Found: " . htmlspecialchars($path);
exit;
