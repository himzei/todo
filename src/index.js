// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const 
  input = document.querySelector(".show"),
  buttons = document.querySelectorAll("button");

/// https://taiyakee.tistory.com/66
/// 위 사이트 참고 했습니다.

let result = "";
let operationCheck = false;
let numberCheck = true;
let equalsCheck = true;

function init() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.dataset.type) {
        case "operator":
          const operation = button.innerText;
          operator(operation);
          break;
        case "clear":
          clear();
          break;
        case "equals":
          calculate();
          break;
        default:
          const number = button.innerText;
          displayNumber(number);
          break;
      }
    });
  });
}


function displayNumber(number) {
  operationCheck = true;
  const current = input.value;

  if (equalsCheck) {
    if (numberCheck) {
      input.value = current === "0" ? number : input.value + number;
    } else {
      input.value = number;
      numberCheck = true;
    }
    result += number;
  } else {
    equalsCheck = true;
    input.value = number;
    result = number;
  }
}



function calculate() {
  if (input.value === "0") {
    clear();
  } else {
    if (!operationCheck) {
      alert("unavailable");
    } else {
      if (equalsCheck) {
        const final = eval(result);
        input.value = `${final}`;
        result = "";
        equalsCheck = false;
        operationCheck = false;
      } else {
        clear();
      }
    }
  }
}

function operator(operation) {
  if (!operationCheck) {
    alert("Error");
  } else {
    operationCheck = false;
    result += operation;
    numberCheck = false;
  }
}

function clear() {
  input.value = 0;
  result = "";
  operationCheck = false;
  equalsCheck = true;
}

init();
