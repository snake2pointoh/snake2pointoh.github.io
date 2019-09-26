// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;

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

    //sets pos to center
    this.x -= (this.w/2)
    this.y -= (this.h/2)
  }

  //draws the button//
  draw(){
    rectMode(CORNER)
    textAlign(CENTER, CENTER)

    fill(255)
    rect(this.x, this.y, this.w, this.h)
    
    fill(0)
    textSize(20)
    text(this.name, this.x + this.w/2, this.y + this.h/2)
  }
}

class playerCharacter{
  constructor(x1, y1, speed){
    this.x = x1
    this.y = y1

    this.movespeed = speed
  }

  draw(){
    rectMode(CENTER)
    rect(this.x, this.y, 40, 40)
  }
  move(direction){
    if(direction === "up"){
      this.y -= this.movespeed
    }
    if(direction === "down"){
      this.y += this.movespeed
    }
    if(direction === "left"){
      this.x -= this.movespeed
    }
    if(direction === "right"){
      this.x += this.movespeed
    } 
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  player = new playerCharacter(width/2, height/2, 5)
}


function draw() {
  background(backgroundColour);
  player.draw()
  playerController()
}

function playerController(){
  if(keyIsDown(87)){
    player.move("up")
  }
  if(keyIsDown(83)){
    player.move("down")
  }
  if(keyIsDown(65)){
    player.move("left")
  }
  if(keyIsDown(68)){
    player.move("right")
  }
}

