let merchantId
ihsan = {
  applePay: {
    // Function to handle payment when the Apple Pay button is clicked/pressed.
    beginPayment(e) {
      e.preventDefault()
      // Get the amount to request from the form and set up
      // the totals and line items for collection and delivery.

      const transactionId = $('#transactionId').val() || ''
      const initiativeTypeString =
        $('#hdninItiativeType').val() || $('#qd_initiativeType').val() || ''
      const isCartSourceVal = $('#hdnisCartSource').val() || ''
      let subtotal =
        $('#qd_amount_edited').val() ||
        $('#qd_amount').val() ||
        $('#amount').val() ||
        1
      const countryCode =
        $("meta[name='payment-country-code']").attr('content') || 'SA'
      const currencyCode =
        $("meta[name='payment-currency-code']").attr('content') || 'SAR'
      const deliveryTotal = Number(subtotal).toString()

      // fetch('/payment/inbasePayment').then(res => res.json()).then(res => {
      //    console.log(res)
      // })

      const storeName = 'Sogya Alma'

      const totalForDelivery = {
        label: storeName,
        amount: deliveryTotal,
      }

      const lineItemsForDelivery = [
        { label: 'Subtotal', amount: subtotal, type: 'final' },
      ]

      // Create the Apple Pay payment request as appropriate.
      const paymentRequest = {
        //   applicationData: btoa("Custom application-specific data"),
        countryCode,
        currencyCode,
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: ['visa', 'masterCard', 'mada'],
        lineItems: lineItemsForDelivery,
        total: totalForDelivery,
        supportedCountries: [countryCode],
      }
      // str = JSON.stringify(paymentRequest);
      // console.log(str);
      // Create the Apple Pay session.
      const session = new ApplePaySession(6, paymentRequest)

      // Setup handler for validation the merchant session.
      session.onvalidatemerchant = function (event) {
        // Create the payload.
        const data = {
          validationUrl: event.validationURL,
          transactionId,
          initiativeType: initiativeTypeString,
          isCart: isCartSourceVal,
        }
        // Setup antiforgery HTTP header.
        const antiforgeryHeader = $("meta[name='x-antiforgery-name']").attr(
          'content'
        )
        const antiforgeryToken = $("meta[name='x-antiforgery-token']").attr(
          'content'
        )

        const headers = {}
        headers[antiforgeryHeader] = antiforgeryToken

        // Post the payload to the server to validate the
        // merchant session using the merchant certificate.
        $.ajax({
          url: $("link[rel='merchant-validation']").attr('href'),
          method: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(data),
          headers,
          success() {},
          error(xhr, status, error) {
            alert('error while merchant Validation')
          },
        }).then((merchantSession) => {
          // Complete validation by passing the merchant session to the Apple Pay session.
          session.completeMerchantValidation(merchantSession)
        })
      }
      // Setup handler for shipping method selection.
      session.onpaymentmethodselected = function (event) {
        let newTotal
        let newLineItems
        newTotal = totalForDelivery
        newLineItems = lineItemsForDelivery

        const update = {
          newTotal,
          newLineItems,
        }
        session.completePaymentMethodSelection(update)
      }
      // Setup handler to receive the token when payment is authorized.
      session.onpaymentauthorized = function (event) {
        $('#applePayError').addClass('d-none')
        const is_quickDonation = $('#is_quickDonation').val() || 'false'

        const qDonationType = $('#qd_initiativeType').val() || 'project'
        if (is_quickDonation == 'true') {
          subtotal = $('#qd_amount_edited').val() || $('#qd_amount').val()
        }

        // Get the payment data for use to capture funds from
        // the encrypted Apple Pay token in your server.
        const { token } = event.payment
        // console.log(token);
        // Create the payload.
        const data = {
          token,
          transactionId,
          amount: subtotal,
          isQuickDonation: is_quickDonation || 'false',
          quickDonationType: qDonationType || 'project',
          isCart: 'false',

          // transactionId: transactionId
        }
        // var data = token;

        // Setup antiforgery HTTP header.
        const antiforgeryHeader = $("meta[name='x-antiforgery-name']").attr(
          'content'
        )
        const antiforgeryToken = $("meta[name='x-antiforgery-token']").attr(
          'content'
        )

        const headers = {}
        headers[antiforgeryHeader] = antiforgeryToken

        const authorizationResult = {
          status: ApplePaySession.STATUS_FAILURE,
          errors: [],
        }

        // Do something with the payment to capture funds and
        // then dismiss the Apple Pay sheet for the session with
        // the relevant status code for the payment's authorization
        $.ajax({
          url: $("link[rel='applePay-payment']").attr('href'),
          method: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(data),
          headers,
          success(result) {
            let bankName = result.getway.toLowerCase();
            if (result && (result.status == '1' || result.status == 'paid')) {
              authorizationResult.status = ApplePaySession.STATUS_SUCCESS
            }

            if (
              (result &&
                result.trandata != undefined &&
                result.trandata != null &&
                result.trandata != '') ||
              (result.donationSource == '2' &&
                result &&
                result.trandata != undefined &&
                result.trandata != null &&
                result.trandata != '')
            ) {
              window.location.href = `/Payment/CallbackApplePay?trandata=${result.trandata}&callBackType=${result.paymentCallBackType}`
            } else if (
              result &&
              result.paymentId != undefined &&
              result.paymentId != '' &&
              bankName == 'albilad'
            ) {
              window.location.href = `/Payment/CallbackAlbiladApplePay?id=${result.paymentId}`
            } else if (
              result &&
              result.paymentId != undefined &&
              result.paymentId != '' &&
              bankName == 'saudiinvestment'
            ) {
                window.location.href = `/Payment/CallbackSaudiInvestmentApplePay?id=${result.paymentId}`
            } else if (
              result &&
              result.paymentId != undefined &&
              result.paymentId != '' &&
              bankName == 'alahli'
            ) {
                window.location.href = `/Payment/CallbackAlahliApplePay?id=${result.paymentId}`
            } else {
              window.location.href =
                `/Payment/PaymentFailed/${result.transactionId}` ||
                transactionId
            }
          },
          error(xhr, status, error) {
            const response = xhr.responseJSON // parse the JSON response
            if (response && response.status === '2') {
              $('#applePayError').removeClass('d-none')
              $('#applePayError').text(response.errorText)
            } else {
              authorizationResult.status = ApplePaySession.STATUS_FAILURE
              window.location.href = `/Payment/PaymentFailed/${transactionId}`
            }
          },
        }).then(() => {
          session.completePayment(authorizationResult)
          ihsan.applePay.showSuccess()
        })
      }

      // Start the session to display the Apple Pay sheet.
      session.begin()
    },
    setupApplePay() {
      // var merchantIdentifier = ihsan.applePay.getMerchantIdentifier();
      const merchantIdentifier = merchantId || ''
      ApplePaySession.openPaymentSetup(merchantIdentifier)
        .then((success) => {
          if (success) {
            ihsan.applePay.showAccordion()
            ihsan.applePay.hideSetupButton()
            ihsan.applePay.showButton()
          } else {
            ihsan.applePay.showError('Failed to set up Apple Pay.')
          }
        })
        .catch((e) => {
          ihsan.applePay.showError(`Failed to set up Apple Pay. ${e}`)
        })
    },
    showAccordion() {
      // Loop through each '.accordion-item' element
      $('.accordion-item').each(function () {
        // Remove the class 'payment-method-wrapper' from the current element
        $(this).removeClass('payment-method-wrapper')

        // Hide the collapse content and set aria-expanded to 'false'
        const collapseElement = $(this).find('.accordion-collapse')
        const buttonElement = $(this).find('h2 button.accordion-button')

        collapseElement.removeClass('show')
        buttonElement.attr('aria-expanded', 'false')
      })

      $('#applePayAccordion').removeClass('d-none')
      $('#applePayAccordion').addClass('payment-method-wrapper')
      $('#applePay').addClass('show')
      // expand the button. It's inside the h2 tag
      $('#applePayAccordion h2 button.accordion-button').attr(
        'aria-expanded',
        'true'
      )
      if ($('#apple-pay-sr-heading')) {
        $('#apple-pay-sr-heading').removeClass('d-none')
      }
    },
    hideAccordion() {
      $('#applePayAccordion').addClass('d-none')
      $('#applePayAccordion').removeClass('payment-method-wrapper')
      $('#applePay').removeClass('show')
      $('#applePayAccordion h2 button.accordion-button').attr(
        'aria-expanded',
        'false'
      )
      if ($('#apple-pay-sr-heading')) {
        $('#apple-pay-sr-heading').addClass('d-none')
      }
    },
    showButton() {
      // alert("showButton");
      const button = $('#apple-pay-button')
      // button.attr("lang", "ar-SA");
      button.on('click', ihsan.applePay.beginPayment)
      button.addClass('apple-pay-button')
      button.addClass('apple-pay-button-black')
      button.removeClass('d-none')
      // var div = $(".apple-pay-div");
      // div.removeClass("d-none");
    },

    showSetupButton() {
      const button = $('#set-up-apple-pay-button')
      button.attr('lang', ihsan.applePay.getPageLanguage())
      button.on('click', $.proxy(ihsan.applePay, 'setupApplePay'))
      button.removeClass('d-none')
    },
    hideSetupButton() {
      const button = $('#set-up-apple-pay-button')
      button.addClass('d-none')
      button.off('click')
    },
    showError(text) {
      const error = $('.apple-pay-error')
      error.text(text)
      error.removeClass('d-none')
    },
    showSuccess() {
      $('.apple-pay-intro').hide()
      const success = $('.apple-pay-success')
      success.removeClass('d-none')
    },
    supportedByDevice() {
      return 'ApplePaySession' in window
    },
    supportsSetup() {
      return 'openPaymentSetup' in ApplePaySession
    },
    getPageLanguage() {
      return $('html').attr('lang') || 'en'
    },
    getMerchantIdentifier() { 
      return $("meta[name='apple-pay-merchant-id']").attr('content')
    },
  },
}

