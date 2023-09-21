

const themes = document.querySelectorAll('input[type = "radio"]');
const root = document.documentElement;
themes.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === "first") {
      root.style.setProperty('--clr', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-main', '222 26% 31%');
      root.style.setProperty('--bg-toggle-keypad', '223 31% 20%');
      root.style.setProperty('--bg-screen', '224 36% 15%');
      root.style.setProperty('--bg-reset-key', '225 21% 49%');
      root.style.setProperty('--bg-equals-key', '6 63% 50%');
      root.style.setProperty('--bg-numbers', '30 25% 89%');
      root.style.setProperty('--shadow-reset-key', '224 28% 35%');
      root.style.setProperty('--shadow-equals-key', '25 99% 27%');
      root.style.setProperty('--shadow-numbers', '28 16% 65%');
      root.style.setProperty('--clr-numbers', '221 14% 31%');
      root.style.setProperty('--clr-equals', '0 0% 100%');
      saveTheme("first");
    } else if (radio.value === 'second') {
      root.style.setProperty('--clr', 'hsl(60, 10%, 19%)');
      root.style.setProperty('--bg-main', '0 0% 90%');
      root.style.setProperty('--bg-toggle-keypad', '0 5% 81%');
      root.style.setProperty('--bg-screen', '0 0% 93%');
      root.style.setProperty('--bg-reset-key', '185 42% 37%');
      root.style.setProperty('--bg-equals-key', '25 98% 40%');
      root.style.setProperty('--bg-numbers', '45 7% 89%');
      root.style.setProperty('--shadow-reset-key', '185 58% 25%');
      root.style.setProperty('--shadow-equals-key', '25 99% 27%');
      root.style.setProperty('--shadow-numbers', '35 11% 61%');
      root.style.setProperty('--clr-numbers', '60 10% 19%');
      root.style.setProperty('--clr-equals', '0 0% 100%');
      saveTheme("second");
    } else if (radio.value === 'third') {
      root.style.setProperty('--clr', 'hsl(52 100% 62%)');
      root.style.setProperty('--bg-main', '268 75% 9%');
      root.style.setProperty('--bg-toggle-keypad', '268 71% 12%');
      root.style.setProperty('--bg-screen', '268 71% 12%');
      root.style.setProperty('--bg-reset-key', '281 89% 26%');
      root.style.setProperty('--bg-equals-key', '176 100% 44%');
      root.style.setProperty('--bg-numbers', '268 47% 21%');
      root.style.setProperty('--shadow-reset-key', '285 91% 52%');
      root.style.setProperty('--shadow-equals-key', '177 92% 70%');
      root.style.setProperty('--shadow-numbers', '290 70% 36%');
      root.style.setProperty('--clr-numbers', '52 100% 62%');
      root.style.setProperty('--clr-equals', '198 20% 13%');
      saveTheme("third");
    }
    
  })
    
});
// togggle background
const labels = document.querySelectorAll('.label');
labels.forEach(label => {
    label.addEventListener('click', function () {
        labels.forEach(l => l.classList.remove('bg-equals-key'));
        label.classList.add('bg-equals-key');
    });
});
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    //this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
