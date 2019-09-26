// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let radius = 100;
let rectSize = 100;
let Xpos;
let Ypos;

let dx = 5
let dy = 5

let mode = 'circle';

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  Xpos = width/2;
  Ypos = height/2;
  
}


function draw() {
  fill(0)
  background(backgroundColour);
  //left right movement//
  if(mode === 'circle'){
    circleBounce()
  }
  else if (mode === 'rect'){
    rectBounce()
  }
  Xpos += dx
  Ypos += dy
}

function windowResized(){
  setup()
}

function circleBounce(){
  circle(Xpos, Ypos, radius)
  if(Xpos >= width - radius/2 || Xpos <= 0 + radius/2){
    dx *= -1
  }
  if(Ypos >= height - radius/2 || Ypos <= 0 + radius/2){
    dy *= -1
  }
}

function rectBounce(){
  rect(Xpos - rectSize/2, Ypos - rectSize, rectSize, rectSize*2)
  if(Xpos >= width - rectSize/2 || Xpos <= 0 + rectSize/2){
    dx *= -1
  }
  if(Ypos >= height - rectSize || Ypos <= 0 + rectSize){
    dy *= -1
  }
}

function keyPressed(){
  if(key === 'r'){
    mode = 'rect'
    Xpos = width/2;
    Ypos = height/2;
  }
  if(key === 'c'){
    mode = 'circle'
    Xpos = width/2;
    Ypos = height/2;
  }
}