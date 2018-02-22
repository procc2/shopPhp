<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$fId = $data->fId;
		$fName = $data -> fName;
		$fImagePath = $data -> fLogo;
		$mysqli->query("insert into manufacturer(manufacturerId,manufacturerName,logo) values('".$fId."','".$fName."','".$fImagePath."')");
 ?>s