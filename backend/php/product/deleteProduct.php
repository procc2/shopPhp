<?php 
	require '../../../connect/dbConnect.php';
	$id = $_GET['id'];
	$deleteQuery = "Delete from product where productId ='$id'";
	//$mysqli->query($deleteQuery) or die("Failed".mysql_error());
	if(!$mysqli->query($deleteQuery)){
			printf("Errormessage: %s\n", $mysqli->error);
		}
 ?>