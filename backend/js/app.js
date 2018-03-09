"use strict";

var admin = angular.module('admin', ["ngRoute","ngCookies"])
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
	.when('/login',{
		templateUrl : 'login.html',
		controller : 'LoginController'
	})
})
.controller('AdminController', function($rootScope,$http,$scope,loginService){
	$rootScope.title = "Admin Page";
	$rootScope.isLogin = false;
	$scope.logout = function () {
		loginService.logout();
	}
})
.controller('CategoryContrl', function($rootScope,$http,$scope,$route){
	$rootScope.title = "Category Edit Page";
	$http.get("../connect/category.php")
	.then(function(response){
		$scope.categories = response.data;
	});
	$scope.insertData = function(){
		$http.post('php/category/insertCategory.php', {
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
		$http.post('php/facturer/editFacturer.php', {
			'fId' : $scope.fId,
			'fName' : $scope.fName,
			'fLogo' : $scope.fLogo
		}).then(function(response){
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.getDeletingId = function(deletingId){
		$scope.deletingId = deletingId;
	}
})
.controller('ProductContrl', function($rootScope,$http,$scope,$route,$cookies){
	$rootScope.title = "Product Page ";
	$http.get("../connect/product.php?isBackEnd")
	.then(function(response){
		console.log(response);
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

				$scope.imagePaths.push({
					'imagePath' : value[1].split('/')[1],
					'color' : value[2],
				});
				
			});		
		})
	}
	$scope.colors = ["Red","Gray","Blue","Gold","Black","Pink"];
	$scope.imagePaths = [{}];
  	$scope.addfield=function(){
    	$scope.imagePaths.push({})
  	}
  	$scope.removeField = function(){
  		$scope.imagePaths.splice(-1,1)
  	}
	$scope.insertData = function(){
		$http.post('php/product/insertNewProduct.php', {
			'pName' : $scope.pName,
			'pPrice' : $scope.pPrice,
			'pImage' : $scope.pImage,
			'categoryId' : $scope.categoryId,
			'pDescript' : $scope.pDescript,
			'facturerId' : $scope.facturerId,
			'currentUser' : $cookies.get("currentUser")
		}).then(function(response){
			console.log("Inserted");
			console.log(response);
			$scope.insertProductImage(response.data,$scope.imagePaths);
			$route.reload();
		},function(error){
			console.log(error);
		})
		
	};
	$scope.insertProductImage = function(id,imagePaths){
		$http.post('php/product/insertProductImage.php', {
			'pImages' : imagePaths,
			'pId' : id
		}).then(function(response){
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	}
	$scope.deleteData = function(deletingId){
		console.log(deletingId);
		$http.get('php/product/deleteProduct.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
			console.log(response);
			$route.reload();
		},function(error){
			console.log(error);
		})
	};
	$scope.showDataEdit = function(product){
		$scope.pId = product.productId;
		$scope.pName = product.productName;
		$scope.pPrice = product.productPrice;
		$scope.categoryId = product.CategoryId;
		$scope.pDescript = product.productDescript;
		$scope.facturerId = product.manufacturerId;
		//Remove all child rows for get instance image row
		$scope.imagePaths = [];
		//get row
		$scope.getProductImage(product.productId);
	};
	$scope.editData = function(){
		$http.post('php/product/editProduct.php', {
			'pId' : $scope.pId,
			'pName' : $scope.pName,
			'pPrice' : $scope.pPrice,
			'categoryId' : $scope.categoryId,
			'pDescript' : $scope.pDescript,
			'facturerId' : $scope.facturerId
		}).then(function(response){
			console.log(response);
			$route.reload();
		},function(error){
			console.log(error);
		})
		console.log($scope.imagePaths);
		$http.post('php/product/insertProductImage.php', {
			'pImages' : $scope.imagePaths,
			'pId' : $scope.pId
		}).then(function(response){
			console.log(response.data);
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
		console.log(response);
		$scope.bills = response.data;
	});
	$http.get('../connect/billDetail.php')
	.then(function(response1){
		console.log(response1);
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
	$scope.getBillDetailById = function(billId){
		$http.get('../connect/billDetail.php?billId='+billId)
		.then(function(response){
			$scope.billDetails = response.data;
		})
	}
})
.controller('LoginController', function($rootScope,loginService,$scope){
	$rootScope.title = "Login";
	$rootScope.isLogin = true;
	$scope.login = function () {
		var user = {};
		user.email = $scope.email;
		user.pass = $scope.pass;
		loginService.login(user,$scope);
		$scope.email="";
		$scope.pass ="";
		$rootScope.currentUser = user.email;
	}
})
.factory('sessionService', function(){
	return{
		set:function(key,value){
			return sessionStorage.setItem(key,value)
		},
		get:function(key) {
			return sessionStorage.getItem(key)
		},
		destroy:function(key) {
			return sessionStorage.removeItem(key)
		}
	};
})
.factory('loginService',function($http,$location,sessionService,$route,$cookieStore){
	return{
		login : function(data,scope) {
			console.log(data);
			var $promise = $http.post('php/user/findUser.php',data)
			.then(function(response) {
				if(response.data.status == 1){
					var uSId = response.data.data;
					sessionService.set('user',JSON.stringify(uSId));
					$location.path('/');
					console.log(data.email);
					$cookieStore.put('currentUser',data.email);
				}else{
					console.log(response.data.msg);
				}
				
			})
		},
		logout : function(){
			sessionService.destroy('user');
			$http.post('php/session/destroySession.php');
			$location.path('/login');
			$cookieStore.remove('currentUser');
		},
		isLogged : function () {
			var $checkSessionServer = $http.post('php/session/checkSession.php');
			return $checkSessionServer;
		}
		
	};
})
.run(function($rootScope,$location,loginService){
	var routePermission = ['/']; // required login
	$rootScope.$on('$routeChangeStart', function(){
		console.log(routePermission.indexOf($location.path()));
		
			var connected = loginService.isLogged()
			.then(function(response){
				console.log(response.data);
				if(!response.data)
				$location.path('/login');
			})
			
		
	});

})