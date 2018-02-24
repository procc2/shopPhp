<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$pId = $data -> pId;
		$pName = $data -> pName;
		$pPrice = $data -> pPrice;
		$categoryId = $data -> categoryId;
		$pDescript = $data -> pDescript;
		$manufacturerId = $data -> facturerId;
		if(!$mysqli->query("update product set productName = '$pName' , productPrice = '$pPrice',CategoryId = '$categoryId',productDescript ='$pDescript',manufacturerId='$manufacturerId' where productId = '$pId'")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
		;
 ?>