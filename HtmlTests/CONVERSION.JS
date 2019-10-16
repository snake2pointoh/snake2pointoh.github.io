// DOM demo with base conversions
// Dan Schellenberg
// May 18, 2018
// icon feedback added March 29, 2019

// this is indented to show two major ideas:
// - how to use some of the DOM manipulation functions in p5js
// - using bootstrap (https://getbootstrap.com/) to style a page, instead of
//    using our own CSS (note that bootstrap's css is linked to in index.html)

let questionInputs;
let answers;

function setup() {
  questionInputs = [];
  answers = [];

  createQuestion(2, 16);
  createQuestion(10, 2);
  createQuestion(16, 10);
  createQuestion(2, 10);
  createQuestion(10, 16);
  createQuestion(16, 2);
  addButtons();
}

// use some built-in javascript functions to convert bases
function convert(number, baseFrom, baseTo) {
  return parseInt(number, baseFrom).toString(baseTo);
}

function createQuestion(baseFrom, baseTo) {
  // this allows for easily writing a message in text about which conversion we are doing
  let baseToText = {
    2: "binary",
    10: "decimal",
    16: "hexadecimal",
  };

  // start with the random number in base 10, then convert it to required bases
  let randomDecimalNumber = int(random(17, 255));
  let displayValue = convert(randomDecimalNumber, 10, baseFrom);

  // keep track of the answer and the base, to help when interpreting user input
  let answerData = {
    answer: convert(randomDecimalNumber, 10, baseTo),
    base: baseTo,
  };
  answers.push(answerData);

  // add container div for label and question -- allows for icon validation
  let container = createElement("div");
  container.class("form-group position-relative");
  container.parent("quiz");

  // add label and question to the html form
  let message = "Convert the following from " + baseToText[baseFrom] + " to " + baseToText[baseTo] + ": " + displayValue;
  let label = createElement("label", message);
  label.parent(container);

  let qustion;
  question = createInput("");
  question.class("form-control mb-3 question");
  question.parent(container);
  questionInputs.push(question);

  //add divs for icon feedback
  valid = createElement("div");
  valid.class("valid-feedback feedback-icon");
  valid.parent(container);

  validIcon = createElement("i");
  validIcon.class("fa fa-check");
  validIcon.parent(valid);

  invalid = createElement("div");
  invalid.class("invalid-feedback feedback-icon");
  invalid.parent(container);

  invalidIcon = createElement("i");
  invalidIcon.class("fa fa-times");
  invalidIcon.parent(invalid);
}

function addButtons() {
  // check answers button
  let checkButton = createButton("Check Answers");
  checkButton.attribute("type", "button");
  checkButton.parent("quiz");
  checkButton.class("btn btn-success mb-4 d-block");
  checkButton.mousePressed(answerCheck);

  // reset the page -- by default, if ther eis no type attribute given,
  //  the html will cause this button to reload the page
  let resetButton = createButton("Generate New Questions");
  resetButton.parent("quiz");
  resetButton.class("btn btn-primary d-block");
}

function answerCheck() {
  // look at each question, and determine if the answer is valid or not
  // uses bootstrap is-valid and is-invalid classes for styling...
  for (let i=0; i<questionInputs.length; i++) {
    let theAnswer = answers[i].answer;
    let usersValue = questionInputs[i].value();

    if (answers[i].base === 2) {
      // use regular expressions to remove leading 0's from a binary number
      usersValue = usersValue.replace(/^0+/, "");
    }
    else if (answers[i].base === 16) {
      // convert hexadecimal value to lowercase
      usersValue = usersValue.toLowerCase();
      // remove the leading "x", if it exists
      usersValue = usersValue.replace(/^x/, "");
    }

    if (usersValue === theAnswer) {
      // first get rid of any existing validation classes
      questionInputs[i].removeClass("is-invalid");
      questionInputs[i].removeClass("is-valid");
      // now add the correct validation class
      questionInputs[i].addClass("is-valid");
    }
    else {
      // first get rid of any existing validation classes
      questionInputs[i].removeClass("is-invalid");
      questionInputs[i].removeClass("is-valid");
      // now add the correct validation class
      questionInputs[i].addClass("is-invalid");
    }

  }
}