<?php 
	$mysqli = new mysqli("mysql","root","","webApp");
	if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
	
 ?>