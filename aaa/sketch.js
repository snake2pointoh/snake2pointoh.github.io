// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//https://en.wikipedia.org/wiki/3D_projection//
//https://stackoverflow.com/questions/6139451/how-can-i-convert-3d-space-coordinates-to-2d-space-coordinates//

let backgroundColour = 255;
let angle = 0;

let xAngle = 0;
let yAngle = 0;
let zAngle = 0;
let xSize = 100;
let ySize = 100;
let zSize = 100;

let scaleBy = 5;

let rotating = false;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(backgroundColour);
  console.log("Width " + width +" Height " + height)
  angleMode(DEGREES)
}

function draw() {
  background(backgroundColour);
  XYZ()
  draw3D()
  Ui();
}

function Ui(){
  push()
  translate(width/2*-1, height/2*-1)
  rect(20, 20, 80, 80,)
  if(rotating === true){
    text("Rot", 25, 25)
  }
  else{
    text("Size", 25, 25)
  }
  pop()
}

function draw3D(){
  push()
  rotateX(xAngle)
  rotateY(yAngle)
  rotateZ(zAngle)
  box(xSize, ySize, zSize)
  pop()
}

function XYZ(){
  if(rotating === true){
    if(keyIsDown(88)){
      xAngle += 5
    }
    if(keyIsDown(89)){
      yAngle += 5
    }
    if(keyIsDown(90)){
      zAngle += 5
    }
  }
  else{
    if(keyIsDown(88)){
      xSize += scaleBy
    }
    if(keyIsDown(89)){
      ySize += scaleBy
    }
    if(keyIsDown(90)){
      zSize += scaleBy
    }
  }
}

function keyPressed(){
  if(key === "r"){
    rotating = true;
  }
  else if(key === "s"){
    rotating = false;
  }
  if(keyCode === UP_ARROW){
    scaleBy *= -1
  }
}

function windowResized(){
  setup()
}

//LERPPPP//v0 to v1 by t from 0 to 1//
function lerp(v0, v1, t) {
  return v0 * (1-t) + v1 * t
}
