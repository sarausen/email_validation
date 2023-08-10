//-------------------email validation-------------------

// clear form onload page
window.onload = (function() {
  $('#email').val(null);
  $("input[id='email']").val('');
}); 

$(window).on('pageshow', function() {
  $('#email')[0].reset();
});

$(document).ready(function() {
  // global var
  var minLength = 8;
  var maxLength = 50;
  var emailRegEx = /^([a-zA-Z0-9._\-]+|[a-zA-Z0-9]+(?:[._\-][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var input = document.querySelector('#email');

  // clear form onload page
  $("input[id='email']").val('');

  // keypress enter - false
  $('#email').keypress(function(e) {
      let key = e.which;

      if(key == 13) {
          return false;  
      }
  });  


  // check max len
  $('#email').on('keydown keypress', function(e) {
      let val = $(this).val();
      
      if (val.length >= maxLength && e.keyCode !== 8 && e.keyCode !== 46) {
        e.preventDefault();
      }
  });


  // check deny char    
  function denyChar(infoCallback) {
    $('#email').on('keypress', function(event) {
      let regex = /[a-zA-Z0-9.\-_@]/;
      let char = String.fromCharCode(event.which);

      if (!regex.test(char)) {
        setTimeout(function() {    
            event.preventDefault();
            $('.valid_info').text('Latin letters, numbers and some symbols are allowed in this field').css('color', 'red');
            setTimeout(function() {
              infoCallback();
            }, 1000); 
        }, 1000);
        return false;
      }
      else { 
        infoCallback();      
        return true;
      }
    });
  }


  // validate email
  $('#email').on('blur keydown keyup change', function(){
    validateEmail();
  }); 

  let emailVal = false;

  function validateEmail() {
    if (input.value.length >= minLength && input.value.length <= maxLength) {  
      let regexFirst = /^[a-zA-Z0-9]+$/;
      let regexD = /(.)\1{6}/;

      // check char "@"
      if (input.value.indexOf('@') !== -1) {
        let email = $('#email').val();
        let atIndex = email.indexOf('@');

        // check dots 
        if (atIndex >= 0) {
          let domain = email.split('@')[1];
          let numDots = (domain.match(/\./g) || []).length;

          // check more than 2 dots in a row after "@"
          if (/@.*?\.{2,}/.test(email)) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info').text('The address entered is invalid. Check the address you entered').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info').text('The address entered is invalid. Check the address you entered').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          }
          // check more than 2 dots after "@"
          else if (numDots >= 3) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info').text('The address entered is invalid. Too many dots after "@"').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info').text('The address entered is invalid. Too many dots after "@"').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          }
          // check first char
          else if (!regexFirst.test($('#email').val().charAt(0))) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          } 
          // check duplicates
          else if (regexD.test($('#email').val())) {
            $('#email').removeClass('valid');
            $('#email').removeClass('invalid');
            $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
            $('#email').addClass('invalid'); 
            let infoCallback = function() {
              $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
          }
          else {
            // checking emailRegEx validation
            if (emailRegEx.test($('#email').val())) {
              // check first char
              if (!regexFirst.test($('#email').val().charAt(0))) {
                $('#email').removeClass('valid');
                $('#email').removeClass('invalid');
                $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
                $('#email').addClass('invalid'); 
                let infoCallback = function() {
                  $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
                };
                denyChar(infoCallback);
                emailVal = false;
                return false;
              } 
              // check duplicates
              else if (regexD.test($('#email').val())) {
                $('#email').removeClass('valid');
                $('#email').removeClass('invalid');
                $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
                $('#email').addClass('invalid'); 
                let infoCallback = function() {
                  $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
                };
                denyChar(infoCallback);
                emailVal = false;
                return false;
              }
              else {
                $('#email').removeClass('valid');
                $('#email').removeClass('invalid');
                $('.valid_info').text('The entered address is valid').css('color', 'green');
                $('#email').addClass('valid');
                let infoCallback = function() {
                  $('.valid_info').text('The entered address is valid').css('color', 'green');
                };
                denyChar(infoCallback);
                emailVal = true;
                return true;     
              }
            }
            else {
              $('#email').removeClass('valid');
              $('#email').removeClass('invalid');
              $('.valid_info').text('The address entered is invalid').css('color', 'red');
              $('#email').addClass('invalid'); 
              let infoCallback = function() {
                $('.valid_info').text('The address entered is invalid').css('color', 'red');
              };
              denyChar(infoCallback);
              emailVal = false;
              return false;
            }
          }
        }     
      }   
      // check first char
      else if (!regexFirst.test($("#email").val().charAt(0))) {
        $('#email').removeClass('valid');
        $('#email').removeClass('invalid');
        $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
        $('#email').addClass('invalid'); 
        let infoCallback = function() {
          $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
        };
        denyChar(infoCallback);
        emailVal = false;
        return false;
      } 
      // check duplicates
      else if (regexD.test($('#email').val())) {
        $('#email').removeClass('valid');
        $('#email').removeClass('invalid');
        $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
        $('#email').addClass('invalid'); 
        let infoCallback = function() {
          $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
        };
        denyChar(infoCallback);
        emailVal = false;
        return false;
      }
      else {
        $('#email').removeClass('valid');
        $('#email').removeClass('invalid');
        $('.valid_info').text('The entered address is invalid, please enter "@"').css('color', 'red');
        $('#email').addClass('invalid'); 
        let infoCallback = function() {
          $('.valid_info').text('The entered address is invalid, please enter "@"').css('color', 'red');
        };
        denyChar(infoCallback);
        emailVal = false;
        return false;
      }    
    }           
    else if (input.value.length == 0) {
        $('#email').removeClass('valid');
        $('#email').removeClass('invalid');
        $('.valid_info').text('');
        let infoCallback = function() {
          $('.valid_info').text('');
        };
        denyChar(infoCallback);
        emailVal = false;
        return false;
    }
    else {
      if ((input.value.length > 0 && input.value.length < minLength) || input.value.length > maxLength) {
        $('#email').removeClass('valid');
        $('#email').removeClass('invalid');
        $('.valid_info').text('The entered address is invalid, ' + minLength + ' to ' + maxLength + ' characters are allowed').css('color', 'red');
        $('#email').addClass('invalid'); 
        let infoCallback = function() {
          $('.valid_info').text('The entered address is invalid, ' + minLength + ' to ' + maxLength + ' characters are allowed').css('color', 'red');
        };
        denyChar(infoCallback);

        let regexFirst = /^[a-zA-Z0-9]+$/;
        let regexD = /(.)\1{6}/;

        // check first char
        if (!regexFirst.test($("#email").val().charAt(0))) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info').text('The address entered is invalid. The first character can only be a letter or a number').css('color', 'red');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
        } 
        // check duplicates
        else if (regexD.test($('#email').val())) {
          $('#email').removeClass('valid');
          $('#email').removeClass('invalid');
          $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
          $('#email').addClass('invalid'); 
          let infoCallback = function() {
            $('.valid_info').text('The address entered is invalid. Too many identical characters').css('color', 'red');
          };
          denyChar(infoCallback);
          emailVal = false;
          return false;
        }

        emailVal = false;
        return false;      
      }
    }
  }


  // input parameters
  $(document).ready(function() {    
    $('#email').on("keypress", function(event) {
      let input = $("#email");
      let value = input.val();
      let key = String.fromCharCode(event.which);

      // first character can only be [a-zA-Z0-9]
      if (value.length === 0 && !/[a-zA-Z0-9]/.test(key)) {
        event.preventDefault();
        return false;
      }

      // starting from the second, you can enter [a-zA-Z0-9.-_]
      if (value.length === 1 && !/[a-zA-Z0-9\-_.]/.test(key)) {
        event.preventDefault();
        return false;
      }

      // starting from the third character, you can enter [a-zA-Z0-9.\-_@]
      if (value.length >= 2 && !/[a-zA-Z0-9.\-_@]/.test(key)) {
        event.preventDefault();
        return false;
      }

      // the input cannot contain two or more dots in a row (for example, '..' or '....')
      if (key === "." && value.slice(-1) === ".") {
        event.preventDefault();
        return false;
      }

      // in the input, the limit on the number of consecutive identical characters is up to 5
      $(document).ready(function() {
        $('#email').on('input', function() {
          let value = $(this).val();
          let regex = /(.)\1{6}/;
          
          if (regex.test(value)) {
            $(this).val(value.slice(0, -1));
          }
        });
      });  
    
      // character limit after "@" 
      $(document).ready(function() {
        $('#email').on('keypress', function(event) {
          let key = String.fromCharCode(event.which);
          let value = $(this).val();
      
          // if the character "@" is entered, limit the input of the first character after "@"
          if (value.indexOf("@") !== -1 && value.indexOf(".") === -1 && value.slice(-1) === "@" && !/[a-zA-Z0-9]/.test(key)) {
            event.preventDefault();
            return false;
          }

          // after the first character after "@", allow letters, numbers, dots, hyphens, or underscores
          if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+2) !== -1 && /[a-zA-Z0-9.\-_]/.test(value.slice(-1)) && !/[a-zA-Z0-9.\-_]/.test(key)) {
            event.preventDefault();
            return false;
          }

          // if "@" is found followed by ".", only characters [a-zA-Z0-9.\-_] are allowed
          if (value.indexOf("@") !== -1 && value.indexOf(".") !== -1 && value.indexOf(".") > value.indexOf("@") && !/[a-zA-Z0-9.\-_]/.test(key)) {
            event.preventDefault();
            return false;
          }
        

          // if "@" is found, only 2 dots can be entered after it
          if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+1) !== -1 && value.indexOf(".", value.indexOf("@")+1) !== value.lastIndexOf(".") && value.indexOf(".", value.indexOf("@")+1) !== -1 && !/[a-zA-Z]/.test(key)) {
            event.preventDefault();

            // if found "." allow input [a-zA-Z0-9.\-_]
            if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")+1) !== -1 && value.indexOf(".", value.indexOf("@")+1) === value.lastIndexOf(".") && !/[a-zA-Z0-9.\-_]/.test(key)) {
              event.preventDefault();    
              return false;
            }

            // if a second entered "." is found after "@", only the characters [a-zA-Z] are allowed
            if (value.indexOf("@") !== -1 && value.indexOf(".", value.indexOf("@")) !== -1 && value.indexOf(".", value.indexOf(".", value.indexOf("@")+1)) !== -1 && !/[a-zA-Z]/.test(key)) {
              event.preventDefault();
              return false;
            }
               
            return false;
          }
        });
      });    
              
      
      // allow enter "@" only one times
      $(document).ready(function() {
        let inputField = $('#email');
      
        inputField.on('keypress', function(e) {
          let currentValue = $(this).val();
      
          if (e.which === 64 && currentValue.indexOf('@') !== -1) {
            e.preventDefault();
          }
        });
      });

      
      // allowed chars
      $('#email').on('keypress', function(e) {
          let allowedChars = /[a-zA-Z0-9._@-]/;
          let charCode = (typeof e.which === "number") ? e.which : e.keyCode;

          // allow input "@" after the second character
          if (!allowedChars.test(String.fromCharCode(charCode))) {
          e.preventDefault();
          }      
      });  
    });
  });


  // remove emoji
  $(document).ready(function() {
      var ranges = [
          '[\u00A0-\u269f]',
          '[\u26A0-\u329f]',
          // The following characters could not be minified correctly
          // if specifed with the ES6 syntax \u{1F400}
          '[🀄-🧀]',
          '[\u{1F004}-\u{1F9C0}]',
          '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
          '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
          '\ud83d[\ude80-\udeff]',
          '[\uE000-\uF8FF]',
          '[\u2011-\u26FF]',
          '\uD83E[\uDD10-\uDDFF]'
      ];
          
      $('#email').on('keydown keyup change', function() {
          removeInvalidChars();
      });
      
      function removeInvalidChars() {
          var str = $('#email').val();
          str = str.replace(new RegExp(ranges.join('|'), 'ug'), '');
          $('#email').val(str);
      }
  });

  // event handler on form submission
  $('form').on('submit', function(e) {
    if (!validateEmail()) {
      e.preventDefault(); // cancel form submission if validation fails
    }
  });


  // check validation
  $('#email').on('blur keyup change', function() {
    validateEmail();

    if (emailVal == true) {
        $('#btn_next').prop('disabled', false).attr("onclick", "window.location.href='index.html';"); 

        $('#email').keypress(function(e) {
            if (emailVal == true) {
                var key = e.which;

                if(key == 13) {
                    $('#btn_next').click();
                    return false;  
                }
            }
        });   
        return true;
    } 
    else {
        $('#btn_next').prop('disabled', true);

        $('#email').keypress(function(e) {
            var key = e.which;

            if(key == 13) {
                return false;  
            }
        });   
        return false;
    }
  });

});