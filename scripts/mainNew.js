function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    let x=1000000000000;
    return (num1*x) * (num2*x) / (x*x);  //kind of dealing with floating point...
}

function divide(num1, num2) {
    if(num2==0) {
        return 'That is illegal!!!';
    }
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
    if(displayArr.length==11) {
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
    if(displayArr.length==0) {
        workingNumbers.operator= e.target.value; //changes operator
        console.log('operator changed');
        console.log(workingNumbers.operator);
    } else {
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
            
            if(result.toString().length>11) {
                if(result.toString().split('.').length==2 && result.toString().split('.')[0].length<12) {
                    let spaceLeft= 10 - result.toString().split('.')[0].length;
                    result= result.toFixed(spaceLeft);
                    display.textContent= result;
                    displayArr=[];
                    workingNumbers.first= result;
                    return;
                }
                display.textContent= 'Error';
                displayArr=[];
                workingNumbers.first=null;
                return;
            } 
            else if(result=='That is illegal!!!') {
                display.textContent= result;
                displayArr=[];
                workingNumbers.first=null;
                return;
            }
            else if(isNaN(result)) {
                display.textContent= 'Not a number';
                displayArr=[];
                workingNumbers.first=null;
                return;
            }
            else {
            workingNumbers.first= result; //saves result to first
            workingNumbers.second= null; //clears second
            display.textContent= result; //displays result
            displayArr=[]; //clears display arr
            workingNumbers.operator= e.target.value; //sets new operator value
            console.log('set result and set new operator');
            }
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
                workingNumbers.first= Number(displayArr.join(''));
                displayArr= [];
                display.textContent= workingNumbers.first;
                console.log('reset first');
            }
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
    if(displayArr.length!=0 && displayArr.every(x => x!='.')==true) {
        if(displayArr[0]!='-' && displayArr.length>=11) {
            return;
        }
        else if(displayArr[0]!='-') {
            displayArr.unshift('-');
            display.textContent= displayArr.join('');
        } else if(displayArr[0]=='-') {
            displayArr.shift();
            display.textContent= displayArr.join('');
        }
    } else if(displayArr.length==0 && workingNumbers.first!=null) {
        if(workingNumbers.first.toString().split('')[0]!='-' && workingNumbers.first.toString().length>10) {
            return;
        }
        workingNumbers.first= workingNumbers.first * (-1);
        display.textContent= workingNumbers.first;
    }
}


const root= document.querySelector('#root');
root.addEventListener('click', getSquareRoot);

function getSquareRoot() {
    if(displayArr.length==0 && workingNumbers.first==null) {
        return;
    }
    else if(displayArr.length!=0) {
        workingNumbers.first= Number(displayArr.join(''));
        let rooted= Math.sqrt(workingNumbers.first); //result
        if(rooted.toString().length>11) {
            if(rooted.toString().split('.').length==2 && rooted.toString().split('.')[0].length<12) {
                let spaceLeft= 10 - rooted.toString().split('.')[0].length;
                rooted= rooted.toFixed(spaceLeft);
                display.textContent= rooted;
                displayArr=[];
                workingNumbers.first= rooted;
                return;
            }
            display.textContent= 'Error';
            displayArr=[];
            workingNumbers.first=null;
            return;
        }

        if(isNaN(workingNumbers.first)){
            display.textContent= 'Not a number';
            displayArr=[];
            workingNumbers.first= null;
            return;
        }
        displayArr=[];
        display.textContent= rooted;
    } else {
        let rooted= Math.sqrt(workingNumbers.first); //result
        workingNumbers.first= rooted;
        display.textContent= rooted;
    }
}


const factorialButton= document.querySelector('#factorial');
factorialButton.addEventListener('click', getFactorial);

function getFactorial() {
    if(displayArr.length==0 && workingNumbers.first==null || displayArr[0]=='-' || workingNumbers.first<0) {
        return;
    }
    else if(displayArr.length!=0) {
        workingNumbers.first= Number(displayArr.join(''));
        //check if not integer
        if(workingNumbers.first % 1!=0) {
            return;
        }

        let factorized= factorial(workingNumbers.first);
        
        if(factorized==Infinity || factorized.toString().length>11){
            display.textContent= 'Error-Too big';
            displayArr=[];
            workingNumbers.first=null;
            return;
        }

        workingNumbers.first= factorized;
        console.log(workingNumbers.first);
        displayArr=[];
        display.textContent= factorized;
        
    }
    else {
        let factorized= factorial(workingNumbers.first);

        if(factorized==Infinity || factorized.toString().length>11){
            display.textContent= 'Error-Too big';
            displayArr=[];
            workingNumbers.first=null;
            return;
        }
        workingNumbers.first= factorized;
        display.textContent= factorized;
    } 
}

function factorial(n) {
        return (n != 1) ? n * factorial(n - 1) : 1;
}