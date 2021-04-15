<?php 

require("sistem/baglan.php");

if($_POST){

    $id=$_POST["id"];
    $adsoyad = $_POST["adsoyad"];
    $email = $_POST["email"];
    $gruplar = $_POST["gruplar"];
    $sifre = $_POST["sifre"];
    $kullaniciadi = $_POST["kullaniciadi"];
    $profilfotografi = $_POST["profilfotografi"];

    $guncelle = $db -> prepare("UPDATE kullanici SET adisoyadi=?, email=?, gruplar=?, sifre=?, kullaniciadi=?, profilfotografi=? WHERE id=?");
    $guncelle -> execute(array($adsoyad,$email,$gruplar,$sifre,$kullaniciadi,$profilfotografi,$id));

    if($guncelle-> rowCount()){
        $mesaj = "başarılı";
        echo json_encode($mesaj);
    }else{
        $mesaj = "başarısız";
        echo json_encode($mesaj);
    }

}
?>