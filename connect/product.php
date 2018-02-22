<?php 
	require 'dbConnect.php';
	$qrProduct = "Select * from product ";
	if (isset($_GET["color"])) {
		# code...
		$qrProduct .= "join productimage on 1 = 1 "
					."and product.productId = productImage.productId "
					."and productimage.color =".$_GET["color"];
	}
	$qrProduct .= " where 1 = 1 ";
	if (isset($_GET["categoryId"])) {
		# code...
		$qrProduct .= "and product.CategoryId = ".$_GET["categoryId"]." ";
	}
	if (isset($_GET["productId"])) {
		# code...
		$qrProduct .= "and product.productId = ".$_GET["productId"]." ";
	}
	if (isset($_GET["facturerId"])) {
		# code...
		$qrProduct .= "and product.manufacturerId = ".$_GET["facturerId"]." ";
	}
	if (isset($_GET["min"])) {
		# code...
		$qrProduct .= "and product.productPrice >= ".$_GET["min"]." ";
	}
	if (isset($_GET["max"])) {
		# code...
		$qrProduct .= "and product.productPrice <= ".$_GET["max"]." ";
	}
	$qrProduct.= " order by product.productId";
	if (isset($_GET["limit"])) {
		$qrProduct .= " limit ".$_GET["limit"]; 
		
	}
	$product = $mysqli->query($qrProduct);
	while ($row_product = mysqli_fetch_array($product)) {
		$data[] = $row_product;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>