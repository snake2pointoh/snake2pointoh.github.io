// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let mapSize = 10;
let gridSize = 50
let gridX = 0
let gridY = 0
let mapGrid = []
let mapOffsetX = 0
let mapOffsetY = 0

class Button{
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
    push()
    rectMode(CORNER)
    textAlign(CENTER, CENTER)

    fill(255)
    rect(this.x, this.y, this.w, this.h)
    
    fill(0)
    textSize(20)
    text(this.name, this.x + this.w/2, this.y + this.h/2)
    pop()
  }
}

//TODO - update how movement works//
class PlayerCharacter{
  constructor(x1, y1, speed){
    this.x = x1
    this.y = y1

    this.movespeed = speed
  }

  draw(){
    push()
    rectMode(CENTER)
    rect(this.x, this.y, 40, 40)
    pop()
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

class UiBackground{
  constructor(x1, y1, w1, h1, grayVal1, a1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.grayVal = grayVal1
    this.alpha = a1
  }
  draw(){
    push()
    rectMode(CORNER)
    fill(this.grayVal1, this.alpha)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }
  mouseOverUi(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
      return true
    }
    else{
      return false
    }
  }
}

class GridItem{
  constructor(x1,y1,w1,h1,color1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.offsetX = 0
    this.offsetY = 0
    this.color = color1
  }
  draw(){
    push()
    rectMode(CORNER)
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }

  mouseOverTile(){
    if((mouseX > (this.x + this.offsetX) && mouseX < (this.x + this.w) + this.offsetX) && (mouseY > (this.y + this.offsetY) && mouseY < (this.y + this.h) + this.offsetY)){
      return true
    }
    else{
      return false
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  //Create Map Grid//
  for(let i = 0; i < (mapSize * mapSize) ;i++){
    mapGrid[i] = new GridItem(gridX, gridY, gridSize, gridSize,"white")
    
    if(gridX + gridSize === (gridSize*mapSize)){
      gridX = 0
      gridY += gridSize
    }
    else{
      gridX += gridSize
    }
  }
}


function draw() {
  background(backgroundColour);
  //draw map//
  for(let i = 0; i < mapGrid.length ;i++){
    mapGrid[i].offsetX = mapOffsetX
    mapGrid[i].offsetY = mapOffsetY
    mapGrid[i].draw()
  }
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

