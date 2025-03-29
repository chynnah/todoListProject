<?php 

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); 

session_start();
require_once "../config/db.php"; 

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $username = htmlspecialchars(strip_tags($data->username));
    $password = htmlspecialchars(strip_tags($data->password));

    $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $db_username, $db_email, $db_password);
        $stmt->fetch();

        if (password_verify($password, $db_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $db_username;

            
            echo json_encode([
                "success" => true,
                "message" => "Login successful.",
                "username" => $db_username,
                "email" => $db_email, 
                "user_id" => $id     
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
