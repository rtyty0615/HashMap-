#!/usr/bin/env node

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.loadLevel = Math.trunc(this.loadFactor * this.capacity);
        this.buckets = new Array(this.capacity).fill(null);
        this.entryCount = 0
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
        if (this.has(key) === true) {
            this.buckets[this.hash(key)].replace(key, value);
            return
        };
        this.buckets[this.hash(key)].append(key, value);
        this.entryCount += 1;
    }

    entrySize() {
        return console.log(this.entryCount)
    }

    get(key) {
        if (this.buckets[this.hash(key)] === null) {
            return null
        };
        return this.buckets[this.hash(key)].find(key);
    }

    has(key) {
        if (this.buckets[this.hash(key)] === null) {
            return false
        };
        return this.buckets[this.hash(key)].check(key);
    }

    remove(key) {
        if (this.buckets[this.hash(key)] === null) {
            return false
        };
        const result = this.buckets[this.hash(key)].delete(key);
        if (result === null) {
            this.buckets[this.hash(key)] = null;
            this.entryCount -= 1;
            return true
        } else if (result === true) {
            this.entryCount -= 1;
            return true
        } else {
            return false
        }
    }

    length() {
        let totalCount = 0;
        for (const bucket of this.buckets) {
            if (bucket) {
                totalCount += bucket.size();
            }
        }
        return totalCount
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.entryCount = 0;
    }

    keys() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket && bucket.totalKeys()) {
                for (const key of bucket.totalKeys()) {
                    arr.push(key)
                }
            }
        }
        return arr
    }

    values() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket && bucket.totalValues()) {
                for (const value of bucket.totalValues()) {
                    arr.push(value)
                }
            }
        }
        return arr
    }

    entries() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket && bucket.totalEntries()) {
                for (const entry of bucket.totalEntries()) {
                    arr.push(entry)
                }
            }
        }
        return arr
    }

    print() {
        console.log(this.buckets);
        console.log(this.loadLevel)
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

    find(key) {
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

    check(key) {
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

    replace(key, value) {
        let current = this.head;
        if (current === null) {
            return null
        };
        if (current.key === key) {
            current.value = value
        };
        while (current.nextNode) {
            current = current.nextNode;
            if (current.key === key) {
                current.value = value
            }
        };
        return null
    }

    delete(key) {
        let current = this.head;
        let saveCurrent = current;
        if (current === null) {
            return false
        };
        if (current.key === key) {
            this.head = this.head.nextNode;
            if (this.head === null) {
               return null
            }
            return true
        };
        while (saveCurrent.nextNode) {
            saveCurrent = current;
            current = current.nextNode;
            if (current.key === key) {
                saveCurrent.nextNode = current.nextNode;
                return true
            }
        }
        return false
    }

    size() {
        let current = this.head;
        let count = 0;
        if (current === null) {
            return count
        };
        count += 1;
        while (current.nextNode) {
            current = current.nextNode;
            count += 1;
        };
        return count
    }

    totalKeys() {
        let current = this.head;
        const arr = [];
        if (current === null) {
            return null
        };
        arr.push(current.key);
        while (current.nextNode) {
            current = current.nextNode;
            arr.push(current.key);
        };
        return arr
    }

    totalValues() {
        let current = this.head;
        const arr = [];
        if (current === null) {
            return null
        };
        arr.push(current.value);
        while (current.nextNode) {
            current = current.nextNode;
            arr.push(current.value);
        };
        return arr
    }

    totalEntries() {
        let current = this.head;
        const arr = [];
        if (current === null) {
            return null
        };
        const arrPair = [];
        arrPair.push(current.key);
        arrPair.push(current.value);
        arr.push(arrPair);
        while (current.nextNode) {
            const arrPair = [];
            current = current.nextNode;
            arrPair.push(current.key);
            arrPair.push(current.value);
            arr.push(arrPair);
        };
        return arr
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

test.entrySize()


test.remove('apple')
test.entrySize()
test.remove('elephant')
test.entrySize()
test.remove('lion')
test.entrySize()
test.remove('hat')
test.entrySize()
test.remove('efdfvb')
test.entrySize()
test.remove('ff')
test.entrySize()
test.set('carrot', 'dfsfvfvvv')
test.entrySize()

test.clear()
test.entrySize()

