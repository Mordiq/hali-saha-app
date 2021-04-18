<?php

require("sistem/baglan.php");

if ($_POST){ // Sayfada post olup olmadığını kontrol ediyoruz.


    // Sayfa yenilendikten sonra post edilen değerleri değişkenlere atıyoruz
    $takimadi=$_POST['takimadi'];
    $kontejyan = $_POST['kontejyan'];
    $aciklama = $_POST['aciklama'];
    $oyuncular = "";
    $kurucu = $_POST["kurucu"];
    $kayit = $db -> prepare("INSERT INTO takim SET takimadi=?, takimkontejyan=?, oyuncular=?,aciklama=?,kurucu=?");
    $kayit -> execute(array($takimadi,$kontejyan,$oyuncular,$aciklama,$kurucu));

    if($kayit -> rowCount()){
        echo "Kayıt Başarılı";
    }else{
        echo "Kayıt olunamadı!";
    }
}




?>