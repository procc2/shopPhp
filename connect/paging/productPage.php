<?php 
	require '../dbConnect.php';
	$qrPageProduct = "SELECT COUNT(productId) as productNumber from product";
	$result = $mysqli->query($qrPageProduct);
	$data = mysqli_fetch_assoc($result);
	echo $data["productNumber"];

 ?>