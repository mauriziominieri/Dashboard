<?php
//$conn = mysqli_connect("37.183.243.250", "obiettivi", "10051987", "obiettivi_mese");
//$conn = mysqli_connect("serverwebagency.ddns.net", "obiettivi", "10051987", "obiettivi_mese");
$conn = mysqli_connect("87.16.18.183", "obiettivi", "10051987", "obiettivi_mese");

$date = $_GET['date'];
$result = mysqli_query($conn,"SELECT eni, heracomm, iberdrola, sinergy, wind FROM obiettivi WHERE date = '$date'");

while($row = mysqli_fetch_array($result)){
    $eni = $row['eni'];
    $heracomm = $row['heracomm'];
    $iberdrola = $row['iberdrola'];
    $sinergy = $row['sinergy'];
    $wind = $row['wind'];

    $return_arr[] = array("eni" => $eni,
       "heracomm" => $heracomm,
       "iberdrola" => $iberdrola,
       "sinergy" => $sinergy,
       "wind" => $wind
    );
}

// Encoding array in JSON format
echo json_encode($return_arr);
?>