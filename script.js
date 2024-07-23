const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var drawingBoard = {
    width: 1440,
    height: 900,
    saves: new Array(10),
    load: function () {
        canvas.width = `${this.width}`;
        canvas.height = `${this.height}`;
    },
    clear: function() {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = `rgba(${bgr}, ${bgg}, ${bgb}, ${bga})`;
        ctx.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
    }
}

function back() {
    amountOfMousePress--;
    if (amountOfMousePress < 0) {
        amountOfMousePress += 10;
    }
    drawingBoard = drawingBoard.saves[amountOfMousePress];
}

var held = false;
var amountOfMousePress = 1;
function isheld(event) {
    held = true;
}
function notheld(event) {
    held = false;
    drawingBoard.saves[amountOfMousePress] = canvas;
    amountOfMousePress++;
    if(amountOfMousePress > 9){
        amountOfMousePress-=10;
    }
    console.log(amountOfMousePress);
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
    color: `rgba(${r}, ${g}, ${b}, ${a})`,
    draw: function () {
        if (held) {
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

var droppedColor = false;
function dropColor() {
    if (!droppedColor) {
        droppedColor = true;
        document.getElementById("colorDropDown").style = "display: flex";
        document.getElementById("colorDropDown").style.top = `${document.getElementById("colorButton").offsetTop + document.getElementById("colorButton").offsetHeight}px`;
        document.getElementById("colorDropDown").style.left = `${document.getElementById("colorButton").offsetLeft}px`;
        document.getElementById("colorDropDown").style.width = `${document.getElementById("colorButton").offsetWidth}px`;
    } else {
        droppedColor = false;
        document.getElementById("colorDropDown").style = "display: none";
    }
}

var droppedBackground = false;
function dropBackground() {
    if (!droppedBackground) {
        droppedBackground = true;
        document.getElementById("backgroundDropDown").style = "display: flex";
        document.getElementById("backgroundDropDown").style.top = `${document.getElementById("backgroundButton").offsetTop + document.getElementById("backgroundButton").offsetHeight}px`;
        document.getElementById("backgroundDropDown").style.left = `${document.getElementById("backgroundButton").offsetLeft}px`;
        document.getElementById("backgroundDropDown").style.background = `${document.getElementById("backgroundButton").offsetbackground}px`;
    } else {
        droppedBackground = false;
        document.getElementById("backgroundDropDown").style = "display: none";
    }
}

var droppedWidth = false;
function dropWidth() {
    if (!droppedWidth) {
        droppedWidth = true;
        document.getElementById("widthDropDown").style = "display: flex";
        document.getElementById("widthDropDown").style.top = `${document.getElementById("widthButton").offsetTop + document.getElementById("widthButton").offsetHeight}px`;
        document.getElementById("widthDropDown").style.left = `${document.getElementById("widthButton").offsetLeft}px`;
        document.getElementById("widthDropDown").style.width = `${document.getElementById("widthButton").offsetWidth}px`;
    } else {
        droppedWidth = false;
        document.getElementById("widthDropDown").style = "display: none";
    }
}

var r, g, b, a;
function changeColor() {
    r = document.getElementById("red").value;
    g = document.getElementById("green").value;
    b = document.getElementById("blue").value;
    a = document.getElementById("alpha").value;
    mouse.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    document.getElementById("color").style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

var bgr = 255, bgg = 255, bgb = 255, bga = 255;
function changeBGColor() {
    bgr = document.getElementById("BGred").value;
    bgg = document.getElementById("BGgreen").value;
    bgb = document.getElementById("BGblue").value;
    bga = document.getElementById("BGalpha").value;
    ctx.fillStyle = `rgba(${bgr}, ${bgg}, ${bgb}, ${bga})`;
    ctx.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
    document.getElementById("BGcolor").style.backgroundColor = `rgba(${bgr}, ${bgg}, ${bgb}, ${bga})`;
}

function downloadImage() {

    // Grab the canvas element
    let canvas = document.getElementById("canvas");

    /* Create a PNG image of the pixels drawn on the canvas using the toDataURL method. PNG is the preferred format since it is supported by all browsers
    */
    var dataURL = canvas.toDataURL("image/png");

    // Create a dummy link text
    var a = document.createElement('a');
    // Set the link to the image so that when clicked, the image begins downloading
    a.href = dataURL
    // Specify the image filename
    a.download = 'canvas-drawing .jpeg';
    // Click on the link to set off download
    a.click();
}

function changeWidth() {
    mouse.drawSize = document.getElementById("width").value;
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