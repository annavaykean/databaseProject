angular.module('dbApp', ['ngMaterial']).controller('DashboardCtrl', function($scope, $mdDialog, $http) {
    $scope.createEventToggle = false;
    $scope.createRSOToggle = false;
    $scope.showEventSearchResults = false;
    $scope.showRSOSearchResults = true;
    $scope.viewEventToggle = false;
    //userInfo - holds user data from sign in
    $scope.userInfo;
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
    $scope.rso.universityID = 1;
    $scope.rso.active = 0;
    $scope.rso.userID = 2;
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
        $scope.createEventToggle = false;
        $scope.createRSOToggle = false;
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
                $scope.showEventSearchResults = true;
            });        
            
        }
        if($scope.searchCat == '1'){
            //private event
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            dataToSend.cat = 1;
            $scope.json = angular.toJson(dataToSend);
            $http.post('/searchEvents', $scope.json).then(function(data){
                $scope.response = data;
                console.log("retrieved data: ");
                console.log($scope.response);
                $scope.searchResults = angular.fromJson($scope.response);
                console.log("Parsed response: ");
                console.log($scope.searchResults);
                $scope.showEventSearchResults = true;
            });
        }
        if($scope.searchCat == '2'){
            //rso event
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            dataToSend.cat = 2;
            $scope.json = angular.toJson(dataToSend);
            $http.post('/searchEvents', $scope.json).then(function(data){
                $scope.response = data;
                console.log("retrieved data: ");
                console.log($scope.response);
                $scope.searchResults = angular.fromJson($scope.response);
                console.log("Parsed response: ");
                console.log($scope.searchResults);
                $scope.showEventSearchResults = true;
            });
        }
        if($scope.searchCat == '3'){
            //rso org
            var dataToSend = {};
            dataToSend.name = $scope.searchParam;
            $scope.json = angular.toJson(dataToSend);
            $http.post('/searchRSO', $scope.json).then(function(data){
                $scope.response = data;
                console.log("retrieved data: ");
                console.log($scope.response);
                $scope.searchResults = angular.fromJson($scope.response);
                console.log("Parsed response: ");
                console.log($scope.searchResults);
                $scope.showRSOSearchResults = true;
            });
          
        }
    }
    $scope.viewEvent = function(event){

    }

    $scope.joinRSO = function(rso){
        console.log(rso);
        $scope.dataToSend = {};
        $scope.dataToSend.name = rso.name;
        $scope.dataToSend.attendee; //code to get userID here
        $scope.json = angular.toJson(dataToSend);
    }

    $scope.attendEvent = function(event){
        console.log(event);
        $scope.dataToSend = {};
        $scope.dataToSend.name = event.name;
        $scope.dataToSend.attendee = $scope.userInfo.userID; 
        $scope.json = angular.toJson($scope.dataToSend);
        $http.post('/attendEvent', $scope.json).then(function(data){
            alert("Successfully Attending Event!");
        },
        function(data){
            alert("Failed to Enroll");
        });
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
        if($scope.rso.name != ''){
            $scope.json = angular.toJson($scope.rso);
            console.log($scope.json);
            $http.post('/createRSO', $scope.json);
        }
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

    //login ctrl
     //login data
     $scope.userData = {};
     $scope.userData.email = '';
     $scope.userData.password = '';
 
     //sign up data
     $scope.universityList = [{name: 'UCF', code: '1'}, {name: 'Valencia', code: '2'}]; //to be replaced later when DB call works
     $scope.securityQList = ["What is your favorite animal?",
                             "What elementary school did you attend?",
                             "What is your least favorite food?"
                             ];
     $scope.securityQSelected = '';
     $scope.signUpData = {};
     $scope.signUpData.email = '';
     $scope.signUpData.password = '';
     $scope.signUpData.universityID = 1;
     $scope.signUpData.securityAns = '';
     $scope.signUpData.isAdmin = 0;
     $scope.signUpData.isSuperAdmin = 0;
     $scope.signUpToggle = false;
 
 
     $scope.login = function(){
         //send userData to database, if valid user, get permissions and go to next page
         $scope.json = angular.toJson($scope.userData);
         $http.post('/userLogin', $scope.json).then(function(data){
            $scope.userInfo = angular.fromJson(data);
            window.location.href="dashboard.html"
            console.log("login success");
        },
        function(data){
            //incorrect user info
            console.log("login failed");
            alert("Incorrect Login");
        });
     }
     $scope.signUpFunc = function(){
         $scope.signUpToggle = true;
         if($scope.signUpData.uni != 0 && $scope.signUpData.email != '' && $scope.signUpData.password != ''){
             //submit new user to db here
             $scope.json = angular.toJson($scope.signUpData);
             $http.post('/addUser', $scope.json).then(function(data){
                $scope.userInfo = angular.fromJson(data);
                window.location.href="dashboard.html"
                console.log("login success");
            });
     }
    }
});