// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

/*
item icon test images
https://opengameart.org/users/bizmasterstudios
https://www.youtube.com/c/BizmasterStudios
*/

let scene = "menu"

const backgroundColour = 255;

let mapOffsetX = 0;
let mapOffsetY = 0;
let showDebug = false;
let canMove = true;

//pause menu//
let paused = false;
let pauseBackground;
let backButton;
let resumeButton;

let saveLoad = [];

//textures//
let textures = [];
let swordTextures = [];
let bowTextures = [];
let staffTextures = [];
let potionTextures = [];

let edditorUiBackground = [];
let edditorUiButtons = [];
let edditorBrushes = [];
let Buttons = [];
let menuButtons = [];
let edditorMenuButtons = [];
let brushMode = "Single";
let edditorMenu = "map"
let brush = null;

let selectedTexture;

//load uploaded file//
var jsonF;
const reader = new FileReader();
let json;

//items and inventory//
let worldItems = [];
let itemEdditorButtons = [];
let itemEdditorTextBoxes = [];
let itemEdditorText = [];
let itemEdditorDemoIcon;

let itemEdditorSwordIconButtons = [];
let itemEdditorBowIconButtons = [];
let itemEdditorStaffIconButtons = [];
let itemEdditorPotionIconButtons = [];

let itemCreatorType = "sword";


//TODO//
/*
complete item edditor
*/
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

    //inventory//
    this.Inv = new Inventory(60,110,4,5,80);
    this.Hotbar = new Hotbar(20,9,60);
  }

  draw(){
    this.Inv.draw()
    this.Hotbar.draw()
    
    push()
    rectMode(CORNER)
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    fill("red")

    if(showDebug){
      rect(this.rightX, this.rightY, this.rightW, this.rightH) //right
      rect(this.leftX, this.leftY, this.leftW, this.leftH) //left
      rect(this.bottomX, this.bottomY, this.bottomW, this.bottomH) //bottom
      rect(this.topX, this.topY, this.topW, this.topH) //top
    }
   
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
    //collision detection//
    for(let y = 0; y < map.length; y++){
      for(let x =0; x < map[y].length; x++){
        if(map[y][x].hasCollision){
          //right
          if(this.rightX > map[y][x].Xpos + map[y][x].w || this.rightX + this.rightW < map[y][x].Xpos || this.rightY > map[y][x].Ypos + map[y][x].h || this.rightY + this.rightH < map[y][x].Ypos){
          }
          else{
            this.right = false
            //console.log("is colliding right")
          }
          //left
          if(this.leftX > map[y][x].Xpos + map[y][x].w || this.leftX + this.leftW < map[y][x].Xpos || this.leftY > map[y][x].Ypos + map[y][x].h || this.leftY + this.leftH < map[y][x].Ypos){
          }
          else{
            this.left = false
            //console.log("is colliding left")
          }
          //top
          if(this.topX > map[y][x].Xpos + map[y][x].w || this.topX + this.topW < map[y][x].Xpos || this.topY > map[y][x].Ypos + map[y][x].h || this.topY + this.topH < map[y][x].Ypos){
          }
          else{
            this.top = false
            //console.log("is colliding top")
          }
          //bottom
          if(this.bottomX > map[y][x].Xpos + map[y][x].w || this.bottomX + this.bottomW < map[y][x].Xpos || this.bottomY > map[y][x].Ypos + map[y][x].h || this.bottomY + this.bottomH < map[y][x].Ypos){
          }
          else{
            this.bottom = false
            //console.log("is colliding bottom")
          }
        }
      }
    }
  }

}

class Hotbar{
  constructor(y1,tileCount1,tileSize1){
    this.y = y1;

    this.tileCount = tileCount1;
    this.tileSize = tileSize1;

    this.invOpen = false;

    this.grid = [];

    for(let i = 0; i < this.tileCount; i++){
      this.grid.push(new InventoryTile((width/2 + (this.tileSize)*i) - this.tileSize*this.tileCount/2, this.y, this.tileSize, this.tileSize, true))
    }
  }
  draw(){
    for(let i = 0; i < this.grid.length; i++){
      this.grid[i].draw()
    }
  }
}

