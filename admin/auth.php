<?php
/**
 * Admin Authentication Middleware
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function checkAdminAuth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        $loginUrl = '/admin/login.php';
        header("Location: " . $loginUrl);
        exit;
    }
}

function getCurrentAdmin() {
    return [
        'id'       => $_SESSION['admin_id'] ?? 1,
        'username' => $_SESSION['admin_username'] ?? 'admin',
        'name'     => $_SESSION['admin_name'] ?? 'Sanjeev Kumar Malik',
        'email'    => $_SESSION['admin_email'] ?? 'info@sanjeevkumarmalik.in'
    ];
}
