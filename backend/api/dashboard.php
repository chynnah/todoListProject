<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    // Return the username in JSON format
    echo json_encode(["status" => "success", "username" => $username]);
} else {
    // Handle the case where the user is not logged in
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
}
?>
