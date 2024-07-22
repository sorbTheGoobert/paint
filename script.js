const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", );

var drawingBoard = {
    width: 1440,
    height: 900,
    color: black,
    load: function() {
        canvas.width = `${this.width}`;
        canvas.height = `${this.height}`;
    },
}

function draw() {
    ctx.fillStyle = drawingBoard.color;
    ctx.fillRect(Math.floor(event.clientX), Math.floor(event.clientY), 1, 1);
    console.log("yeah");
}

function init() {
    drawingBoard.load();
}

init();