<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$pName = $data -> pName;
		$pPrice = $data -> pPrice;
		$categoryId = $data -> categoryId;
		$pDescript = $data -> pDescript;
		$manufacturerId = $data -> facturerId;
		$currentUser = $data -> currentUser;
		if(!$mysqli->query("insert into product(productName,productPrice,productDescript,categoryId,manufacturerId,createdUser) values('".$pName."','".$pPrice."','".$pDescript."','".$categoryId."','".$manufacturerId."',$currentUser)")){
			printf("Errormessage: %s\n", $mysqli->error);
		}else{
			printf("%d", $mysqli->insert_id);
		}
 ?>