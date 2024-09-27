var myIterable = {from: 0, to: 5};

myIterable[Symbol.iterator] = function() {
    let currValue = this.from;
    let exitValue = this.to;

    if (!currValue && currValue !== 0) {
        throw new Error(`'from' argument is not specified.`);
    } else if (typeof currValue !== 'number') {
        throw new TypeError(`${currValue} is not a number.`);
    }

    if (!exitValue && exitValue !== 0) {
        throw new Error(`'to' argument is not specified.`);
    } else if (typeof exitValue !== 'number') {
        throw new TypeError(`${exitValue} is not a number.`);
    }

    if (exitValue < currValue) {
        throw new Error(`'to' argument must be greater than or equal to the 'from' argument.`);
    }

    return {
        next: function() {
            if (currValue <= exitValue) {
                return {
                    value: currValue++,
                    done: false
                }
            }

            return { done: true };
        }
    }
}