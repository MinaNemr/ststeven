'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ClassCtrl', function($scope, $location,$http,$window,toastr) {
    var today = new Date();
    $http.post($window.localStorage.getItem("base_url")+"/get_class_users").then(function(response){
          console.log(response.data);
          $scope.class =
    	{
    		"date": today,
    		"absent_kids": response.data,
    		"attended_kids": []
    	};
    });
    $scope.enter_attendance = function(kid){
    	console.log(kid);
    	
    		$scope.class.absent_kids.splice($scope.class.absent_kids.indexOf(kid), 1);
		
    	kid.score = 90+Math.ceil((today.getTime() - (new Date().getTime()))/60000);
    	$scope.class.attended_kids.push(kid);
    	console.log($scope.class.attended_kids);
    }

    $scope.add_score = function(kid,value){
    	console.log(kid);
    	console.log(value);
    	
    	        $http.post($window.localStorage.getItem("base_url")+"/add_score",{"id":kid._id,"value":value }).then(function(response){
    						console.log(response.data);
    	          toastr.success(response.data);
    	        });	
    
    
    
    }
    
    
  })

