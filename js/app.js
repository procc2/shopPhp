"use strict";
var webApp = angular.module('webApp', ["ngRoute","angular-flexslider","ui.bootstrap"])
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
	var searchText;
	var sendSearchText = function(data) {
		searchText = data;
	}
	var getSearchText = function(){
		return searchText;
	}
	return {
		setClickedCategory : setClickedCategory,
		getClickedCategory : getClickedCategory,
		sendSearchText 	   : sendSearchText,
		getSearchText      : getSearchText
	};
})
// .factory('SingleService',function(){
// 	var productId;
// 	var transmitProductData = function(data){
// 		productId = data;
// 	}
// 	var getProductDetail = function(){
// 		return productId;
// 	}
// 	return {
// 		transmitProductData : transmitProductData,
// 		getProductDetail : getProductDetail
// 	};
// })
.factory('CartService', function(){
	var cart = [];
	function init(){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'));

		}
	}
	init();
	function getAll(){
		return cart;
	}
	function addItem(product){
		debugger;
		var check  = true;
		angular.forEach(cart, function(value, key){
			if (value.productName == product.productName) {
				value.quantity +=1;
				value.productPriceTotal = value.quantity * value.productPrice;
				check = false;
			}
		});
		if (check) {
			product.quantity = 1;
			product.productPriceTotal = product.quantity * product.productPrice;
			cart.push(product);
		}
		localStorage.setItem('cart',JSON.stringify(cart));
	}
	function addItemHasQuantity(product){
		debugger;
		var check  = true;
		angular.forEach(cart, function(value, key){
			if (value.productName == product.productName) {
				value.quantity += product.quantityNumber;
				value.productPriceTotal = value.quantity * value.productPrice;
				check = false;
			}
		});
		if (check) {
			product.quantity = product.quantityNumber;
			product.productPriceTotal = product.quantity * product.productPrice;
			cart.push(product);
		}
		localStorage.setItem('cart',JSON.stringify(cart));
	}
	function updateQuantityItem(productId,quantity){
		angular.forEach(cart, function(value, key){
			if (value.productId == productId) {
				value.quantity = quantity;
				value.productPriceTotal = value.quantity * value.productPrice;
			}
		});
		localStorage.setItem('cart',JSON.stringify(cart));
	}
	function removeItem(productId){
		angular.forEach(cart, function(value, key){
			if (value.productId == productId) {
				cart.splice(key,1);
			}
		});
		localStorage.setItem('cart',JSON.stringify(cart));
	}
	function deleteAllItem(){
		cart = [];
		localStorage.clear();
	}
	return{
		getAll : getAll,
		addItem : addItem,
		deleteAllItem : deleteAllItem,
		removeItem : removeItem,
		updateQuantityItem : updateQuantityItem,
		addItemHasQuantity : addItemHasQuantity
	};
})
.controller('MainController', function($rootScope,$http,ProductService,$scope,loginService,CartService,$window){
	$rootScope.title = "Homepage";
	// Click to product view 
	$http.get("connect/category.php")
    .then(function (response) {
    	$rootScope.categories = response.data;
    });
    $http.get("connect/facturer.php?limit=4")
    .then(function (response) {
    	$rootScope.topbrands = response.data;
    });
    $scope.getAllProduct = function(){
    	$http.get("connect/product.php")
    	.then(function(response){
    	$scope.allProducts = response.data;
    });
    }
    $scope.getAllProduct();
    // Search function
    $scope.sendSearchText = function(text){
    	ProductService.sendSearchText(text);
    }
    // When redirect to product view 
	$scope.setClickedCategory = function(categoryId){
    	ProductService.setClickedCategory(categoryId);
	};
	$scope.getProductByCategoryIdLimit = function(categoryId){
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
	$scope.getProductByCategoryIdLimit(3);
	$scope.getProductImage = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
	}
	// Get new product
	$scope.getNewProduct = function(){
		$http.get("connect/product.php?new&limit=4")
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

	// set popup data
	$scope.getClickedModalProduct = function(product){
		$scope.clickedProduct = product;
		$scope.getProductImage(product);
	}
	//Register popup
	$rootScope.register = function(){
		$rootScope.registerClicked = true;
		if($scope.pw != $scope.confirmPass){
			$rootScope.wrongConfirm = true;
		}else $rootScope.wrongConfirm =false;
		if($scope.registration.$valid && $scope.wrongConfirm ==false && $scope.duplicateMail == false){
			$http.post('backend/php/user/insertNewUser.php', {
			'uName' : $scope.name,
			'uEmail' : $scope.email,
			'uPhone' : $scope.phone,
			'uAddress' : $scope.address,
			'uPass' : $scope.pw
		}).then(function(response){
			$rootScope.login($scope.email,$scope.pw);
		})
		}
	}
	//check existed User 
	$scope.checkExistedUser = function(email){
		$http.get('connect/user.php?userEmail='+email)
		.then(function(response){
			if(response.data.status == 1){
				$scope.duplicateMail = true;
			}else{
				$scope.duplicateMail = false;
			}
		})
	}
	$scope.scrollTop = function(){
		$window.scrollTo(0, 900);
	}
	//Login popup
	$rootScope.login = function (email,pass) {
		var user = {};
		user.email = email;
		user.pass = pass;
		loginService.login(user,$scope).then(function(response){
			if(response){
			$rootScope.currentUser = response;
			$rootScope.getCartDetail(response.userId);
			$('#myModal88').modal('hide');
			$('#loginSuccessModal').modal("show");
			$rootScope.wrongData = false;
			}else{
				$rootScope.wrongData = true
			}
		});
		$scope.email="";
		$scope.pass ="";
		//Delete all session cart data
		CartService.deleteAllItem();
	}
	//Get total of cart
	$scope.getTotal = function(){
		var total = 0 ; 
		for(var i =0 ;i< $scope.cartDetails.data.length ;i++){
			total += parseInt($scope.cartDetails.data[i].productPriceTotal);

		}
		return total;
	}

	//Get detail current Cart
	$rootScope.getCartDetail = function(id){
		$http.get('connect/cartDetail.php?cartId=' + id)
		.then(function(response){
			$rootScope.cartDetails = response.data;
			angular.forEach(response.data.data, function(value, key){
				$scope.getProductImage(value);
				
			});
			if($rootScope.cartDetails.data)
			$rootScope.total = $scope.getTotal();
			else delete $rootScope.total;
		})
	}
	// get current User in current Session
	$rootScope.getSessionUser = function () {
		if(loginService.getCurrenSession()){
		$rootScope.currentUser = loginService.getCurrenSession();
		$rootScope.getCartDetail($rootScope.currentUser.userId)
	}else{
		$rootScope.cartDetails = {};
		$rootScope.cartDetails.data=CartService.getAll();
		$rootScope.total = $scope.getTotal();
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
		//Return to session cart if not login
		$rootScope.getSessionUser();
	}
	//add item to cart with session
	$scope.addItemToCart = function(userId,product){
		if ($rootScope.currentUser) {
		$http.post('connect/userCart/insertCartDetail.php',{
			'userId' : userId,
			'productId' : product.productId,
			'price' : product.productPrice,
			'quantity' : product.quantityNumber
		}).then(function(response){
			if($rootScope.currentUser)
			$scope.getCartDetail($rootScope.currentUser.userId);
		});
	}else{
		if(product.quantityNumber){
			CartService.addItemHasQuantity(product);
		}else
		CartService.addItem(product);
		$rootScope.total = $scope.getTotal();
		}
		if (!$rootScope.showCart)
			$scope.showHideCart();
	}
	$scope.removeItemOfCart = function(id,productId){
		if($rootScope.currentUser){
		$http.get('connect/userCart/removeCartDetail.php?id=' + id)
		.then(function(response){
			$scope.getCartDetail($rootScope.currentUser.userId);
		})
		}else{
			CartService.removeItem(productId);
			$rootScope.total = $scope.getTotal();

		}
	}
	$scope.updateQuantityItem = function(detailId,price,quantity,productId){
		if($rootScope.currentUser){
		$http.post('connect/userCart/updateCartDetail.php',{
			'quantity' : quantity,
			'price' : price,
			'cartDetailId' : detailId
		}).then(function(response){
			$scope.getCartDetail($rootScope.currentUser.userId);
		})
		}else{
			CartService.updateQuantityItem(productId,quantity);
		}
	}
	$scope.getTotal = function(){
		var total = 0 ; 
		for(var i =0 ;i< $scope.cartDetails.data.length ;i++){
			total += parseInt($scope.cartDetails.data[i].productPriceTotal);

		}
		return total;
	}
	$scope.showHideCart = function(){
		$rootScope.showCart = !$rootScope.showCart;
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
	.when('/single/:productId',{
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
	.when('/faq',{
		templateUrl : 'faq.html',
		controller : 'FAQCtrl'
	})
	.when('/404',{
		templateUrl : '404.html',
		
	})
	.otherwise({
		redirectTo : '/404',
	})
})
.controller('FAQCtrl', function($rootScope){
	$rootScope.title = "FAQ";
})
.controller('ProductCtrl', function($rootScope,$http,$scope,$route,ProductService,loginService,$window){
	$rootScope.title = "Product";
	$http.get("connect/category.php")
    .then(function (response) {
    	$rootScope.categories = response.data;
    });
    $http.get("connect/facturer.php")
    .then(function (response) {
    	$rootScope.facturers = response.data;
    });
    $http.get("connect/product.php")
    .then(function(response){
    	$scope.products = response.data;
    	$scope.productNumber = response.data.quantity;
    	setPagingData($scope.currentPage);
    	// another view call 
    	if(ProductService.getClickedCategory()){
    		$scope.getProductByCategoryId(ProductService.getClickedCategory());
    	}
    	else if(ProductService.getSearchText()){
    		$scope.getProductByName(ProductService.getSearchText());
    	}
    	else{
    	angular.forEach(response.data.data, function(value, key){
				$scope.getProductImage(value);
		});
    	}
    });
    $scope.currentPage = 1;
    function setPagingData(page) {
    $scope.currentPage = page;
    	if($scope.products.status == 1){
    		var pagedData = $scope.products.data.slice((page - 1) * 9, page * 9);
    		$scope.productsLimit = pagedData;
		}else{
			delete $scope.productsLimit 
		}
  	}
  	$scope.$watch('currentPage', function() {
  	
    setPagingData($scope.currentPage);
  	});
   	$rootScope.getProductByName = function(name){
   		$http.get("connect/product.php?productName="+name)
    	.then(function(response){
    	$scope.products = response.data;
    	$scope.productNumber = response.data.quantity;
    	setPagingData($scope.currentPage);
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
   	}
    $rootScope.getProductByCategoryId = function(categoryId){
		$http.get("connect/product.php?categoryId="+categoryId)
	    .then(function(productCategoryData){
	    	$scope.currentPage = 1;
	    	$scope.currentSorting = $scope.sortings[0];
	    	$scope.productNumber = productCategoryData.data.quantity;
	    	$scope.products = productCategoryData.data;
	    	setPagingData($scope.currentPage);
	    	angular.forEach(productCategoryData.data.data, function(value, key){
				$scope.getProductImage(value);
			});
	    },function(error){
			console.log(error);
		});
	};
	//redirect to product view
	$rootScope.setClickedCategory = function(categoryId){
    	$rootScope.getProductByCategoryId(categoryId);
	};
	$rootScope.getProductByFacturerId= function(facturerId){
		$http.get("connect/product.php?facturerId="+facturerId)
	    .then(function(productFacturerId){
	    	$scope.currentPage = 1;
	    	$scope.currentSorting = $scope.sortings[0];
	    	$scope.products = productFacturerId.data;
	    	$scope.productNumber = productFacturerId.data.quantity;
	    	setPagingData($scope.currentPage);
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
			$scope.currentPage = 1;
			$scope.currentSorting = $scope.sortings[0];
			$scope.products = productLower.data;
			$scope.productNumber = productLower.data.quantity;
			setPagingData($scope.currentPage);
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
			$scope.currentPage = 1;
			$scope.currentSorting = $scope.sortings[0];
			$scope.products = productPriceBetween.data;
			$scope.productNumber = productPriceBetween.data.quantity;
			setPagingData($scope.currentPage);
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
			$scope.currentPage = 1;
			$scope.currentSorting = $scope.sortings[0];
			$scope.products = productHigher.data;
			$scope.productNumber = productHigher.data.quantity;
			setPagingData($scope.currentPage);
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
			$scope.currentPage = 1;
			$scope.currentSorting = $scope.sortings[0];
			$scope.products = productHasColor.data;
			$scope.productNumber = productHasColor.data.quantity;
			setPagingData($scope.currentPage);
			angular.forEach(productHasColor.data.data, function(value, key){
				$scope.getProductImage(value);
			});
		},function(error){
			console.log(error);
		})
	}
	$scope.getClickedModalProduct = function(product){
		$scope.clickedProduct = product;
		$scope.getProductImage(product);
		
	}
	$scope.getProductImage = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
	}
	// $rootScope.setClickedProduct = function(productId){
 //    	SingleService.transmitProductData(productId);
	// };
	$scope.getRandomProduct = function(){
		$http.get("connect/product.php?random")
		.then(function(randomProducts){
			$scope.recommendProducts = randomProducts.data;
			angular.forEach(randomProducts.data.data, function(value, key){
				$scope.getProductImage(value);
				
			});
		},function(error){
			console.log(error);
		})
	};
	$scope.getRandomProduct();

	//Sorting
	$scope.sortings = [
	{name:"Default sorting",
	method : function(){
		$scope.products.data.sort(function(a,b){
			return parseInt(a.productId) - parseInt(b.productId);
		})
		setPagingData($scope.currentPage);
	}}

	,{name:"Sort by newness",
	method : function(){
		$scope.products.data.sort(function(a,b){
			return new Date(b.insertDate) - new Date(a.insertDate);
		})
		setPagingData($scope.currentPage);
	}},{name:"Sort by price: low to high",
	method : function(){
		$scope.products.data.sort(function(a,b){
			return parseInt(a.productPrice) - parseInt(b.productPrice);
		})
		setPagingData($scope.currentPage);
		
	}},{name:"Sort by price: high to low",
	method : function(){
		$scope.products.data.sort(function(a,b){
			return parseInt(b.productPrice) - parseInt(a.productPrice);
		})
		setPagingData($scope.currentPage);
	}}];
	//when begin , sorting with default
	$scope.currentSorting = $scope.sortings[0];
	//scroll 
	$scope.scrollTop = function(){
		$window.scrollTo(0, 900);
	}
})
.controller('SingleCtrl', function($rootScope,$http,$scope,CartService,$route,$routeParams,$window){
	$rootScope.title = "SinglePage";
	console.log($routeParams.productId);
	$scope.$watch('routeParams',function(){
		$scope.getProductById($routeParams.productId);
	})
	//comment
	$scope.getNumber = function(num) {
	num = parseInt(num);
    return new Array(num);   
	}
	var getAllComment = function(productId){
		$http.get('connect/productComment.php?productId='+productId)
		.then(function(response){
			console.log(response);
			$scope.comments = response.data;
		})
	}
	$scope.getProductById = function(id){
    	$http.get("connect/product.php?productId="+id)
	    .then(function(product){
	    	$scope.slides = [];
	    	$scope.product = product.data.data[0];
	    	$scope.product.quantityNumber = 1;
	    	$rootScope.title = product.data.data[0]["productName"];
			$scope.getProductImage(product.data.data[0]);
			if(!$scope.relatedProducts)
			$scope.getRelatedProduct($scope.product.CategoryId);
	    },function(error){
			console.log(error);
		});
		getAllComment(id);
    }
    // when click into product
 	$scope.getClickedModalProduct = function(product){
		$scope.clickedProduct = product;
		$scope.getProductImageForRelated(product);
		
	}
	
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
	$scope.getRelatedProduct = function(categoryId){
		$http.get("connect/product.php?categoryId="+categoryId +"&random")
		.then(function(relatedProducts){
			console.log(relatedProducts);
			$scope.relatedProducts = relatedProducts.data;
			angular.forEach(relatedProducts.data.data, function(value, key){
				$scope.getProductImageForRelated(value);
				
			});
		},function(error){
			console.log(error);
		})
	};
	$scope.getProductImageForRelated = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
	}
	$scope.quantityPlus = function(){
		$scope.product.quantityNumber ++;
	}
	$scope.quantityMinus = function(){
		$scope.product.quantityNumber --;
	}
	
	
	$scope.addNewComment = function(userId,productId,comment,star){
		$http.post('connect/productComment/addNewComment.php', {
			'pId' : productId,
			'uId' : userId,
			'comment' : comment,
			'star' : star
		}).then(function(response){
			console.log(response);
			$route.reload();
		})
	}
	//scroll
	$scope.scrollTop = function(){
		$window.scrollTo(0, 900);
	}
	
})
.controller('CheckOutController', function($rootScope,$http,$scope,CartService,$window){
	$rootScope.title = "Checkout";
	$scope.shipping = "FreeShip";
	$scope.payments = 'banking';
	$scope.insertNewBill = function(user,total){
		if(!user){
			user={};
			user.userName = $scope.userName;
			user.address = $scope.address;
			user.phoneNumber = $scope.phone;
		}
		if(total>0 && user.userName){
		$http.post('connect/bill/insertNewBill.php', {
			'userId' : user.userId,
			'userName' : user.userName,
			'phoneNumber' : user.phoneNumber,
			'address' : user.address,
			'total' : total,
			'payment' : $scope.payments
		}).then(function(response){
			console.log(response);
			var insertedId = response.data;
			if(insertedId)
			angular.forEach($rootScope.cartDetails.data, function(detail, key){
				$scope.insertBillDetail(insertedId,detail.productId,detail.productPrice,detail.quantity,detail.cartDetailId);
			});
		//when success show modal
		var myModal = angular.element( document.querySelector( '#myModal' ) );
		myModal.modal("show");
		$window.scrollTo(0, 900);
		})
		}else if(!user.userName){
			$("#notValidCustomer").modal("show");
		}else{
			$('#emptyCart').modal("show");
		}
	}
	$scope.insertBillDetail = function(billId,productId,price,quantity,detailId){
		$http.post('connect/bill/insertBillDetail.php',{
			'billId' : billId,
			'productId' : productId,
			'price' : price,
			'quantity' : quantity
		}).then(function(response){
			//delete item after add to bill 
			$scope.removeItemOfCart(detailId,productId);
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
			var $promise = $http.post('connect/session/userSession.php',data)
			.then(function(response) {
				if(response.data.status == 1){
					var user = response.data.data;
					sessionService.set('user',JSON.stringify(user));
					//$rootScope.currentUser = user;
					return user;
				}else{
					return response;
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
