/**
 *	mateCard (HTML)
 *	Copyright © mateCard by beshleyua. All Rights Reserved.
 **/

$(function () {
  'use strict'

  var width = $(window).width()
  var height = $(window).height()

  /***
   **** Preloader
   ***/
  $(window).on('load', function () {
    $('.preloader .spinner').fadeOut(function () {
      $('.preloader').fadeOut()
      $('body').addClass('ready')
    })
  })

  /***
   **** Portfolio Filter
   ***/
  $('.filter').on('click', 'a', function () {
    var filter = $(this).attr('data-filter')

    $('.work-item').hide()
    $(filter).fadeIn()

    return false
  })

  /***
   **** Initialize collapse button
   ***/
  $('.menu-btn').sideNav()
  if (width < 1080) {
    $('.side-nav').css({ transform: 'translateX(-100%)' })
  }

  /***
   **** SideNav Menu Scroll
   ***/
  if ($('#home-section').length) {
    $(window).on('scroll', function () {
      var scrollPos = $(window).scrollTop()
      $('.side-nav li > a').each(function () {
        var currLink = $(this)
        var refElement = $(currLink.attr('href'))
        if (refElement.offset().top - 30 <= scrollPos) {
          $('.side-nav li').removeClass('active')
          currLink.closest('li').addClass('active')
        }
      })
    })
  }

  $('.scrollspy').scrollSpy({
    scrollOffset: 0
  })

  /***
   **** Validate contact form
   ***/
   $('#cform').validate({
    rules: {
        name: {
            required: true
        },
        message: {
            required: true
        },
        subject: {
            required: true
        },
        email: {
            required: true,
            email: true
        }
    },
    highlight: function (element) {
        $(element).addClass('invalid').removeClass('valid');
    },
    unhighlight: function (element) {
        $(element).removeClass('invalid').addClass('valid');
    },
    success: 'valid',
    submitHandler: function () {
        var submitButton = $('#cform').find('button[type="submit"]');
        var originalButtonText = submitButton.text();

        // Show loading spinner on the submit button
        submitButton
            .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...')
            .prop('disabled', true);

        const form = document.getElementById('cform');
        const formData = new FormData(form);

        fetch('https://formspree.io/f/xkgowypn', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success
                $('.alert-success').text("Thanks, your message is sent successfully. We will contact you shortly!").fadeIn();
                form.reset();
            } else {
                // Error from Formspree
                response.json().then(data => {
                    if (data.errors) {
                        var errormsg = data.errors.map(error => error.message).join(", ");
                        $('.alert-error').html(errormsg).fadeIn();
                    } else {
                        $('.alert-error').text("Oops! There was a problem submitting your form").fadeIn();
                    }
                });
            }
        })
        .catch(error => {
            // Network error or fetch failure
            $('.alert-error').text("Oops! There was a problem submitting your form").fadeIn();
        })
        .finally(() => {
            // Re-enable the submit button after the request
            submitButton.html(originalButtonText).prop('disabled', false);
        });
    }
});


  /***
   **** Validate comments form
   ***/
  $('#blog-form').validate({
    rules: {
      name: {
        required: true
      },
      message: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    highlight: function (element) {
      $(element).addClass('invalid')
      $(element).removeClass('valid')
    },
    unhighlight: function (element) {
      $(element).removeClass('invalid')
      $(element).addClass('valid')
    },
    success: 'valid',
    submitHandler: function () {
      $('#blog-form').fadeOut()
      $('.alert-success').delay(1000).fadeIn()
    }
  })

  /***
   **** Portfolio magnific popup
   ***/
  $('.card.work-item .activator').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    closeBtnInside: true,
    mainClass: 'mfp-fade'
  })

  /***
   **** Gallery
   ***/
  $('.post-lightbox').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  })
})
