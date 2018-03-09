<?php 
	require 'dbConnect.php';
	$qrBill = "Select * from bill left join user on bill.userId = user.userId "
			."where 1 = 1 ";
	if(isset($_GET["userId"])){
		$qrBill .= "and user.userId = ".$_GET["userId"];
	}
	$bill = $mysqli->query($qrBill);
	while ($row_bill = mysqli_fetch_array($bill)) {
		$data[] = $row_bill;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>