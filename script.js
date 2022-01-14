//Variables Holding Data
let firstRowNumbers = '';
let secondRowNumbers = '';
let operation = '';
let haveDot = false;
let result = null;

//Instantiate Interactive Buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete-previous]');
const clearButton = document.querySelector('[data-all-clear]');

//Instantiate Display Elements
const operatorsTextElement = document.querySelector('[data-previous-operand]');
const operantTextElement = document.querySelector('[data-current-operand]');

//Mouse Click Functionality

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        secondRowNumbers += e.target.innerText;
        operantTextElement.innerText = secondRowNumbers;
    })
})

operationsButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (!secondRowNumbers) {
            return;
        }
        haveDot = false;
        const operationName = e.target.innerText;
        if (firstRowNumbers && secondRowNumbers && operation) {
            mathOperation();
        } else {
            result = parseFloat(secondRowNumbers);
        }
        clearVar(operationName);
        operation = operationName;
        console.log(result);
    })
})


let clearVar = (name = '') => {
    firstRowNumbers += secondRowNumbers + ' ' + name + ' ';
    operatorsTextElement.innerText = firstRowNumbers;
    operantTextElement.innerText = '';
    secondRowNumbers = '';
}

let mathOperation = () => {
    if (operation === '*') {
        result = parseFloat(result) * parseFloat(secondRowNumbers)
    } else if (operation === '+') {
        result = parseFloat(result) + parseFloat(secondRowNumbers)
    } else if (operation === '/') {
        result = parseFloat(result) / parseFloat(secondRowNumbers)
    } else if (operation === '-') {
        result = parseFloat(result) - parseFloat(secondRowNumbers)
    }
}

equalsButton.addEventListener('click', (e) => {
    if (!firstRowNumbers || !secondRowNumbers) {
        return;
    }
    haveDot = false;
    mathOperation();
    clearVar();
    operantTextElement.innerHTML = result;
    secondRowNumbers = result;
    firstRowNumbers = '';
});

clearButton.addEventListener('click', (e) => {
    operatorsTextElement.innerText = '0';
    operantTextElement.innerText = '0';
    firstRowNumbers = '';
    secondRowNumbers = '';
    result = '';
})

deleteButton.addEventListener('click', (e) => {
    operantTextElement.innerText = '';
    secondRowNumbers = '';
})

//Key Press Functionality

window.addEventListener('keydown', (e) => {
    if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
    ){
        clickButton(e.key);
    } else if (
        e.key === '*' ||
        e.key === '+' ||
        e.key === '/' ||
        e.key === '-'
    ){
        clickOperation(e.key);
    } else if (
        e.key === 'Enter' || e.key === '='
    ) {
        clickEqual(e.key);
    }
});

let clickButton = (key) => {
    numberButtons.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

let clickOperation = (key) => {
    operationsButtons.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

let clickEqual = () => {
    equalsButton.click();
}

