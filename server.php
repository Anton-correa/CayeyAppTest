<?php

    session_start();
    $username = "";
    $errors = array();
    $db = mysqli_connect('localhost', 'root', '', 'cayeyapps');

    if(isset($_POST['register'])){
        $username = mysql_real_escape_string($_POST['username']);
        $password_1 = mysql_real_escape_string($_POST['password_1']);
        $password_2 = mysql_real_escape_string($_POST['password_2']);

        if(empty($username)){
            array_push($errors, "Username is required");
        }
        if(empty($password_1)){
            array_push($errors, "Password is required");
        }
        if($password_1 != $password_2){
            array_push($errors, "The passwords do not match");
        }

        if(count($errors)== 0){
            $password = md5($password_1);
            $sql = "INSERT INTO cayeyapps (username, password) VALUES ('$username', '$password')";
            mysqli_query($db, $sql);
            $_SESSION['username'] = $username;
            $_SESSION['success'] = "You are logged in";
            header('location: mainWindow.html');
        }
    }
?>