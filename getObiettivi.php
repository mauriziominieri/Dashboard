<?php
//$conn = mysqli_connect("37.183.243.250", "obiettivi", "10051987", "obiettivi_mese");
//$conn = mysqli_connect("serverwebagency.ddns.net", "obiettivi", "10051987", "obiettivi_mese");
$conn = mysqli_connect("87.16.18.183", "obiettivi", "10051987", "obiettivi_mese");

$ufficio = $_GET['ufficio'];
$date = $_GET['date'];
$result = mysqli_query($conn,"SELECT eni, heracomm, iberdrola, sinergy, wind FROM obiettivi WHERE ufficio = '$ufficio' AND date = '$date'");

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








/*$data = array();
while($row= mysqli_fetch_assoc($result)){
	$data[] = $row;
}

echo json_encode($data);*/

/*
echo "<table>";
echo "<tr>";
echo "<th>CustomerID</th>";
echo "<td>" . $eni . "</td>";
echo "<th>CompanyName</th>";
echo "<td>" . $heracomm . "</td>";
echo "<th>ContactName</th>";
echo "<td>" . $iberdrola . "</td>";
echo "<th>Address</th>";
echo "<td>" . $sinergy . "</td>";
echo "<th>City</th>";
echo "<td>" . $wind . "</td>";
echo "</tr>";
echo "</table>";*/
?>
