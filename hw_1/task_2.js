function decimalToBinary(num = null) {
    const maxLength = 4;
    
    const intPart = Math.floor(num);
  
    const binIntPart = intPart.toString(2);

    let fractPart = num - intPart;

    let binFractPart = '';
    
    while (fractPart !== 0 && binFractPart.length < maxLength) {
        fractPart *= 2;

        if (fractPart >= 1) {
            binFractPart += '1';
            fractPart -= 1;
        } else {
            binFractPart += '0';
        }
    }

    return binFractPart.length > 0 ? `${binIntPart}.${binFractPart}` : binIntPart;
}

function toBinary(num = null) {
    num = num.replace(/\s+/g, '');
    
    const isValid = (/^([+-]?[0-9]+(\.[0-9]+)?|[-]?Infinity)$/).test(num);

    num = !isValid ? parseFloat('NaN') : parseFloat(num);

    if (Number.isNaN(num)) {
        return 'Unexpected input: NaN';
    } 

    if (!isFinite(num)) {
        return num == Number.POSITIVE_INFINITY ? 'Infinity' : '-Infinity';
    }

    let binaryForm = '';

    const isNegative = num < 0;

    num = Math.abs(num);

    if (Number.isInteger(num)) {
        binaryForm = num.toString(2);
    } else {
        binaryForm = decimalToBinary(num);
    }
   
    return `Binary form for ${isNegative ? `-${num} is: -${binaryForm}` : `${num} is: ${binaryForm}`}`;
}

let num;

while (!num) {
    num = prompt("Please enter your number to convert:");
}

alert(toBinary(num));