<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$fId = $data->fId;
		$fName = $data -> fName;
		$fImagePath = $data -> fLogo;
		$mysqli->query("insert into manufacturer(manufacturerName,logo) values('".$fName."','".$fImagePath."')");
 ?>s