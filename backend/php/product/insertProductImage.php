<?php 
		require '../../../connect/dbConnect.php';

		$obj = json_decode(file_get_contents("php://input"),true);
		$images = $obj["pImages"];
		$pId = $obj["pId"];
		$mysqli->query("delete from productImage where productId = ".$pId);
		foreach ($images as $key => $value){
        if(isset($value["imagePath"])){
        $imagePath  = "images/".$value["imagePath"];
        $mysqli->query("insert into productImage(productId,ImagePath) values('$pId','$imagePath')");
    }
    };
 ?>