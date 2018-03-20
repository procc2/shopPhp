<?php 
	session_start();
	if (isset($_SESSION["userSessionId"])) {
		//check role (if role < 4 )
		if($_SESSION["userSessionId"]["Role"] <=4)
		echo "true";
		else echo "false";
	}else{
		echo "false";
	}
	
 ?>