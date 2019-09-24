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
let moveXby = 0;
let moveYby = 0;

let scaleBy = 5;

let rotating = false;

let isUpsidedown = false;

let buttons = []

class button{
  constructor(x1, y1, w1, h1, color1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.color = color1
  }

  show(){
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
  }

  pressed(){
    if((mouseX >= this.x && mouseX <= this.x + this.w) && (mouseY >= this.y && mouseY <= this.y + this.h)){
      return true
    }
    else {
      return false
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(backgroundColour);
  console.log("Width " + width +" Height " + height)
  angleMode(DEGREES)
  buttons[0] = new button(120, 20, 150, 100,"red")
  buttons[1] = new button(290, 20, 150, 100,"green")
  buttons[2] = new button(420, 20, 150,100,"blue")
}

function draw() {
  background(backgroundColour);
  rotateWithMouse()
  draw3D()
  Ui();
}

function Ui(){
  push()
  
  translate(width/2*-1, height/2*-1)
  //rect(20, 20, 80, 80,)
  //shows all buttons//
  for(let i = 0; i < buttons.length ; i++){
    buttons[i].show()
  }

  pop()
}

function draw3D(){
  push()
  rotateX(xAngle)
  rotateY(yAngle)
  rotateZ(zAngle)
  normalMaterial()
  box(xSize, ySize, zSize)
  pop()
}

function rotateWithMouse(){
  if(mouseIsPressed){
    xAngle += ((mouseY - pmouseY)/2) *-1

    //flip y spin if x is between 90 and 270//
    if((xAngle % 360 >= 90 && xAngle % 360 <= 270) || (xAngle % -360 <= -90 && xAngle % -360 >= -270)){
      yAngle += ((mouseX - pmouseX)/2) *-1
    }
    else{
      yAngle += ((mouseX - pmouseX)/2)
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

function mouseClicked(){

}

// //LERPPPP//v0 to v1 by t from 0 to 1//
// function lerp(v0, v1, t) {
//   return v0 * (1-t) + v1 * t
// }