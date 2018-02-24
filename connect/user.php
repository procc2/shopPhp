<?php 
	require 'dbConnect.php';
	$qrUser = "Select * from user where 1 = 1 ";
	if(isset($_GET["userId"])){
	$categoryId = $_GET["userId"];
	//$qrProduct += "and ".$categoryId;
	}
	$user = $mysqli->query($qrUser);
	while ($row_user = mysqli_fetch_array($user)) {
		$data[] = $row_user;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>