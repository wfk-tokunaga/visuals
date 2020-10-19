let unit;
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
        unit = height / 10; //this lets us just do like 5*unit
        [originX, originY] = [width / 2, height / 2];
        ctx.translate(originX, originY); //moves origin :D
        ctx.rotate(rad(90));
        ctx.save();

        window.requestAnimationFrame(draw);

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
// function draw(x) {
//     ctx.restore();
//     if (x % 10000 == 0) {
//         ctx.rotate(rad(90));        
//     }
//     ctx.save();
    
//     console.log(`x: ${x}`);
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



const patternLine = (ctx, newX, newY) => { ctx.lineTo() }

//Draws a square opening upwards
let drawSquare = (ctx, unit) => {
    ctx.fillRect(0,0,unit,unit);
}

// function drawDiamond(ctx, unit) {
//     ctx.fillRect(0,0,unit,unit);
// }

let rad = (degree) => degree * Math.PI / 180;