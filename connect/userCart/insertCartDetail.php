<?php 
		require '../dbConnect.php';
		$obj = json_decode(file_get_contents("php://input"),true);
		$pId = $obj["productId"];
		$userId = $obj["userId"];
		$price = $obj["price"];

		$query = $mysqli->query("select * from cartdetail where productId =".$pId." and userId =".$userId);
		if ($query->num_rows == 0) {
			if(isset($obj["quantity"])){
				$quantity = $obj["quantity"];
				$query = "insert into cartdetail(userId,productId,productPriceTotal,quantity) values('$userId','$pId','$price',$quantity)";
			}else{
				$query = "insert into cartdetail(userId,productId,productPriceTotal,quantity) values('$userId','$pId','$price',1)";
			}
			
			if(!$mysqli->query($query)){
			printf("Errormessage: %s\n", $mysqli->error);
		}
		}else{
			if(isset($obj["quantity"])) {
				$quantity = $obj["quantity"];
				$query ="update cartdetail set productPriceTotal = productPriceTotal + ".$quantity * $price." , quantity = quantity + $quantity where userId =".$userId." and productId = ".$pId;
			}else
			$query ="update cartdetail set productPriceTotal = productPriceTotal +".$price." , quantity = quantity + 1 where userId =".$userId." and productId = ".$pId;
			echo $query;
			$mysqli->query($query) or die("Failed".mysql_error());
		}
        
 ?>