<?php
$servername = "localhost";
$username = "root";
$password = "";
$db="hali-saha-uygulamasi";

try{
    $db = new PDO("mysql:hos=localhost;dbname=hali-saha-uygulamasi;","root","");
    //echo "Bağlandı";
}catch( PDOexception $hata ){
    echo $hata -> getMessage();
}

?>