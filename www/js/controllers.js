angular.module('starter.controllers', [])
	.controller('TeamsCtrl', ['$scope', '$http', '$rootScope', '$ionicFilterBar', function($scope, $http, $rootScope, $ionicFilterBar) {
		$scope.data = $rootScope.data;
		$scope.showFilterBar = function() {
			filterBarInstance = $ionicFilterBar.show({
				items: $rootScope.data.teams,
				update: function(filteredItems) {
					console.log(filteredItems)
					$scope.data.teams = filteredItems;
				},
				filterProperties: ['searchText']
			});
		};
	}])

.controller('TeamCtrl', ['$scope', '$stateParams', '$rootScope', '$http', function($scope, $stateParams, $rootScope, $http) {
	$scope.user = {}
	setTimeout(function() {
		//find team
		for (i = 0; i < $rootScope.data.teams.length; ++i) {
			if ($rootScope.data.teams[i].id == $stateParams.teamId) {
				$scope.team = $rootScope.data.teams[i];
				$rootScope.data.currentTeam = $rootScope.data.teams[i];
				break;
			}
		}
		$scope.$apply();

	}, 1000)
	$scope.signUp = function() {
		console.log($scope.user)
		$http.post("url", {
			user: $scope.user,
			teamId: $stateParams.teamId
		})
	}

}])

.controller('MapCtrl', ['$scope', '$stateParams', '$rootScope', '$window', '$ionicNavBarDelegate', '$http', function($scope, $stateParams, $rootScope, $window, $ionicNavBarDelegate, $http) {
	setTimeout(function() {
		console.log($rootScope.data);
		if (!("currentTeam" in $rootScope.data)) {
			//find team
			for (i = 0; i < $rootScope.data.teams.length; ++i) {
				if ($rootScope.data.teams[i].id == "1") {
					$scope.team = $rootScope.data.teams[i];
					$rootScope.data.currentTeam = $rootScope.data.teams[i];
					break;
				}
			}
		}

		setTimeout(function() {
			$ionicNavBarDelegate.showBackButton(true)
		}, 1000)
		console.log("lodaing!")
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: 40,
				lng: -100
			},
			zoom: 8
		});

		$http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + $rootScope.data.currentTeam.zip + '&sensor=false').then(function(data) {
			var location = data.data.results[0].geometry.location
			var latLng = new google.maps.LatLng(location.lat, location.lng);

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: 'Hello World!'
			});

			setTimeout(function() {
				//map.setZoom(8)
				map.panTo(latLng);
			}, 2000)
		}, function(err) {
			console.log(err);
			alert(err);
		})
	}, 1000)
}])