class Inventory{
  constructor(x1,y1,xsize1,ysize1,tileSize1){
    this.x = x1;
    this.y = y1;

    this.invOpen = false;

    this.invSpaces = xsize1 * ysize1;

    this.xSize = xsize1;
    this.ySize = ysize1;
    this.tileSize = tileSize1;
    
    this.grid = [];
    
    for(let y = 0; y < this.ySize; y++){
      this.grid.push([])
      for(let x = 0; x < this.xSize; x++){
        this.grid[y][x] = new InventoryTile(this.x + this.tileSize*x ,this.y + this.tileSize*y, this.tileSize, this.tileSize, false)
      }
    }
  }
  draw(){
    //draw inventory
    if(this.invOpen){
      for(let y=0; y< this.grid.length; y++){
        for(let x=0; x< this.grid[y].length; x++){
          this.grid[y][x].draw()
        }
      }
    }
    //draw hotbar
    
  }
}

class InventoryTile{
  constructor(x1,y1,w1,h1,isHotbar1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.isHotbar = isHotbar1
  }
  draw(){
    push()
    fill(100)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }
}

class InventoryItem{
  constructor(){

  }
}

//items//
class ItemPickup{
  constructor(x1,y1,size1,item1){
    this.x = x1;
    this.y = y1;
    this.w = size1;
    this.h = size1;
    this.item = item1
  }
}

class SwordItem{
  constructor(attackrange1,attackspeed1,damage1,name1,icon1){
    this.attackRange = attackrange1;
    this.attackSpeed = attackspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "sword";
  }
}

class BowItem{
  constructor(range1,drawspeed1,damage1,name1,icon1){
    this.range = range1;
    this.drawSpeed = drawspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "bow";
  }
}

class StaffItem{
  constructor(castrange1,castspeed1,damage1,name1,icon1){
    this.castRange = castrange1;
    this.castSpeed = castspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "staff";
  }
}

class PotionItem{
  constructor(duration1,affect1,strength1,name1,icon1){
    this.duration = duration1;
    this.affect = affect1;
    this.strength = strength1;
    this.name = name1;
    this.icon = icon1;
    this.type = "potion";
  }
}
//items//

class areaBrush{
  constructor(x1, y1){
    this.x = x1
    this.y = y1
    this.w = 0
    this.h = 0

  }
  draw(){
    ellipse(this.x, this.y,25)
  }
  updateSize(width1,height1){
    //update selected area rectangle//
    if(width1 > this.x){
      this.w = width1 - this.x;
    }
    else{
      this.w = width1 - this.x;
      this.x = this.x + this.w;
      this.w = (this.x - this.w) - this.x;
    }
    if(height1 > this.y){
      this.h = height1 - this.y;
    }
    else{
      this.h = height1 - this.y;
      this.y = this.y + this.h;
      this.h = (this.y - this.h) - this.y;
    }
  }
  changeTiles(map){
    //check if tile is in selected area and update it//
    for(let y=0; y< map.length; y++){
      for(let x=0; x< map[y].length; x++){
        if(!(this.x > map[y][x].Xpos + map[y][x].w || this.x + this.w < map[y][x].Xpos || this.y > map[y][x].Ypos + map[y][x].h || this.y + this.h < map[y][x].Ypos)){
          map[y][x].tile = selectedTexture
          map[y][x].hasCollision = selectedTexture.hasCollision
        }
      }
    }
  }
}

class tile{
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
    textSize(16)
    text(this.name, this.x+2, this.y+2, this.w ,this.h)
    pop()
  }
  mouseOn(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
      return true
    }
    else{
      return false
    }
  }
}

class ImageButton{
  constructor(x1, y1, w1, h1, tile1){
    
    //x and y position of the button//
    this.x = x1
    this.y = y1
    
    //width and height of the button//
    this.w = w1
    this.h = h1
    
    //button color//
    
    if(tile1.texture !== undefined){
      this.image = tile1.texture
      this.tile = tile1
    }
    else{
      this.image = tile1
    }

    //sets pos to center
    this.x -= (this.w/2)
    this.y -= (this.h/2)
  }

