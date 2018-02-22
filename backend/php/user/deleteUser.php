<?php 
	require '../../../connect/dbConnect.php';
	$id = $_GET['id'];
	$deleteQuery = "Delete from user where userId ='$id'";
	echo $deleteQuery;
	$mysqli->query($deleteQuery) or die("Failed".mysql_error());
 ?>