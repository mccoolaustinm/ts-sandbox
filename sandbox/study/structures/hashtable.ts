export async function study() {
    const hash = new HashTable<number>()
    for (let n = 1; n <= 200; n++) {
        hash.set(wordify(n), n)
    }
    const pairs = hash.pairs()
    const keys = hash.keys()
    const values = hash.values()
    return
}

type KeyValue<Type> = [string,Type]

class HashTable<Type> {

    keyMap: KeyValue<Type>[][]

    constructor(primeSize: number = 53) {
        // 53 is being used as array size because some hash functions perform better in prime-sized arrays
        this.keyMap = new Array(primeSize)

        // the default array size is very small, expecting lots of collisions to test separate chaining approach
    }

    _hash(key: string) {
        // a bad hash which only looks at the first 100 characters of a string
        let total = 0
        const WEIRD_PRIME = 31
        const CHAR_CODE_OFFSET = 96

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i]
            const value = char.charCodeAt(0) - CHAR_CODE_OFFSET
            total = (total * WEIRD_PRIME + value) % this.keyMap.length
        }

        return Math.abs(total)
    }

    set(key: string, value: Type) {
        const index = this._hash(key)
        const key_value: KeyValue<Type> = [key, value]

        // separate chaining (nested array, basically)
        // the key is intentionally stored for later retrieval since collisions are expected
        // and so the key will be used within the subarray to locate the correct value
        // but theoretically hashing, and then finding the correct value within the subarray
        // will be faster than searching every value of the greater array for very large arrays, making this still a faster solution
        if (this.keyMap[index]) this.keyMap[index].push(key_value)
        else this.keyMap[index] = [key_value]
    }

    get(key: string): Type|undefined {
        const index = this._hash(key)
        const hashBucket = this.keyMap[index]

        // now deal with the sub array returned at the hash
        if (hashBucket.length === 0) return undefined
        else if (hashBucket.length === 1) return hashBucket[0][1]

        // if more than 1, then search through the collisions to find the exact key
        const keyValue = hashBucket.find(hash_match => {
            if (hash_match[0] === key) return true
        })

        if (keyValue) return keyValue[1]
        else return undefined
    }

    pairs() {
        return this.keyMap.flat()
    }

    keys() {
        return this.pairs().map(keyValue => keyValue[0])
    }

    values () {
        return this.pairs().map(keyValue => keyValue[1])
    }
}

// borrowed this function (integer to words in US system) to create easy to understand test keys for hashing
// from Nina Scholz at https://stackoverflow.com/a/58240882/4655266
function wordify(n: number) {
    var word = [],
        numbers = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten', 11: 'Eleven', 12: 'Twelve', t3: 'Thir', t5: 'Fif', t8: 'Eigh', 20: 'Twenty' },
        hundreds = 0 | (n % 1000) / 100,
        tens = 0 | (n % 100) / 10,
        ones = n % 10,
        part;

    if (n === 0) return 'Zero';
    //@ts-ignore
    if (hundreds) word.push(numbers[hundreds] + ' Hundred');

    if (tens === 0) {
        //@ts-ignore
        word.push(numbers[ones]);
    } else if (tens === 1) {
        //@ts-ignore
        word.push(numbers['1' + ones] || (numbers['t' + ones] || numbers[ones]) + 'teen');
    } else {
        //@ts-ignore
        part = numbers[tens + '0'] || (numbers['t' + tens] || numbers[tens]) + 'ty';
        //@ts-ignore
        word.push(numbers[ones] ? part + '-' + numbers[ones] : part);
    }
    return word.join(' ');
}