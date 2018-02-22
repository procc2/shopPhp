<?php 
	require 'dbConnect.php';
	$qrCategory = "Select * from category where 1 = 1 ";
	$category = $mysqli->query($qrCategory);
	while ($row_category = mysqli_fetch_array($category)) {
		$data[] = $row_category;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>