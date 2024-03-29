var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
var clicked=false;
window.addEventListener('mousedown',function(){
    clicked = true;
})

window.addEventListener('mouseup',function(){
    clicked = false;
})

function randomIntFromRange(min,max,decimal){
    if(decimal == false){
        return Math.floor(Math.random() * (max - min + 1) + min);
    } else{
        return Math.random() * max + min;
    }
    
}
function getDistance(x1,y1,x2,y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
function Text(x,y,text,textalign){
    this.text = text;
    this.x = x;
    this.y = y;
    this.textalign = textalign;
    this.draw = function(){
        ctx.font = "bold 80px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = this.textalign
        ctx.globalAlpha = 1;
        // ctx.save();
        ctx.shadowBlur=20;
        // ctx.shadowColor="white";
        ctx.fillText(this.text, this.x, this.y);
        // ctx.restore();
    }
    this.update = function(){
        this.draw()
    }
}
function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.opacity = 1
    this.distance = randomIntFromRange(40,100,false)

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2,false)
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function(balls){
        this.draw();
        for(var i = 0; i < balls.length; i++){
            // if(this === ballArray[i])continue;
            
            if(getDistance(this.x,this.y +this.radius,balls[i].x,ballArray[i].y) < this.distance){
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(balls[i].x,balls[i].y);
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.globalAlpha = 0.3;
                ctx.stroke();
                ctx.restore()
                ctx.closePath()

            }
            

        }
if(getDistance(this.x,this.y,mouse.x,mouse.y) < this.distance){
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(mouse.x,mouse.y);
                ctx.strokeStyle = this.color;
                ctx.save();
                ctx.globalAlpha = 0.3;
                ctx.stroke();
                ctx.restore()
                ctx.closePath();
            }

        if(this.x - this.radius <= 0 || this.x + this.radius >= window.innerWidth){
            this.dx = -this.dx;
        }
        if(this.y - this.radius < 0 || this.y + this.radius > window.innerHeight){
            this.dy = -this.dy;
        }
        this.x += this.dx * 2;
        this.y += this.dy * 2;
        
    }
}


var ball;
var ballArray;
var text;
function init(){
    ballArray = [];
    for(var i = 0; i < 200; i++){
        var radius = 3;
        var x = randomIntFromRange(radius , window.innerWidth - radius,true)
        var y = randomIntFromRange(radius , window.innerHeight - radius,true)
        var dx = randomIntFromRange(-0.3,0.5,true);
        var dy = randomIntFromRange(-0.3,0.5,true);
        ballArray.push(new Ball(x, y, dx, dy, radius, 'white'));
    }
    text = new Text(innerWidth / 2, innerHeight / 2 - 50, "Move or Click","center")

    
}

function animate(){
    requestAnimationFrame(animate);
    // ctx.fillStyle = 'rgba(255,255,255,0.3)';
    // ctx.fillRect(0,0,innerWidth,innerHeight)
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if(clicked == true){
        for(var i = 0; i < 4; i++){
        var radius = 3;
        var dx = randomIntFromRange(-0.5,1,true);
        var dy = randomIntFromRange(-0.5,1,true);
        ballArray.push(new Ball(mouse.x, mouse.y, dx, dy, radius, 'white'));
        ballArray.splice(1,1)
        }
        clicked = false;
    }
    for(var i = 0; i < ballArray.length; i++){
        ballArray[i].update(ballArray);
    }
    text.update();
}

init()
animate();