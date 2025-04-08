<?php 

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); 

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $username = htmlspecialchars(strip_tags($data->username));
    $password = htmlspecialchars(strip_tags($data->password));

    $stmt = $conn->prepare("SELECT id, username, email, password, profile_pic FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) { 
        $stmt->bind_result($id, $db_username, $db_email, $db_password, $profile_pic);
        $stmt->fetch();

        if (password_verify($password, $db_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $db_username;

            // Fetch user notifications
            $notificationStmt = $conn->prepare("SELECT id, message, read_status FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10");
            $notificationStmt->bind_param("i", $id);
            $notificationStmt->execute();
            $result = $notificationStmt->get_result();
            $notifications = [];
            
            while ($row = $result->fetch_assoc()) {
                $notifications[] = [
                    'id' => $row['id'],
                    'message' => $row['message'],
                    'read' => $row['read_status'],
                ];
            }

            echo json_encode([
                "success" => true,
                "message" => "Login successful.",
                "username" => $db_username,
                "email" => $db_email, 
                "user_id" => $id,  
                "profile_pic" => $profile_pic ?? "/default-profile.png",
                "notifications" => $notifications, // Include notifications
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password."]);
            exit;
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
        exit;
    }
} else {
    echo json_encode(["success" => false, "message" => "Please fill in all fields."]);
    exit;
}
