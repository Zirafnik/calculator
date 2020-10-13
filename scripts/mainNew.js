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

function toPower(num1, num2) {
    return Math.pow(num1, num2);
}

function remainder(num1, num2) {
    return num1 % num2;
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

        case '^':
            return toPower(first, second);

        case '%':
            return remainder(first, second);
    }
}


const display= document.querySelector('#display');
let displayArr=[];

let workingNumbers= {
    operator: null,
    first: null,
    second: null,
}

const numbers= document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', addNumber));
//displays clicked numbers
function addNumber(e) {
    if(displayArr.length==20) {
        return;
    } else {
        if(displayArr[0]==0 && displayArr.some(x => x=='.')==false) {
            displayArr[0]=e.target.value;
            display.textContent= displayArr.join('');
        } else {
            displayArr.push(e.target.value);
            display.textContent= displayArr.join('');
            console.log(displayArr);
        }
    }
}


const operators= document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', recordOperator));

function recordOperator(e) {
    //if first empty
    if(workingNumbers.first==null) {
        workingNumbers.first= Number(displayArr.join('')); //saves first number
        workingNumbers.operator= e.target.value; //saves operator value
        displayArr=[]; //clears display arr
        console.log('set first and set operator');
        console.log(e.target.value);
        if(e.target.value=='=') {
            workingNumbers.operator= null;
            display.textContent= workingNumbers.first;
            console.log('set first and deleted operator');
        }
    } 
    //first number + operator
    else if(workingNumbers.first!=null && workingNumbers.operator!=null && displayArr!=[]) {
        workingNumbers.second= Number(displayArr.join('')); //saves second number
        //also gives result
        let result= operate(workingNumbers.operator, workingNumbers.first, workingNumbers.second);
        workingNumbers.first= result; //saves result to first
        workingNumbers.second= null; //clears second
        display.textContent= result; //displays result
        displayArr=[]; //clears display arr
        workingNumbers.operator= e.target.value; //sets new operator value
        console.log('set result and set new operator');
        if(e.target.value=='=') {
            workingNumbers.operator= null;
            console.log('set result and no operator');
        }
    }

    //first + no operator
    else if(workingNumbers.first!=null && workingNumbers.operator==null) {
        workingNumbers.operator= e.target.value;
        console.log('set opertator, first already exists');
        if(e.target.value=='=') {
            workingNumbers.operator= null;
            console.log('nothing happens');
        }
    }
}


const clear= document.querySelector('#clear');
clear.addEventListener('click', clearLog);

function clearLog() {
    displayArr=[];

    workingNumbers.operator= null;
    workingNumbers.first= null;
    workingNumbers.second= null;
    
    display.textContent='';
}


const backspace= document.querySelector('#delete');
backspace.addEventListener('click', deleteLastNum);

function deleteLastNum() {
    displayArr.pop();
    display.textContent= displayArr.join('');
}


const dot= document.querySelector('#dot');
dot.addEventListener('click', addDecimal);

function addDecimal() {
    if(displayArr.length>=19) {
        return;
    } else if(displayArr.some(x => x=='.')) {
            return;
    }
    displayArr.push('.');
    display.textContent= displayArr.join('');

}


const neg= document.querySelector('#neg');
neg.addEventListener('click', turnNegative);


function turnNegative() {
    if(displayArr.length!=0 && displayArr.every(x => x!='.')==true && displayArr[0]!='-') {
        displayArr.unshift('-');
        display.textContent= displayArr.join('');
    } else if(workingNumbers.first!=null){
        workingNumbers.first= workingNumbers.first * (-1);
        display.textContent= workingNumbers.first;
    }
}