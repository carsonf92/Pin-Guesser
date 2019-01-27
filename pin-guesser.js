// A brute-force algorithm that can determine a numeric pin of base-10 digits with a known length
// Demonstrated with the help of a randomly generated pin
// Displays the time taken to guess the pin

// Declare pin variable and initalize guess
var pin,
	guess,
	duration,
	time;

// Generate a random pin number from a provided number of digits
function generatePin(numberOfDigits) {
	var range = Math.pow(10, numberOfDigits);
	pin = (Math.floor(Math.random() * range) + range).toString().substring(1);
	return pin;
}

// Guess the pin number with a known number of digits
function guessPin(numberOfDigits) {
	console.log('Calculating...');
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

generatePin(4);
guessPin(4);
msToTime(duration);

// Result
console.log('Pin number: ' + pin);
console.log('Time elapsed: ' + time);