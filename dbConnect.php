<?php 
	$mysqli = new mysqli("sql203.byethost13.com","b13_21602780","vuonganh","b13_21602780_webApp");
	if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
	
 ?>