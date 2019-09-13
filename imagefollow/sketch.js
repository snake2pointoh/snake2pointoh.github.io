// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let img;

let size = 1;

function preload(){
  img = loadImage('assets/nosnek.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
}


function draw() {
  background(backgroundColour);
  if(keyIsDown(38)){
    size += 0.03;
  }
   if(keyIsDown(40)){
    size -= 0.03;
  }
  imageMode(CENTER);
  image(img, mouseX, mouseY, img.width*size, img.height*size);
}

