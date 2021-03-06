	// the app module
	var mainApp = angular.module('mainApp', ['ngRoute','ngResource']);

	// configured routes
	mainApp.config(function($routeProvider,$httpProvider) {
		$routeProvider

		// home page
		.when('/', {
			templateUrl: 'pages/careers.html',
			controller: 'mainController'
		})

		.when('/board', {
			templateUrl: 'pages/board.html',
			controller: 'boardController'
		})

		.when('/description/:id', {
			templateUrl: 'pages/description.html',
			controller: 'descriptionController'
		})

		.when('/apply/:id', {
			templateUrl: 'pages/application.html',
			controller: 'applyController'
		});

	});

	mainApp.controller('mainController', function($scope, $route, Job) {
		$scope.title = 'Job Drive';
		$scope.description = 'The User-Friendly Way to Manage Job Applicaitons';
		$scope.posts = Job.query();
	});

	mainApp.controller('boardController', function($scope, $route, Job) {
		$scope.title = 'Job Board';
		$scope.posts = Job.query();
	});

	mainApp.controller('descriptionController', function($scope, $route, $routeParams, Job) {
		$scope.title = 'Job Description';
		$scope.posts = Job.get({id:$routeParams.id});
		$scope.key = $routeParams.id;
	   	$scope.searchFilter = function (post) {
	    var keyword = new RegExp($scope.dataFilter, 'i');
	    	return !$scope.dataFilter || keyword.test(posts.title) || keyword.test(posts.location) || keyword.test(posts.division) || keyword.test(posts.description) || keyword.test(posts.benefits) || keyword.test(posts.responsibility) || keyword.test(posts.requirements) || keyword.test(posts.terms) || keyword.test(posts.salary);
		};
	});

	mainApp.controller('applyController', function($scope, $route, $routeParams, Job) {
		$scope.title = 'Apply';
		$scope.posts = Job.get({id:$routeParams.id});
		$scope.key = $routeParams.id;
	});

	mainApp.factory('Job',function($resource){
    	return $resource(
    		'https://script.googleusercontent.com/macros/echo?user_content_key=tzU-JwERgLF8smkwzDlXeKoL2cybBXwCfH0Eqh_NDwgRm_QRCmlJASTB2BELaEJySil9XlYjWJPKsPqTdwLaCZAP2xNAC-OGOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa-g9lXNNVtJV7Rr_GYeUUCJJU5Pitn6ub_eV2Dl8PkRqpWzguiGdaYKYYhAvrbViVUi7cO5ZZUmavC3sZeq0jfeyPMfEgH6OimGIga8GCsu0ffv5Q7e0gh3-Km9l3qpx5bQhfbjRRibeHDtW5FagNECg8fkiVzd99A&lib=MRwbFvLyuFBVmvIxNesN15pRWUWnU-0z7&key=AIzaSyBm4WflpfsqPq9vhBfiEi1eptD5t0fRqC0',
    		{},
      		{query: { method: 'GET', params:{name:'name'}, isArray: false }}
    	);
	});