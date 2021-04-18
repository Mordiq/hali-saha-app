<?php 

require("sistem/baglan.php");

if($_POST){
    //error_reporting(-1);
    $id=$_POST["id"];
    $takimadi = $_POST["takimadi"];
    $takimkontejyan = $_POST["kontejyan"];
    $oyuncular = $_POST["oyuncular"];
    $aciklama = $_POST["aciklama"];
    $kurucu = $_POST["kurucu"];
    
    $mesaj1 = $id." ".$takimadi." ".$takimkontejyan." ".$oyuncular." ".$aciklama." ".$kurucu;
    
    //echo json_encode($mesaj1);

    $guncelle = $db -> prepare("UPDATE takim SET takimadi=?, takimkontejyan=?, oyuncular=?, aciklama=?, kurucu=? WHERE id=?");
    $guncelle -> execute(array($takimadi,$takimkontejyan,$oyuncular,$aciklama,$kurucu,$id));

    if($guncelle-> rowCount()){
        $mesaj = "basarili";
        echo json_encode($mesaj);
    }else{
        $mesaj = "basarisiz";
        
        echo json_encode($mesaj);
    }

}
?>