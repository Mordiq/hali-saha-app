<?php

require("sistem/baglan.php");

if ($_POST){ // Sayfada post olup olmadığını kontrol ediyoruz.


    // Sayfa yenilendikten sonra post edilen değerleri değişkenlere atıyoruz
    $kullanici_id=$_POST['kullanici_id'];
    $mesaj = $_POST['mesaj'];
    $takimid = $_POST['takimid'];
    $tip = $_POST['tip'];
    $kayit = $db -> prepare("INSERT INTO kullanici_bildirim SET kullanici_id=?, bildirim_mesaj=?, takim_id=?,tip=?");
    $kayit -> execute(array($kullanici_id,$mesaj,$takimid,$tip));

    if($kayit -> rowCount()){
        echo "Kayıt Başarılı";
    }else{
        echo "Kayıt olunamadı!";
    }
}




?>