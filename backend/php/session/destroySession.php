<?php 
	session_id('userSessionId');
	session_start();
	session_destroy();
	session_commit();
 ?>