"use strict";
var webApp = angular.module('webApp', ["ngRoute","angular-flexslider"])
.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loaded)
                {
                    if(loaded){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }])
.directive('flexCarousel', function ($timeout) {
    return {
        restrict: 'E',
        transclude : true,
        template : "<ng-transclude></ng-transclude>",
        scope : {
          options : "="
        },
        link: function (scope, element, attrs) {
           $timeout(function(){
           	
           	$('#flexisel').flexisel(scope.options);
           },300);
            
            
        }
    };
})
.factory('ProductService', function(){
	var categoryId;
	var setClickedCategory = function(data) {
		
		categoryId = data;
	}
	var getClickedCategory = function(){
		
		return categoryId;
	}
	return {
		setClickedCategory : setClickedCategory,
		getClickedCategory : getClickedCategory
	};
})
.factory('SingleService',function(){
	var productId;
	var transmitProductData = function(data){
		productId = data;
	}
	var getProductDetail = function(){
		return productId;
	}
	return {
		transmitProductData : transmitProductData,
		getProductDetail : getProductDetail
	};
})

.controller('MainController', function($rootScope,$http,ProductService,$scope,SingleService,loginService){
	$rootScope.title = "Homepage";
	// Click to product view 
	$http.get("connect/category.php")
    .then(function (response) {
    	$rootScope.categories = response.data;
    });
    // When redirect to product view 
	$scope.setClickedCategory = function(categoryId){
    	ProductService.setClickedCategory(categoryId);
	};
	$scope.getProductByCategoryId = function(categoryId){
		$http.get("connect/product.php?categoryId="+categoryId + "&limit=" + 3)
	    .then(function(productCategoryData){
	    	$scope.products = productCategoryData.data;
	    	angular.forEach(productCategoryData.data.data, function(value, key){
				$scope.getProductImage(value);
			});
	    },function(error){
			console.log(error);
		});
	};
	// Auto find mobile first
	$scope.getProductByCategoryId(3);
	$scope.getProductImage = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
	}
	// Get new product
	$scope.getNewProduct = function(){
		$http.get("connect/product.php?new")
		.then(function(newProducts){
			$scope.newProducts = newProducts.data;
			angular.forEach(newProducts.data.data, function(value, key){
				$scope.getProductImage(value);
				
			});
		},function(error){
			console.log(error);
		})
	};
	$scope.getNewProduct();
	//To Detail Product Page
	$rootScope.setClickedProduct = function(productId){
    	SingleService.transmitProductData(productId);
	};

	// set popup data
	$scope.getClickedModalProduct = function(product){
		$scope.clickedProduct = product;
		$scope.getProductImage(product);
	}
	//Login popup
	$rootScope.login = function () {
		var user = {};
		user.email = $scope.email;
		user.pass = $scope.pass;
		loginService.login(user,$scope).then(function(response){
			$rootScope.currentUser = response;
			$rootScope.getCartDetail(response.userId);
		});
		$scope.email="";
		$scope.pass ="";
		
	}
	//Get detail current Cart
	$rootScope.getCartDetail = function(id){
		$http.get('connect/cartDetail.php?cartId=' + id)
		.then(function(response){
			console.log(response);
			$rootScope.cartDetails = response.data;
			if($rootScope.cartDetails.data)
			$rootScope.total = $scope.getTotal();
			else delete $rootScope.total;
		})
	}
	// get current User in current Session
	$rootScope.getSessionUser = function () {
		console.log(loginService.getCurrenSession());
		if(loginService.getCurrenSession()){
		$rootScope.currentUser = loginService.getCurrenSession();
		console.log($rootScope.currentUser);
		$rootScope.getCartDetail($rootScope.currentUser.userId)
	}
	}
	
	$rootScope.getSessionUser();
	//log out
	$rootScope.logout = function () {
		loginService.logout();
		delete $rootScope.currentUser;
		delete $scope.currentUser;
		delete $rootScope.cartDetails;
		delete $rootScope.total;
	}
	//add item to cart with session
	$scope.addItemToCart = function(userId,productId,price){
		$http.post('connect/userCart/insertCartDetail.php',{
			'userId' : userId,
			'productId' : productId,
			'price' : price,
		}).then(function(response){
			console.log(response);
			$scope.getCartDetail($rootScope.currentUser.userId);
		})

	}
	$scope.removeItemOfCart = function(id){
		$http.get('connect/userCart/removeCartDetail.php?id=' + id)
		.then(function(response){
			$scope.getCartDetail($rootScope.currentUser.userId);
		})
	}
	$scope.updateQuantityItem = function(detailId,price,quantity){
		console.log(detailId);
		$http.post('connect/userCart/updateCartDetail.php',{
			'quantity' : quantity,
			'price' : price,
			'cartDetailId' : detailId
		}).then(function(response){
			console.log(response);
			$scope.getCartDetail($rootScope.currentUser.userId);
		})
	}
	$scope.getTotal = function(){
		var total = 0 ; 
		for(var i =0 ;i< $scope.cartDetails.data.length ;i++){
			total += parseInt($scope.cartDetails.data[i].productPriceTotal);

		}
		return total;
	}

})

