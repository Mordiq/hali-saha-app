<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT id,sahaadi,resim1 FROM halisahalar")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>