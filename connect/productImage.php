<?php 
	require 'dbConnect.php';
	$qrImage = "Select * from productimage where 1 = 1 ";
	if(isset($_GET['productId'])) {
		$qrImage .= "and productId = ".$_GET['productId'];
	}
	$image = $mysqli->query($qrImage);
	while ($row_image = mysqli_fetch_array($image)) {
		$data[] = $row_image;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>