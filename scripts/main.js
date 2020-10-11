function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, first, second) {

    switch(operator) {
        case '+':
           return add(first, second);
        
        case '-':
            return subtract(first, second);

        case '*':
            return multiply(first, second);

        case '/':
            return divide(first, second);
    }
}

console.log(operate('+', 6, 4));
console.log(operate('-', 3, 4));
console.log(operate('*', 9, 4));
console.log(operate('/', 1, 4));

const display= document.querySelector('#display');
let displayArr=[];

const numbers= document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', addNumber));

function addNumber(e) {
    if(displayArr[0]==0) {
        displayArr[0]=e.target.value;
        display.textContent= displayArr.join('');
    } else {
        displayArr.push(e.target.value);
        display.textContent= displayArr.join('');
    }
}


const operators= document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', recordOperator));

let currentOperator='';
let numbersArr=[];
function recordOperator(e) {
    if(numbersArr.length==0) {
        numbersArr.push(Number(displayArr.join('')));
        displayArr=[];
        currentOperator= e.target.value;
    } else if(numbersArr.length>0) {
        displayArr=[];
        currentOperator= e.target.value;
    }
}


const equals= document.querySelector('#equals');
equals.addEventListener('click', getResult);

function getResult() {
    numbersArr.push(Number(displayArr.join('')));

    let result= operate(currentOperator, numbersArr[numbersArr.length - 2], numbersArr[numbersArr.length-1]);
    numbersArr.push(result);
    display.textContent= result;

    console.log(numbersArr);
}

const clear= document.querySelector('#clear');
clear.addEventListener('click', clearLog);

function clearLog() {
    displayArr=[];
    numbersArr=[];
    display.textContent='';
}