<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$fId = $data->fId;
		$fName = $data -> fName;
		$Logo = $data -> fLogo;
		if(!$mysqli->query("update manufacturer set manufacturerName = '$fName',logo = '$Logo' where manufacturerId = '$fId'")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
 ?>