<?php 
	require 'dbConnect.php';
	$qrProduct = "Select * from product where 1 = 1 ";
	if(isset($_GET["categoryId"])){
	$categoryId = $_GET["categoryId"];
	$qrProduct += "and ".$categoryId;
	}
	$product = mysql_query($qrProduct);
	while ($row_product = mysql_fetch_array($product)) {
		$data[] = $row_product;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysql_close();
	echo json_encode($json);
 ?>