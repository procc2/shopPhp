<?php 
		require '../dbConnect.php';
		$obj = json_decode(file_get_contents("php://input"),true);
		$cartDetailId = $obj["cartDetailId"];
		$quantity = $obj["quantity"];
		$price = $obj["price"];
		$query ="update cartDetail set productPriceTotal = ".$quantity." *".$price." , quantity = ".$quantity." where cartDetailId =".$cartDetailId;
		echo $query;
		if(!$mysqli->query($query)){
			printf("Errormessage: %s\n", $mysqli->error);
		}
        
 ?>