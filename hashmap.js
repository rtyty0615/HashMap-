#!/usr/bin/env node

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    } 

    set(key, value) {
        if (this.buckets[this.hash(key)] === null) {
            const list = new LinkedList();
            this.buckets[this.hash(key)] = list;
        };
        this.buckets[this.hash(key)].append(key, value);
    }

    get(key) {
        if (this.buckets[this.hash(key)] === null) {
            return null
        };
        return this.buckets[this.hash(key)].findKey(key);
    }

    has(key) {
        if (this.buckets[this.hash(key)] === null) {
            return false
        };
        return this.buckets[this.hash(key)].checkKey(key);
    }

    print() {
        console.log(this.buckets)
    }

}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const newNode = new Node(key, value);
        if (this.head === null) {
            this.head = newNode;
            return
        };
        let current = this.head;
        while (current.nextNode) {
            current = current.nextNode
        };
        current.nextNode = newNode
    }

    findKey(key) {
        let current = this.head;
        if (current === null) {
            return null
        };
        if (current.key === key) {
            return current.value
        };
        while (current.nextNode) {
            current = current.nextNode;
            if (current.key === key) {
                return current.value
            }
        };
        return null
    }

    checkKey(key) {
        let current = this.head;
        if (current === null) {
            return false
        };
        if (current.key === key) {
            return true
        };
        while (current.nextNode) {
            current = current.nextNode;
            if (current.key === key) {
                return true
            }
        };
        return false
    }
}

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.print()

test.has('apple')
test.has('lion')
test.has('hat')
test.has('nian')
test.has('feuisr')

