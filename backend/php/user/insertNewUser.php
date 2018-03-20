<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$uEmail = $data -> uEmail;
		$uPass = $data -> uPass;
		
		if (isset($data->uPhone) && isset($data->uName)) {
		$uName = $data -> uName;
		$uPhone = $data -> uPhone;
		$uAddress = $data -> uAddress;
		$mysqli->query("insert into user(userEmail,userPassword,userName,phoneNumber,address,Role) values('".$uEmail."','".$uPass."','".$uName."','".$uPhone."','".$uAddress."',5)");
		}else{
			$Role = $data -> Role;
		$mysqli->query("insert into user(userEmail,userPassword,Role) values('".$uEmail."','".$uPass."','".$Role."')");
	}
 ?>