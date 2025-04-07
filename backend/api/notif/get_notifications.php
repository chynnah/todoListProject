<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); 

session_start();
require_once __DIR__ . "/../../config/db.php";

// Check if the user is logged in by verifying the session
if (!isset($_GET['user_id'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$user_id = $_GET['user_id'];

$notifications = [];

// Fetch general notifications
$query = "SELECT id, message, read_status FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $notifications[] = [
        'id' => $row['id'],
        'message' => $row['message'],
        'read_status' => $row['read_status']
    ];
}

// Fetch task-related notifications with deadline and category
$deadlineStmt = $conn->prepare("
    SELECT tasks.id AS task_id, tasks.task, tasks.deadline, categories.name AS category
    FROM tasks
    LEFT JOIN categories ON tasks.category_id = categories.id
    WHERE tasks.user_id = ? AND tasks.deadline IS NOT NULL AND tasks.deadline > NOW()
    AND tasks.deadline <= DATE_ADD(NOW(), INTERVAL 1 DAY)
");
$deadlineStmt->bind_param("i", $user_id);
$deadlineStmt->execute();
$deadlineResult = $deadlineStmt->get_result();

while ($row = $deadlineResult->fetch_assoc()) {
    $deadline = strtotime($row['deadline']);
    $remaining = floor(($deadline - time()) / 3600); 

    $notifications[] = [
        'id' => 'task-' . $row['task_id'],
        'message' => "⏰ Deadline soon: '{$row['task']}' in category '{$row['category']}' is due in $remaining hour(s)!",
        'read_status' => 0,
    ];
}

echo json_encode(['success' => true, 'notifications' => $notifications]);