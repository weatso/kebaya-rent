<?php
/**
 * DYA.ATTIRE — Kebaya Catalog API
 * GET /api/kebaya.php?category=wisuda&ld=M&search=sekar
 */

require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Build Query ──
$where = [];
$params = [];

// Category filter
if (!empty($_GET['category'])) {
    $where[] = 'category = :category';
    $params[':category'] = $_GET['category'];
}

// LD size filter (matches the letter in parentheses, e.g. "(M)")
if (!empty($_GET['ld'])) {
    $where[] = 'ld_range LIKE :ld';
    $params[':ld'] = '%(' . $_GET['ld'] . ')%';
}

// Search by name or code
if (!empty($_GET['search'])) {
    $where[] = '(name LIKE :search OR code LIKE :search2)';
    $params[':search'] = '%' . $_GET['search'] . '%';
    $params[':search2'] = '%' . $_GET['search'] . '%';
}

$sql = 'SELECT * FROM kebayas';
if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}
$sql .= ' ORDER BY FIELD(status, "ready", "booked", "laundry"), created_at DESC';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $kebayas = $stmt->fetchAll();

    echo json_encode($kebayas);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch kebayas.']);
}
