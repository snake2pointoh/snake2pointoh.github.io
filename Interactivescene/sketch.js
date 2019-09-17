// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//https://en.wikipedia.org/wiki/3D_projection//
//https://stackoverflow.com/questions/6139451/how-can-i-convert-3d-space-coordinates-to-2d-space-coordinates//

let sceneNO = 1;
let backgroundColour = 255;
let angle = 0;

//mouse xy movement//

let xAngle = 0;
let yAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(backgroundColour);
  console.log("Width " + width +" Height " + height)
}

function draw() {
  if(sceneNO === 1){
    menu();
  }
  angleMode(DEGREES)
}

function menu(){
  background(backgroundColour);
  xAngle = ((mouseX - width/2)/10);
  yAngle = ((mouseY - height/2)/10)*-1;
  rotateWithMouse()
  box(100, 100, 300)
}

function windowResized(){
  setup()
}

function rotateWithMouse(){
  rotateY(xAngle)
  rotateX(yAngle)
}

