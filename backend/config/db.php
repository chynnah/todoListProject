<?php
$host = "localhost";  // Change this if your database is hosted elsewhere
$dbname = "todo_list"; // Your database name
$username = "root"; // Default username for XAMPP/MAMP/LAMP
$password = ""; // Default password for XAMPP (leave blank)

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}
?>
