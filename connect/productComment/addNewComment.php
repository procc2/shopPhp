<?php 
		require '../dbConnect.php';
		$data = json_decode(file_get_contents("php://input"));
		$pId = $data -> pId;
		$uId = $data -> uId;
		$comment = $data -> comment;
		$star = $data -> star ? $data -> star : "";
		if(!$mysqli->query("insert into productcomment(productId,userId,commentText,star) values('".$pId."','".$uId."','".$comment."','".$star."')")){
			printf("Errormessage: %s\n", $mysqli->error);
		}
 ?>