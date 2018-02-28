<?php 
	require 'dbConnect.php';
	$qrCartDetail = "Select * from cartDetail,product,user where 1 = 1 and cartDetail.productId = product.productId  and cartDetail.userId = user.userId " ;
	if (isset($_GET["cartId"])) {
		$qrCartDetail .= "and user.userId =".$_GET["cartId"];
	}
	$cartDetail = $mysqli->query($qrCartDetail);
	while ($row_cartDetail = mysqli_fetch_array($cartDetail)) {
		$data[] = $row_cartDetail;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>