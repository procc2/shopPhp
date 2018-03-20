<?php 
	require 'dbConnect.php';
	$qrComment = "Select * from productcomment,user where 1 = 1 and user.userId = productcomment.userId ";
	if (isset($_GET["productId"])) {
		$qrComment .= "and productcomment.productId = ".$_GET["productId"];
	}
	$comment = $mysqli->query($qrComment);
	while ($row_comment = mysqli_fetch_array($comment)) {
		$data[] = $row_comment;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysqli_close();
	echo json_encode($json);
 ?>