<?php 
	require 'dbConnect.php';
	$qrFacturer = "Select * from manufacturer where 1 = 1 ";
	if (isset($_GET["facturerId"])) {
		# code...
		$qrFacturer .= "and manufacturerId =".$_GET["facturerId"];
	}
	if (isset($_GET["limit"])) {
		$qrFacturer .= " Limit ".$_GET["limit"];
	}
	$facturer = $mysqli->query($qrFacturer);
	while ($row_facturer = mysqli_fetch_array($facturer)) {
		$data[] = $row_facturer;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>