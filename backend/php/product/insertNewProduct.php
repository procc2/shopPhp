<?php 
		require '../../../connect/dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$pId = $data -> pId;
		$pName = $data -> pName;
		$pPrice = $data -> pPrice;
		$pImage .= $data -> pImage;
		$categoryId = $data -> categoryId;
		$pDescript = $data -> pDescript;
		$manufacturerId = $data -> facturerId;
		$mysqli->query("insert into product(productId,productName,productPrice,productDescript,categoryId,manufacturerId) values('".$pId."','".$pName."','".$pPrice."','".$pDescript."','".$categoryId."','".$manufacturerId."')");
 ?>