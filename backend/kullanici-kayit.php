<?php

require("sistem/baglan.php");

if ($_POST){ // Sayfada post olup olmadığını kontrol ediyoruz.


    // Sayfa yenilendikten sonra post edilen değerleri değişkenlere atıyoruz
    $adisoyadi=$_POST['adisoyadi'];
    $email = $_POST['email'];
    $sifre = $_POST['sifre'];
    $kullaniciadi = $_POST['kullaniciadi'];
    $gruplar = "[]";

    if($adisoyadi <> "" && $email <> ""){

        $kayitkontrol = $db -> prepare("SELECT * FROM kullanici WHERE email=? ");
        $kayitkontrol -> execute(array($email));

        $tarih = date('d-m-Y H:i:s');

        echo "ilk ifin içinde";
        //Sorgu kontrolü
        if($kayitkontrol-> rowCount()){

            echo "Bu e-mail adresine kayıtlı kullanıcı var!";

        }else{
            //print_r($kontrol -> errorInfo());
            echo "else bloguna girdi";
            $kayit = $db -> prepare("INSERT INTO kullanici SET adisoyadi=?, email=?,gruplar=?, sifre=?, kullaniciadi=?");
            $kayit -> execute(array($adisoyadi ,$email,$gruplar, $sifre, $kullaniciadi));

            if($kayit -> rowCount()){
                echo "Kayıt Başarılı";
            }else{
                echo "Kayıt olunamadı!";
            }

        }

    }
}




?>