<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$uEmail = $data -> uEmail;
		$uPass = $data -> uPass;
		$Role = $data -> Role;
		$mysqli->query("insert into user(userEmail,userPassword,Role) values('".$uEmail."','".$uPass."','".$Role."')");
 ?>