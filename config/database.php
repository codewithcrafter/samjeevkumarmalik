<?php
/**
 * =========================================================================
 * DATABASE CONNECTION & CONFIGURATION MODULE
 * =========================================================================
 * 
 * 1. LOCALHOST (XAMPP):
 *    DB_HOST: 'localhost' or '127.0.0.1'
 *    DB_PORT: '3306'
 *    DB_USER: 'root'
 *    DB_PASS: ''
 *    DB_NAME: 'sanjeev_db'
 * 
 * 2. HOSTINGER / LIVE PRODUCTION SERVER:
 *    Jab aap files Hostinger pe upload karein, tab Hostinger hPanel -> Databases -> MySQL Databases me jakar:
 *    - DB_HOST: 'localhost' (Hostinger me hamesha 'localhost' rehta hai)
 *    - DB_USER: 'u123456789_youruser' (Hostinger dwara generate kiya gaya username)
 *    - DB_PASS: 'AapkaDatabasePassword' (Hostinger me database create karte waqt jo password rakha tha)
 *    - DB_NAME: 'u123456789_yourdbname' (Hostinger dwara generate kiya gaya database name)
 */

if (!defined('DB_HOST')) define('DB_HOST', '127.0.0.1');
if (!defined('DB_PORT')) define('DB_PORT', '3306');
if (!defined('DB_USER')) define('DB_USER', 'root');
if (!defined('DB_PASS')) define('DB_PASS', '');
if (!defined('DB_NAME')) define('DB_NAME', 'sanjeev_db');

function getDBConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    // Method 1: Connect directly to the specific database (Standard for Hostinger & live servers)
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Method 2: Fallback for fresh local dev environments where DB might not exist yet
        try {
            $rootDsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
            $rootPdo = new PDO($rootDsn, DB_USER, DB_PASS, $options);
            $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            
            $pdo = new PDO("mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, $options);
            initDatabaseTables($pdo);
            return $pdo;
        } catch (PDOException $fallbackEx) {
            error_log("Database connection failed: " . $e->getMessage() . " | Fallback: " . $fallbackEx->getMessage());
            return null;
        }
    }
}

function initDatabaseTables($pdo) {
    // 1. Admins table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `admins` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(100) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `name` VARCHAR(150) NOT NULL,
        `email` VARCHAR(150) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // Insert default admin if not exists (username: admin, password: admin123)
    $stmt = $pdo->query("SELECT COUNT(*) FROM `admins`");
    if ($stmt->fetchColumn() == 0) {
        $defaultHash = password_hash('admin123', PASSWORD_DEFAULT);
        $insert = $pdo->prepare("INSERT INTO `admins` (`username`, `password`, `name`, `email`) VALUES (?, ?, ?, ?)");
        $insert->execute(['admin', $defaultHash, 'Sanjeev Kumar Malik', 'info@sanjeevkumarmalik.in']);
    }

    // 2. Categories table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `categories` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL UNIQUE,
        `slug` VARCHAR(100) NOT NULL UNIQUE,
        `description` TEXT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // Prepopulate categories if empty
    $catCheck = $pdo->query("SELECT COUNT(*) FROM `categories`");
    if ($catCheck->fetchColumn() == 0) {
        $cats = [
            ['WordPress Architecture', 'wordpress-architecture', 'Custom WordPress engineering, Gutenberg blocks, and headless decoupled setups.'],
            ['UI/UX Design', 'ui-ux-design', 'High-conversion design patterns, user mental models, and Figma to clean code.'],
            ['E-Commerce & CRO', 'ecommerce-cro', 'Conversion rate optimization, Indian payment rails, and checkout funnel speed.'],
            ['Custom Web Applications', 'custom-web-apps', 'Full-stack enterprise architectures, MERN/Next.js and SaaS pipelines.'],
            ['Speed & SEO Engineering', 'speed-seo', 'Core Web Vitals, sub-0.8s load times, and AI Overviews search optimization.'],
            ['Web Accessibility', 'web-accessibility', 'WCAG 2.2 AA compliance, contrast physics, and inclusive engineering.']
        ];
        $catStmt = $pdo->prepare("INSERT IGNORE INTO `categories` (`name`, `slug`, `description`) VALUES (?, ?, ?)");
        foreach ($cats as $cat) {
            $catStmt->execute($cat);
        }
    }

    // 3. Authors table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `authors` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `title` VARCHAR(200) NOT NULL,
        `email` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(50) NOT NULL,
        `avatar` VARCHAR(255) NULL,
        `bio` TEXT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $authCheck = $pdo->query("SELECT COUNT(*) FROM `authors`");
    if ($authCheck->fetchColumn() == 0) {
        $authStmt = $pdo->prepare("INSERT INTO `authors` (`name`, `title`, `email`, `phone`, `avatar`, `bio`) VALUES (?, ?, ?, ?, ?, ?)");
        $authStmt->execute([
            'Sanjeev Kumar Malik',
            'Principal Web Development Architect & Founder',
            'info@sanjeevkumarmalik.in',
            '+91 97186 04362',
            '/assets/images/Sanjeev-Kumar-Malik.webp',
            '15+ years experience building revenue-driven custom web platforms, WordPress headless systems, and high-concurrency web apps.'
        ]);
    }

    // 4. Blogs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `blogs` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `slug` VARCHAR(255) NOT NULL UNIQUE,
        `category_id` INT NULL,
        `category_name` VARCHAR(100) NOT NULL,
        `tags` VARCHAR(255) NULL,
        `featured_image` VARCHAR(255) NULL,
        `featured_image_alt` VARCHAR(255) NULL,
        `publish_stage` ENUM('draft', 'published', 'scheduled') DEFAULT 'published',
        `publish_date` DATE NOT NULL,
        `read_time` INT DEFAULT 5,
        `author_id` INT DEFAULT 1,
        `author_name` VARCHAR(150) DEFAULT 'Sanjeev Kumar Malik',
        `seo_title` VARCHAR(255) NULL,
        `short_excerpt` TEXT NOT NULL,
        `meta_description` TEXT NULL,
        `meta_keywords` VARCHAR(255) NULL,
        `schema_type` ENUM('automatic', 'custom') DEFAULT 'automatic',
        `custom_schema_json` LONGTEXT NULL,
        `content` LONGTEXT NOT NULL,
        `faqs_json` LONGTEXT NULL,
        `views_count` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (`slug`),
        INDEX (`category_name`),
        INDEX (`publish_stage`),
        INDEX (`publish_date`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
}

