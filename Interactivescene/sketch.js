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

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(backgroundColour);
  console.log("Width " + width +" Height " + height)
}

function draw() {
  if(sceneNO === 1){
    menu();
  }
}

function menu(){
  background(backgroundColour);
  //fill(0, 0, 0);
  translate(mouseX - width/2, mouseY - height/2)
  //noStroke();
  rotateY(angle)
  rotateX(angle * 0.3)
  rotateZ(angle * 0.6)
  box(100, 200, 300)
  //rect(0, 0, 250, 200)
  angle += 0.07;
}