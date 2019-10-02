// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;
let mapOffsetX = 0
let mapOffsetY = 0
let playerEnabled = true

//textures//
let grass
let rock
let defaultImg

let edditorUiBackground = []
let edditorUiButtons = []
let selectedTexture

class texture{
  constructor(texture1, hasCollision1){
    this.texture = texture1
    this.hasCollision = hasCollision1
  }
}

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

class ImageButton{
  constructor(x1, y1, w1, h1, texture1){
    
    //x and y position of the button//
    this.x = x1
    this.y = y1
    
    //width and height of the button//
    this.w = w1
    this.h = h1
    
    //button color//
    this.texture = texture1

    //sets pos to center
    this.x -= (this.w/2)
    this.y -= (this.h/2)
  }

  //draws the button//
  draw(){
    push()
    fill(50, 20)
    rect(this.x, this.y, this.w, this.h)
    image(this.texture,this.x +5, this.y +5, this.w -10, this.h -10)
    pop()
  }
  mouseOver(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
      return true
    }
    else{
      return false
    }
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
    this.top = true
    this.bottom = true

    //left collision//
    this.leftX = this.x - this.w/2 - this.w/3
    this.leftY = this.y - this.h/2
    this.leftW = this.w/3
    this.leftH = this.h

    //right collision//
    this.rightX = this.x + this.w/2
    this.rightY = this.y - this.h/2
    this.rightW = this.w/3
    this.rightH = this.h
    
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

    /*
    rect(this.rightX, this.rightY, this.rightW, this.rightH) //right
    rect(this.leftX, this.leftY, this.leftW, this.leftH) //left
    rect(this.bottomX, this.bottomY, this.bottomW, this.bottomH) //bottom
    rect(this.topX, this.topY, this.topW, this.topH) //top
    */
   
    pop()
  }

  move(direction){
    if(direction === "up" && this.top){
      mapOffsetY += this.movespeed
    }
    if(direction === "down" && this.bottom){
      mapOffsetY -= this.movespeed
    }
    if(direction === "left" && this.left){
      mapOffsetX += this.movespeed
    }
    if(direction === "right" && this.right){
      mapOffsetX -= this.movespeed
    } 
  }
  collisionDetect(map){
    this.left = true
    this.right = true
    this.top = true
    this.bottom = true

    for(let i = 0; i < map.length ;i++){
      if(map[i].hasCollision){
        //right
        if(this.rightX > map[i].Xpos + map[i].w || this.rightX + this.rightW < map[i].Xpos || this.rightY > map[i].Ypos + map[i].h || this.rightY + this.rightH < map[i].Ypos){
        }
        else{
          this.right = false
          //console.log("is colliding right")
        }
        //left
        if(this.leftX > map[i].Xpos + map[i].w || this.leftX + this.leftW < map[i].Xpos || this.leftY > map[i].Ypos + map[i].h || this.leftY + this.leftH < map[i].Ypos){
        }
        else{
          this.left = false
          //console.log("is colliding left")
        }
        //top
        if(this.topX > map[i].Xpos + map[i].w || this.topX + this.topW < map[i].Xpos || this.topY > map[i].Ypos + map[i].h || this.topY + this.topH < map[i].Ypos){
        }
        else{
          this.top = false
          //console.log("is colliding top")
        }
        //bottom
        if(this.bottomX > map[i].Xpos + map[i].w || this.bottomX + this.bottomW < map[i].Xpos || this.bottomY > map[i].Ypos + map[i].h || this.bottomY + this.bottomH < map[i].Ypos){
        }
        else{
          this.bottom = false
          //console.log("is colliding bottom")
        }
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
    fill(this.grayVal, this.alpha)
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
  constructor(x1,y1,w1,h1,texture1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    
    this.offsetX = 0
    this.offsetY = 0
    
    this.hasCollision = false

    this.texture = texture1

    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
  }


  draw(){
    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
    //draw GridItem if its on screen//Many FPS!!!//
    if(((this.x + this.offsetX) >= (0 - this.w) && (this.x + this.offsetX) < width) && ((this.y + this.offsetY) >= (0 - this.h) && (this.y + this.offsetY) < height)){
      push()
      image(this.texture, this.Xpos, this.Ypos, this.w, this.h)
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

class GridGen{
  constructor(sizex, sizey, size){
    this.grid = []
    this.SizeX = sizex
    this.SizeY = sizey
    this.gridSize = size

    this.gridX = 0
    this.gridY = 0

    for(let i = 0; i < (this.SizeX * this.SizeY) ;i++){
      this.grid[i] = new GridItem(this.gridX, this.gridY, this.gridSize, this.gridSize, defaultImg)
      
      if(this.gridX + this.gridSize === (this.gridSize * this.SizeX)){
        this.gridX = 0
        this.gridY += this.gridSize
      }
      else{
        this.gridX += this.gridSize
      }
    }
  }
  draw(){
    //draw map//
    for(let i = 0; i < this.grid.length ;i++){
    this.grid[i].offsetX = mapOffsetX
    this.grid[i].offsetY = mapOffsetY
    this.grid[i].draw()
    
    }
  }
}

function preload(){
  //textures//
  defaultImg = new texture(loadImage('assets/Default.png'),false)
  grass = new texture(loadImage('assets/Grass.png'),false)
  rock = new texture(loadImage('assets/Rock.png'),true)
}

function setup() {
  noSmooth();
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  //player character//
  Player = new PlayerCharacter(width/2, height/2, 5)
  //make map//
  MainMap = new GridGen(200,200,64)
  //edditor items//
  edditorUiBackground[0] = new UiBackground(50, 50, 200, 400, 50, 10)
  edditorUiButtons[0] = new ImageButton(200, 200 , 64, 64, grass.texture)
  
  selectedTexture = grass
}

function draw() {
  background(backgroundColour);
  
  MainMap.draw()

  playerController(Player)
  
  //show player//
  if(playerEnabled){
    Player.draw()
    Player.collisionDetect(MainMap.grid)
  }
  else{
    mapEdditor(MainMap.grid)
  }
  
  //show fps//
  push()
  textSize(30)
  text(Math.round(frameRate()), 20, 40,)
  pop()

}

function mapEdditor(mapGrid){
  for(let i = 0; i < mapGrid.length ;i++){
    for(let j = 0; j < edditorUiBackground.length; j++){
      if(!edditorUiBackground[j].mouseOverUi()){
        if(mouseIsPressed && mapGrid[i].mouseOverTile()){
          mapGrid[i].texture = selectedTexture
          mapGrid[i].hasCollision = true
        }
      }
    }
  }
  // //draw edditor ui//
  // for(let i = 0; i < edditorUiBackground.length; i++){
  //   edditorUiBackground[i].draw()
  // }
  // for(let i = 0; i < edditorUiButtons.length; i++){
  //   edditorUiButtons[i].draw()
  // }
}

function keyPressed(){
  if(key === "e"){
    playerEnabled = !playerEnabled
    Player.left = true
    Player.right = true
    Player.top = true
    Player.bottom = true
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