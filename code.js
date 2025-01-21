function add(firstNumber, secondNumber){
    // return sum result
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    // return subtraction result
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber){
    // return multiplication result
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber){
    // return division result
    return firstNumber / secondNumber;
}

const keysBox = document.querySelector('.keys-box'); // container of the calculator keys
const resultBox = document.querySelector('.result-box'); // div where result will be displayed
const keys = [...keysBox.querySelectorAll('.key')]; // get the keys from 0-9 and store in an array

keys.forEach(key=>key.addEventListener('click', ()=>processParsedNumber(numbers, key.textContent))); // assign value of the key inside the data objec

const operators = [...keysBox.querySelectorAll('.operator')]; // get the operator - + / * and store in an array
operators.forEach(operator=>operator.addEventListener('click', ()=>  assignOperator(numbers,operator.textContent))); // assign operator inside the data object

let numbers = {
    // object with calculator data
    displayed: '', // temporary place where the numbers from the calculator get stored on each key press
    first : null,
    second: null,
    result: null, 
    operation: undefined, // store the operation after key press here
}
console.log(numbers);

function assignValue(numbers){
    // assign value to the number variables inside the object
    // if an operation is selected, the second number gets the value otherwise the first number gets the value
    if(numbers.result){
        if(numbers.operation)
            numbers.first=+numbers.displayed;
    } else {
        if(numbers.operation)
            numbers.second=+numbers.displayed;
        else 
            numbers.first=+numbers.displayed;
    }
    numbers.displayed='';
    console.log(numbers);
}

function assignOperator(numbers,value){
    assignValue(numbers);
    evaluate(numbers);
    numbers.operation=value;

    console.log(numbers);
}

function evaluate(numbers){
    if(numbers.first&&numbers.second&&numbers.operation)
    {
        numbers.result=processCalculation(numbers);
        resetValues(numbers);
    }
}

function processCalculation(numbers){
    switch(numbers.operation){
        case'+':
            return add(numbers.first,numbers.second);
        case '-':
            if(numbers.result)
                return subtract(numbers.result,numbers.first);
            else 
                return subtract(numbers.first,numbers.second);
    }
}

function resetValues(numbers){
    // reset values after each calculation in order to process the next one
    numbers.second=numbers.result;
    numbers.first=null;
    numbers.operation=undefined;
}

function processParsedNumber(numbers, value){
    // get value on key press and add it to the number at the end
    // this value will be later parsed into an integer and assigned to a calculation variable
    numbers.displayed+=value;
    console.log(numbers);
}