MOCApp.controller('controller',
    ['$scope', '$window', '$q', 'Service', '$mdDialog', '$route', '$location', '$filter', '$interval',
        function ($scope, $window, $q, Service, $mdDialog, $route, $location, $filter, $interval) {

            $scope.DateNowFull = new Date();
            $scope.DateNow = $filter('date')($scope.DateNowFull, 'yyyy-MM-dd');

            $scope.IsFacilityInfoValid = false;

            $scope.BaseUrl = $location.protocol() + "://" + location.host;
            // $scope.captchaVar = false;
            $scope.facility = {
                FacilityLicensesFile: {
                    name: null
                },
                CommercialRegisterFile: {
                    name: null
                }
            };

            $scope.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
            $scope.cityPattern = /^[A-Za-zء-ي\s]+$/;
            $scope.saMobilePattern = /^5[0-9]{8}$/; // يبدأ بـ 5 + بعدها 8 أرقام = 9 أرقام إجمالاً


            $scope.paspattern = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{15,50}$/;
            $scope.format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            //$scope.MaxDateBirthDate = new Date('01/31/2010');

            //$scope.MaxDateBirthDate = new Date("January 31, 2010 00:00:00");

            //$scope.MaxDateBirthDate = new Date();

            $scope.MaxDateBirthDateFull = new Date('01/31/2010');
            $scope.MaxDateBirthDate = $filter('date')($scope.MaxDateBirthDateFull, 'yyyy-MM-dd');


            $scope.SelectedCountryCode = '+966';

            //$scope.MaxDateBirthDate = d.getUTCDate();

            //$scope.MaxDateBirthDate = new Date('01/31/2010');
            //$scope.MaxDateBirthDate.setUTCDate(2010, 31, 1);

            $scope.IsNullOrEmpty = function (field) {
                if (field === undefined || field === null || field === "") {
                    return true;
                } else {
                    return false;
                }
            };
            $scope.CloseModal = function () {
                $mdDialog.cancel();
            }
            $scope.ChangeView = function (view) {
                if (!$scope.IsNullOrEmpty(view)) {
                    $location.path(view); // path not hash
                    $route.reload();
                }
            }
            $scope.ChangeFullPath = function (fullpath) {
                window.location.href = fullpath
            }
            $scope.AlertModal = function (title, body, type, event, redirectTo) {
                $scope.AlertModalObj = {
                    Title: title,
                    Body: body,
                    Type: type,
                    RedirectTo: redirectTo
                };
                $mdDialog.show({
                    contentElement: '#AlertModal',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: false
                });
            }
            $scope.Loading = function (type) {
                if (type) {
                    $("#MainLoader").removeClass("hidden");
                }
                else {
                    $("#MainLoader").addClass("hidden");
                }
            }

            $scope.$on('$routeChangeStart', function ($event, next, current) {
                $scope.Loading(true);
            });
            $scope.$on('$routeChangeSuccess', function ($event, next, current) {
                //$scope.CheckRole($event);
                var pages = $location.$$url.split('/');
                $scope.CurrentPage = pages[1];
                $scope.CurrentSubPage = pages[2];
                $scope.Loading(false);
            });
            $scope.$on('$routeChangeError', function ($event, next, current) {
                $scope.Loading(false);
            });
            $scope.OnEmailChanged = function () {

                // إعادة تعيين OTP
                $scope.user.EmailOTP = "";

                // إعادة تشغيل المؤقت
                resetOtpTimer();

                // مسح أي رسالة خطأ
                $scope.user.EmailOTPNotMuchedMessage = "";

            };

            //$scope.CheckAndSendEmailOTP = function (user, event) {
            //    user.EmailExisted = "";
            //    event.preventDefault();
            //    if (!user.ReCaptchaToken) {
            //        $scope.AlertModal("Error", "Please complete the CAPTCHA", "Error", event);
            //        return;
            //    }

            //    $scope.Loading(true);

            //    var requestData = {
            //        email: user.Email,
            //        reCaptchaToken: user.ReCaptchaToken 
            //    };

            //    Service.CheckUsernameIfExistedBefor(requestData)
            //        .then(function (response) {
            //            var result = response.data;
            //            if (result.httpStatusCode == 200) {
            //                if (result.data) {
            //                    if (!$scope.IsNullOrEmpty(result.message)) {
            //                        $scope.AlertModal(result.message.title, result.message.body, "Error", event);
            //                    }
            //                }
            //                else {
            //                    $("#step1Next").click();
            //                }
            //            }

            //            $scope.Loading(false);
            //        }, function (reject) {
            //            if (!$scope.IsNullOrEmpty(reject)) {
            //                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
            //            }
            //            $scope.Loading(false);
            //        });
            //}
            $scope.CheckAndSendEmailOTP = function (user, event) {
                user.EmailExisted = "";
                event.preventDefault();
                //check if email existed befor
                $scope.Loading(true);
                Service.CheckUsernameIfExistedBefor(user.Email)
                    .then(function (response) {
                        var result = response.data;
                        if (result.httpStatusCode == 200) {
                            if (result.data) {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                                }
                            }
                            else {
                                $("#step1Next").click();
                            }
                        }

                        $scope.Loading(false);
                    }, function (reject) {
                        if (!$scope.IsNullOrEmpty(reject)) {
                            $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
                        }
                        $scope.Loading(false);
                    });
            }

            //$scope.CheckEmailOTPIsCorrect = function (user, event) {
            //    user.EmailOTPNotMuchedMessage = "";

            //    $scope.Loading(true);
            //    Service.CheckUsernameOTP(user.Email, user.EmailOTP)
            //        .then(function (response) {
            //            var result = response.data;
            //            if (result.httpStatusCode == 200) {
            //                if (result.data == true) {
            //                    $("#step2Next").click();
            //                }
            //                else {
            //                    user.EmailOTPNotMuchedMessage = result.message.body;
            //                }
            //            }

            //            $scope.Loading(false);
            //        }, function (reject) {
            //            if (!$scope.IsNullOrEmpty(reject)) {
            //                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
            //            }
            //            $scope.Loading(false);
            //        });

            //}
            $scope.CheckEmailOTPIsCorrect = function (user, event) {

                if ($scope.otpExpired) {
                    user.EmailOTPNotMuchedMessage = $scope.SharedResource.OTPExpiredMessage;
                    return;
                }

                user.EmailOTPNotMuchedMessage = "";
                $scope.Loading(true);

                Service.CheckUsernameOTP(user.Email, user.EmailOTP)
                    .then(function (response) {

                        var result = response.data;

                        if (result.httpStatusCode === 200) {

                            if (result.data === true) {
                                $("#step2Next").click();
                            } else {
                                user.EmailOTPNotMuchedMessage = result.message.body;
                            }
                        }

                        $scope.Loading(false);

                    }, function (reject) {

                        if (!$scope.IsNullOrEmpty(reject)) {
                            $scope.AlertModal(
                                $scope.SharedResource.ConnectionProblem,
                                $scope.SharedResource.PleaseContactTechnicalSupport,
                                "Error",
                                event
                            );
                        }

                        $scope.Loading(false);
                    });
            };


            if ($("form[name='RegistrationForm']").length > 0) {
                $.validator.unobtrusive.parse($("form[name='RegistrationForm']"));
            }
            // القيمة الابتدائية (السعودية)
            $scope.SelectedCountryCode = 'sa';

            // دالة ترجع الـ pattern المناسب حسب الدولة
            $scope.getMobilePattern = function () {
                if ($scope.SelectedCountryCode &&
                    $scope.SelectedCountryCode.toLowerCase() === 'sa') {
                    // السعودية: رقم محلي يبدأ بـ 5 وطوله 9 أرقام
                    return /^5[0-9]{8}$/;
                }

                // باقي الدول: لا نطبق شرط معين (كل شيء مسموح)
                return /.*/;
            };

            $scope.ChangeSelectedCountry = function (countryCode) {
                if (countryCode !== undefined && countryCode !== '' && countryCode !== null) {
                    // نخزن ISO-2 مثل "sa", "ae", "us"
                    $scope.SelectedCountryCode = countryCode.toLowerCase();
                } else {
                    // نقرأ الـ ISO-2 من العنصر النشط في intl-tel-input
                    var activeIso2 = $(".iti__country.iti__active").attr("data-country-code");
                    $scope.SelectedCountryCode = (activeIso2 || 'sa').toLowerCase();
                }
            };
            //$scope.ChangeSelectedCountry = function (countryCode) {
            //    // خلي SelectedCountryCode دائماً ISO-2 مثل "SA"
            //    if (countryCode !== undefined && countryCode !== '' && countryCode !== null) {
            //        $scope.SelectedCountryCode = countryCode.toUpperCase();
            //    } else {
            //        // لو أخذنا من العنصر، نفضّل نقرأ ISO بدل dial-code مستقبلاً
            //        var activeCountryIso2 = $(".iti__country.iti__active").attr("data-country-code");
            //        $scope.SelectedCountryCode = (activeCountryIso2 || 'SA').toUpperCase();
            //    }

            //    // ضبط pattern حسب الدولة
            //    if ($scope.SelectedCountryCode === 'SA') {
            //        // رقم سعودي: 5 + 8 أرقام
            //        $scope.saMobilePattern = /^5[0-9]{8}$/;
            //    } else {
            //        // دول أخرى (تقدر تخليها مفتوحة أو تضيف منطق ثاني لاحقاً)
            //        //$scope.saMobilePattern = /^[0-9]{4,15}$/;
            //        // أو بالكامل بدون تحقق:
            //         $scope.saMobilePattern = /.*/;
            //    }
            //};


            // ************************************
            function convertToJavaScriptDate(value) {
                var pattern = /Date\(([^)]+)\)/;
                var results = pattern.exec(value);
                var dt = new Date(parseFloat(results[1]));
                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
            }
            $scope.RegistrationSubmit = function (user, event) {
                if (!$("form[name='RegistrationForm']").valid()) {
                    return;
                }
                $scope.captchaForReg = $window.captchaForReg;
                console.log("captchaForReg token:", $scope.captchaForReg);
                if ($scope.captchaForReg == false) { return; }
                $scope.Loading(true);

                //$scope.ChangeSelectedCountry();
                //user.CountryCode = $scope.SelectedCountryCode;
                user.CountryCode = "+" + $(".iti__selected-flag").attr("title").split("+")[1];

                //$scope.ssss = $filter('date')(user.BirthdayDate, 'MM/dd/yyyy');
                //user.BirthdayDate = "2011-04-02";


                //user.CountryCode = $(".iti__country.iti__active .iti__dial-code").html();
                if ((user.CountryCode == "+966" && user.isMobileConfirmed == true) || user.CountryCode != "+966") {
                    var stringDate = user.BirthdayDateTemp.split("-");
                    user.BirthdayDate = new Date(parseInt(stringDate[0]), parseInt(stringDate[1]) - 1, parseInt(stringDate[2]) + 1);
                    Service.IndividualRegistration(user)
                        .then(function (response) {
                            var result = response.data;
                            if (result.succeeded == true) {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "", event, "/");
                                }
                            }
                            else {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                                }
                            }
                            $scope.Loading(false);
                        }, function (reject) {
                            if (!$scope.IsNullOrEmpty(reject)) {
                                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport + " \n" + reject.data, "Error", event);
                            }
                            $scope.Loading(false);
                        });
                }
                else {
                    Service.SendVerificationCodeByMobile(user)
                        .then(function (response) {
                            var result = response.data;
                            if (result.succeeded == true) {
                                $scope.SelectedUser = user;
                                $scope.Loading(false);
                                $mdDialog.show({
                                    contentElement: '#VerifyMobileModal',
                                    parent: angular.element(document.body),
                                    targetEvent: event,
                                    clickOutsideToClose: false
                                });
                            }
                            else {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                                }
                            }
                            $scope.Loading(false);
                        }, function (reject) {
                            if (!$scope.IsNullOrEmpty(reject)) {
                                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
                            }
                            $scope.Loading(false);
                        });
                }
            }

            //New add

            $scope.ResendDisabled = false;
            $scope.ResendTimer = 0;
            var _resendIntervalPromise = null;
            var RESEND_SECONDS = 30; // زمن المنع قبل السماح بإعادة الإرسال (يمكن تغييره)

            $scope.startResendTimer = function (seconds) {
                // أوقف أي مؤقت سابق
                if (_resendIntervalPromise) {
                    $interval.cancel(_resendIntervalPromise);
                    _resendIntervalPromise = null;
                }

                $scope.ResendTimer = seconds;
                $scope.ResendDisabled = true;

                _resendIntervalPromise = $interval(function () {
                    $scope.ResendTimer = $scope.ResendTimer - 1;
                    if ($scope.ResendTimer <= 0) {
                        $scope.ResendDisabled = false;
                        if (_resendIntervalPromise) {
                            $interval.cancel(_resendIntervalPromise);
                            _resendIntervalPromise = null;
                        }
                    }
                }, 1000);
            };

            $scope.ResendVerificationCode = function (user) {
                if (!$scope.SelectedUser) {
                    $scope.VerifyMobileError = $scope.SharedResource.UnexpectedError || "حدث خطأ غير متوقع";
                    return;
                }

                // حماية إضافية: لا تسمح بإرسال متكرر إذا المعطل true
                if ($scope.ResendDisabled) { return; }

                $scope.VerifyMobileError = "";
                $scope.Loading(true);

                // استخدم نفس الخدمة التي تستعملها لإرسال الرمز أول مرة
                Service.SendVerificationCodeByMobile($scope.SelectedUser)
                    .then(function (response) {
                        var result = response.data;
                        $scope.Loading(false);
                        if (result && result.succeeded === true) {
                            // ابدأ العداد لمنع إعادة الإرسال فوراً
                            $scope.startResendTimer(RESEND_SECONDS);

                            // رسالة نجاح داخل النافذة (بدون alert) — نستخدم VerifyMobileError ليعرض نصاً أخضر أو يمكنك استخدام AlertModal
                            $scope.VerifyMobileError = $scope.SharedResource.VerificationCodeResent || "تم إرسال رمز تحقق جديد.";
                            // إذا تريد ظهور رسالة منبثقة بدل ذلك:
                            // $scope.AlertModal("تم", "تم إرسال رمز تحقق جديد", "", null);
                        } else {
                            if (result && !$scope.IsNullOrEmpty(result.message)) {
                                $scope.AlertModal(result.message.title, result.message.body, "Error");
                            } else {
                                $scope.VerifyMobileError = $scope.SharedResource.CouldNotResendCode || "تعذّر إعادة إرسال الرمز.";
                            }
                        }
                    }, function (reject) {
                        $scope.Loading(false);
                        $scope.VerifyMobileError = $scope.SharedResource.ConnectionProblem + " " + ($scope.SharedResource.PleaseContactTechnicalSupport || "");
                        // أو تفصيل حسب reject
                    });
            };

            $scope.BackToForm = function () {
                // تنظيف الحقول المتعلقة بالتحقق إن رغبت
                if ($scope.SelectedUser) {
                    $scope.SelectedUser.VerificationCode = "";
                }

                // إلغاء أي عداد مؤقت مفتوح
                if (_resendIntervalPromise) {
                    $interval.cancel(_resendIntervalPromise);
                    _resendIntervalPromise = null;
                }
                $scope.ResendDisabled = false;
                $scope.ResendTimer = 0;
                $scope.VerifyMobileError = "";

                // إغلاق الـ dialog
                try {
                    $mdDialog.hide();
                } catch (e) {
                    // في حال لا تستخدم $mdDialog لإظهار الـ modal (لكن من كودك تستخدم $mdDialog.show)
                    var element = angular.element(document.querySelector('#VerifyMobileModal'));
                    element.removeClass('md-show');
                }

                // إرجاع التركيز للنموذج أو إلى زر الإرسال إذا رغبت
                // مثلاً: focus على أول حقل في النموذج
                var firstInput = document.querySelector("form[name='RegistrationForm'] input");
                if (firstInput) { firstInput.focus(); }
            };


            $scope.VerifyMobile = function (user) {
                //if (!$("form[name='msform']").valid()) {
                //    return;
                //}
                $scope.Loading(true);
                $scope.VerifyMobileError = "";
                // $scope.ChangeSelectedCountry();
                // user.CountryCode = $scope.SelectedCountryCode;
                user.CountryCode = "+" + $(".iti__selected-flag").attr("title").split("+")[1];
                //user.CountryCode = $(".iti__country.iti__active .iti__dial-code").html();
                Service.VerifyMobile(user)
                    .then(function (response) {
                        var result = response.data;
                        if (result.data == true) {
                            user.isMobileConfirmed = true;
                            if (user.RegestrationType == 'Individual') {
                                $scope.RegistrationSubmit(user);
                            }
                            else {
                                $scope.FacilityRegistrationSubmit(user);
                            }
                        }
                        else {
                            $scope.VerifyMobileError = result.message.body
                        }
                        $scope.Loading(false);
                    }, function (reject) {
                        if (!$scope.IsNullOrEmpty(reject)) {
                            $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
                        }
                        $scope.Loading(false);
                    });
            }


            // --------------------------------

            $scope.FacilityRegistrationSubmit = function (facility, event) {
                if (!$("form[name='RegistrationForm']").valid()) {
                    return;
                }

                $scope.Loading(true);

                //$scope.ChangeSelectedCountry();
                //facility.CountryCode = $scope.SelectedCountryCode;
                facility.CountryCode = "+" + $(".iti__selected-flag").attr("title").split("+")[1];


                //facility.CountryCode = $(".iti__country.iti__active .iti__dial-code").html();
                if ((facility.CountryCode == "+966" && facility.isMobileConfirmed == true) || facility.CountryCode != "+966") {
                    var stringDate = facility.BirthdayDateTemp.split("-");
                    var stringEstablishmentDate = facility.EstablishmentDate.split("-");
                    facility.BirthdayDate = new Date(parseInt(stringDate[0]), parseInt(stringDate[1]) - 1, parseInt(stringDate[2]) + 1);
                    facility.EstablishmentDate = new Date(parseInt(stringEstablishmentDate[0]), parseInt(stringEstablishmentDate[1]) - 1, parseInt(stringEstablishmentDate[2]) + 1);

                    Service.FacilityRegistrationSubmit(facility)
                        .then(function (response) {
                            var result = response.data;
                            if (result.succeeded == true) {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Success", event, "/");
                                }
                            }
                            else {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                                }
                            }
                            $scope.Loading(false);
                        }, function (reject) {
                            if (!$scope.IsNullOrEmpty(reject)) {
                                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
                            }
                            $scope.Loading(false);
                        });
                }
                else {
                    Service.SendVerificationCodeByMobile(facility)
                        .then(function (response) {
                            var result = response.data;
                            if (result.succeeded == true) {
                                $scope.SelectedUser = facility;

                                $mdDialog.show({
                                    contentElement: '#VerifyMobileModal',
                                    parent: angular.element(document.body),
                                    targetEvent: event,
                                    clickOutsideToClose: false
                                });
                            }
                            else {
                                if (!$scope.IsNullOrEmpty(result.message)) {
                                    $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                                }
                            }
                            $scope.Loading(false);
                        }, function (reject) {
                            if (!$scope.IsNullOrEmpty(reject)) {
                                $scope.AlertModal($scope.SharedResource.ConnectionProblem, $scope.SharedResource.PleaseContactTechnicalSupport, "Error", event);
                            }
                            $scope.Loading(false);
                        });
                }
            }

            // --------------------------------

            $scope.ForgetPasswordSubmit = function (email) {
                $scope.Loading(true);

                Service.ForgetPasswordSubmit(email)
                    .then(function (response) {
                        var result = response.data;
                        if (result.succeeded == true) {
                            if (!$scope.IsNullOrEmpty(result.message)) {

                                $scope.ForgetPasswordModalTitle = result.message.title;
                                $scope.ForgetPasswordModalBody = result.message.body;

                                $mdDialog.show({
                                    contentElement: '#ForgetPasswordModal',
                                    parent: angular.element(document.body),
                                    targetEvent: event,
                                    clickOutsideToClose: false
                                });
                            }
                        }
                        else {
                            if (!$scope.IsNullOrEmpty(result.message)) {
                                $scope.AlertModal(result.message.title, result.message.body, "Error", event);
                            }
                        }
                        $scope.Loading(false);
                    }, function (reject) {
                        var rejectResult = reject.data;
                        if (!$scope.IsNullOrEmpty(reject)) {
                            $scope.AlertModal(rejectResult.message.title, rejectResult.message.body, "Error", event);
                        }
                        $scope.Loading(false);
                    });
            }

            // --------------------------------

            $scope.KeyDown_step1KeyDown = function (user, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    $scope.CheckAndSendEmailOTP(user, $event);
                }
            };
            //$scope.KeyDown_step2KeyDown = function (user, $event) {
            //    if ($event.keyCode === 13) {
            //        $event.preventDefault();
            //        $scope.CheckEmailOTPIsCorrect(user, $event);
            //    }
            //};
            $scope.KeyDown_step2KeyDown = function (user, $event) {
                if ($event.keyCode === 13 && !$scope.otpExpired) {
                    $event.preventDefault();
                    $scope.CheckEmailOTPIsCorrect(user, $event);
                }
            };

            $scope.KeyDown_step3KeyDown = function (data, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    $("#step3Next").click();
                }
            };
            $scope.KeyDown_step4KeyDown = function (data, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    //  $("#step4Next").click();
                }
            };
            $scope.KeyDown_step5KeyDown = function (data, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    // $("#step5Next").click();
                }
            };

            $scope.KeyDown_facilityInfoStepKeyDown = function (facility, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    //    $("#stepFacilityInfoNext").click();
                }
            };

            $scope.KeyDown_Form = function (data, $event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                }
            };

            $scope.CheckFacilityInfoIsValid = function (facility, $event) {

                if (!$scope.IsNullOrEmpty(facility.FacilityName) && !$scope.IsNullOrEmpty(facility.EstablishmentDate)
                    && !$scope.IsNullOrEmpty(facility.FacilityField) && !$scope.IsNullOrEmpty(facility.City)
                    && !$scope.IsNullOrEmpty(facility.FacilityNumber) && !$scope.IsNullOrEmpty(facility.FacilityEmail)
                    && !$scope.IsNullOrEmpty(facility.CommercialRegistrationNo) && !$scope.IsNullOrEmpty(facility.FacilityLicensesFile.name)
                    && !$scope.IsNullOrEmpty(facility.CommercialRegisterFile.name)) {
                    $scope.IsFacilityInfoValid = true;
                    $event.preventDefault();
                    $("#stepFacilityInfoNext").click();
                }
                else {
                    $scope.IsFacilityInfoValid = false;
                    //    $event.preventDefault();
                }
            };

            //$scope.Test = function (value) {
            //    if (value === undefined || value === null || value === "") {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //};

            // OTP TIMER CONFIG
            $scope.otpTotalSeconds = 80;
            $scope.otpMinutes = 1;
            $scope.otpSeconds = 20;
            $scope.otpTimerActive = true;
            $scope.otpExpired = false;

            let otpInterval = null;

            function startOtpTimer() {

                if (otpInterval) {
                    clearInterval(otpInterval);
                }

                otpInterval = setInterval(function () {
                    $scope.$apply(function () {

                        if ($scope.otpTotalSeconds <= 0) {
                            clearInterval(otpInterval);
                            $scope.otpExpired = true;
                            $scope.otpTimerActive = false;
                            return;
                        }

                        $scope.otpTotalSeconds--;
                        $scope.otpMinutes = Math.floor($scope.otpTotalSeconds / 60);
                        $scope.otpSeconds = $scope.otpTotalSeconds % 60;
                    });

                }, 1000);
            }

            // START TIMER WHEN STEP 2 IS OPENED
            startOtpTimer();


            // CHECK OTP FUNCTION (SAFE GUARD)
            //$scope.CheckEmailOTPIsCorrect = function (user, event) {

            //    if ($scope.otpExpired) {
            //        return;
            //    }

            //    // ضع هنا منطق التحقق الحالي (API Call)
            //};
            $scope.ResendEmailOTP = function (user) {

                if (!$scope.otpExpired) {
                    return;
                }

                $scope.Loading(true);
                user.EmailOTPNotMuchedMessage = "";

                Service.ResendEmailOTP(user.Email)
                    .then(function (response) {

                        var result = response.data;

                        if (result.httpStatusCode === 200) {

                            // Reset Timer
                            resetOtpTimer();

                            // Clear OTP input
                            user.EmailOTP = "";

                        } else {
                            user.EmailOTPNotMuchedMessage = result.message.body;
                        }

                        $scope.Loading(false);

                    }, function () {
                        $scope.Loading(false);
                    });
            };
            function resetOtpTimer() {

                if (otpInterval) {
                    clearInterval(otpInterval);
                }

                $scope.otpTotalSeconds = 80;
                $scope.otpMinutes = 1;
                $scope.otpSeconds = 20;
                $scope.otpExpired = false;
                $scope.otpTimerActive = true;

                startOtpTimer();
            }

            $scope.GetNationalities = function () {
                //  var deferred = $q.defer();
                Service.GetNationalities()
                    .then(function (response) {
                        $scope.NationalitiesAsItemList = response.data.data;
                        //deferred.resolve(response);
                    }
                        , function errorCallback(response) {
                            //deferred.reject('ERROR');
                        });
                //return deferred.promise;
            }
            $scope.GetEducationalLevels = function () {
                //  var deferred = $q.defer();
                Service.GetEducationalLevels()
                    .then(function (response) {
                        $scope.EducationalLevelsAsItemList = response.data.data;
                        //deferred.resolve(response);
                    }
                        , function errorCallback(response) {
                            //deferred.reject('ERROR');
                        });
                //return deferred.promise;
            }

            // ***************************************** 

            //$scope.isEmptyObject = function (obj) {
            //    for (var key in obj) {
            //        if (obj.hasOwnProperty(key))
            //            return false;
            //    }
            //    return true;
            //};

            // ***************************************** 
            //$scope.OpenFileInput = function (FileInputID) {
            //    var idFileInput = '#' + FileInputID;
            //    $(idFileInput).trigger('click');
            //}

            // ***************************************** 
            $scope.ShowSelectedFileFromFileInput = function (event, imgID) {
                var inputOpenFile = event.target;
                var idImg = document.getElementById(imgID);

                var reader = new FileReader();
                reader.onload = function () {
                    var dataURL = reader.result;

                    if (dataURL != null) {

                        console.log('$location', $location.$$absUrl);

                        if (dataURL.includes("data:image/")) {
                            $(idImg).attr("src", dataURL);
                        }
                        else if (dataURL.includes("data:application/pdf")) {
                            var baseUrl = $location.protocol() + "://" + location.host;
                            var pathIcon = "/media/image/pdf-icon.png";
                            var src = baseUrl + "/" + pathIcon;
                            $(idImg).attr("src", src);
                        }
                        else {
                            $(idImg).attr("src", "");
                            $scope.facility.FacilityLicensesFile = null;
                        }
                    }
                    else {
                        $(idImg).attr("src", "");
                        $scope.facility.FacilityLicensesFile = null;
                    }
                };
                reader.readAsDataURL(inputOpenFile.files[0]);
            };

        }]);


