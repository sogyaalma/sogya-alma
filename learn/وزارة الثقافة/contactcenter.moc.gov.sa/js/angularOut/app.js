var MOCApp = null;
//var NotificationHub = $.connection.notificationHub;
(function () {
    MOCApp = angular.module('app',
        [
            'ngRoute',
            'ui.bootstrap',
            'ngResource',
            'angular.filter',
            'ngFileUpload',
            'ngAnimate',
            'ngMaterial',
            'ngSanitize',
            'ui.select',
            'ngPatternRestrict'
        ]);
    angular.lowercase = angular.$$lowercase;

    MOCApp.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/Account/Login",
            })
            .when("/Registration/Individual", {
                templateUrl: "/Account/IndividualRegistration",
            })
            .when("/Account/VerifyMobile", {
                templateUrl: "/Account/VerifyMobile",
            })
            .when("/Registration/Facility", {
                templateUrl: "/Account/FacilityRegistration",
            })
            //.when("/Profile", {
            //    templateUrl: "/Account/Profile",
            //})
            .when("/ForgetPassword", {
                templateUrl: "/Account/ForgetPassword",
            })
            .when("/ResetPassword/:email/:token", {
                templateUrl: function (params) {
                    var url = '/Account/ResetPassword?email=' + params.email + '&token=' + params.token;
                    return url;
                },
            })
            .otherwise({ redirectTo: "/" });
    });
    MOCApp.filter('Filesize', function () {
        return function (size) {
            if (isNaN(size))
                size = 0;

            if (size < 1024)
                return size + ' Bytes';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' KB';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' MB';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' GB';

            size /= 1024;

            return size.toFixed(2) + ' TB';
        };
    });
})();