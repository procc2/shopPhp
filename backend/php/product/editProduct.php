<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$pId = $data -> pId;
		$pName = $data -> pName;
		$pPrice = $data -> pPrice;
		$pImage = "images/";
		$pImage .= $data -> pImage;
		$categoryId = $data -> categoryId;
		$pDescript = $data -> pDescript;
		$manufacturerId = $data -> facturerId;
		print($data->pImage);
		$mysqli->query("update product set productName = '$pName' , productPrice = '$pPrice',productImage = '$pImage' ,CategoryId = '$categoryId',productDescript ='$pDescript',manufacturerId='$manufacturerId' where productId = '$pId'");
 ?>