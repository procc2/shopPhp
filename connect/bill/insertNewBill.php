<?php 
		require '../dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		if (isset($data -> userId)) {
			$uId = $data -> userId;
		}else{
			$uId = "NULL";
		}
		$total = $data -> total;
		$name = $data -> userName;
		$phoneNumber = $data -> phoneNumber;
		$address = $data -> address;
		$payment = $data -> payment;
		if(!$mysqli->query("insert into bill(userId,userName,phoneNumber,total,payment,address) values($uId,'".$name."','".$phoneNumber."','".$total."','".$payment."','".$address."')")){
			printf("Errormessage: %s\n", $mysqli->error);
		}else{
			printf("%d", $mysqli->insert_id);
		}
 ?>