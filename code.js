let numbers = {
    // object storing all calculator data
    displayed: '', // temporary place where the numbers from the calculator get stored on each key press
    resultDisplayed:'', // store result to be displayed
    first : null,
    second: null,
    result: null, 
    operation: undefined, // store the operation after key press here
}

// DOM buttons and handlers // 

// Calculator keys //
const keysBox = document.querySelector('.keys-box'); // container of the calculator keys
const keys = [...keysBox.querySelectorAll('.key')]; // get the keys from 0-9 and store in an array
keys.forEach(key=>key.addEventListener('click', ()=>processParsedNumber(numbers, key.textContent))); // assign value of the key inside the data object
// Calculator operators //
const operators = [...keysBox.querySelectorAll('.operator')]; // get the operator - + / * and store in an array
operators.forEach(operator=>operator.addEventListener('click', ()=>  assignOperator(numbers,operator.textContent))); // assign operator inside the data object
const equalButton = document.querySelector('#equals');
equalButton.addEventListener('click',()=> equalResult(numbers)); // handle equal button 
const clearAll = document.querySelector('#clear');
clearAll.addEventListener('click',()=>{
    numbers=createObject();
    displayNumbers(numbers);
});

// Functions that handle operands // 

function createObject(){
    // create the object that stores all calculator data
    return {  
        displayed: '', // temporary place where the numbers from the calculator get stored on each key press
        resultDisplayed:'', // store result to be displayed
        first : null,
        second: null,
        result: null, 
        operation: undefined, // store the operation after key press here
    }
}

function processParsedNumber(numbers, value){
    // get value on key press and add it to the number at the end
    // this value will be later parsed into an integer and assigned to a calculation variable
    numbers.displayed+=value;
    displayNumbers(numbers);    
}

function assignValue(numbers){
    // assign value to the number variables inside the object
    // if an operation is selected, the second number gets the value otherwise the first number gets the value

    if(numbers.displayed!=''){ // check if the input is empty
        if(numbers.result!=null && numbers.operation){ // if there is a second number and operation
            numbers.first=+numbers.displayed;
        } else if(numbers.operation)
                numbers.second=+numbers.displayed; // for already chosen operator, the second number gets the value
            else 
                numbers.first=+numbers.displayed;
    }

    numbers.displayed=''; // clear the variable that stores display number for the next input
}

// Functions that handle operators // 

function assignOperator(numbers,value){
    // handles operator and value assignment
    // every time an operation is chosen, the stored displayed value is distributed to the proper variable

    assignValue(numbers); // assign value stored in display when an operation is chosen
    evaluate(numbers); // process the calculation if possible
    numbers.operation=value;
    numbers.displayed=''; // clear number input
    displayNumbers(numbers); // update display with clear input
}

function equalResult(numbers){
    // computes calculation if all necessary data is available
    assignValue(numbers);
    evaluate(numbers);
}

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

function divide(firstNumber, secondNumber,numbers){
    // return division result
    if(secondNumber===0){ // handle division by 0
        return 'ERROR';
    }else 
        return (firstNumber / secondNumber).toFixed(2);
}

// Functions that handle calculations // 

function evaluate(numbers){
    // checks if all data is provided than processes the calculation and resets values
    if(numbers.first!==null&&numbers.second!==null&&numbers.operation)
    {
        numbers.result=processCalculation(numbers); // handle calculation based on operation and operands, assigning the result 
        numbers.resultDisplayed=numbers.result; // update the display with the result
        if(numbers.result=='ERROR'){ // handle division by 0 error
            numbers.result=null;
        }
        displayResult(numbers); 
        resetValues(numbers); 
    }
    console.log(`evaluate`);
    console.log(numbers);
}

function processCalculation(numbers){
    // Handle each calculation based on the operation and return result 
    switch(numbers.operation){
        case'+':
            return add(numbers.first,numbers.second);
        case '-':
            if(numbers.result) // handle having a result from previous calculations as first operand
                return subtract(numbers.result,numbers.first);
            else 
                return subtract(numbers.first,numbers.second);
        case '*':
            return multiply(numbers.first,numbers.second);
        case '/':
            if(numbers.result){ // handle having a result from previous calculations as first operand
                return divide(numbers.result,numbers.first,numbers);
            }
            else
                return divide(numbers.first, numbers.second,numbers);
    }
}

function resetValues(numbers){
    // reset values after each calculation in order to process the next one
    numbers.second=+numbers.result; // make sure to always have it be an integer
    numbers.first=null;
    numbers.operation=undefined;
    numbers.resultDisplayed='';
}

// Functions that handle display //

function displayNumbers(numbers){
    const resultBox = document.querySelector('.result-box'); // div where result will be displayed
    resultBox.classList.remove('result');
    resultBox.textContent=numbers.displayed;
}

function displayResult(numbers){
    const resultBox = document.querySelector('.result-box'); // div where result will be displayed
    resultBox.classList.add('result');
    resultBox.textContent=numbers.resultDisplayed;
}