  //draws the button//
  draw(){
    push()
    fill(50, 20)
    rect(this.x, this.y, this.w, this.h)
    image(this.image,this.x +5, this.y +5, this.w -10, this.h -10)
    pop()
  }
  mouseOn(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
      return true
    }
    else{
      return false
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

class TextInputBox{
  constructor(x1,y1,w1,h1,charLim1,numonly1,maxNum1){
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;

    this.focused = false;
    this.textData = "";
    this.numbers = [0,1,2,3,4,5,6,7,8,9];
    this.charLimit = charLim1;
    
    if(maxNum1 === undefined){
      this.maxNum = 0;
    } else this.maxNum = maxNum1;
    
    if(numonly1 === undefined){
      this.numOnly = false;
    } else this.numOnly = numonly1;

    if(this.numOnly){
      this.textData = "0";
    } else this.textData = "text";
  }
  draw(){
    push()
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textSize(20)
    if(this.focused){
      push()
      fill(0)
      rect(this.x - 5, this.y - 5, this.w + 10, this.h + 10)
      pop()
    }
    rect(this.x, this.y, this.w, this.h);
    text(this.textData, this.x, this.y, this.w, this.h);
    pop()
  }
  updateText(textInput){
    if(this.textData.length < this.charLimit || this.charLimit === 0){
      if(this.numOnly){
        for(let i = 0; i < this.numbers.length; i++){
          if(parseInt(key) === this.numbers[i]){
            this.textData += textInput;
            return;
          }
        }
      }
      else this.textData += textInput;
    }
  }
  textBackspace(){
    this.textData = this.textData.slice(0,-1)
  }
  setMax(){
    if(this.numOnly && this.maxNum > 0){
      if(parseInt(this.textData) > this.maxNum){
        this.textData = this.maxNum.toString();
      }
    }
    this.focused = false;
  }
  mouseOn(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
      this.focused = true
    }
    else{
      this.setMax()
    }
  }
  returnAsNum(){
    return parseInt(this.textData)
  }
}

class TextBox{
  constructor(x1,y1,w1,h1,startingtext1){
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    if(startingtext1 !== undefined){
      this.textData = startingtext1;
    } else this.textData = "";

  }
  draw(){
    push()
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textSize(20);
    rect(this.x, this.y, this.w, this.h);
    text(this.textData, this.x, this.y, this.w, this.h);
    pop()
  }
  updateText(textIn){
    this.textData = textIn;
  }
}

class ImageBox{
  constructor(x1,y1,w1,h1,image1){
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.image = image1
  }
  draw(){
    push()
    rect(this.x, this.y, this.w, this.h)
    image(this.image, this.x +5, this.y +5, this.w -10, this.h -10)
    pop()
  }
}

class GridItem{
  constructor(x1,y1,w1,h1,tile1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    
    this.offsetX = 0
    this.offsetY = 0
    
    this.hasCollision = false

    this.tile = tile1

    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
  }


