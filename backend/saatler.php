<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from saatler WHERE sahaadi=? and resim1=? ")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>