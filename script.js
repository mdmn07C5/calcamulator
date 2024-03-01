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
        this.numStack.push(Number.parseFloat(num));
        return this.numStack.at(-1);
    },

    evaluate(op) {
        if (op === '=') {
            const operandA = this.numStack.pop();
            const operandB = this.numStack.pop();

            if (!operandB) {
                if (!operandA) {
                    return 0;
                }
                return operandA;
            }

            const result = this.operate(this.opStack.pop(), operandA, operandB);
            this.numStack.push(result)
        } else {
            this.opStack.push(op);
            return null
        }

        return this.numStack.at(-1);
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
    if (!isNaN(input)) {
        display.update(input);
    } else {
        const val = display.value;
        calc.pushNum(val);
        const result = calc.evaluate(input);
        if (result) {
            display.override(result);
        } else {
            display.reset();
        }
    }
}

buildKeypad();

const clearButton = document.querySelector('#key-AC');
clearButton.addEventListener('click', () => {
    display.reset();
    calc.reset();   
});
