<?php 
	require 'dbConnect.php';
	$qrCartDetail = "Select * from cartDetail,cart,product where 1 = 1 and cart.cartId = cartDetail.cartId and cartDetail.productId = product.productId";
	$cartDetail = $mysqli->query($qrCartDetail);
	while ($row_cartDetail = mysqli_fetch_array($cartDetail)) {
		$data[] = $row_cartDetail;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>