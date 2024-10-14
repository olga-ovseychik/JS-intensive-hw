class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null
        }
        this.tail = this.head;
        this.length = 1;
    }

    append(value) {
        const newNode = new Node(value);

        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);

        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    insert(index, value) {
        const isValid = index <= (this.length-1) && index >= 0 && typeof index === 'number';

        if (index && !isValid) {
            throw new Error(`'${index}' is an invalid value for 'index' parameter.`);
        }

        if (index === 0) {
            return this.prepend(value);
        } 

        const newNode = new Node(value);
        const leaderNode = this.#traverse({index: index-1});
        const holdingPointer = leaderNode.next;

        leaderNode.next = newNode;
        newNode.next = holdingPointer;
        this.length++;
    }

    removeFirst() {
        this.head = this.head.next;
        this.length--;
    }

    removeLast() {
        const previousNode = this.#traverse({index: this.length-2});

        this.tail = previousNode;
        this.tail.next = null;
        this.length--;
    }

    delete(data) {
        const removedNode = this.#traverse({value: data});

        if (!removedNode) {
            throw new Error(`There is no such data: '${data}'.`);
        }

        const {currentNode, index} = removedNode;

        if (index === 0) {
            return this.removeFirst();
        } else if (index === this.length) {
            return this.removeLast();
        }

        const prevNode = this.#traverse({index: index-1});
        prevNode.next = currentNode.next;
        this.length--;
    }

    search(data) {
        let currentNode = this.head;

        while (currentNode !== null) {
            if (data === currentNode.value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        for (let node in this) {
            delete this[node];
        }

        this.length = 0;
    }

    toArray() {
        let array = [];
        let currentNode = this.head;

        if (currentNode === undefined) {
            return array;
        }

        while (currentNode !== null) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return array;
    }

    #traverse({index, value} = {}) {
        const indexIsUndefined = index === undefined;
        let currentNode = this.head;
        let counter = 0;
        let node;

        while (currentNode !== null) {
            if (indexIsUndefined ? (currentNode?.value === value) : (counter === index)) {
                node = indexIsUndefined ? {currentNode, index: counter} : currentNode;
            }

            currentNode = currentNode.next;
            counter++;
        }

        return node;
    }
}