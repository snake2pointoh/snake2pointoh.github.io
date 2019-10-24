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
  grid = make2DArray(20,20)
}

function draw() {
  background(220);
  drawGrid(grid)
}

function drawGrid(theGrid){
  for(let y =0; y< theGrid.length; y++){
    for(let x=0; x< theGrid[y].length; x++){
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
  let myArray = [];
  for(let i=0; i < cols; i++){
    myArray.push([]);
    for(let j=0; j < rows; j++){
      if(random(100) > 50){
        myArray[i].push(1);
      }
      else {
        myArray[i].push(0);
      }
    }
  }
  return myArray
}

// let grid

// function setup() {
//   createCanvas(400, 400);
//   grid = makeGrid(10,10)
// }

// function draw() {
//   background(220);
//   drawGrid(grid,50);
// }

// function makeGrid(cols,rows){
//   let someGrid = []
//   for(let i =0; i < cols; i++){
//     someGrid.push([]);
//     for(let j =0; j<rows; j++){
//       if(random(100) < 50){
//         someGrid[i].push(0);
//       }
//       else{
//         someGrid[i].push(1);
//       } 
//     }
//   }
//   return someGrid;
// }

// function drawGrid(aGrid){
//   for(let y=0; y<aGrid[0].length; y++){
//     for(let x=0; x<aGrid[0].length; x++){
      
//       if(aGrid[y][x] === 0){
//         fill(255);
//       }
      
//       if(aGrid[y][x] === 1){
//         fill(0);
//       }
//       let tileSize = width/aGrid[0].length;
//       rect(x * tileSize, y * tileSize,tileSize,tileSize)
//     }
//   }
// }
