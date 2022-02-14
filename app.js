const result = document.querySelector(".result");
const history = document.querySelector(".history");
const numPad = document.querySelector('.numPad')

let currentkey = result.textContent
let currentOperator = history.textContent
function numberGrab(e) {
    const isButton = e.target.nodeName === "BUTTON"
    const isOperator = e.target.className === "operator"
    if (!isButton || isOperator) {
        currentOperator = e.target.textContent ;
    }
    else
        result.textContent = e.target.textContent;
    currentkey = parseFloat(result.textContent);

}

numPad.addEventListener('click', numberGrab);