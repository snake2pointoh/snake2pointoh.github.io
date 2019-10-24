// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scene = "menu"

let backgroundColour = 255;
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

let edditorUiBackground = [];
let edditorUiButtons = [];
let edditorBrushes = [];
let Buttons = [];
let menuButtons = [];
let brushMode = "Single";
let brush = null;

let selectedTexture;

//load uploaded file//
var jsonF;
var reader = new FileReader();
let json;

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
    for(let i = 0;i < map.length; i++){
      if(!(this.x > map[i].Xpos + map[i].w || this.x + this.w < map[i].Xpos || this.y > map[i].Ypos + map[i].h || this.y + this.h < map[i].Ypos)){
        map[i].tile = selectedTexture
        map[i].hasCollision = selectedTexture.hasCollision
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
    textSize(20)
    text(this.name, this.x + this.w/2, this.y + this.h/2)
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
    this.tile = tile1

    //sets pos to center
    this.x -= (this.w/2)
    this.y -= (this.h/2)
  }

  //draws the button//
  draw(){
    push()
    fill(50, 20)
    rect(this.x, this.y, this.w, this.h)
    image(this.tile.texture,this.x +5, this.y +5, this.w -10, this.h -10)
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

    // //update to nested loop && 2d array//
    // for(let i = 0; i < (this.SizeX * this.SizeY) ;i++){
    //   this.grid[i] = new GridItem(this.gridX, this.gridY, this.gridSize, this.gridSize, this.defaultTexture)
      
    //   if(this.gridX + this.gridSize === (this.gridSize * this.SizeX)){
    //     this.gridX = 0
    //     this.gridY += this.gridSize
    //   }
    //   else{
    //     this.gridX += this.gridSize
    //   }
    // }
    for(let y=0; y< this.SizeY; y++){
      this.grid.push([]);
      for(let x=0; x< this.SizeX; x++){
        this.grid[y][x] = new GridItem(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize, this.defaultTexture)
      }
    }
  }
  draw(){
    // //draw map//
    // for(let i = 0; i < this.grid.length ;i++){
    // this.grid[i].offsetX = mapOffsetX
    // this.grid[i].offsetY = mapOffsetY
    // this.grid[i].draw()
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
  Player = new PlayerCharacter(width/2, height/2, 5)
  
  //make map//
  MainMap = new GridGen(400,400,64,textures[0])
  
  //edditor items & buttons//
  edditorUiBackground[0] = new UiBackground(50, 50, 200, 400, 50, 10)
  edditorUiButtons[0] = new ImageButton(200, 100 , 64, 64, textures[1])
  edditorUiButtons[1] = new ImageButton(100, 100 , 64, 64, textures[2])
  Buttons[0] = new Button(100, 300 ,64, 64,"save")
  Buttons[1] = new Button(200, 300 ,64, 64,"def")
  Buttons[2] = new Button(100, 400 ,64, 64,"custom")
  
  //brush types//
  edditorBrushes[0] = new Button(100,200,64,64,"Single")
  edditorBrushes[1] = new Button(200,200,64,64,"Area")
  
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
  if(!paused){
    for(let i = 0; i < mapGrid.length ;i++){
      for(let j = 0; j < edditorUiBackground.length; j++){
        if(!edditorUiBackground[j].mouseOverUi()){
          if(brushMode === "Single"){
            if(mouseIsPressed && mapGrid[i].mouseOverTile()){
              mapGrid[i].tile = selectedTexture
              mapGrid[i].hasCollision = selectedTexture.hasCollision
              
            }
          }
        }
      }
    }
  }
  //draw edditor ui//
  for(let i = 0; i < edditorUiBackground.length; i++){
    edditorUiBackground[i].draw()
  }
  for(let i = 0; i < edditorUiButtons.length; i++){
    edditorUiButtons[i].draw()
  }
  for(let i = 0; i < edditorBrushes.length; i++){
    edditorBrushes[i].draw()
  }
  for(let i = 0; i < Buttons.length; i++){
    Buttons[i].draw()
  }
}

function keyPressed(){
  // if(key === "e"){
  //   playerEnabled = !playerEnabled
  //   Player.left = true
  //   Player.right = true
  //   Player.top = true
  //   Player.bottom = true
  //   brush = null;
  //   canMove = true;
  // }

  if(key === "t"){
    showDebug = !showDebug
  }

  if(keyCode === ESCAPE && scene !== "menu"){
    paused = !paused
  }

  if(scene === "edditor"){
    //quick save
    if(key === "i"){
      saveLoad = []
      for(let y=0; y< MainMap.grid.length; y++){
        for(let x=0; x< MainMap.grid[y].length; x++){
          MainMap.grid[y][x].save(saveLoad)
        }
      }
      console.log("saved");
    }
  
    //quick load
    if(key === "o"){ //&& MainMap.grid.length === saveLoad.length){
      console.log("Loaded");
      let i = 0;
      for(let y=0; y< MainMap.grid.length; y++){
        for(let x=0; x< MainMap.grid[y].length; x++){
          MainMap.grid[y][x].load(saveLoad[i])
          i++
        }
      }
    }
  }
}

function mouseClicked(){
  if(scene === "edditor"){
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
      for(let i =0; i < edditorUiBackground.length;i++){
        if(!edditorUiBackground[i].mouseOverUi()){
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


    //save load//UPDATE FOR 2D ARRAY
    if(Buttons[0].mouseOn()){ //save//
      saveLoad = []
      for(let i = 0; i < MainMap.grid.length; i++){
        MainMap.grid[i].save(saveLoad)
      }
      console.log("saved");
      var JsonSave = {
        saveData: saveLoad,
      }
      saveJSON(JsonSave, "MapSaveData")
    }
    
    if(Buttons[1].mouseOn()){ //load//
      //make better//
      loadJSON("assets/MapSaveData.json", loadMap)
    }
    if(Buttons[2].mouseOn()){ //load//
      //make better//
      loadMap(json);
    }
  }
  if(scene === "menu"){
    if(menuButtons[0].mouseOn()){
      resetVals()
      scene = "edditor"
    }
    if(menuButtons[1].mouseOn()){
      resetVals()
      scene = "game"
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
  }
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
  //Player.collisionDetect(MainMap.grid)
}

function edditor(){
  MainMap.draw()
  playerController(Player)
  mapEdditor(MainMap.grid)
  if(brush != null){
    brush.draw()
  }
}

function resetVals(){
  Player.left = true
  Player.right = true
  Player.top = true
  Player.bottom = true
  
  mapOffsetX = 0;
  mapOffsetY = 0;
  
  showDebug = false;
  canMove = true;
  brushMode = "Single";
  brush = null;
  
  paused = false;
}