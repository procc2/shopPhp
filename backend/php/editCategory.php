<?php 
		require '../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$cId = $data->cId;
		$cName = $data -> cName;
		mysql_query("update category set CategoryName = '$cName' where CategoryId = '$cId'");
 ?>