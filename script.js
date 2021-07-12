let displayText = document.getElementById("display");
let clears = document.getElementById("remove").getElementsByTagName("button");
let buttons = document
  .getElementById("operations")
  .getElementsByTagName("button");

let cleared = true;
let errored = false;
let operatorTyped = false;
let decimalTyped = false;

function operate(operation, a, b) {
  if (operation == "+") {
    return a + b;
  } else if (operation == "-") {
    return a - b;
  } else if (operation == "*") {
    return a * b;
  } else if (operation == "/") {
    return a / b;
  }
}

for (let button of clears) {
  button.onclick = () => {
    if (cleared === false && errored === false) {
      switch (button.className) {
        case "clear":
          displayText.textContent = 0;
          cleared = true;
          errored = false;
          operatorTyped = false;
          decimalTyped = false;
          break;
        case "delete":
          if (displayText.textContent.length === 1) {
            displayText.textContent = 0;
            cleared = true;
            errored = false;
            operatorTyped = false;
            decimalTyped = false;
            break;
          } else {
            if (operatorTyped === true) {
              displayText.textContent = displayText.textContent.slice(0, -3);
              operatorTyped = false;
            } else {
              if (
                displayText.textContent[displayText.textContent.length - 1] ==
                "."
              ) {
                decimalTyped = false;
              }
              displayText.textContent = displayText.textContent.slice(0, -1);
            }
          }
      }
    }
  };
}

for (let button of buttons) {
  button.onclick = () => {
    if (cleared === false && errored === false) {
      switch (button.className) {
        case "number":
          displayText.textContent += button.textContent;
          operatorTyped = false;
          break;
        case "operator":
          if (operatorTyped == false) {
            displayText.textContent += ` ${button.textContent} `;
            operatorTyped = true;
          }
          break;
        case "decimal":
          if (decimalTyped == false) {
            displayText.textContent += ".";
            decimalTyped = true;
          }
          break;
        case "equals":
          let result = eval(displayText.textContent);
          if (
            typeof result == "number" &&
            result != Infinity &&
            result != NaN
          ) {
            displayText.textContent = result;
            if (result > Math.floor(result)) {
              decimalTyped = true;
            } else {
              decimalTyped = false;
            }
          } else {
            displayText.textContent = "whoops";
            errored = true;
          }
          break;
      }
    } else if (button.className == "number") {
      console.log("else");
      displayText.textContent = button.textContent;
      cleared = false;
      errored = false;
      decimalTyped = false;
    }
  };
}
