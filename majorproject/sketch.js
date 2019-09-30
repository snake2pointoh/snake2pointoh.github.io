// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let mapGrid = []
let mapOffsetX = 0
let mapOffsetY = 0

let playerEnabled = true

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

class PlayerCharacter{
  constructor(x1, y1, speed){
    this.x = x1
    this.y = y1
    this.w = 40
    this.h = 40

    this.movespeed = speed

    //direction bools//
    this.left = true
    this.right = true
    this.up = true
    this.down = true

    //right collision//
    this.rightX = this.x - this.w/2 - this.w/3
    this.rightY = this.y - this.h/2
    this.rightW = this.w/3
    this.rightH = this.h

    //right collision//
    this.leftX = this.x + this.w/2
    this.leftY = this.y - this.h/2
    this.leftW = this.w/3
    this.leftH = this.h
    
    //bottom collision//
    this.bottomX = this.x - this.w/2
    this.bottomY = this.y + this.h/2
    this.bottomW = this.w
    this.bottomH = this.h/3
    
    //top collision//
    this.topX = this.x - this.w/2
    this.topY = this.y - this.h/2 - this.h/3
    this.topW = this.w
    this.topH = this.h/3
  }

  draw(){
    push()
    rectMode(CORNER)
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    fill("red")

    rect(this.rightX, this.rightY, this.rightW, this.rightH) //right
    rect(this.leftX, this.leftY, this.leftW, this.leftH) //left
    rect(this.bottomX, this.bottomY, this.bottomW, this.bottomH) //bottom
    rect(this.topX, this.topY, this.topW, this.topH) //top
    
    pop()
  }

  move(direction){
    if(direction === "up"){
      mapOffsetY += this.movespeed
    }
    if(direction === "down"){
      mapOffsetY -= this.movespeed
    }
    if(direction === "left"){
      mapOffsetX += this.movespeed
    }
    if(direction === "right"){
      mapOffsetX -= this.movespeed
    } 
  }
  collisionDetect(map){
    for(let i = 0; i < map.length ;i++){
      if(map[i].Xpos + map[i].w < this.rightX || map[i].Xpos > this.rightX){ // right
        console.log("not in a square")
      }
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
    
    this.hasCollision = false

    this.color = color1

    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
  }


  draw(){
    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
    //draw GridItem if its on screen//Many FPS!!!//
    if(((this.x + this.offsetX) >= (0 - this.w) && (this.x + this.offsetX) < width) && ((this.y + this.offsetY) >= (0 - this.h) && (this.y + this.offsetY) < height)){
      push()
      rectMode(CORNER)
      fill(this.color)
      rect(this.Xpos, this.Ypos, this.w, this.h)
      pop()
    }
  }

  mouseOverTile(){
    //check if mouse is over tile//
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
  //player character//
  Player = new PlayerCharacter(width/2, height/2, 5)
  gridGen(1,1,60)
  
}

function draw() {
  background(backgroundColour);
  
  //draw map//
  for(let i = 0; i < mapGrid.length ;i++){
    mapGrid[i].offsetX = mapOffsetX
    mapGrid[i].offsetY = mapOffsetY
    mapGrid[i].draw()
    
  }
  playerController(Player)
  
  //show player//
  if(playerEnabled){
    Player.draw()
    Player.collisionDetect(mapGrid)
  }
  else{
    mapEdditor()
  }
  
  //show fps//
  push()
  textSize(30)
  text(Math.round(frameRate()), 20, 40,)
  pop()
}

function gridGen(mapSizeX, mapSizeY, gridSize){
  let gridX = 0
  let gridY = 0
  for(let i = 0; i < (mapSizeX * mapSizeY) ;i++){
    mapGrid[i] = new GridItem(gridX, gridY, gridSize, gridSize,"white")
    
    if(gridX + gridSize === (gridSize * mapSizeX)){
      gridX = 0
      gridY += gridSize
    }
    else{
      gridX += gridSize
    }
  }
}

function mapEdditor(){
  for(let i = 0; i < mapGrid.length ;i++){
    if(mouseIsPressed && mapGrid[i].mouseOverTile()){
      mapGrid[i].color = "black"
      mapGrid[i].hasCollision = true
    }
  }
}

function keyPressed(){
  if(key === "e"){
    playerEnabled = !playerEnabled
  }
}

function playerController(player){
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