const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let storage = [0, 0];
let currentTool = "brush";
let r = 0, g = 0, b = 0, a = 1;
let bgr = 255, bgg = 255, bgb = 255, bga = 1;
let startingPoint;
let endingPoint;
let lineCheck = 0;
let squareCheck = 0;
let circleCheck = 0;

let drawingBoard = {
    width: 1440,
    height: 900,
    load: function () {
        canvas.width = `${this.width}`;
        canvas.height = `${this.height}`;
    },
    clear: function () {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = `rgba(${bgr}, ${bgg}, ${bgb}, ${bga})`;
        ctx.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
    }
}

let mouse = {
    x: undefined,
    y: undefined,
    xBefore: undefined,
    yBefore: undefined,
    drawSize: 5,
    color: `rgba(${r}, ${g}, ${b}, ${a})`,
    draw: async function () {
        if (currentTool == "brush") {
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
        } else if (currentTool == "eraser") {
            if (held) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${bgr}, ${bgg}, ${bgb}, ${bga})`;
                ctx.lineCap = "round";
                ctx.lineWidth = this.drawSize;
                ctx.moveTo(this.xBefore, this.yBefore);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();
                ctx.closePath();
            }
        } else if (currentTool == "line") {
            if (held && lineCheck % 2 == 0) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineCap = "round";
                ctx.lineWidth = this.drawSize;
                ctx.moveTo(startingPoint[0], startingPoint[1]);
                lineCheck++;
            } else if (!held && lineCheck % 2 == 1) {
                ctx.lineTo(endingPoint[0], endingPoint[1]);
                ctx.stroke();
                ctx.closePath();
                lineCheck++;
            }
        } else if (currentTool == "square") {
            if (held && squareCheck % 2 == 0) {
                ctx.fillStyle = this.color;
                squareCheck++;
            } else if (!held && squareCheck % 2 == 1) {
                ctx.fillRect(startingPoint[0], startingPoint[1], endingPoint[0] - startingPoint[0], endingPoint[1] - startingPoint[1]);
                squareCheck++;
            }
        } else if (currentTool == "circle") {
            if (held && circleCheck % 2 == 0) {
                ctx.beginPath();
                circleCheck++;
            } else if (!held && circleCheck % 2 == 1) {
                let radius;
                if(Math.abs(endingPoint[0] - startingPoint[0]) >= Math.abs(endingPoint[1] - startingPoint[1])){
                    radius = Math.abs(endingPoint[0] - startingPoint[0]);
                }else{
                    radius = Math.abs(endingPoint[1] - startingPoint[1]);
                }
                ctx.arc(startingPoint[0], startingPoint[1], radius, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill()
                circleCheck++;
            }
        }
    },
}

let held = false;
function isheld() {
    startingPoint = [mouse.x, mouse.y];
    held = true;
}
function notheld() {
    endingPoint = [mouse.x, mouse.y];
    held = false;
}

function checkMousePos(event) {
    mouse.xBefore = mouse.x;
    mouse.yBefore = mouse.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}


let droppedColor = false;
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

let droppedBackground = false;
function dropBackground() {
    if (!droppedBackground) {
        droppedBackground = true;
        document.getElementById("backgroundDropDown").style = "display: flex";
        document.getElementById("backgroundDropDown").style.top = `${document.getElementById("backgroundButton").offsetTop + document.getElementById("backgroundButton").offsetHeight}px`;
        document.getElementById("backgroundDropDown").style.left = `${document.getElementById("backgroundButton").offsetLeft}px`;
        document.getElementById("backgroundDropDown").style.width = `${document.getElementById("backgroundButton").offsetWidth}px`;
    } else {
        droppedBackground = false;
        document.getElementById("backgroundDropDown").style = "display: none";
    }
}

let droppedWidth = false;
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

let droppedTools = false;
function dropTools() {
    if (!droppedTools) {
        droppedTools = true;
        document.getElementById("toolDropDown").style = "display: flex";
        document.getElementById("toolDropDown").style.top = `${document.getElementById("toolButton").offsetTop + document.getElementById("toolButton").offsetHeight}px`;
        document.getElementById("toolDropDown").style.left = `${document.getElementById("toolButton").offsetLeft}px`;
        document.getElementById("toolDropDown").style.width = `${document.getElementById("toolButton").offsetWidth}px`;
    } else {
        droppedTools = false;
        document.getElementById("toolDropDown").style = "display: none";
    }
}

function changeColor() {
    r = document.getElementById("red").value;
    g = document.getElementById("green").value;
    b = document.getElementById("blue").value;
    a = document.getElementById("alpha").value;
    mouse.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    document.getElementById("color").style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

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
    let dataURL = canvas.toDataURL("image/png");

    // Create a dummy link text
    let a = document.createElement('a');
    // Set the link to the image so that when clicked, the image begins downloading
    a.href = dataURL
    // Specify the image filename
    a.download = 'canvas-download.jpeg';
    // Click on the link to set off download
    a.click();
}

function changeWidth() {
    mouse.drawSize = document.getElementById("width").value;
}

function changeTool() {
    if (document.getElementById('tool').value == "brush") {
        currentTool = "brush";
    } else if (document.getElementById('tool').value == "eraser") {
        currentTool = "eraser";
    } else if (document.getElementById('tool').value == "line") {
        currentTool = "line";
    } else if (document.getElementById('tool').value == "square") {
        currentTool = "square";
    } else if (document.getElementById('tool').value == "circle") {
        currentTool = "circle";
    }
}

function init() {
    checkMousePos(canvas.onmousemove);
    // mouse.x = 0;
    // mouse.y = 0;
    drawingBoard.load();
    update();
}
function update() {
    mouse.draw();
    requestAnimationFrame(update);
}

init();
