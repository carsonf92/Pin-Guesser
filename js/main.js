// Restricts input for the given textbox to the given inputFilter
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

setInputFilter(document.getElementById("pin-input"), function(value) {
  return /^\d*$/.test(value);
});

// Activate button
document.querySelector('input').addEventListener('keyup', function(){
	if (this.value.length > 0) {
		document.querySelector('.button').classList.remove('disabled');
	} else {
		document.querySelector('.button').classList.add('disabled');
	}
});

// Declare global variables
var pin,
	guess,
	duration,
	time;

// Guess the pin number with a known number of digits
function guessPin(numberOfDigits) {
	var startTime = new Date();
	guess = -1;
	while (guess != pin) {
		guess = (parseInt(guess) + 1).toString();
		if (guess.length < numberOfDigits) {
			for (i = guess.length; i < numberOfDigits; i++) {
				guess = '0' + guess;
			}
		}
	}
	var endTime = new Date();
	duration = endTime - startTime;
	return guess;
}

// Convert milliseconds to time format
function msToTime(duration) {
	var milliseconds = duration % 1000,
		seconds = parseInt((duration / 1000).toFixed(0)),
		minutes = parseInt((duration / (1000 * 60)).toFixed(0)),
		hours = parseInt((duration / (1000 * 60 * 60)).toFixed(0));

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

	time = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
	return time;
}

// Run pin breaker
document.querySelector('.button').addEventListener('click', function(){
	pin = document.querySelector('input').value;
	guessPin(pin.length);
	msToTime(duration);
	
	// Output results
	document.getElementById('pin').innerHTML = pin;
	document.getElementById('time').innerHTML = time;
});