.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl : 'trend.html',
		controller : 'MainController'
	})
	.when('/product',{
		templateUrl : 'products1.html',
		controller : 'ProductCtrl',
	})
	.when('/single',{
		templateUrl : 'single.html',
		controller : 'SingleCtrl'
	})
	.when('/mail',{
		templateUrl : 'mail.html',
		controller  : 'MailController'
	})
	.when('/checkout',{
		templateUrl : 'checkout.html',
		controller : 'CheckOutController'
	})
})
.controller('ProductCtrl', function($rootScope,$http,$scope,$route,ProductService,SingleService,loginService){
	$rootScope.title = "Product";
	$http.get("connect/category.php")
    .then(function (response) {
    	console.log(response);
    	$rootScope.categories = response.data;
    	
    	
    });
    $http.get("connect/facturer.php")
    .then(function (response) {
    	$rootScope.facturers = response.data;
    	
    	
    });
    $http.get("connect/product.php")
    .then(function(response){
    	console.log(response);
    	$scope.products = response.data;
    	// another view call 
    	if(ProductService.getClickedCategory()){
    		$scope.getProductByCategoryId(ProductService.getClickedCategory());
    	}
    	else{
    	angular.forEach(response.data.data, function(value, key){
				$scope.getProductImage(value);
		});
    	}
    });
    $scope.getProductByCategoryId = function(categoryId){
		$http.get("connect/product.php?categoryId="+categoryId)
	    .then(function(productCategoryData){
	    	$scope.products = productCategoryData.data;
	    	console.log(productCategoryData);
	    	angular.forEach(productCategoryData.data.data, function(value, key){
				$scope.getProductImage(value);
			});
	    },function(error){
			console.log(error);
		});
	};
	$rootScope.setClickedCategory = function(categoryId){
    	$scope.getProductByCategoryId(categoryId);
	};
	$rootScope.getProductByFacturerId= function(facturerId){
		$http.get("connect/product.php?facturerId="+facturerId)
	    .then(function(productFacturerId){
	    	$scope.products = productFacturerId.data;
	    	angular.forEach(productFacturerId.data.data, function(value, key){
				$scope.getProductImage(value);
			});
	    },function(error){
			console.log(error);
		});
	};
	$scope.getProductLowerThan = function(price){
		$http.get("connect/product.php?max=" + price)
		.then(function(productLower){
			$scope.products = productLower.data;
			angular.forEach(productLower.data.data, function(value, key){
				$scope.getProductImage(value);
			});
		},function(error){
			console.log(error);
		})
	}
	$scope.getProductPriceBetween = function(min,max){
		$http.get("connect/product.php?min="+min+"&max=" +max)
		.then(function(productPriceBetween){
			$scope.products = productPriceBetween.data;
			angular.forEach(productPriceBetween.data.data, function(value, key){
				$scope.getProductImage(value);
			});
		},function(error){
			console.log(error);
		})
	}
	$scope.getProductHigherThan = function(price){
		$http.get("connect/product.php?min=" + price)
		.then(function(productHigher){
			$scope.products = productHigher.data;
			angular.forEach(productHigher.data.data, function(value, key){
				$scope.getProductImage(value);
			});
		},function(error){
			console.log(error);
		})
	}
	$scope.getProductByColor = function(color){
		$http.get("connect/product.php?color=" + color)
		.then(function(productHasColor){
			console.log(productHasColor);
			$scope.products = productHasColor.data;
			angular.forEach(productHasColor.data.data, function(value, key){
				$scope.getProductImage(value);
				console.log(value);
			});
		},function(error){
			console.log(error);
		})
	}
	$scope.getClickedModalProduct = function(product){
		$scope.clickedProduct = product;
		$scope.getProductImage(product);
		console.log(product.images);
		
	}
	$scope.getProductImage = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
	}
	$rootScope.setClickedProduct = function(productId){
    	SingleService.transmitProductData(productId);
	};
	$scope.getRandomProduct = function(){
		$http.get("connect/product.php?random")
		.then(function(randomProducts){
			console.log(randomProducts);
			$scope.recommendProducts = randomProducts.data;
			angular.forEach(randomProducts.data.data, function(value, key){
				$scope.getProductImage(value);
				console.log(value);
			});
		},function(error){
			console.log(error);
		})
	};
	$scope.getRandomProduct();


})
.controller('SingleCtrl', function($rootScope,$http,$scope,SingleService){
	$rootScope.title = "SinglePage";
	$scope.getProductById = function(id){
    	$http.get("connect/product.php?productId="+id)
	    .then(function(product){
	    	
	    	$scope.product = product.data.data[0];
	    	$rootScope.title = product.data.data[0]["productName"];
			$scope.getProductImage(product.data.data[0]);
			console.log($scope.product);
	    },function(error){
			console.log(error);
		});
		
    }
    if(SingleService.getProductDetail()){
	$scope.getProductById(SingleService.getProductDetail());
	}	
	$scope.slides = [];
    $scope.getProductImage = function(product){
		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;	
			angular.forEach(response.data.data, function(value, key){
				console.log(key  +":" + value[1]);
				$scope.slides.push(value[1]);
			});
			console.log($scope.slides);	
		});
		
	}
})
.controller('CheckOutController', function($rootScope,$http,$scope){
	$rootScope.title = "Check Out";
	$scope.insertNewBill = function(userId,total){
		$http.post('connect/bill/insertNewBill.php', {
			'userId' : userId,
			'total' : total
		}).then(function(response){
			var insertedId = response.data;
			angular.forEach($rootScope.cartDetails.data, function(detail, key){
				$scope.insertBillDetail(insertedId,detail.productId,detail.productPrice,detail.quantity,detail.cartDetailId);
			});
		})
	}
	$scope.insertBillDetail = function(billId,productId,price,quantity,detailId){
		$http.post('connect/bill/insertBillDetail.php',{
			'billId' : billId,
			'productId' : productId,
			'price' : price,
			'quantity' : quantity
		}).then(function(response){
			//delete item after add to bill 
			$scope.removeItemOfCart(detailId);
		})
	}
})
.controller('MailController', function($rootScope){
	$rootScope.title = "Mail";
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
.factory('loginService',function($http,$location,sessionService,$route){
	return{
		login : function(data,$rootScope) {
			console.log(data);
			var $promise = $http.post('connect/session/userSession.php',data)
			.then(function(response) {
				console.log(response);
				if(response.data.status == 1){
					var user = response.data.data;
					sessionService.set('user',JSON.stringify(user));
					//$rootScope.currentUser = user;
					return user;
				}else{
					console.log(response.data.msg);
				}
				
			});
			return $promise;
		},
		logout : function(){
			sessionService.destroy('user');
			$http.post('backend/php/session/destroySession.php');
			
		},
		isLogged : function () {
			var $checkSessionServer = $http.post('php/session/checkSession.php');
			return $checkSessionServer;
		},
		getCurrenSession : function () {
			return JSON.parse(sessionService.get("user"));
		}
	};
})
