class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor(maxStackSize = 10) {
        this.top = null;
        this.length = 0;
        this._maxStackSize = maxStackSize;
    }

    set maxStackSize(value) {
        const isValid = typeof value === 'number' && value > 0;

        if (!isValid) {
            throw new Error(`'${value}' is an invalid value.`);
        }

        this._maxStackSize = value;
    }

    get maxStackSize() { 
        return this._maxStackSize;
    }

    static fromIterable(iterable) {
       const isIterable = iterable[Symbol.iterator] !== undefined;
        
        if (!isIterable) {
            throw new Error(`'${iterable}' is not iterable.`);
        }

        const stack = new Stack(iterable.length);

        for (let item of iterable) {
            stack.push(item);
        }

        return stack;
    }

    peek() {
        return this.top;
    }

    push(elem) {
        if (this.isFull()) {
            throw new Error('The limit for the stack has been reached.');
        }

        const newNode = new Node(elem);

        if (this.isEmpty()) {
            this.top = newNode;
        } else {
            const holdingPointer = this.top;
            this.top = newNode;
            this.top.next = holdingPointer;
        }

        this.length++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error(`pop() operation cannot be performed. Stack is empty.`);
        }

        const holdingPointer = this.top;
        this.top = this.top.next;
        this.length--;

        return holdingPointer;
    }

    isEmpty() {
        return this.length === 0;
    }

    isFull() {
        return this.length >= this.maxStackSize;
    }

    toArray() {
        let array = [];
        let currentNode = this.top;

        while (currentNode !== null) {
            array.push(currentNode.value); 
            currentNode = currentNode.next;
        }

        return array;
    }  
}