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
.directive('flexCarousel', function () {
    return {
        restrict: 'E',
        transclude : true,
        template : "<ng-transclude></ng-transclude>",
        scope : {
          options : "="
        },
        link: function (scope, element, attrs) {
           
            $('#flexisel').flexisel(scope.options);
            
        }
    };
})
.factory('ProductService', function(){
	var categoryId;
	var setClickedCategory = function(data) {
		debugger;
		categoryId = data;
	}
	var getClickedCategory = function(){
		debugger;
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
.controller('MainController', function($rootScope,$http,ProductService,$scope){
	$rootScope.title = "Homepage";
	// Click to product view 
	$http.get("connect/category.php")
    .then(function (response) {
    	$rootScope.categories = response.data;
    });
	$rootScope.setClickedCategory = function(categoryId){
    	ProductService.setClickedCategory(categoryId);
	};
	$scope.getProductByCategoryId = function(categoryId){
		$http.get("connect/product.php?categoryId="+categoryId + "&limit=" + 3)
	    .then(function(productCategoryData){
	    	console.log(productCategoryData);
	    	$scope.products = productCategoryData.data;
	    	angular.forEach(productCategoryData.data.data, function(value, key){
				$scope.getProductImage(value);
			});
	    },function(error){
			console.log(error);
		});
	};
	$scope.getProductByCategoryId(3);
	$scope.getProductImage = function(product){

		$http.get("connect/productImage.php?productId=" +product.productId)
		.then(function(response){
			product.images = response.data;		
		});
		
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
})
.controller('ProductCtrl', function($rootScope,$http,$scope,$route,ProductService,SingleService){
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
.controller('MailController', function($rootScope,$http){
	$rootScope.title = "Mail";
})
