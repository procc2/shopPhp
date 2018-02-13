var admin = angular.module('admin', ["ngRoute"])
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
})
.controller('AdminController', function($rootScope){
	$rootScope.title = "Admin Page"
})
.controller('CategoryContrl', function($rootScope,$http,$scope){
	$rootScope.title = "Category Edit Page";
	$http.get("../connect/category.php")
	.then(function(response){
		$scope.categories = response.data;
	});
	$scope.insertData = function(){
		$http.post('php/insertCategory.php', {
			'cId' : $scope.id,
			'cName' : $scope.cName
		}).then(function(response){
			console.log("Inserted");
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
	$scope.deleteData = function(deletingId){
		$http.get('php/deleteCategory.php?id='+ deletingId )
		.then(function(response){
			console.log("Deleted");
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
		$http.post('php/editCategory.php', {
			'cId' : $scope.id,
			'cName' : $scope.cName
		}).then(function(response){
			console.log(response.data);
		},function(error){
			console.log(error);
		})
	};
})
.controller('ProductContrl', function($rootScope){
	$rootScope.title = "Product Page "	
})
.controller('UserContrl', function($rootScope){
	$rootScope.title = "User Page"
})