function add(firstNumber, secondNumber){
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    return firstNumber-secondNumber;
}

function multiply(firstNumber, secondNumber){
    return firstNumber*secondNumber;
}

function divide(firstNumber, secondNumber){
    return firstNumber/secondNumber;
}

function operate(firstNumber, secondNumber, operation){

}

const keysBox = document.querySelector('.keys-box');
const result = document.querySelector('.result-box');
const keys = [...keysBox.querySelectorAll('.key')];

const keysData = keys.map(key=>{
    return key = {
        value : key.textContent,
}
});

keys.forEach(key=>{
    key.addEventListener('click', ()=>selectNumber(key.textContent));
})

console.log(keys);


function selectNumber(number){
    console.log(number);
}