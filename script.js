function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

function operate(operator, operandA, operandB) {
    return operations[operator](operandA, operandB);
}

function buildKey(val) {
    const key = document.createElement('button');
    key.setAttribute('id', `key-${val}`);
    key.setAttribute('class', 'key-button');
    key.setAttribute('value', val);
    key.textContent = val;
    return key;
}

function buildKeypad() {
    const KEYS = [
        ['Clear'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '(-)', '=']
    ]

    const keypad = document.querySelector('#keypad');
    KEYS.forEach((row) => {
        const keypadRow = document.createElement('div');
        keypadRow.setAttribute('class', 'keypad-row');
        row.forEach((val) => {
            const key = buildKey(val);
            keypadRow.appendChild(key);
        })

        keypad.appendChild(keypadRow);
    })
}

buildKeypad();