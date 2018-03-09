<?php 
	require '../dbConnect.php';
	$id = $_GET["id"];
	$deleteQuery = "Delete from cartdetail where cartDetailId = ".$id;
	if(!$mysqli->query($deleteQuery)){
		printf("Error message %s \n", $mysqli->error);
	}
 ?>