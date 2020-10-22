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

        const resizeHandler = () => {
            const pixelRatio = window.devicePixelRatio;
            let rect = document.body.getBoundingClientRect();
            canvas.width = rect.width*pixelRatio;
            canvas.height = rect.height*pixelRatio;
            [width, height] = new Array(2).fill(Math.max(canvas.width, canvas.height));
            unit = height / 40; //this lets us just do like 5*unit
            sideUnit = unit * Math.sqrt(2) / 2;
            [originX, originY] = [pixelRatio * rect.width / 2,pixelRatio * rect.height / 2];
            ctx.translate(originX, originY); //moves origin :D
        };

        window.addEventListener("resize", resizeHandler);

        resizeHandler();

        window.requestAnimationFrame(draw);

    } else {
        console.log("Could not display pattern. Please try with a different browser.")
    }
}




//Let's make the colors the way I want them to be.
function combinedDrawing(maxRings, colorVal) {
    for (var i = 0; i < 4; i++) {
        //loop through each ring.
        for (var ringNum = 1; ringNum < maxRings; ringNum++) {

            //loop through each amount of shapes in each ring
            for (var squareNum = 0; squareNum < ringNum; squareNum++) {

                let specialVal = (colorVal + ((Math.floor(255/maxRings) * (ringNum))) % 255);
                let changingColors = [
                    `rgb(200,200,${specialVal})`,
                    // `rgb(255,255,255)`,
                    // `rgb(255,${specialVal},255)`,
                    `rgb(200,${specialVal},200)`,
                    // `rgb(${specialVal},255,255)`,
                    `rgb(${specialVal},200,200)`,
                    `rgb(${specialVal%100 + 150},${specialVal%100 + 50},${specialVal%100 + 25})`,
                ]
                
                //Make the small squares
                var startX = unit*(ringNum + squareNum); 
                var startY = -unit*(2*ringNum - squareNum);
                drawSmallSquare(startX, startY, changingColors[0]);
                
                //gotta draw the arrows.
                var sX = unit*(1 + ringNum + squareNum); 
                var sY = -unit*(2*ringNum - squareNum);
                drawArrow(sX, sY, changingColors[1]);
                
                //Draw horns
                sX = unit*(2*squareNum - (ringNum - 1));
                sY = -unit*(2*(ringNum-1));
                drawHorns(sX, sY, changingColors[2]);

                //make the big Squares
                ctx.rotate(rad(45));
                var startX = sideUnit*(ringNum + 2*squareNum);
                var startY = -sideUnit*(3*ringNum - 2*squareNum);
                drawBigSquare(startX, startY, changingColors[3]);
                ctx.rotate(rad(-45));
            }
        }
        ctx.rotate(rad(90));
    }
}

let drawArrow = (sX, sY, color) => {
    ctx.beginPath();

    ctx.moveTo(sX, sY);
    ctx.lineTo(sX - unit, sY);
    ctx.lineTo(sX, sY - unit);
    ctx.lineTo(sX + unit, sY - unit);
    ctx.lineTo(sX + unit, sY);
    ctx.lineTo(sX, sY + unit);
    ctx.lineTo(sX, sY);
    ctx.lineTo(sX + unit, sY - unit);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

let drawHorns = (startX, startY, color) => {
    ctx.beginPath();

    // var leftSpike = new Path2D();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - unit, startY - unit);
    ctx.lineTo(startX - unit,  startY - 2*unit);
    ctx.lineTo(startX, startY - unit);
    ctx.lineTo(startX, startY);
    ctx.lineTo(startX + unit, startY - unit);
    ctx.lineTo(startX + unit,  startY - 2*unit);
    ctx.lineTo(startX, startY - unit);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

let drawBigSquare = (sX, sY, color) => {
    // console.log(`Drawing Square at [${sX}, ${sY}]`);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(sX, sY, 2*sideUnit, 2*sideUnit);
    ctx.stroke();
}

function drawSmallSquare(sX, sY, color) {
    // console.log(`Drawing Square at [${sX}, ${sY}]`);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(sX, sY, unit, unit);
    ctx.stroke();
}

let rad = (degree) => degree * Math.PI / 180;



// function draw(x) {
//     ctx.restore();
//     if (x % 1000 == 0) {
//         ctx.rotate(rad(90));        
//     }
//     ctx.save();
    
//     for (var i = 1; i < 4; i++) {
//         combinedDrawing(i);
//     }
//     window.requestAnimationFrame(draw);   
// }

/*Draw will draw the picture every frame, 
the key is to know how often to change what it's drawing */
function draw(ms) {
    ctx.restore();
    ctx.save();

    ctx.clearRect(-originX, -originY, width, height);
    ctx.fillRect(-originX, -originY, width, height);

    //Rotates the drawing so the colors change.
    let rotateSpeed = 300;
    let addLayerSpeed = 200;
    let y = Math.floor(ms / 15);
    let colorVal = y % 255;
    //need to add a cap to y
    // ctx.rotate(rad(y / 8));
    combinedDrawing(15, colorVal);        

    window.requestAnimationFrame(draw);
}


// function draw(x) {
//     ctx.restore();
//     if (x % 1000 == 0) {
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



