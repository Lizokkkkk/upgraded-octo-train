let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '÷'];

const out = document.querySelector('.display p');

function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.plus-minus').onclick = () => {
    if (b === '' && sign === '') {
        a = a * (-1);
        out.textContent = a;
    }
    else {
        b = b * (-1);
        out.textContent = b;
    }
}

document.querySelector('.percent').onclick = () => {
    if (b === '' && sign === '') {
        a = a / 100;
        out.textContent = a;
    }
    else if (a!=='' && (sign ==='+' || sign === '-')) {
        b = a / 100 * b;
        out.textContent = b;
    }
    else {
        b = b / 100;
        out.textContent = b;
    }
}

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('button')) return;
    if(event.target.classList.contains('ac')) return;
    if(event.target.classList.contains('plus-minus')) return;
    if(event.target.classList.contains('percent')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        }
        else if (a!=='' && b!=='' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;
    }

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "x":
                a = a * b;
                break;
            case "÷":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }
}