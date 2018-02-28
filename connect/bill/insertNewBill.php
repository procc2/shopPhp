<?php 
		require '../dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$uId = $data -> userId;
		$total = $data -> total;
		$mysqli->query("delete from bill where total = ".$total);
		if(!$mysqli->query("insert into bill(userId,total) values('".$uId."','".$total."')")){
			printf("Errormessage: %s\n", $mysqli->error);
		}else{
			printf("%d", $mysqli->insert_id);
		}
 ?>