  draw(){
    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
    //draw GridItem if its on screen//Many FPS!!!//
    if(((this.x + this.offsetX) >= (0 - this.w) && (this.x + this.offsetX) < width) && ((this.y + this.offsetY) >= (0 - this.h) && (this.y + this.offsetY) < height)){
      push()
      image(this.tile.texture, this.Xpos, this.Ypos, this.w, this.h)
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
  save(list){
    let textureId = textures.indexOf(this.tile);
    
    list.push(textureId);
  }
  load(data){
    this.tile = textures[data]
    this.hasCollision = textures[data].hasCollision
  }
}

class GridGen{
  constructor(sizex, sizey, size, defTexture){
    this.grid = []
    this.SizeX = sizex
    this.SizeY = sizey
    this.gridSize = size
    this.defaultTexture = defTexture

    this.gridX = 0
    this.gridY = 0

    for(let y=0; y< this.SizeY; y++){
      this.grid.push([]);
      for(let x=0; x< this.SizeX; x++){
        this.grid[y][x] = new GridItem(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize, this.defaultTexture)
      }
    }
  }
  draw(){
    for(let y=0; y< this.grid.length; y++){
      for(let x=0; x< this.grid[y].length; x++){
        this.grid[y][x].offsetX = mapOffsetX
        this.grid[y][x].offsetY = mapOffsetY
        this.grid[y][x].draw()
      }
    }
  }
}

function preload(){
  //textures//
  textures[0] = new tile(loadImage('assets/Default.png'),false)//default
  textures[1] = new tile(loadImage('assets/Grass.png'),false)//grass
  textures[2] = new tile(loadImage('assets/Rock.png'),true)//rock

  //item textures//
  swordTextures[0] = loadImage('assets/sword_normal.png');
  swordTextures[1] = loadImage('assets/sword_shiny.png');
}

function setup() {
  frameRate(60);
  noSmooth();
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  
  //menu buttons//
  menuButtons[0] = new Button(width/2, height/2 + 40, 64, 64, "edditor")
  menuButtons[1] = new Button(width/2, height/2 - 40, 64, 64, "game")

  //pause menu buttons//
  pauseBackground = new UiBackground(width/2 -100, height/2 -200, 200, 400, 50, 10)
  backButton = new Button(width/2, height/2 + 40, 64, 64, "back")
  resumeButton = new Button(width/2, height/2 - 40, 64, 64, "resume")

  //player character//
  Player = new PlayerCharacter(width/2, height/2, 5);
  
  //make map//
  MainMap = new GridGen(400,400,64,textures[0])
  
  //edditor items & buttons//
  edditorUiBackground[0] = new UiBackground(0, 100, 200, height-100, 50, 10);
  edditorUiBackground[1] = new UiBackground(0,0,width,100,50,10);
  edditorUiBackground[2] = new UiBackground(width-200, 100, 200, height-100, 50, 10);

  edditorUiButtons[0] = new ImageButton(50, 150 , 64, 64, textures[1]);
  edditorUiButtons[1] = new ImageButton(150, 150 , 64, 64, textures[2]);
  
  Buttons[0] = new Button(width-50, 150 ,64, 64,"save");
  Buttons[1] = new Button(width-150, 150 ,64, 64,"def map");
  Buttons[2] = new Button(width-50, 250 ,64, 64,"custom map");

  //item edditor buttons//
  itemEdditorButtons[0] = new Button(50, 150 , 64, 64,"New Sword");
  itemEdditorButtons[1] = new Button(150, 150 , 64, 64,"New Bow");
  itemEdditorButtons[2] = new Button(50, 250 , 64, 64,"New Staff");
  itemEdditorButtons[3] = new Button(150, 250 , 64, 64,"New Potion");

  itemEdditorButtons[4] = new Button(width- 250, 150 , 64, 64,"Save Item");
  //item edditor text boxes//
  itemEdditorText[0] = new TextBox(225, height-330, 200, 25,"Attack Range")
  itemEdditorTextBoxes[0] = new TextInputBox(225, height -300, 200, 50, 4, true, 1000);

  itemEdditorText[1] = new TextBox(225, height-230, 200, 25,"Attack Speed")
  itemEdditorTextBoxes[1] = new TextInputBox(225, height -200, 200, 50, 4, true, 1000);

  itemEdditorText[2] = new TextBox(225, height-130, 200, 25,"Damage")
  itemEdditorTextBoxes[2] = new TextInputBox(225, height -100, 200, 50, 4, true, 1000);

  itemEdditorTextBoxes[3] = new TextInputBox(width/2 - 150, 150, 300, 50, 20);
  
  edditorMenuButtons[0] = new Button(100,50,64,64,"map");
  edditorMenuButtons[1] = new Button(200,50,64,64,"items");

  itemEdditorSwordIconButtons[0] = new ImageButton(250, 150 , 64, 64, swordTextures[0]);
  itemEdditorSwordIconButtons[1] = new ImageButton(250, 250 , 64, 64, swordTextures[1]);

  itemEdditorDemoIcon = new ImageBox(width/2 - 100,height/2 - 100,200,200,swordTextures[0]);
  
  //brush types//
  edditorBrushes[0] = new Button(50,250,64,64,"Single");
  edditorBrushes[1] = new Button(150,250,64,64,"Area");
  
  //fill the saveLoad array//
  saveLoad = []
  for(let y=0; y< MainMap.grid.length; y++){
    for(let x=0; x< MainMap.grid[y].length; x++){
      MainMap.grid[y][x].save(saveLoad)
    }
  }
  console.log("saved");

  selectedTexture = textures[1]
}

function draw() {
  background(backgroundColour);

  if(scene === "menu"){
    menu()
  }

  if(scene === "game"){
    game()
  }
  
  if(scene === "edditor"){
    edditor()
  }

  if(paused === true){
    pauseBackground.draw()
    backButton.draw()
    resumeButton.draw()
  }

  //show fps//
  push()
  textSize(30)
  text(Math.round(frameRate()), 10, 40,)
  pop()

}

function mapEdditor(mapGrid){
  let mouseOnUi = false;
  if(!paused){
    //update for 2d array//
    for(let y = 0; y < mapGrid.length; y++){
      for(let x = 0; x < mapGrid[y].length; x++){
        mouseOnUi = false;
        for(let j = 0; j < edditorUiBackground.length; j++){
          if(edditorUiBackground[j].mouseOverUi()){
            mouseOnUi = true
          }
        }
        if(mouseOnUi === false){
          if(brushMode === "Single"){
            if(mouseIsPressed && mapGrid[y][x].mouseOverTile()){
              mapGrid[y][x].tile = selectedTexture
              mapGrid[y][x].hasCollision = selectedTexture.hasCollision
              
            }
          }
        }
      }
    }
  }
  //draw edditor ui//
  
  for(let i = 0; i < edditorUiButtons.length; i++){
    edditorUiButtons[i].draw()
  }
  for(let i = 0; i < edditorBrushes.length; i++){
    edditorBrushes[i].draw()
  }
  
}

function itemEdditor(){
  for(let i = 0; i < itemEdditorButtons.length; i++){
    itemEdditorButtons[i].draw()
  }
  for(let i = 0; i < itemEdditorTextBoxes.length; i++){
    itemEdditorTextBoxes[i].draw()
  }
  for(let i = 0; i < itemEdditorText.length; i++){
    itemEdditorText[i].draw()
  }
  if(itemCreatorType === "sword"){
    for(let i = 0; i < itemEdditorSwordIconButtons.length; i++){
      itemEdditorSwordIconButtons[i].draw()
    }
  }
  itemEdditorDemoIcon.draw()
}

function itemCreator(itemType){
  let item;
  if(itemType === "sword"){
    item = new SwordItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "bow"){
    item = new BowItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "staff"){
    item = new StaffItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "potion"){
    item = new PotionItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  return item;
}

function edditorUi(){
  for(let i = 0; i < edditorUiBackground.length; i++){
    edditorUiBackground[i].draw()
  }
  for(let i = 0; i < edditorMenuButtons.length; i++){
    edditorMenuButtons[i].draw()
  }
  for(let i = 0; i < Buttons.length; i++){
    Buttons[i].draw()
  }
}

function keyTyped(){
  if(scene === "edditor"){
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        if(itemEdditorTextBoxes[i].focused){
          itemEdditorTextBoxes[i].updateText(key)
        }
      }
    }
  }
}

function keyPressed(){
  if(key === "t"){
    showDebug = !showDebug
  }

  if(keyCode === ESCAPE && scene !== "menu"){
    paused = !paused
  }

  if(scene === "edditor"){
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        if(itemEdditorTextBoxes[i].focused){
          if(keyCode === BACKSPACE){
            itemEdditorTextBoxes[i].textBackspace()
          }
          if(keyCode === ENTER){
            itemEdditorTextBoxes[i].setMax();
          }
        }
      }
    }
  }
  if(scene === "game"){
    if(key === "e" && !paused){
      Player.Inv.invOpen = !Player.Inv.invOpen;
      Player.Hotbar.invOpen = Player.Inv.invOpen;
      canMove = !Player.Inv.invOpen;
    }
  }
}

