// Peter Mingione - Taneleer Aggregator Demo - Angular App Modules

// Create the module
var appModule = angular.module('appName', []);

// Create rootScope variables
appModule.run(
    function($rootScope){
        $rootScope.title = "Peter Mingione's Social Media Aggregator (code name: Taneleer) Submitted May 7, 2018";
    }
);

		