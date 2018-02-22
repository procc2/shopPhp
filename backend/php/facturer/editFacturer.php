<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$cId = $data->fId;
		$cName = $data -> fName;
		$logo = $data -> fLogo;
		$mysqli->query("update manufacturer set manufacturerName = '$fName',logo = '$' where manufacturerId = '$fId'");
 ?>