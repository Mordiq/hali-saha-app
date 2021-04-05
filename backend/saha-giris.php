<?php 

require("sistem/baglan.php");

if($_POST){
    //echo "test";

    session_start();
    $username = $_POST["sahamail"];
    $password = $_POST["sahasifre"];
    $kullanicial = $db -> prepare("SELECT * FROM halisahalar WHERE sahaemail=? AND sifre=?");
    $kullanicial -> execute(array($username,$password));
    $kullanici_var_mi = $kullanicial->rowCount();
    if($kullanici_var_mi>0){
        
        $_SESSION["oturum"] = true;
        $_SESSION["saha"] = $username;
        $mesaj = true;
        echo json_encode($mesaj);

    }else{

       
       $mesaj = false;
       echo json_encode($mesaj);
       
    }

}


?>