angular.module('dbApp', ['ngMaterial', ]).controller('signInCtrl', function($scope, $mdDialog) {
    //login data
    $scope.userData = {};
    $scope.userData.username = '';
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
    $scope.signUpData.universityID = 0;
    $scope.signUpToggle = false;


    $scope.login = function(){
        //send userData to database, if valid user, get permissions and go to next page
        $scope.json = angular.toJson($scope.userData);
        //get DB response
        //if valid, jump to dashboard
        window.location.href="dashboard.html"
    }
    $scope.signUpFunc = function(){
        $scope.signUpToggle = true;
        if($scope.signUpData.uni != 0 && $scope.signUpData.email != '' && $scope.signUpData.password != ''){
            //submit new user to db here
            console.log("creating new user account:");
            console.log($scope.signUpData);
            $scope.json = angular.toJson($scope.signUpData);
            console.log($scope.json);
            window.location.href="signIn.html";
        }
    }

    $scope.goto = function(dest){
        if(dest == ''){
            window.location.href="signIn.html";
        }
        else if(dest == ''){
            window.location.href="page2.html";
        }
        else
            console.log("That shouldn't work");

    }
});
