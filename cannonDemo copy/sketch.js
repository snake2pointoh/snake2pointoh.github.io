// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  grid = make2DArray(10,10)
}

function draw() {
  background(220);
  drawGrid(grid)
}

function drawGrid(theGrid){
  for(let y =0; y< theGrid[0].length; y++){
    for(let X=0; x< theGrid[0].length; x++){
      if(theGrid[y][x] === 0){
        fill(255)
      }
      else{
        fill(0)
      }
      let cellsize = width/theGrid[0].length
      rect(x * cellsize, y * cellsize, cellsize, cellsize)
    }
  }
}

function make2DArray(cols,rows){
  let myArray = []
  for(let i=0; i< cols;i++){
    myArray.push([]);
    for(let i=0; i< rows;i++){
      if(random(100) > 50){
        myArray[i].push(1)
      }
      else myArray[i].push(0)
    }
  }
  return myArray
}
