var admin = angular.module('admin', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl : 'statistics.html',
		controller : "AdminController"
	})
	.when('/category',{
		templateUrl : 'category.html',
		controller : "CategoryContrl"
	})
	.when('/product',{
		templateUrl : 'product.html',
		controller : "ProductContrl"
	})
	.when('/user',{
		templateUrl : 'user.html',
		controller : "UserContrl"
	})
	.when('/billAndCart',{
		templateUrl : 'tables.html',
		controller : 'BillAndCartContrl'
	})
	.when('/facturer',{
		templateUrl : 'facturer.html',
		controller : 'ManufacturerControl'
	})
})
.controller('AdminController', function($rootScope,$http,$scope){
	$rootScope.title = "Admin Page";
})
.controller('CategoryContrl', function($rootScope,$http,$scope,$route){
	$rootScope.title = "Category Edit Page";
	$http.get("../connect/category.php")
	.then(function(response){
		$scope.categories = response.data;
		console.log(response.data);
	});
	$scope.insertData = function(){
		$http.post('php/category/insertCategory.php', {
			'cId' : $scope.id,
			'cName' : $scope.cName
		}).then(function(response){
			console.log("Inserted");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.deleteData = function(deletingId){
		$http.get('php/category/deleteCategory.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
			$route.reload();
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
	$scope.showDataEdit = function(id,cName){
		$scope.id = id;
		$scope.cName = cName;
	};
	$scope.editData = function(){
		$http.post('php/category/editCategory.php', {
			'cId' : $scope.id,
			'cName' : $scope.cName
		}).then(function(response){
			$route.reload();
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
	$scope.getDeletingId = function(deletingId){
		$scope.deletingId = deletingId;
	}
})
.controller('ManufacturerControl', function($rootScope,$http,$scope,$route){
	$rootScope.title = "Manyfacturer Page";
	$http.get("../connect/facturer.php")
	.then(function(response){
		$scope.facturers = response.data;
		console.log(response.data);
	});
	$scope.insertData = function(){
		$http.post('php/facturer/insertNewFacturer.php', {
			'fId' : $scope.fId,
			'fName' : $scope.fName,
			'fLogo' : $scope.fLogo
		}).then(function(response){
			console.log("Inserted");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.deleteData = function(deletingId){
		$http.get('php/facturer/deleteFacturer.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.showDataEdit = function(fId,fName,fLogo){
		$scope.fId = fId;
		$scope.fName = fName;
		$scope.fLogo = fLogo;
	};
	$scope.editData = function(){
		$http.post('php/facture/editFacturer.php', {
			'fId' : $scope.fId,
			'fName' : $scope.fName,
			'fLogo' : $scope.fLogo
		}).then(function(response){
			$route.reload();
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
	$scope.getDeletingId = function(deletingId){
		$scope.deletingId = deletingId;
	}
})
.controller('ProductContrl', function($rootScope,$http,$scope,$route){
	$rootScope.title = "Product Page ";
	$http.get("../connect/product.php")
	.then(function(response){
		$scope.products = response.data;
	});
	$http.get("../connect/category.php")
	.then(function(response1){
		$scope.categories = response1.data;
	});
	$http.get("../connect/facturer.php")
	.then(function(response2){
		$scope.facturers = response2.data;
	});
	$scope.getProductImage = function(productId){
		$http.get("../connect/productImage.php?productId=" +productId)
		.then(function(response){
			$scope.productImages = response.data;
			angular.forEach(response.data.data, function(value, key){
				console.log(key  +":" + value[1]);
				$scope.imagePaths.push({
					'imagePath' : value[1].split('/')[1]
				});
			});
			console.log($scope.imagePaths);
		})
	}
	$scope.imagePaths = [{}];
  	$scope.addfield=function(){
    	$scope.imagePaths.push({})
  	}
  	$scope.removeField = function(){
  		$scope.imagePaths.splice(-1,1)
  	}
	$scope.insertData = function(){
		console.log($scope.imagePaths);
		$http.post('php/product/insertNewProduct.php', {
			'pId' : $scope.pId,
			'pName' : $scope.pName,
			'pPrice' : $scope.pPrice,
			'pImage' : $scope.pImage,
			'categoryId' : $scope.categoryId,
			'pDescript' : $scope.pDescript,
			'facturerId' : $scope.facturerId
		}).then(function(response){
			console.log("Inserted");
			console.log(response);
			$route.reload();
		},function(error){
			console.log(error);
		})
		$http.post('php/product/insertProductImage.php', {
			'pImages' : $scope.imagePaths,
			'pId' : $scope.pId
		}).then(function(response){
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
	$scope.deleteData = function(deletingId){
		$http.get('php/product/deleteProduct.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.showDataEdit = function(pId,pName,pPrice,categoryId,pDescript,pImage,facturerId){
		$scope.pId = pId;
		$scope.pName = pName;
		$scope.pPrice = pPrice;
		$scope.pImage = pImage.split('/')[1];
		$scope.categoryId = categoryId;
		$scope.pDescript = pDescript;
		$scope.facturerId = facturerId;
		//Remove all child rows for get instance image row
		$scope.imagePaths = [];
		//get row
		$scope.getProductImage(pId);
	};
	$scope.editData = function(){
		$http.post('php/product/editProduct.php', {
			'pId' : $scope.pId,
			'pName' : $scope.pName,
			'pPrice' : $scope.pPrice,
			'pImage' : $scope.pImage,
			'categoryId' : $scope.categoryId,
			'pDescript' : $scope.pDescript,
			'facturerId' : $scope.facturerId
		}).then(function(response){
			console.log(response);
			$route.reload();
		},function(error){
			console.log(error);
		})
		$http.post('php/product/insertProductImage.php', {
			'pImages' : $scope.imagePaths,
			'pId' : $scope.pId
		}).then(function(response){
			console.log(response);
		},function(error){
			console.log(error);
		})
	};
	$scope.getDeletingId = function(deletingId){
		$scope.deletingId = deletingId;
	}
})
.controller('UserContrl', function($rootScope,$http,$scope,$route){
	$rootScope.title = "User Page";
	$http.get("../connect/user.php")
	.then(function(response){
		$scope.users = response.data;
	});
	$scope.insertData = function(){
		$http.post('php/user/insertNewUser.php', {
			'uId' : $scope.uId,
			'uEmail' : $scope.uEmail,
			'Role' : $scope.role,
			'uPass' : $scope.uPass
		}).then(function(response){
			console.log("Inserted");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.deleteData = function(deletingId){
		$http.get('php/user/deleteUser.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
			console.log(response);
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.showDataEdit = function(uId,uEmail,role,uPass){
		
		$scope.uId = uId;
		$scope.uEmail = uEmail;
		$scope.role = role;
		$scope.uPass = uPass;
	};
	$scope.editData = function(){
		$http.post('php/user/editUser.php', {
			'uId' : $scope.uId,
			'uEmail' : $scope.uEmail,
			'Role' : $scope.role,
			'uPass' : $scope.uPass
		}).then(function(response){
			console.log("Edited");
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.getDeletingId = function(deletingId){
		$scope.deletingId = deletingId;
	}
})
.controller('BillAndCartContrl',function ($rootScope,$scope,$http) {
	$rootScope.title = "Bill and Cart";
	$http.get('../connect/bill.php')
	.then(function(response){
		$scope.bills = response.data;
	});
	$http.get('../connect/billDetail.php')
	.then(function(response1){
		$scope.billDetails = response1.data;
	});
	$http.get('../connect/cart.php')
	.then(function(response2){
		$scope.carts = response2.data;
	});
	$http.get('../connect/cartDetail.php')
	.then(function(response3){
		console.log(response3);
		$scope.cartDetails = response3.data
	});
})