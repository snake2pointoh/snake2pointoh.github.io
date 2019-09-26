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

let ballMode = 'circle';
let sceneMode = 'menu'

class button{
  constructor(x1, y1, w1, h1, name1){
    
    //x and y position of the button//
    this.x = x1
    this.y = y1
    
    //width and height of the button//
    this.w = w1
    this.h = h1
    
    //button color//
    this.name = name1

    this.x -= (this.w/2)
    this.y -= (this.h/2)
  }

  //draws the button//
  show(){

    fill(255)
    rect(this.x, this.y, this.w, this.h)
    fill(0)
    textSize(20)
    text(this.name, this.x, this.y)
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
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  Xpos = width/2;
  Ypos = height/2;
  rectButton = new button(width/2, height/2 - 80, 200, 100,"Rect")
  ballButton = new button(width/2, height/2 + 80, 200, 100,"ball")
  backButton = new button(100, 100, 100, 100, "Back")
}


function draw() {
  background(backgroundColour);
  if(sceneMode === 'menu'){
    startScreen()
  }
  if(sceneMode === 'ballscreen'){
    ballScreen()
  }
}

function startScreen(){
  rectButton.show()
  ballButton.show()
}

function ballScreen(){
  fill(0)
  
  //left right movement//
  if(ballMode === 'circle'){
    circleBounce()
  }
  else if (ballMode === 'rect'){
    rectBounce()
  }
  Xpos += dx
  Ypos += dy
  backButton.show()
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

function mouseClicked(){
  if(sceneMode === 'menu'){
    if(rectButton.pressed()){
      ballMode = 'rect'
      Xpos = width/2;
      Ypos = height/2;
      sceneMode = 'ballscreen'

    }
    if(ballButton.pressed()){
      ballMode = 'circle'
      Xpos = width/2;
      Ypos = height/2;
      sceneMode = 'ballscreen'
    }
  }
  if(sceneMode === 'ballscreen'){
    if(backButton.pressed()){
      sceneMode = 'menu'
    }
  }
}