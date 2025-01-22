<?php
ini_set("SMTP", "smtp.gmail.com");
ini_set("smtp_port", "587");

// Replace with your database credentials
$servername = "localhost";
$username = "dsoftlab_ebendev";
$password = "@Softboi09++";
$dbname = "dsoftlab_portfolio";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "ebendevlab@gmail.com"; // Replace with your email address
    $headers = "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

    $mailSuccess = mail($to, $subject, $message, $headers);

    // Use prepared statements to insert data into the database
    $sql = "INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    $databaseSuccess = $stmt->execute();
    $stmt->close();

    if ($mailSuccess && $databaseSuccess) {
        echo json_encode(array("status" => "success", "message" => "Message sent and saved successfully!"));
    } else if ($mailSuccess) {
        echo json_encode(array("status" => "success", "message" => "Message sent successfully, but failed to save in the database."));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to send message or save to database. Please try again later."));
    }

    $conn->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}