function mouseClicked(){
  let mouseOnUi = false;
  if(scene === "edditor"){
    mouseOnUi = false;
    for(let j = 0; j < edditorUiBackground.length; j++){
      if(edditorUiBackground[j].mouseOverUi()){
        mouseOnUi = true
      }
    }
    if(edditorMenu === "map"){
      //select what tile to paint//
      for (let i = 0; i < edditorUiButtons.length; i++) {
        if(edditorUiButtons[i].mouseOn() && mouseButton === LEFT){
          selectedTexture = edditorUiButtons[i].tile
        }
      }
      //select brush bode//
      for(let i = 0; i < edditorBrushes.length; i++){
        if(edditorBrushes[i].mouseOn()){
          brushMode = edditorBrushes[i].name
          brush = null;
          canMove = true;
        }
      }
      //area Brush//
      if(brushMode === "Area"){
        if(!mouseOnUi){
          if(brush === null){
            brush = new areaBrush(mouseX, mouseY)
            canMove = false;
          }
          else{
            brush.updateSize(mouseX, mouseY)
            brush.changeTiles(MainMap.grid);
            brush = null;
            canMove = true;
          }
        }
      }
    }
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        itemEdditorTextBoxes[i].mouseOn()
      }
      if(itemCreatorType === "sword"){
        for(let i = 0; i < itemEdditorSwordIconButtons.length; i++){
          if(itemEdditorSwordIconButtons[i].mouseOn()){
            itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[i].image
          }
        }
      }

      if(itemEdditorButtons[0].mouseOn()){ //new bow//
        itemCreatorType = "sword";

        itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[0].image
        
        itemEdditorText[0].textData = "Attack Range"
        itemEdditorText[1].textData = "Attack Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[1].mouseOn()){ //new bow//
        itemCreatorType = "bow";

        itemEdditorText[0].textData = "Range"
        itemEdditorText[1].textData = "Draw Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[2].mouseOn()){ //new staff//
        itemCreatorType = "staff";

        itemEdditorText[0].textData = "Cast Range"
        itemEdditorText[1].textData = "Cast Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[3].mouseOn()){ //new Potion//
        itemCreatorType = "potion";

        itemEdditorText[0].textData = "Duration"
        itemEdditorText[1].textData = "Affect"
        itemEdditorText[2].textData = "Strength"
      }
      if(itemEdditorButtons[4].mouseOn()){ //saveItem//
        worldItems.push(itemCreator(itemCreatorType));
      }
    }

    //save load//UPDATE FOR 2D ARRAY
    if(Buttons[0].mouseOn()){ //save//
      saveLoad = []
      for(let y=0; y< MainMap.grid.length; y++){
        for(let x=0; x< MainMap.grid[y].length; x++){
          MainMap.grid[y][x].save(saveLoad)
        }
      }
      console.log("saved");
      var JsonSave = {
        saveData: saveLoad,
      }
      saveJSON(JsonSave, "MapSaveData");
    }
    
    if(Buttons[1].mouseOn()){ //load//
      //make better//
      loadJSON("assets/MapSaveData.json", loadMap)
    }
    if(Buttons[2].mouseOn()){ //load//
      //make better//
      loadMap(json);
    }
    
    //select edditor mode//
    if(edditorMenuButtons[0].mouseOn()){ //tiles
      edditorMenu = "map"
    }
    if(edditorMenuButtons[1].mouseOn()){ //items
      edditorMenu = "items"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }
  }

  if(scene === "menu"){
    if(menuButtons[0].mouseOn()){
      resetVals()
      scene = "edditor";
    }
    if(menuButtons[1].mouseOn()){
      resetVals()
      scene = "game";
    }
  }

  if(paused){
    if(resumeButton.mouseOn()){
      paused = false;
    }
    if(backButton.mouseOn()){
      scene = "menu";
      resetVals();
    }
  }
}

