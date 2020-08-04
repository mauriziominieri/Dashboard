<?php
$conn = mysqli_connect("37.183.243.250", "obiettivi", "10051987", "obiettivi_mese");

$date = $_POST['date'];
$eni = $_POST['eni'];
$heracomm = $_POST['heracomm'];
$iberdrola = $_POST['iberdrola'];
$sinergy = $_POST['sinergy'];
$wind = $_POST['wind'];


$result = mysqli_query($conn,"INSERT INTO obiettivi VALUES (CURDATE(),$eni,$heracomm,$iberdrola,$sinergy,$wind)");
?>
