var webApp = angular.module('webApp', ["ngRoute"])

.controller('MainController', function($rootScope,$http){
	$rootScope.title = "Homepage";
	
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
	.when('/admin',{
		redirectTo : 'single.html'
	})
})
.controller('ProductCtrl', function($rootScope,$http,$scope){
	$rootScope.title = "Product";
	$http.get("connect/category.php")
    .then(function (response) {
    	$scope.categories = response.data;
    	
    	
    });
    $http.get("connect/product.php")
    .then(function(response){
    	$scope.products = response.data;
    	
    })
})
.controller('SingleCtrl', function($rootScope,$http){
	$rootScope.title = "SinglePage";
})
.controller('MailController', function($rootScope,$http){
	$rootScope.title = "Mail";
})
