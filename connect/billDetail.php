<?php 
	require 'dbConnect.php';
	$qrBillDetail = "Select * from billdetail,bill,product where 1 = 1 and bill.billId = billDetail.billId and product.productId = billDetail.productId ";
	if (isset($_GET["billId"])) {
		$qrBillDetail .= "and billdetail.billId =".$_GET["billId"];
	}
	$billDetail = $mysqli->query($qrBillDetail) or die("Error ".mysqli_error());
	while ($row_billDetail = mysqli_fetch_array($billDetail)) {
		$data[] = $row_billDetail;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>