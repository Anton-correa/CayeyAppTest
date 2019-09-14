<?php

$username = filter_input(INPUT_POST, 'UserN');
$password = filter_input(INPUT_POST, 'PassW');

        $host = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "cayeyapps";

        $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

        if(mysqli_connect_error()){
            die('Connect Error ('. mysqli_connect_errno() .') '. mysqli_connect_error());

        }

if(isset($_POST['UserN'])){
    $uname=$_POST['UserN'];
    $passW=$_POST['PassW'];

    $sql="select * from userapp where username ='".$uname."' AND password='".$passW."' limit 1";

    $results=mysql_query($sql);
    if(mysql_num_rows($results)==1){
        echo "You are logged in";
        header("location: mainWindow.html");
        exit();
    }else{
        echo "You have entered an incorrect password or username";
        
    }
}

?>