<?php 
		require '../dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$billId = $data -> billId;
		$productId = $data -> productId;
		$price = $data -> price;
		$quantity = $data -> quantity;
		if(!$mysqli->query("insert into billdetail(billId,productId,price,quantity) values('".$billId."','".$productId."','".$price."','".$quantity."')")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
 ?>