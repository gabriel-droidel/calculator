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
    return (firstNumber / secondNumber).toFixed(2);
}

let numbers = {
    // object storing all calculator data
    displayed: '', // temporary place where the numbers from the calculator get stored on each key press
    first : null,
    second: null,
    result: null, 
    operation: undefined, // store the operation after key press here
}
console.log(numbers);

const keysBox = document.querySelector('.keys-box'); // container of the calculator keys
const resultBox = document.querySelector('.result-box'); // div where result will be displayed
const keys = [...keysBox.querySelectorAll('.key')]; // get the keys from 0-9 and store in an array
keys.forEach(key=>key.addEventListener('click', ()=>processParsedNumber(numbers, key.textContent))); // assign value of the key inside the data object
const operators = [...keysBox.querySelectorAll('.operator')]; // get the operator - + / * and store in an array
operators.forEach(operator=>operator.addEventListener('click', ()=>  assignOperator(numbers,operator.textContent))); // assign operator inside the data object
const equalButton = document.querySelector('#equals');
equalButton.addEventListener('click',()=> equalResult(numbers));

function assignValue(numbers){
    // assign value to the number variables inside the object
    // if an operation is selected, the second number gets the value otherwise the first number gets the value
    if(numbers.displayed!=''){
        if(numbers.result){ // no need to assign second variable because result always become the second number
            if(numbers.operation)
                numbers.first=+numbers.displayed;
        } else {
            if(numbers.operation)
                numbers.second=+numbers.displayed; // if we have a chosen operator, the second number gets the value
            else 
                numbers.first=+numbers.displayed;
        }
        numbers.displayed=''; // clear the variable that stores display number for the next input
    }   
    console.log(numbers);
}

function assignOperator(numbers,value){
    // handles operator and value assignment
    // every time an operation is chosen, the stored displayed value is distributed to the proper variable
    assignValue(numbers);
    evaluate(numbers); // process the data if possible
    numbers.operation=value;

    console.log(numbers);
}

function evaluate(numbers){
    // checks if all data is provided than processes the calculation and resets values
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
        case '*':
            return multiply(numbers.first,numbers.second);
        case '/':
                if(numbers.result){
                    if(numbers.first===0){
                        return null;
                    } else 
                        return divide(numbers.result,numbers.first);
                }
                else if(numbers.second===0){
                        return null;
                }
                    return divide(numbers.first, numbers.second);
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

function equalResult(numbers){
    assignValue(numbers);
    evaluate(numbers);

    console.log(numbers);
}