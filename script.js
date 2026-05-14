let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-operation');
const previousDisplay = document.getElementById('previous-operation');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    // Mostra a operação anterior e o operador se eles existirem
    previousDisplay.innerText = previousInput + (operator ? ` ${operator}` : '');
}

function appendNumber(number) {
    // Impede mais de um ponto decimal
    if (number === '.' && currentInput.includes('.')) return;
    
    // Substitui o '0' inicial pelo primeiro número digitado
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    
    // Se já houver um cálculo pendente, resolve ele primeiro antes de mudar o operador
    if (previousInput !== '') {
        compute();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                alert("Não é possível dividir por zero");
                clearAll();
                return;
            }
            result = prev / current; 
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function invertSignal() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function appendPercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Inicializa o visor
updateDisplay();