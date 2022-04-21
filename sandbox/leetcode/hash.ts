export async function study() {
    let hash = new MyHashSet()
    hash.add(1)
    hash.add(2)
    hash.add(3)
    hash.add(4)
    hash.add(5)
    let one = hash.contains(1)
    hash.add(1)
    hash.remove(1)
    one = hash.contains(1)
    hash.add(1)
    one = hash.contains(1)
    return
}

class MyHashSet {
    
    private primeLength = 10007
    private set = new Array<number[]>(this.primeLength)
    
    constructor() {}

    private hash(key: number) {
        return Math.abs(key) % this.primeLength
    }

    add(key: number): void {
        const hash = this.hash(key)
        if (this.contains(key, hash)) return

        if (this.set[hash]) this.set[hash].push(key)
        else this.set[hash] = [key]
    }

    remove(key: number): void {
        const hash = this.hash(key)
        if (!this.contains(key, hash)) return

        if (this.set[hash].length === 1) delete this.set[hash]
        else this.set[hash].splice(this.set[hash].indexOf(key),1)
    }

    contains(key: number, hash = this.hash(key)): boolean {
        if (!this.set[hash]) return false
        return this.set[hash].includes(key)
    }
}