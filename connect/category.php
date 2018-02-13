<?php 
	require 'dbConnect.php';
	$qrCategory = "Select * from category";
	$category = mysql_query($qrCategory);
	while ($row_category = mysql_fetch_array($category)) {
		$data[] = $row_category;
	}
	$json = array('status' => 1 , 'data' => $data);
	@mysql_close();
	echo json_encode($json);
 ?>