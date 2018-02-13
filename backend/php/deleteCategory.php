<?php 
	require '../../connect/dbConnect.php';
	$id = $_GET['id'];
	$deleteQuery = "Delete from category where CategoryId ='$id'";
	mysql_query($deleteQuery) or die("Failed".mysql_error());
 ?>