<?php 
		require '../dbConnect.php';
		$obj = json_decode(file_get_contents("php://input"),true);
		$pId = $obj["productId"];
		$userId = $obj["userId"];
		$price = $obj["price"];
		$query = $mysqli->query("select * from cartDetail where productId =".$pId." and userId =".$userId);
		if ($query->num_rows == 0) {
			$query = "insert into cartDetail(userId,productId,productPriceTotal,quantity) values('$userId','$pId','$price',1)";
			echo $query;
			
			if(!$mysqli->query($query)){
			printf("Errormessage: %s\n", $mysqli->error);
		}
		}else{

			$query ="update cartDetail set productPriceTotal = productPriceTotal +".$price." , quantity = quantity + 1 where userId =".$userId." and productId = ".$pId;
			echo $query;
			$mysqli->query($query);
		}
        
 ?>