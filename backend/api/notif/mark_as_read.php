<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? null;
$notification_id = $data['notification_id'] ?? null;

if ($user_id && $notification_id) {
    $stmt = $conn->prepare("UPDATE notifications SET read_status = 1 WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $notification_id, $user_id);
    $stmt->execute();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
}
?>
