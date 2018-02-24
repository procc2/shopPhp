<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$cId = $data->cId;
		$cName = $data -> cName;
		if(!$mysqli->query("update category set CategoryName = '$cName' where CategoryId = '$cId'")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
		
 ?>