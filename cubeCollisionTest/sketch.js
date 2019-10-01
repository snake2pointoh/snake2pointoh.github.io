// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColour);
  cube1 = new cube((width/2)-50,(height/2)-50,50,50)
  cube2 = new cube(0,0,50,50)
}

class cube{
  constructor(x1,y1,w1,h1){
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.color = "white"
  }
  draw(){
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
  }
  followMouse(){
    this.x = mouseX - this.w/2
    this.y = mouseY - this.h/2
  }
}

function draw() {
  background(backgroundColour);
  cube1.draw()
  cube2.draw()
  cube2.followMouse()
  //   left        right         ||  right          left        ||   top          bottom       ||   bottom              top  //
  if(cube2.x > cube1.x + cube1.w || cube2.x + cube2.w < cube1.x || cube2.y > cube1.y + cube1.h || cube2.y + cube2.h < cube1.y){
    cube1.color = "white"
  }
  else{
    cube1.color = "black"
  }

}

