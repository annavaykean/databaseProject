angular.module('dbApp', ['ngMaterial']).controller('DashboardCtrl', function($scope, $mdDialog, $http) {
    $scope.createEventToggle = false;
    $scope.createRSOToggle = false;
    //creating new event
    $scope.event = {};
    $scope.event.name = '';
    $scope.event.startTime = '';
    $scope.event.endTime = '';
    $scope.event.description = '';
    $scope.event.cat = 0;
    $scope.event.location = 0;
    $scope.event.userID = 0;
    //creating new RSO
    $scope.rso = {};
    $scope.rso.name = '';
    $scope.addMember = '';
    $scope.foundingMembers = [];
    //searching
    $scope.searchResults = [];
    $scope.response = '';
    $scope.searchParam = '';
    $scope.searchCat = '';
    $scope.userData = {};
    $scope.userData.userID = '11223';
    $scope.userData.admin = true;

    $scope.rsoArrayPush = function(){
        $scope.foundingMembers.push($scope.addMember);
        $scope.addMember = '';
    }
    $scope.search = function(){
        //package for db
        if($scope.searchCat == '0'){
            //public event
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            dataToSend.cat = 0;
            $scope.json = angular.toJson(dataToSend);
            $http.post('/searchEvents', $scope.json).then(function(data){
                $scope.response = data;
                console.log("retrieved data: ");
                console.log($scope.response);
                $scope.searchResults = angular.fromJson($scope.response);
                console.log("Parsed response: ");
                console.log($scope.searchResults);
            });        
            
        }
        if($scope.searchCat == '1'){
            //private event
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            dataToSend.cat = 1;
            $scope.json = angular.toJson(dataToSend);
            var response = $http.post('/searchEvents', $scope.json)
            console.log(response);
        }
        if($scope.searchCat == '2'){
            //rso event
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            dataToSend.cat = 2;
            $scope.json = angular.toJson(dataToSend);
            var response = $http.post('/searchEvents', $scope.json)
            console.log(response);
        }
        if($scope.searchCat == '3'){
            //rso org
          
        }
    }
    $scope.createEvent = function(){
        //gather info and send to db
        $scope.createEventToggle = true;
        $scope.createRSOToggle = false;
        if($scope.event.name != ''){
            $scope.json = angular.toJson($scope.event);
            $http.post('/createEvent', $scope.json);
        }
    }
    $scope.createRSO = function(){
        //form with 5 users
        $scope.createRSOToggle = true;
        $scope.createEventToggle = false;
    }
    $scope.goto = function(key){
        if(key == 'search'){
            window.location.href="searchEngine.html"
        }
        if(key == 'myEvents'){
            window.location.href="myEvents.html"
        }
        if(key == 'myRSOs'){
            window.location.href="myRSOs.html"
        }
    }
    $scope.logout = function(){
        //clear out user info 
        window.location.href="signIn.html"
    }
});