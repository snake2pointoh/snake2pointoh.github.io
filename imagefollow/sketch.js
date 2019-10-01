// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let img;
let img2

let size = 1;

function preload(){
  img = loadImage('assets/nosnek.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  img2 = makeGrayScale(img) 
}


function draw() {
  background(backgroundColour);
  imgFollowMouse()
}

function imgFollowMouse(){
  imageMode(CENTER);
  image(img2, mouseX, mouseY, img.width*size, img.height*size);
}

function makeGrayScale(inputImage){
  let img2 = createImage(img.width, img.height)
  img.loadPixels()
  img2.loadPixels()
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let p = img.get(x,y)
      let grayVal = (red(p) + green(p) + blue(p))/3
      
      img2.set(x,y,color(grayVal))
    }
  }
  img2.updatePixels()
  return img2
}

