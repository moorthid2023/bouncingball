const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("btn");
const leftbtn = document.getElementById("left");
const rightbtn = document.getElementById("right");
const upbtn = document.getElementById("up");
const downbtn=document.getElementById("down");
const ctxWidth = 600;
const ctxHeight = 400;
canvas.setAttribute("width", ctxWidth);
canvas.setAttribute("height", ctxHeight);
var collisionResult,
    x=200,
    y=20,
    px=20,
    py=20,
  velox = 1,
  veloy = 1,
  array=[
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        ];

btn.style.top = ctxHeight - btn.clientHeight + "px";
btn.style.left = ctxWidth - btn.clientWidth + "px";
downbtn.style.left=btn.clientWidth/3 + "px";
class Ball{
    constructor(){
        this.x=20,
        this.y=20,
        this.r=20,
        this.sangle=0,
        this.eangle=2*Math.PI

    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x,this.y,this.r,this.sangle,this.eangle);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.stroke();
    }
    update(x,y){
        this.x=x;
        this.y=y;
    }
};
var player={
  x:20,
  y:20,
  w:20,
  h:20,
  draw(){
    ctx.fillStyle="green";
    ctx.fillRect(this.x,this.y,this.w,this.h);
  },
  update(x,y){
    this.x=x,
    this.y=y
  }
}
var ball=new Ball();

function bouncingBall() {
ball.draw();
ball.update(x,y);
}

function clearScreen() {
  ctx.clearRect(0, 0, ctxWidth, ctxHeight);
}

function update() {
  
  x += velox;
  y += veloy;

  clearScreen();
  if (x > ctxWidth-20 || x < 20 ) {
    velox = -velox;
  }
  if( y < 20 || y > ctxHeight-20){
    veloy = -veloy;
  }
  for(let i=0;i<array.length;i++){
    for(let j=0;j<array[i].length;j++){
        if(array[i][j]==1){
            ctx.fillStyle="brown";
            ctx.fillRect(j*50,i*50,30,30);
        }
        
    }
  }
  bouncingBall();
  if(player.x>0||player.x<ctxWidth||player.y>0||player.y<ctxHeight){
    player.draw();
    player.update(px,py);
  }
   collisionResult= detectCollision(ball,player);
   console.log(collisionResult);
  if(collisionResult){
    if(ball.x+ball.r>player.x){
      velox = 1;
    }
    if(ball.x<player.x+player.w){
      velox = -1;
    }
    if(ball.y+ball.r>player.y){
      veloy =1;
    }
    if(ball.y<player.y+player.h){
      veloy =-1;
    }
  }
  requestAnimationFrame(update);
}

update();
//collision detection
function detectCollision(circle,square) {
  // Calculate the distance between the centers of the circle and square
  const dx = circle.x - (square.x + square.w / 2);
  const dy = circle.y - (square.y + square.h / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Check if the distance is less than the sum of the circle's radius and half of the square's width
  if (distance < circle.r + square.w / 2) {
    return true; // Collision detected
  }

  return false; // No collision
}
//
leftbtn.addEventListener("click", () => {
  console.log("left");
  // velox = -1; // Change the horizontal velocity to move left
  px -=10;
});

rightbtn.addEventListener("click", () => {
  console.log("right");
  // velox = 1; // Change the horizontal velocity to move right
  px += 10;
});

upbtn.addEventListener("click", () => {
  console.log("up");
  // veloy = -1; // Change the vertical velocity to move up
  py -=10;
});

downbtn.addEventListener("click", () => {
  console.log("up");
  // veloy = 1; // Change the vertical velocity to move up
  py += 10;
});
addEventListener("keydown",(e)=>{
  if(e.key=="ArrowLeft"){
    // velox=-1;
    px -= 10;
  };
  if(e.key=="ArrowRight"){
    // velox=1;
    px += 10;
  };
  if(e.key=="ArrowUp"){
    // veloy=-1;
    py -=10;
  };
  if(e.key=="ArrowDown"){
    // veloy=1;
    py +=10;
  };
})