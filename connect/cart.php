<?php 
	require 'dbConnect.php';
	$qrCart = "Select * from cart,user where 1 = 1 and cart.userId = user.userId";
	$cart = $mysqli->query($qrCart);
	while ($row_cart = mysqli_fetch_array($cart)) {
		$data[] = $row_cart;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>