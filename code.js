function add(firstNumber, secondNumber){
    // return sum result
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    // return subtraction result
    return firstNumber-secondNumber;
}

function multiply(firstNumber, secondNumber){
    // return multiplication result
    return firstNumber*secondNumber;
}

function divide(firstNumber, secondNumber){
    // return division result
    return firstNumber/secondNumber;
}

const keysBox = document.querySelector('.keys-box'); // container of the calculator keys
const resultBox = document.querySelector('.result-box'); // div where result will be displayed
const keys = [...keysBox.querySelectorAll('.key')]; // get the keys from 0-9 and store in an array

keys.forEach(key=>{
    key.addEventListener('click', ()=>processParsedNumber(numbers, key.textContent)); // assign value of the key inside the data object
})

const operators = [...keysBox.querySelectorAll('.operator')]; // get the operator - + / * and store in an array
operators.forEach(operator=>operator.addEventListener('click', ()=>  assignOperator(numbers,operator.textContent))); // assign operator inside the data object
console.log(keys);

let numbers = {
    // object with calculator data
    displayed: '',
    first : null,
    second: null,
    result: null,
    operation: undefined,
}

function assignValue(numbers){
    // assign value to the number variables inside the object
    // if an operation is selected, the second number gets the value otherwise the first number gets the value
    if(numbers.operation)
            numbers.second=+numbers.displayed;
        else 
            numbers.first=+numbers.displayed;

    numbers.displayed='';
    console.log(numbers);
}

function assignOperator(numbers,value){
    assignValue(numbers);
    numbers.operation=value;

    if(numbers.first&&numbers.second&&numbers.operation)
        evaluate(numbers); 

console.log(numbers);
}

function evaluate(numbers){
   
    numbers.result=processCalculation(numbers);
    resetValues(numbers);
}

function processCalculation(numbers){
    switch(numbers.operation){
        case'+':
            return add(numbers.first,numbers.second);
        case '-':
            return subtract(numbers.first-numbers.second);
    }
}

function resetValues(numbers){
    // reset values after each calculation in order to process the next one
    numbers.second=numbers.result;
    numbers.result=null;
    numbers.first=null;
    numbers.operation=undefined;
}

function processParsedNumber(numbers, value){
    numbers.displayed+=value;
    console.log(numbers);
}