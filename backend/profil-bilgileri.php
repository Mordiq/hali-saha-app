<?php 
require("sistem/baglan.php");



if($_POST){
    $authmail = $_POST["email"];
    $list = $db-> query("SELECT * from kullanici WHERE email='$authmail'")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($list);
}




?>