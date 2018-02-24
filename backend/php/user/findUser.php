<?php 
	require '../../../connect/dbConnect.php';
	$qrUser = "Select * from user where 1 = 1 ";
	$checkingData = json_decode(file_get_contents("php://input"),true);
	if(!empty($checkingData["email"]) && !empty($checkingData["email"])){
	$email = $checkingData["email"];
	$pass = $checkingData["pass"];
	$qrUser .= "and userEmail = '$email' and userPassword = '$pass'";
	$user = $mysqli->query($qrUser);
	if(mysqli_num_rows($user) >0){
		session_start();
	// while ($row_user = mysqli_fetch_array($user)) {
	// 	$data[] = $row_user;
	// }
	$_SESSION["userSessionId"] = uniqid('us_');
	$json = array('status' => 1 , 'data' => $_SESSION["userSessionId"]);
	
	}else{
		$json = array('status' => 0 , 'msg' => 'No Record Found!');
	}
}else{
	$json = array('status' => 0 , 'msg' => 'No Record Found!');
}
	@mysqli_close();
	echo json_encode($json);
 ?>