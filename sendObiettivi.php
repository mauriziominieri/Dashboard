<?php
//$conn = mysqli_connect("37.183.243.250", "obiettivi", "10051987", "obiettivi_mese");
$conn = mysqli_connect("serverwebagency.ddns.net", "obiettivi", "10051987", "obiettivi_mese");

$ufficio = $_POST['ufficio'];
$date = $_POST['date'];
$eni = $_POST['eni'];
$heracomm = $_POST['heracomm'];
$iberdrola = $_POST['iberdrola'];
$sinergy = $_POST['sinergy'];
$wind = $_POST['wind'];

//echo "dati nel send php: $ufficio,$date,$eni,$heracomm,...";
//$result = mysqli_query($conn,"INSERT INTO obiettivi VALUES ('$ufficio','$date',$eni,$heracomm,$iberdrola,$sinergy,$wind)");

//date e ufficio sono due primary key, quindi questa query mi permette di modificare solo i brand se trova un altra riga con ufficio e data doppioni
$result = mysqli_query($conn,"INSERT INTO obiettivi (eni, wind, ufficio,date,heracomm,sinergy,iberdrola) 
VALUES ($eni, $wind, '$ufficio','$date',$heracomm,$sinergy,$iberdrola)
ON DUPLICATE KEY UPDATE eni=VALUES(eni),wind=VALUES(wind),heracomm=VALUES(heracomm),sinergy=VALUES(sinergy),iberdrola=VALUES(iberdrola);");


/*
CREATE TABLE obiettivi (
  eni int,
  heracomm int,
  iberdrola int,
  sinergy int,
  wind int,
  ufficio varchar(50),
  date varchar(50),
  PRIMARY KEY (ufficio,date)
);
*/
?>