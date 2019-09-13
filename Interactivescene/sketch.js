// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//https://en.wikipedia.org/wiki/3D_projection//
//https://stackoverflow.com/questions/6139451/how-can-i-convert-3d-space-coordinates-to-2d-space-coordinates//

let sceneNO = 1;
let backgroundColour = 0;

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
  //fill(255);
  sphere(200)
}
