/**
 * Getting Started
 *
 * node main.js test.md result.md
 */

var fs = require('fs')
fs.readFile(process.argv[2], 'utf8', function (err, markdown) {
	if (err) {
		return console.log(err);
	}
	var counter = 1;
	var matches = {};
	var matcher = /\[.*?\]\((.*?)\)/g;
	while (match = matcher.exec(markdown)) {
		if (!matches[match[1]]) matches[match[1]] = counter++;
	}
	Object.keys(matches).forEach(function(url) {
		var number = matches[url];
		// uncomment below and comment above for numbering in reverse
		//var number = Object.keys(matches).length - matches[url] + 1;
		var r = new RegExp("(\\[.*?\\])\\(" + url + "\\)", "g");
		markdown = markdown.replace(r, "$1[" + number + "]");
		markdown += "\n[" + number + "]: " + url;
	});

	fs.writeFile(process.argv[3], markdown, 'utf8', function (err) {
		if (err) return console.log(err);
	});

});