const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var drawingBoard = {
    width: 1440,
    height: 900,
    load: function () {
        canvas.width = `${this.width}`;
        canvas.height = `${this.height}`;
    },
    clear: function() {
        ctx.clearRect(0, 0, this.width, this.height);
    }
}

var held = false;
function isheld(event) {
    console.log(true);
    held = true;
}
function notheld(event) {
    console.log(false);
    held = false;
}

function checkMousePos(event) {
    mouse.xBefore = mouse.x;
    mouse.yBefore = mouse.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

var mouse = {
    x: undefined,
    y: undefined,
    xBefore: undefined,
    yBefore: undefined,
    drawSize: 5,
    color: "black",
    draw: function () {
        if (held) {
            console.log("drawing");
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineCap = "round";
            ctx.lineWidth = this.drawSize;
            ctx.moveTo(this.xBefore, this.yBefore);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();
        }
    },
    
}

function init() {
    drawingBoard.load();
    update();
}
function update() {
    // checkMousePos();
    mouse.draw();
    requestAnimationFrame(update);
}

init();