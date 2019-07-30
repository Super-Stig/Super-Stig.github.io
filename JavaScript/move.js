var outer = document.querySelector('.outer-path'),  
    inner = document.querySelector('.inner-path'),
	success = document.querySelector('.success-path'),
  error = document.querySelector('.error-path'),
  error2 = document.querySelector('.error-path2');
var outerCircle, innerCircle, successSegment, errorSegment, errorSegment2;
var successAnimation = function() { 
    successSegment.set(
      {
        start: '60%',
        end: '100%',
        duration: 0.4
      });
}
errorAnimation = function(){
    
    errorSegment.set({
      start: '60%', 
      end: '100%',
      duration: 0.4
    });
    errorSegment2.set({
      start: '65%',
      end: '100%',
      duration: 0.4
    });
};
var succeed = false; 
var err = false;
var triggerError = function(){
    err = true;
}
var triggerSuccess = function(){
    succeed = true;
}
function outerAnimation() {
	outerCircle.set({
    start: '15%',
    end: '25%',
    duration: 0.2,
    callback: function() {
      outerCircle.set({   
        start: '75%',
        end: '150%',
        duration: 0.3,  
        follow: true,
        callback: function() { 
          outerCircle.set({
            start: '70%',
            end: '75%',
            duration: 0.3,
            callback: function() {
              outerCircle.set({
                start: '100%',
                end: '100.1%',
                duration: 0.4,
                follow: true,
                callback: function() {
                  if(succeed == true) {
                    success.style.visibility = 'visible';
                    outer.style.visibility = 'hidden';
                    inner.style.visibility = 'hidden';
                    successAnimation();
                  }
                  else if (err == true) {
                    error.style.visibility = 'visible';
                    error2.style.visibility = 'visible';
                    outer.style.visibility = 'hidden';
                    inner.style.visibility = 'hidden';
                    errorAnimation();
                  }
                  else {
                  	outerAnimation();
                  	innerAnimation();  
                  }
                  
                }
              })
            }
          }); 
        }
      });    
    }
  }); 
}
function innerAnimation(){  
    innerCircle.set(
      {
        start: '20%',
        end: '80%',
        duration: 0.6,
        callback: function() {
          innerCircle.set({
            start: '100%',
            end: '100.1%',
            duration: 0.6,
            follow: true
          });
        }
      }
    );
}
var successBtn = document.querySelector('.success');
successBtn.addEventListener('click', function() {
  triggerSuccess();
});
var errBtn = document.querySelector('.error');
errBtn.addEventListener('click', function() {
  triggerError();
})
var reset = function() {
  success.style.visibility = 'hidden';
  error.style.visibility = 'hidden';
  error2.style.visibility = 'hidden';
  succeed = false; 
	err = false;
  successSegment = new Moveit(success, {
   	start: '0%',
    end: '0.1%'
  });
  errorSegment = new Moveit(error, {
    start: '0%',
    end: '0.1%'
  });
  errorSegment2 = new Moveit(error2, {
    start: '0%',
    end: '0.1%'
  });
  
  outerCircle = new Moveit(outer, {
      start: '0%',
      end: '0.1%'
  });
  innerCircle = new Moveit(inner, {
      start: '0%',
      end: '0.1%'
  });
  outer.style.visibility = 'visible';
	inner.style.visibility = 'visible';
  setTimeout(function() {
  	outerAnimation(); 
		innerAnimation();  
  });
  
  
  
}
var submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', function() {
  reset();
  document.querySelector('svg').style.visibility = 'visible';
  
});