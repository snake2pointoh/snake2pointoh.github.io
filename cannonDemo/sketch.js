// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cannonX = 75
let cannonY = 0
let cannonWidth = 50
let cannonLength = 125
let cannonAngle

let bullets = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  cannonY = height - 150
}

function draw() {
  background(220);
  drawCannon()
  updateBullets()
  for(let i = bullets.length -1; i > 0; i--){
    if(bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0){
      bullets.splice(i, 1);
    }
  }
}

function drawCannon(){
  push()
  fill(220)
  translate(cannonX, cannonY)
  cannonAngle = atan2(mouseY - cannonY, mouseX - cannonX)
  rotate(cannonAngle)
  rect(0, -cannonWidth/2, cannonLength, cannonWidth)
  ellipse(0, 0, cannonWidth + 5)
  pop()
}

function updateBullets(){
  push()
  fill(100)
  for(let thisBullet of bullets){
    ellipse(thisBullet.x, thisBullet.y, thisBullet.rad)
    thisBullet.y += 5*sin(thisBullet.angle)
    thisBullet.x += 5*cos(thisBullet.angle)
  }
  pop()
  
}

function fire(){
  var bullet = {
    x: cannonX,
    y: cannonY,
    rad: cannonWidth - 10,
    angle: cannonAngle,
    speed: 5,
  }
  bullets.push(bullet)
}

function mousePressed(){
  fire()
}
