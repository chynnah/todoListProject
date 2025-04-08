<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); 

session_start();
require_once __DIR__ . "/../../config/db.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

// Get the user ID from the session
$user_id = $_SESSION["user_id"];

// Fetch tasks for the logged-in user
$stmt = $conn->prepare("
    SELECT tasks.*, categories.name AS category 
    FROM tasks 
    LEFT JOIN categories ON tasks.category_id = categories.id
    WHERE tasks.user_id = ?
");

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

// Return tasks as a JSON response
echo json_encode(["success" => true, "tasks" => $tasks]);
?>
