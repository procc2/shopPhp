<?php 
	session_start();
	if (isset($_SESSION["userSessionId"])) {
		if($_SESSION["userSessionId"][3] <=4)
		print("true");
	}else{

	}
 ?>