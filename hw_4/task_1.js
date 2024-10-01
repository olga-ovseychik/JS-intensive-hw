class Calculator {
    constructor(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setX(value) {
        if (typeof value !== 'number' || value === Infinity || value === -Infinity || Number.isNaN(value)) {
            throw new Error(`${value} is an invalid value for 'x' argument.`);
        }

        this.x = value;
    }

    setY(value) {
        if (typeof value !== 'number' || value === Infinity || value === -Infinity || Number.isNaN(value)) {
            throw new Error(`${value} is an invalid value for 'y' argument.`);
        }

        this.y = value;
    }

    logSum = () => {
        return this.x + this.y;
    }

    logMul = () => {
        return this.x * this.y;
    }

    logSub = () => {
        return this.x - this.y;
    }

    logDiv = () => {
        if (this.y === 0) {
            throw new Error('Division by zero.');
        }

        return Math.floor(this.x / this.y);
    }
}