// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

  let redAmmount = 0;
  let redChangeAmmount = 1;
  background(220);


function draw() {
  fill(redAmmount,0,0);
  noStroke();
  if(mouseIsPressed){
    noCursor();
    ellipse(mouseX, mouseY, 100, 100);
    
    redAmmount += redChangeAmmount;
    
    if(redAmmount >= 256 || redAmmount <= 0){
      redChangeAmmount *= -1;
    }
  }
  console.log(redAmmount);
}