function loadMap(data){
  console.log(data.saveData);
  saveLoad = data.saveData;
  let i = 0;
  for(let y=0; y< MainMap.grid.length; y++){
    for(let x=0; x< MainMap.grid[y].length; x++){
      MainMap.grid[y][x].load(saveLoad[i])
      i++
    }
  }
  console.log("Loaded");
}

function playerController(player){
  if(!paused && canMove){
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
    //sprinting//
    // if(keyIsDown(SHIFT)){
    //   Player.movespeed = 6
    // }
    // else Player.movespeed = 3
  }
}

function inventoryController(){
  //do
}

//load custom map save//
function calledFromHTML(){
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function(){
    json = JSON.parse(reader.result)
  }
}

function menu(){
  for(let i = 0; i < menuButtons.length; i++){
    menuButtons[i].draw()
  }
}

function game(){
  MainMap.draw()
  playerController(Player)
  Player.draw()
  Player.collisionDetect(MainMap.grid)
}

function edditor(){
  if(edditorMenu === "map"){
    MainMap.draw();
    playerController(Player);
    mapEdditor(MainMap.grid);
    
    if(brush != null){
      brush.draw();
    }
  }
  else if(edditorMenu === "items"){
    itemEdditor();
  }
  edditorUi();
}

function resetVals(){
  Player.left = true;
  Player.right = true;
  Player.top = true;
  Player.bottom = true;
  Player.Inv.invOpen = false; 
  Player.Hotbar.invOpen = false;
  
  mapOffsetX = 0;
  mapOffsetY = 0;
  
  showDebug = false;
  canMove = true;
  brushMode = "Single";
  brush = null;
  
  paused = false;
}