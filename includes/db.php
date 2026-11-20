<?php
/**
 * Global Database Access Helper
 */
require_once __DIR__ . '/../config/database.php';

$pdo = getDBConnection();
if (!$pdo) {
    // Log error, don't crash frontend
    error_log("Failed to connect to MySQL database on localhost.");
}

