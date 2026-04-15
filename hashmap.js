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
        if (this.has(key) === true) {
            this.buckets[this.hash(key)].replace(key, value)
        };
        this.buckets[this.hash(key)].append(key, value);
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
            return true
        } else if (result === true) {
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
test.length()
test.clear()
test.print()

// test.remove('apple')
// test.remove('elephant')
// test.remove('lion')
// test.remove('hat')
// test.remove('efdfvb')
// test.remove('ff')

// test.print()
// test.length()

