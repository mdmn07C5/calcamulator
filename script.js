const PRECISION = 6; // fit number within 10 symbols including ., e, +, and n
const MAX_LEN = 9

const calc = {
    operations : {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b === 0 ? 'lole' : a / b,
    }, 
    numStack : [],
    opStack : [],

    operate(operator, operandA, operandB) {
        return this.operations[operator](operandA, operandB);
    },

    pushNum(num) {
        if (isNaN(Number.parseFloat(num))) return;
        if (this.opStack.length === 0) {    // likely after a '=' keypress
            this.numStack.pop();
        }
        this.numStack.push(Number.parseFloat(num));
    },

    pushOp(op) {
        this.opStack.push(op);
    }, 

    evaluate(op) {
        switch (this.numStack.length) {
            case 0:
                return 0;
            case 1:
                if (op === '=') {
                    return this.numStack.at(-1);
                } else {
                    this.opStack.pop() // replace current operation
                    this.pushOp(op);
                    return this.numStack.at(-1);
                }
            case 2:
                const operator = this.opStack.pop();
                const B = this.numStack.pop();
                const A = this.numStack.pop();
                const result = this.operate(operator, A, B);
                this.pushNum(result);
                if (op !== '=') {
                    this.pushOp(op);
                }
                return result

            default:
                return "oh shit wtf happened";
        }
    },

    reset() {
        this.numStack = [];
        this.opStack = [];
        console.log(this.numStack, this.opStack)
    }
};

function buildKey(val) {
    const key = document.createElement('button');
    key.setAttribute('id', `key-${val}`);
    key.setAttribute('class', 'key-button');
    key.setAttribute('value', val);
    key.textContent = val;
    key.addEventListener('click', () => handleInput(val));
    return key;
}

function buildKeypad() {
    const KEYS = [
        ['AC', '±', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=']
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

const display = {
    display: document.querySelector('#display'),
    value: '',
    appendValue(val) {
        if (this.value.length < 10) {
            this.value += val;
        }
    },
    resetValue() {
        this.value = '';
    },
    resetDisplayText() {
        this.display.textContent = '';
    },
    updateDisplayValue(value) {
        this.display.textContent = value;
    },
}

function formatNum(num) {
    if (typeof num === 'number') {
        num = num.toString();
    }

    if (num.includes('e')) {
        const parts = num.split('e')
        const intLength = parts[0].search('\\.')
        const decimal = parseFloat(parts[0])
        const allowance = MAX_LEN - intLength - parts[1].length - 1
        return decimal.toFixed(allowance) + 'e' + parts[1];
    }

    if (num.includes('.')) {
        const parts = num.split('.');
        const intLength = parts[0].length;
        return parseFloat(num).toFixed(MAX_LEN - intLength);
    }
    
    return num; // probably an integer
}

function handleInput(input) {
    display.resetDisplayText();
    if (!isNaN(input) || input === '.') {
        if (input === '.' && !display.value.includes('.')) {
            display.appendValue(input);
        } else {
            display.appendValue(input);
        }
        display.updateDisplayValue(display.value);
    } else {
        const value = display.value;
        
        calc.pushNum(value);
        let result = calc.evaluate(input);

        result = isNaN(result) ? result : formatNum(result);

        display.updateDisplayValue(result);
        display.resetValue();
    }
}

buildKeypad();

const clearButton = document.querySelector('#key-AC');
clearButton.addEventListener('click', () => {
    display.resetDisplayText();
    calc.reset();   
});
