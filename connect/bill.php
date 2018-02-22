<?php 
	require 'dbConnect.php';
	$qrBill = "Select * from bill,user where 1 = 1 and bill.userId = user.userId";
	$bill = $mysqli->query($qrBill);
	while ($row_bill = mysqli_fetch_array($bill)) {
		$data[] = $row_bill;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>