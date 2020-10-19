let unit;
let sideUnit;
let width;
let height;
let ctx;
let originX, originY;
const colors = ['red', 'blue', 'green', 'orange'];


window.onload = () => {
    let canvas = document.getElementById('pattern');

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        [width, height] = [canvas.width, canvas.height];
        unit = height / 20; //this lets us just do like 5*unit
        sideUnit = unit * Math.sqrt(2) / 2;
        [originX, originY] = [width / 2, height / 2];
        ctx.translate(originX, originY); //moves origin :D
        ctx.save(); //pushing onto the stack

        // makeBigSquares();
        // makeSmallSquares();
        combinedDrawing();

        //ctx.rotate(30);

        ctx.translate(originX, originY); //moves origin :D
        ctx.save();

        //window.requestAnimationFrame(draw);

    } else {
        console.log("Could not display pattern. Please try with a different browser.")
    }
    // draw();
}

function draw(x) {
    ctx.restore();
    ctx.save();

    ctx.clearRect(-originX, -originY, width, height);
    ctx.fillRect(-originX, -originY, width, height);

    
    let y = Math.floor(x / 1000) % 4;
    ctx.rotate(rad(90*y));        

    for (var i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(0,0,unit,unit);
        ctx.fillRect(unit,0, unit, unit);
        ctx.fillRect(0,unit, unit, unit);
        ctx.rotate(rad(90));    
    }
    window.requestAnimationFrame(draw);
}

function combinedDrawing() {
    // ctx.rotate(rad(45));
    for (var i = 0; i < 4; i++) {
        //loop through each ring of squares.
        for (var ringNum = 1; ringNum < 10; ringNum++) {
            //loop through each amount of squates in each ring
            for (var squareNum = 0; squareNum < ringNum; squareNum++) {

                //Make the small squares
                var startX = unit*(ringNum + squareNum); 
                let color = colors[i];
                var startY = -unit*(2*ringNum - squareNum);
                drawSmallSquare(startX, startY, color);

                
                ctx.rotate(rad(45));
                var startX = unit*(-ringNum + 2*squareNum); 
                var startY = -unit*(2*ringNum);
                drawBigSquare(startX, startY);
                //drawUpSpike(startX + unit, startY + 2*unit);
            }
        }
        ctx.rotate(rad(90));
    }
}

// function combinedDrawing() {
//     // ctx.rotate(rad(45));
//     for (var i = 0; i < 1; i++) {
//         //loop through each ring of squares.
//         for (var ringNum = 1; ringNum < 10; ringNum++) {
//             //loop through each amount of squates in each ring
//             for (var squareNum = 0; squareNum < ringNum; squareNum++) {

//                 //Make the small squares
//                 var startX = unit*(ringNum + squareNum); 
//                 ctx.fillStyle = colors[i];
//                 var startY = -unit*(2*ringNum - squareNum);
//                 drawSmallSquare(startX, startY, color);



//                 ctx.moveTo(startX + unit, startY);
//                 ctx.lineTo(startX + 3*unit, startY - 2*unit);
//                 ctx.stroke();

//                 var startX = unit*(-ringNum + 2*squareNum); 
//                 var startY = -unit*(2*ringNum);
//                 drawBigSquare(startX, startY);
//                 drawUpSpike(startX + unit, startY + 2*unit);
//             }
//         }
//         ctx.rotate(rad(90));
//     }
// }

function makeBigSquares() {
    console.log(`Making Big Squares!`);

    // loop through all the sides
    for (var i = 0; i < 4; i++) {
        //loop through each ring of squares.
        for (var ringNum = 1; ringNum < 10; ringNum++) {
            //loop through each amount of squates in each ring
            for (var squareNum = 0; squareNum < ringNum; squareNum++) {
                let startX = unit*(-ringNum + 2*squareNum); 
                let startY = -unit*(2*ringNum);
                console.log(`[startX, startY] = [${startX}, ${startY}]`);
                drawBigSquare(startX, startY);
                drawUpSpike(startX + unit, startY + 2*unit);
            }
        }
        ctx.rotate(rad(90));
    }
}   

function makeSmallSquares() {
    console.log(`Making Small Squares!`);

    // loop through all the sides
    for (var i = 0; i < 4; i++) {
        //loop through each ring of squares.
        for (var ringNum = 1; ringNum < 10; ringNum++) {
            //loop through each amount of squates in each ring
            for (var squareNum = 0; squareNum < ringNum; squareNum++) {
                let startX = unit*(ringNum + squareNum); 
                let startY = -unit*(2*ringNum - squareNum);
                console.log(`[startX, startY] = [${startX}, ${startY}]`);
                ctx.strokeRect(startX, startY, unit, unit);
                ctx.moveTo(startX + unit, startY);
                ctx.lineTo(startX + 3*unit, startY - 2*unit);
                ctx.stroke();
            }
        }
        ctx.rotate(rad(90));
    }
}   

//Draws a square opening upwards at starting x y
let drawBigSquare = (startX, startY) => {
    console.log(`Drawing Square at [${startX}, ${startY}]`);
    ctx.beginPath();
    //ctx.translate(startX, startY);

    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + unit, startY + unit);
    ctx.lineTo(startX + 2*unit,  startY + 0);
    ctx.lineTo(startX + unit, startY -unit);
    ctx.lineTo(startX, startY);

    ctx.stroke();
}

let drawUpSpike = (startX, startY) => {
    ctx.beginPath();

    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - unit, startY - unit);
    ctx.lineTo(startX - unit,  startY - 2*unit);
    ctx.lineTo(startX, startY - unit);
    ctx.lineTo(startX, startY);
    ctx.lineTo(startX + unit, startY - unit);
    ctx.lineTo(startX + unit,  startY - 2*unit);
    ctx.lineTo(startX, startY - unit);

    ctx.stroke();
}

let drawBigSquare2 = (sX, sY, color) => {
    console.log(`Drawing Square at [${startX}, ${startY}]`);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(sX, sY, 2*sideUnit, 2*sideUnit);
    ctx.stroke();
}

function drawSmallSquare(sX, sY, color) {
    console.log(`Drawing Square at [${sX}, ${sY}]`);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(sX, sY, unit, unit);
    ctx.stroke();
}

let rad = (degree) => degree * Math.PI / 180;

// function draw(x) {
//     ctx.restore();
//     if (x % 10000 == 0) {
//         ctx.rotate(rad(90));        
//     }
//     ctx.save();
    
//     for (var i = 0; i < 4; i++) {
//         ctx.fillStyle = colors[i];
//         ctx.fillRect(0,0,unit,unit);            
//         ctx.rotate(rad(90));
//     }
    
    
//     window.requestAnimationFrame(draw);
    
// }

//LOOK AT LATER
// const takesCallback = (arg, num, num2) => arg(num, num2);
// console.log(`${takesCallback((x, y) => x*y + 10, 100, 20) + 10}`);