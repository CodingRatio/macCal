const result = document.querySelector(".result");
const numPad = document.querySelector('.numPad')
const calculator = document.querySelector('.calculator')
const history = document.querySelector('.history')

let displayedOperand = 0;
let theOperator = '';
let saveOperand = '';

function displayResult(e) {
    const key = e.target;
    const buttonContent = key.textContent;
    const operatorPressed = key.dataset.action;
    const displayResult = result.textContent;
    const savedValue = parseFloat(calculator.dataset.firstValue)
    const operator = calculator.dataset.operator 
    const secondValue = parseFloat(calculator.dataset.secondValue)
  

    if (key.matches('button')) {
        if (!operatorPressed) {
            if (displayResult === "0"){
                result.textContent = buttonContent
            }
            else{
                result.textContent = displayResult + buttonContent;
            }
            displayedOperand = result.textContent;
        }
        if (operatorPressed === "decimal") {
            result.textContent = displayResult + '.';
        }
        if (operatorPressed === "percent") {
            if(Number.isNaN(savedValue) || history.textContent === ''){
                result.textContent = +(percent(parseFloat(displayResult))).toFixed(2)
            }
            history.textContent += displayResult + "%"
            saveOperand = +(savedValue * percent(parseFloat(displayResult))).toFixed(2)
            result.textContent = +operate(savedValue, operator, saveOperand).toFixed(2)
            displayedOperand = displayResult;
            
        }
        if (operatorPressed === 'negative') {
            result.textContent = (displayResult * -1)
            ;
        }
        if (operatorPressed === "rewind") {
            let removeOne = []
            for (i = 0; i < result.textContent.length - 1; i++) {
                removeOne += result.textContent[i]
            }
            result.textContent = removeOne
            displayedOperand = result.textContent;
            if (result.textContent === '')
                result.textContent = 0;
        }
    }
    if (
        operatorPressed === 'add' ||
        operatorPressed === 'subtract' ||
        operatorPressed === 'multiply' ||
        operatorPressed === 'divide'
    ) {
        displayedOperand = result.textContent
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedOperand;
        calculator.dataset.operator = buttonContent;

        history.textContent = displayedOperand;
        history.textContent += buttonContent;
        result.textContent = 0;

    }
    if (operatorPressed === 'equal') {        
        saveOperand= parseFloat(displayedOperand)
        result.textContent = +operate(savedValue, operator, saveOperand).toFixed(2)
        calculator.dataset.firstValue = result.textContent;
        history.textContent = savedValue;
        history.textContent += operator;
        history.textContent += saveOperand; 
    
        
    }
    if (operatorPressed === 'clear') {
        Object.keys(calculator.dataset).forEach(dataKey => {
            delete calculator.dataset[dataKey];
          });
        history.textContent = '';
        operandOne = 0;
        result.textContent = 0;
    }


}


numPad.addEventListener('click', displayResult);


const add = function (x, y) {
    return (x + y);
};
const subtract = function (x, y) {
    return (x - y);
};
const multiply = function (x, y) {
    return (x * y);
};
const divide = function (x, y) {
    return (x / y);
};
const percent = function (x) {
    return (x / 100);
}
function operate(operandOne, theOperator, operandTwo) {
    switch (theOperator) {
        case '+':
            return add(operandOne, operandTwo)
        case '-':
            return subtract(operandOne, operandTwo)
        case '*':
            return multiply(operandOne, operandTwo)
        case "/":
            return divide(operandOne, operandTwo)
        default:
            return "no";
    }
}