window.callApplePayMerchant = function () {  
  let merchantIdentifier
  const initiativeTypeString =
    $('#hdninItiativeType').val() || $('#qd_initiativeType').val() || ''
  const isCartSourceVal = $('#hdnisCartSource').val() || ''
  // alert(initiativeTypeString);
  fetch(`/payment/GetMerchantIdentifier?initaitive=${initiativeTypeString}&isCart=${isCartSourceVal}`)
    .then((res) => res.json())
    .then((res) => {
      merchantIdentifier = res.data
      merchantId = merchantIdentifier
      // Get the merchant identifier from the page meta tags.
      // var merchantIdentifier = ihsan.applePay.getMerchantIdentifier();
      if (!merchantIdentifier) {
        ihsan.applePay.showError(
          'No Apple Pay merchant certificate is configured.'
        )
      }
      // Is ApplePaySession available in the browser?
      else if (ihsan.applePay.supportedByDevice()) {
        // Determine whether to display the Apple Pay button. See this link for details
        // on the two different approaches: https://developer.apple.com/documentation/applepayjs/checking_if_apple_pay_is_available
        if (ApplePaySession.canMakePayments() === true) {
          ihsan.applePay.showAccordion()
          ihsan.applePay.showButton()
        } else {
          ApplePaySession.canMakePaymentsWithActiveCard(
            merchantIdentifier
          ).then((canMakePayments) => {
            if (canMakePayments === true) {
              ihsan.applePay.showAccordion()
              ihsan.applePay.showButton()
            } else if (ihsan.applePay.supportsSetup()) {
              ihsan.applePay.showAccordion()
              ihsan.applePay.showSetupButton(merchantIdentifier)
            } else {
              ihsan.applePay.showError(
                'Apple Pay cannot be used at this time. If using macOS you need to be paired with a device that supports at least TouchID.'
              )
            }
          })
        }
      } else {
        ihsan.applePay.showError(
          'This device and/or browser does not support Apple Pay.'
        )
        ihsan.applePay.hideAccordion()
      }
    })
}

window.callApplePayMerchant()
