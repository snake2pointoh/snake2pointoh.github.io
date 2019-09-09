// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let backgroundColour = 256;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

  let redAmmount = 0;
  let redChangeAmmount = 1;
  background(backgroundColour);


function draw() {
  fill(redAmmount,0,0);
  noStroke();
  if(mouseIsPressed){
    if(mouseButton === LEFT){
      //noCursor();
      ellipse(mouseX, mouseY, 100, 100);
      
      redAmmount += redChangeAmmount;
      
      if(redAmmount >= 256 || redAmmount <= 0){
        redChangeAmmount *= -1;
      }
    }
    else if(mouseButton === CENTER){
      fill(backgroundColour);
      ellipse(mouseX, mouseY, 100, 100);
    }
  }
  console.log(redAmmount);
}

