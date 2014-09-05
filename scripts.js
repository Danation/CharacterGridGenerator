$(function () {
	"use strict";

	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		substitutions = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890",
		randomGrid;

	function generateRandomGrid(size) {
        var randomWords = new Uint16Array(size);
        window.crypto.getRandomValues(randomWords);
		return randomWords;
	}

	randomGrid = generateRandomGrid(alphabet.length * alphabet.length);

	function generateTable(element) {
		var i, j, tr, td;
		for (i = -1; i < alphabet.length; i++) {
			tr = $("<tr>");

			for (j = -1; j < alphabet.length; j++) {
				td = $("<td>");
				// First row heading labels
				if (i === -1) {
					if (j >= 0) {
						td.addClass("label");
						td.html(alphabet[j]);
					}
					else {
						td.addClass("noBorder");
					}
				}
				else {
					// First Column side labels
					if (j === -1) {
						td.addClass("label");
						td.html(alphabet[i]);
					}
					// Grid values
					else {
						// Find the random number that corresponds to this item in the grid.
						// Mod it with the length of the substitution list, and use that item in the substitution list.
						td.html(substitutions[randomGrid[(i * alphabet.length) + j] % substitutions.length]);
					}
				}
				tr.append(td);
			}
			element.append(tr);
		}
	}

	generateTable($("#grid"));
});

