<?php 
		require '../../../connect/dbConnect.php';

		$obj = json_decode(file_get_contents("php://input"),true);
		$images = $obj["pImages"];
		$pId = $obj["pId"];
		$mysqli->query("delete from productimage where productId = ".$pId);
		foreach ($images as $key => $value){
        if(isset($value["imagePath"])){
        $imagePath  = "images/".$value["imagePath"];
        if(isset($value["color"])) $color = $value["color"];
        $mysqli->query("insert into productimage(productId,ImagePath,color) values('$pId','$imagePath','$color')") or die("Failed".$mysqli->error);
        $color = "";
    }
    };
 ?>