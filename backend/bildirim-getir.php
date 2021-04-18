<?php
require("sistem/baglan.php");
$kullaniciid = "2";

$list = $db-> query("SELECT * from kullanici_bildirim WHERE kullanici_id='$kullaniciid'")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);

?>