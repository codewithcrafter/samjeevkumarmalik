<?php
/**
 * Delete Article Action
 */
require_once __DIR__ . '/auth.php';
checkAdminAuth();

require_once __DIR__ . '/../includes/db.php';

$id = (int)($_GET['id'] ?? 0);

if ($id && $pdo) {
    // Optionally delete uploaded image if local
    $stmt = $pdo->prepare("SELECT featured_image FROM blogs WHERE id = ?");
    $stmt->execute([$id]);
    $img = $stmt->fetchColumn();

    if ($img && strpos($img, '/uploads/blogs/') === 0) {
        $fullPath = __DIR__ . '/..' . $img;
        if (file_exists($fullPath)) {
            @unlink($fullPath);
        }
    }

    $delete = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
    $delete->execute([$id]);
}

header("Location: /admin/index.php?deleted=1");
exit;
