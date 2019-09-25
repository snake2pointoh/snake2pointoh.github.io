// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//https://en.wikipedia.org/wiki/3D_projection//
//https://stackoverflow.com/questions/6139451/how-can-i-convert-3d-space-coordinates-to-2d-space-coordinates//

let backgroundColour = 100;

let xAngle = 0;
let yAngle = 0;
let zAngle = 0;

let xSize = 100;
let ySize = 100;
let zSize = 100;
let rad = 100;

let isUpsidedown = false;

let buttons = []

let shape = "box"

let drawStroke = false

//Class used for making buttons//
class button{
  constructor(x1, y1, w1, h1, color1){
    //x and y position of the button//
    this.x = x1
    this.y = y1
    //width and height of the button//
    this.w = w1
    this.h = h1
    //button color//
    this.color = color1
  }

  //draws the button//
  show(){
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
  }

  //checks if the mouse is over the button//
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

  //all of my buttons being added to an array//
  buttons[0] = new button(120, 20, 150, 100, "red")
  buttons[1] = new button(290, 20, 150, 100, "green")
  buttons[2] = new button(460, 20, 150, 100, "blue")
  buttons[3] = new button(630, 20, 150, 100, "white")
  buttons[4] = new button(800, 20, 150, 100, "purple")
  buttons[5] = new button(970, 20, 150, 100, "grey")
}

function draw() {
  background(backgroundColour);
  rotateWithMouse()
  draw3D()
  Ui();
}

function Ui(){
  push()
  
  //sets origin to top left like 2D defalt
  translate(width/2*-1, height/2*-1)

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
  //draw the stroke on the 3D object//
  if(drawStroke === true){
    stroke(0)
  }
  else{
    noStroke()
  }

  //draws whe shape based on what is selected//
  if(shape === "box"){
    box(xSize, ySize, zSize)
  }
  if(shape === "sphere"){
    sphere(rad)
  }
  if(shape === "torus"){
    torus(rad, rad/2)
  }
  if(shape === "cone"){
    cone(rad, ySize *-1)
  }

  pop()
}

function rotateWithMouse(){
  //When the mouse is pressed spin the 3D object//
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
  //changes what object is pressed//
  if(key === "b"){
    shape = "box"
  }
  if(key === "s"){
    shape = "sphere"
  }
  if(key === "t"){
    shape = "torus"
  }
  if(key === "c"){
    shape = "cone"
  }
}

function windowResized(){
  setup()
}

function mouseClicked(){
  //changes object color based on button pressed//
  for(let i = 0; i < 4 ; i++){
    if(buttons[i].pressed()){
      ambientMaterial(buttons[i].color)
    }
  }
  if(buttons[4].pressed()){
    normalMaterial()
    stroke(0)
  }
  if(buttons[5].pressed()){
    drawStroke = !drawStroke;
  }
}