

var previousX = 9;
var previousY = 4;

var currentX = 19;
var currentY = 4;

var draw = false;

var currentDirection = "90R";
var canvasa = oCanvas.create({
	canvas: "#canvas"
});


// var canvas1 = document.getElementById('mycanvas');

//     // Make sure we don't execute when canvas isn't supported
//     if (canvas1.getContext) {

//         // use getContext to use the canvas for drawing
//         var ctx1 = canvas1.getContext('2d');
//         ctx1.beginPath();
//         ctx1.moveTo(0, 0);

//         ctx1.lineTo(100,0); // right
//         ctx1.lineTo(0,100); // down
//         ctx1.lineTo(100,100); //left
//         ctx1.lineTo(0,0);
//         ctx1.stroke();

//     }

function drawShape() {


    // get the canvas element using the DOM
    var canvas = document.getElementById('mycanvas');

    // Make sure we don't execute when canvas isn't supported
    if (canvas.getContext) {

        // use getContext to use the canvas for drawing
        var ctx = canvas.getContext('2d');

        var instructions = document.getElementById("inst").value.split(",");
        var isSub1 = false;

        //start
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);

        for (var i = 0; i < instructions.length; i++) {
            instructions[i] = instructions[i].trim().toUpperCase();
            if (instructions[i].indexOf("F") > -1 && instructions[i].indexOf("FF") == -1) {
                var mag = instructions[i].substr(1);
                if (isSub1) {

                    if (mag > 1) {
                        mag = mag - 1;
                    } 
                    // else {
                    //     isSub1 = false;
                    //     continue;
                    // }
                }

                FMovement(mag, ctx);
                isSub1 = false;
            }
            else if (instructions[i].indexOf("ON") > -1 || instructions[i].indexOf("OFF") > -1) {
                if (instructions[i].indexOf("ON") > -1) {
                    draw = true;
                } else {
                    draw = false;
                    ctx.stroke();
                }
            }

            else if (instructions[i].indexOf("180") > -1) {
                //move180();
                changeDirection(instructions[i] + "L");
                isSub1 = true;
            }
            else if (instructions[i].indexOf("R") > -1 || instructions[i].indexOf("L") > -1) {
                changeDirection(instructions[i]);
                isSub1 = true;

            }
        }

        // Draw shapes
        //  ctx.beginPath();
        //  ctx.arc(75,75,50,0,Math.PI*2,true);  // Outer circle

        //  ctx.moveTo(110,75);
        //  ctx.arc(75,75,35,0,Math.PI,false);   // Mouth

        //  ctx.moveTo(65,65);
        //  ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye

        //  ctx.moveTo(95,65);
        //  ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
        //  ctx.stroke();

        //ctx.beginPath();
        //ctx.moveTo(currentX, currentY);

        // ctx.lineTo(currentX+50,currentY); // right
        // ctx.lineTo(currentX+50,currentY+20); // down
        // ctx.lineTo(currentX,currentY+20); //left
        // ctx.lineTo(currentX,currentY);


        //ctx.lineTo(currentX, currentY);
        // transform(190,true); -90deg
        //clockwise
        //transform(45, true); //45deg
        //for (var s = 0; s < 50; s++) {
        //    moveStraight();
        //}

        //ctx.lineTo(currentX, currentY);

        //  // transform(170,true); 90deg
        //  transform(90,true); //45deg
        //  for(var s = 0; s < 50; s++ ){
        //   moveStraight();
        // }

        //  ctx.lineTo(currentX,currentY);
        //ctx.lineTo(45,125);
        //ctx.closePath();
        //ctx.stroke();

    } else {
        alert('You need Safari or Firefox 1.5+ to see this demo.');
    }
}


// Move 45 degrees
function move45(direction, factor) {
    var straightVal = GetStraightCoordinate();

    if (direction == "r") {
        var otx = straightVal.a - currentX;
        var oty = straightVal.b - currentY;

        var rad = angle * Math.PI / 180;
        if (clockwise) {
            var rx = otx + oty / Math.sqrt(2);
            var ry = otx - oty / Math.sqrt(2);
        } else {
            var rx = otx - oty / Math.sqrt(2);
            var ry = otx + oty / Math.sqrt(2);
        }


        var toCX = currentX;
        var toCY = currentY;

        currentX = toCX + rx;
        currentY = toCY + ry;
    }
    else {
        currentY += factor;
        currentX += -(factor);
    }
}

// Move 90 degrees
function move90(direction, factor) {

    var otxt, otxy;

    var oty = strCods.b;
    var otx = strCods.a;

    if (direction == "r") {
        otxt = 1 * oty
        otxy = -1 * otx

    }
    else {
        otxt = -1 * oty
        otxy = 1 * otx
    }

    var prevX = currentX;
    var prevY = currentY;

    currentY = otxy;
    currentX = otxt;

    previousX = prevX;
    previousY = prevY;


}
// Move 135 degrees
function move135(direction, factor) {
    if (direction == "r") {
        currentY += factor;
        currentX += factor;
    }
    else {
        currentY += factor;
        currentX += -(factor);
    }
}

// Move 180 degrees
function move180() {
    var otxt, otxy;
    var strCods = GetStraightCoordinate();
    var otx = currentX - strCods.a;
    var oty = currentY - strCods.b;

    otxy = -1 * oty
    otxt = -1 * otx

    var toCX = currentX;
    var toCY = currentY;

    previousX = toCX;
    previousY = toCY;

    currentX = toCX + otxt;
    currentY = toCY + otxy;
}

function moveStraight() {
    var strCods = GetStraightCoordinate();
    var prevX = currentX;
    var prevY = currentY;

    currentY = strCods.b;
    currentX = strCods.a;

    previousX = prevX;
    previousY = prevY;

}

function setPrevious() {
    previousX = currentX;
    previousY = currentY;
}

function transform(angle, anticlockwise) {

    var straightVal = GetStraightCoordinate();

    var rad = angle * Math.PI / 180;
    if (anticlockwise) {
        rad = rad * -1;
    }
    // var rx = otx * Math.cos(rad) - oty * Math.sin(rad);
    // var ry = oty * Math.cos(rad) + otx * Math.sin(rad);

    var rx = (straightVal.a - currentX) * Math.cos(rad) - (straightVal.b - currentY) * Math.sin(rad) + currentX;
    var ry = (straightVal.a - currentX) * Math.sin(rad) + (straightVal.b - currentY) * Math.cos(rad) + currentY;

    previousX = currentX;
    previousY = currentY;

    currentX = rx;
    currentY = ry;

}

function GetStraightCoordinate() {
    var xCod = (currentX * 2) - previousX;
    var yCod = (currentY * 2) - previousY;

    return { a: xCod, b: yCod };
}

function FMovement(move, ctx) {

    for (var s = 0; s < move; s++) {
        moveStraight();
    }
    if (draw) {
        ctx.lineTo(currentX, currentY);
        var line = canvasa.display.line({
            start: { x: previousX, y: previousY },
            end: { x: currentX, y: currentY },
            stroke: "5px #0aa",
            cap: "round"
        });
        
        canvasa.addChild(line);
    }


}

function changeDirection(instr) {
    var anticlockwise = instr.charAt(instr.length - 1) == "L";
    var angle = instr.slice(0, -1);

    transform(parseInt(angle), anticlockwise);
    console.log(previousX + ", " + previousY);
    console.log(currentX + ", " + currentY);
}


