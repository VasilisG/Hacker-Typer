/**
 * Variable initialization.
 */
var charsPerKeyStroke = 5;
var startIndex = 0;
var endIndex = 0;
var sourceCode = "";
var sourceElement;
var sourceContainer;
var fileName = "code.txt";
var cursorChar = "|";

/**
 * Gets the contents which will appear as the user types or taps.
 */
function getFileContents() {
    var rawFile = new XMLHttpRequest();
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                sourceCode = rawFile.responseText;
                console.log(sourceCode);
            }
        }
    };
    rawFile.open("GET", fileName, true);
    rawFile.send();
}

/**
 * Gets the areas which will be updated on each keystroke or tap.
 */
function getElements() {
    sourceContainer = document.getElementById("container");
    sourceElement = document.getElementById("source");
}

/**
 * Initializes variables and creates blinking cursor effect.
 */
function init() {
    getFileContents();
    getElements();
    window.setInterval(updateCursor, 500);
}

/**
 * Updates cursor position on each keystroke or tap.
 */
function updateCursor() {
    var text = sourceElement.textContent;
    var lastChar = text.charAt(text.length-1);
    if (lastChar === cursorChar) {
        sourceElement.textContent = text.substring(0,text.length-1);
    }
    else {
        sourceElement.textContent += cursorChar;
    }
}

/**
 * Sets updated code.
 */
function updateScreen() {
    endIndex += charsPerKeyStroke;
    sourceElement.textContent = sourceCode.substring(startIndex, endIndex);
}

/**
 * Updates scroll position to match code's height.
 */
function updateScrollPosition() {
    window.scrollTo(0, sourceContainer.scrollHeight);
}

/**
 * Updates all states.
 */
function update() {
    updateScreen();
    updateScrollPosition();
}

/**
 * Runs application.
 */
function run() {
    window.onload = init;
    window.onkeydown = update;
    window.ontouchstart = update;
}

run();
