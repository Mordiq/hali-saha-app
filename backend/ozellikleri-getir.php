<?php 
require("sistem/baglan.php");
$list = $db-> query("SELECT * from ozellikler ")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);
?>