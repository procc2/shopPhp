<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$uId = $data->uId;
		$uEmail = $data -> uEmail;
		$uPass = $data -> uPass;
		$Role = $data -> Role;
		$mysqli->query("insert into user(userId,userEmail,userPassword,Role) values('".$uId."','".$uEmail."','".$uPass."','".$Role."')");
 ?>