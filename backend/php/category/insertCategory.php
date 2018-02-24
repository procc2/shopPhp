<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$cName = $data -> cName;
		if(!$mysqli->query("insert into category(categoryName) values('".$cName."')")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
 ?>