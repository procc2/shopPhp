<?php 
	require '../../../connect/dbConnect.php';
	$id = $_GET['id'];
	$deleteQuery = "Delete from manufacturer where manufacturerId ='$id'";
	$mysqli->query($deleteQuery) or die("Failed".mysql_error());
 ?>