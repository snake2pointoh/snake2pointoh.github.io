// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

var jsonF
var reader = new FileReader();
let json

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
}

function draw() {
  background(220);
}

function calledFromHTML(){
  console.log("i see a new file");
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function(){
    json = JSON.parse(reader.result)
  }
}