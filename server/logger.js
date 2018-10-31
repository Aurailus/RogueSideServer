/* ******************** *\
-Control Codes for Logger-

	Reset = "\x1b[0m"
	Bright = "\x1b[1m"
	Dim = "\x1b[2m"
	Underscore = "\x1b[4m"
	Blink = "\x1b[5m"
	Reverse = "\x1b[7m"
	Hidden = "\x1b[8m"

	FgBlack = "\x1b[30m"
	FgRed = "\x1b[31m"
	FgGreen = "\x1b[32m"
	FgYellow = "\x1b[33m"
	FgBlue = "\x1b[34m"
	FgMagenta = "\x1b[35m"
	FgCyan = "\x1b[36m"
	FgWhite = "\x1b[37m"

	BgBlack = "\x1b[40m"
	BgRed = "\x1b[41m"
	BgGreen = "\x1b[42m"
	BgYellow = "\x1b[43m"
	BgBlue = "\x1b[44m"
	BgMagenta = "\x1b[45m"
	BgCyan = "\x1b[46m"
	BgWhite = "\x1b[47m"

\* ******************** */

(function() {
	isVerbose = function() {
		if (process.argv[2]) {
			return process.argv[2].includes('v') || process.argv[2].includes('V');
		}
		return false;
	}
	isChatty = function() {
		if (process.argv[2]) {
			return process.argv[2].includes('c') || process.argv[2].includes('V');
		}
		return false;
	}
	isntSilent = function() {
		if (process.argv[2]) {
			return !process.argv[2].includes('s');
		}
		return true;
	}

	module.exports.chat = function() {
		if (isChatty()) {
			process.stdout.write('\x1b[35m<' + getTime() + '|' + arguments[0] + '> ');
			console.log(makeString(Array.prototype.slice.call(arguments, 1)));
			process.stdout.write('\x1b[0m');
		}
	}
	
	module.exports.boot = function() {
		process.stdout.write('\x1b[1m[' + getTime() + '|BOOT] ');
		console.log(makeString(arguments));
		process.stdout.write('\x1b[0m');
	}

	module.exports.important = function() {
		if (isntSilent()) {
			process.stdout.write('\x1b[1m[' + getTime() + '|INFO] ');
			console.log(makeString(arguments));
			process.stdout.write('\x1b[0m');
		}
	}

	module.exports.info = function() {
		if (isVerbose()) {
			process.stdout.write('[' + getTime() + '|INFO] ');
			console.log(makeString(arguments));
			process.stdout.write('\x1b[0m');
		}
	}

	module.exports.warn = function() {
		if (isVerbose()) {
			process.stdout.write('\x1b[31m[' + getTime() + '|WARN] ');
			console.log(makeString(arguments));
			process.stdout.write('\x1b[0m');
		}
	}

	module.exports.crash = function() {
		if (isntSilent()) {
			process.stdout.write('\x1b[37m\x1b[41m[' + getTime() + '|FAIL] ');
			console.log(makeString(arguments));
			process.stdout.write('\x1b[0m');
		}
	}

	function getTime() {
		var date = new Date();
		var y = (date.getFullYear()+"").substr(2, 2);
		var m = date.getMonth()+1;
		var d = date.getDate();
		var h = date.getHours();
		var mm = date.getMinutes();
		var s = date.getSeconds();
		return (y < 10 ? "0" + y : y) + "/" +
			(m < 10 ? "0" + m : m) + "/" +
			(d < 10 ? "0" + d : d) + "|" +
			(h < 10 ? "0" + h : h) + ":" +
			(mm < 10 ? "0" + mm : mm) + ":" +
			(s < 10 ? "0" + s : s);
	}

	function makeString(data) {
		var string = "";
    if (data.length == 1) return data[0];
    else {
	    for (var i = 0; i < data.length; i++) {
	      string += data[i];
	      if (i != 0) data += ", ";
	    }
	    return string;
    }
	}
}())
