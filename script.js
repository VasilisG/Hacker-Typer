var charsPerKeyStroke = 5;
var startIndex = 0;
var endIndex = 0;
var sourceCode = "";
var sourceElement;
var sourceContainer;
var fileName = "code.txt";
var cursorChar = "|";

function getFileContents() {
    var rawFile = new XMLHttpRequest();
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                sourceCode = rawFile.responseText;
            }
        }
    };
    rawFile.open("GET", fileName, true);
    rawFile.send();
}

function getElements() {
    sourceContainer = document.getElementById("container");
    sourceElement = document.getElementById("source");
}

function init() {
    getFileContents();
    getElements();
    window.setInterval(updateCursor, 500);
}

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

function updateScreen() {
    endIndex += charsPerKeyStroke;
    sourceElement.textContent = sourceCode.substring(startIndex, endIndex);
}

function updateScrollPosition() {
    window.scrollTo(0, sourceContainer.scrollHeight);
}

function update() {
    updateScreen();
    updateScrollPosition();
}

function run() {
    window.onload = init;
    window.onkeydown = update;
}

run();
