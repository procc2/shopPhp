<?php 
	require 'dbConnect.php';
	$qrUser = "Select * from user where 1 = 1 ";
	if(isset($_GET["userEmail"])){
		$qrUser .= "and userEmail = '".$_GET["userEmail"]."'";
	}
	$user = $mysqli->query($qrUser);
	if(mysqli_num_rows($user) > 0){
	while ($row_user = mysqli_fetch_array($user)) {
		$data[] = $row_user;
	}
	$json = array('status' => 1 , 'data' => $data);
	}else{
	$json = array('status' => 0 , 'msg' => 'No Record Found!');
	}
	@mysqli_close();
	echo json_encode($json);
 ?>