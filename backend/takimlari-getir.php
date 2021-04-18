<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from takim")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>