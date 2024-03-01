const calc = {
    operations : {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }, 
    numStack : [],
    opStack : [],

    operate(operator, operandA, operandB) {
        return this.operations[operator](operandA, operandB);
    },

    pushNum(num) {
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
        ['AC', '+/-', '/'],
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
    override(val) {
        this.display.textContent = val;
        this.value = val;
    },
    reset() {
        this.display.textContent = '';
        this.value = '';
    },
    update(val) {
        this.display.textContent += val;
        this.value += val;
    },
}

function handleInput(input) {
    
}

buildKeypad();

const clearButton = document.querySelector('#key-AC');
clearButton.addEventListener('click', () => {
    display.reset();
    calc.reset();   
});