MOCApp.factory('Service', ['$http', 'Upload', function ($http, Upload) {
    var service = {};

    service.IndividualRegistration = function (user) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/IndividualRegistration",
            data: user,
            //file: file
        });
    }

    // --------------------------------

    service.FacilityRegistrationSubmit = function (facility) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/FacilityRegistration",
            data: facility,
            //file: file
        });
    }


    service.CheckUsernameIfExistedBefor = function (email) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/CheckUsernameIfExistedBefor",
            data: {
                Email: email
            },
        });
        //return $http({
        //    method: "Post",
        //    url: "../../Account/CheckUsernameIfExistedBefor",
        //    dataType: 'json',
        //    data: {
        //        Email: email
        //    },
        //    headers: { "Content-Type": "application/json" }
        //});
    }
    service.CheckUsernameOTP = function (email, otp) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/CheckUsernameOTP",
            data: {
                Email: email,
                OTP: otp
            },
        });

        //return $http({
        //    method: "Post",
        //    url: "../../Account/CheckUsernameOTP",
        //    dataType: 'json',
        //    data: {
        //        Email: email,
        //        OTP: otp
        //    },
        //    headers: { "Content-Type": "application/json" }
        //});
    }

    // New function for resending OTP
    service.ResendEmailOTP = function (email) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/CheckUsernameIfExistedBefor",  // نفس الأكشن الموجود في السيرفر
            data: {
                Email: email
            },
        });
    };
    service.SendVerificationCodeByMobile = function (user) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/SendVerificationCodeByMobile",
            data: user,
            //file: file
        });
    }
    service.VerifyMobile = function (user) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/VerifyMobile",
            data: user,
            //file: file
        });
    }

    service.GetNationalities = function () {
        return $http({
            method: "GET",
            url: "../../Lookup/GetNationalities",
            dataType: 'json',
            params: {},
            headers: { "Content-Type": "application/json" }
        });
    };
    service.GetEducationalLevels = function () {
        return $http({
            method: "GET",
            url: "../../Lookup/GetEducationalLevels",
            dataType: 'json',
            params: {},
            headers: { "Content-Type": "application/json" }
        });
    };
    service.ForgetPasswordSubmit = function (email) {
        return Upload.upload({
            method: 'POST',
            url: "../../Account/ForgetPassword",
            data: {
                Email: email
            },
        });
    }
    return service;
}]);