var previousX = 9;
var previousY = 4;

var currentX = 19;
var currentY = 4;

var draw = false;

var currentDirection = "90R";
var canvasa = oCanvas.create({
	canvas: "#canvas"
});

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
   

    } else {
        alert('You need Safari or Firefox 1.5+.');
    }
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


