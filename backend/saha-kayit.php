<?php

require("sistem/baglan.php");

if ($_POST){ // Sayfada post olup olmadığını kontrol ediyoruz.


    // Sayfa yenilendikten sonra post edilen değerleri değişkenlere atıyoruz
    $sahaadi=$_POST['sahaadi'];
    $email = $_POST['sahaemail'];
    $sifre = $_POST['sifre'];
    $sehir = $_POST['il'];
    $ilce = $_POST['ilce'];
    $resim1 = $_POST['resim1'];
    $resim2 = $_POST['resim2'];
    $aciklama = $_POST['aciklama'];
    $adres = $_POST['adres'];
    $ozellikler = $_POST["ozellikler"];
    if($sahaadi <> "" && $email <> ""){

        $kayitkontrol = $db -> prepare("SELECT * FROM halisahalar WHERE sahaemail=? ");
        $kayitkontrol -> execute(array($email));

        //$tarih = date('d-m-Y H:i:s');

        //echo "ilk ifin içinde";
        //Sorgu kontrolü
        if($kayitkontrol-> rowCount()){

            echo "Bu e-mail adresine kayıtlı kullanıcı var!";

        }else{
            //print_r($kontrol -> errorInfo());
            //echo "else bloguna girdi";
            $kayit = $db -> prepare("INSERT INTO halisahalar SET sahaadi=?, sahaemail=?,sifre=?, adres=?, sehir=?, ilce=?,aciklama=?,resim1=?,resim2=?,ozellikler=?");
            $kayit -> execute(array($sahaadi ,$email,$sifre,$adres, $sehir, $ilce,$aciklama,$resim1,$resim2,$ozellikler));

            if($kayit -> rowCount()){
                echo "Kayıt Başarılı";
            }else{
                echo "Kayıt olunamadı!";
            }

        }

    }
}




?>