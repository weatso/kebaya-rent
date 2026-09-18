<?php
/**
 * DYA.ATTIRE — Fitting Reservation API
 * POST /api/booking.php
 * Body: { customer_name, customer_whatsapp, event_date, fitting_date, fitting_time, kebaya_ids }
 */

require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Parse JSON Body ──
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body.']);
    exit;
}

// ── Validate Required Fields ──
$required = ['customer_name', 'customer_whatsapp', 'event_date', 'fitting_date', 'fitting_time', 'kebaya_ids'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '{$field}' is required."]);
        exit;
    }
}

// ── Generate Booking Code ──
$datePart = date('Ymd');
$randomPart = strtoupper(substr(bin2hex(random_bytes(2)), 0, 4));
$bookingCode = "DYA-{$datePart}-{$randomPart}";

// ── Insert Reservation ──
try {
    $stmt = $pdo->prepare('
        INSERT INTO fitting_reservations
            (booking_code, customer_name, customer_whatsapp, event_date, fitting_date, fitting_time, kebaya_ids)
        VALUES
            (:booking_code, :customer_name, :customer_whatsapp, :event_date, :fitting_date, :fitting_time, :kebaya_ids)
    ');

    $stmt->execute([
        ':booking_code'      => $bookingCode,
        ':customer_name'     => $input['customer_name'],
        ':customer_whatsapp' => $input['customer_whatsapp'],
        ':event_date'        => $input['event_date'],
        ':fitting_date'      => $input['fitting_date'],
        ':fitting_time'      => $input['fitting_time'],
        ':kebaya_ids'        => json_encode($input['kebaya_ids']),
    ]);

    echo json_encode([
        'success'      => true,
        'booking_code' => $bookingCode,
        'message'      => 'Reservasi berhasil disimpan.',
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save reservation.']);
}
