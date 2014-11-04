	// the app module
	var mainApp = angular.module('mainApp', ['ngRoute','ngResource']);

	// configured routes
	mainApp.config(function($routeProvider) {
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

		.when('/description/:name', {
			templateUrl: 'pages/description.html',
			controller: 'descriptionController'
		})

		.when('/apply/:name', {
			templateUrl: 'pages/application.html',
			controller: 'applyController'
		});

	});

	mainApp.controller('mainController', function($scope) {
		$scope.title = 'Welcome to Job Drive';
		$scope.slogan = 'The User-Friendly Way to Manage Job Applicaitons';
	});

	mainApp.controller('boardController', function($scope) {
		$scope.title = 'Job Board';
		$scope.slogan = 'What job is right for you?';
	});

	mainApp.controller('descriptionController', function($scope) {
		$scope.title = 'Job Description';
		$scope.slogan = 'Is this the right job for you?';
	});

	mainApp.controller('applyController', function($scope) {
		$scope.title = 'Apply';
		$scope.slogan = 'Are you qualified for the job?';
	});

  mainApp.factory('Job',function($resource){
    return $resource('http://localhost:8000/api/jobs/:name',{name:'@name'},{
        update: {
            method: 'PUT'
        }
    });
  });