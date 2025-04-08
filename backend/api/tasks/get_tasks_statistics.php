<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once("../../config/db.php"); 


session_start();
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION["user_id"];

$query = "
    SELECT c.name as category_name, t.status, COUNT(*) as task_count
    FROM tasks t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
    GROUP BY t.category_id, t.status
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$task_stats = [];
while ($row = $result->fetch_assoc()) {
    $task_stats[] = $row;
}

echo json_encode(["success" => true, "task_stats" => $task_stats]);
?>
