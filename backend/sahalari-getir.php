<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from halisahalar")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>