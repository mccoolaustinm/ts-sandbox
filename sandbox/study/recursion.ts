// @ts-nocheck
export async function study() {
    test_collectStrings()
}

// wanted to practice some recursion without helper methods, even if i would never in my right mind use recursion this way in a project

function test_collectStrings() {
    let strings = collectStrings({
        stuff: "foo",
        data: {
            val: {
                thing: {
                    info: "bar",
                    moreInfo: {
                        evenMoreInfo: {
                            weMadeIt: "baz"
                        }
                    }
                }
            }
        }
    })
    return
}

function collectStrings(object: any, s: string[] = []) {
    if (typeof object === 'string') {
        s.push(object)
    } else if (typeof object === 'object') {
        Object.keys(object).forEach(key => collectStrings(object[key], s))
    }
    return s
}

function test_stringifyNumbers() {
    let obj1 = stringifyNumbers('1')
    let obj2 = stringifyNumbers({
        num: 1,
        test: [],
        data: {
            val: 4,
            info: {
                isRight: true,
                random: 66
            }
        }
    })
    
    return
}

function stringifyNumbers(object: any) {
    if (typeof object !== 'object') {
        let number = parseInt(object)
        if (!Number.isNaN(number)) object = (object as number).toString()
    } else {
        Object.keys(object).forEach(key => {
            object[key] = stringifyNumbers(object[key])
        })
    }
    return object
}

function test_capitalizeWords() {
    const words = capitalizeWords(['i', 'am', 'learning', 'recursion'])
    return
}

function capitalizeWords(words: string[], w = words.length - 1) {
    if (w < 0) return words
    words[w] = words[w].toUpperCase()
    return capitalizeWords(words, w - 1)
}

function test_nestedEvenSum() {

    // let x = nestedEvenSum(true)
    // x = nestedEvenSum(2)
    // x = nestedEvenSum('2')

    let x = nestedEvenSum({
        outer: 2,
        obj: {
          inner: 2,
          otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
          }
        }
      }) // 6

    x = nestedEvenSum({
        a: 2,
        b: {b: 2, bb: {b: 3, bb: {b: 2}}},
        c: {c: {c: 2}, cc: 'ball', ccc: 5},
        d: 1,
        e: {e: {e: 2}, ee: 'car'}
      }) // 10

    return
}

function nestedEvenSum(object: any) {
    if (typeof object !== 'object') {
        let number = parseInt(object)
        if (Number.isNaN(number)) return 0
        else if (number % 2 === 1) return 0 // number is odd
        else return number
    } else {
        let total = 0
        Object.keys(object).forEach(key => {
            total += nestedEvenSum(object[key])
        })
        return total
    }
}

function test_capitalizeFirst(){
    let c = capitalizeFirst(['car', 'taco', 'banana'])
    return
}

function capitalizeFirst(words: string[], i = 0) {
    if (i === words.length) return words
    if (words[i].length) words[i] = words[i][0].toUpperCase() + words[i].substring(1)
    return capitalizeFirst(words, i + 1)
}

function test_flatten() {
    console.log(flatten([1, 2, 3, [4, 5] ])) // [1, 2, 3, 4, 5]
    console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]
    console.log(flatten([[1],[2],[3]]))
    console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])) // [1,2,3]
    return
}

//? further simplified, a bit more elegant
function flatten(nested) {
    
    if (!Array.isArray(nested)) return [nested] // lets me one-line spread both first and remaining even on non-array first
    if (nested.length === 0) return []

    let first = nested[0]
    let remaining = nested.slice(1, nested.length)

    return [...flatten(first), ...flatten(remaining)]
}

//? proud of this one! most people solved it using either helper methods or some form of iterator
//? or they used a variety of Array functions including slice() and concat()
//? and all i used was a quick isArray and the spread operator with PURE recursion :)
//? had to sketch it out on paper first
function _flatten(nested) {
    
    if (nested.length === 0) {
        return []
    }

    let first = nested[0]
    let remaining = nested.slice(1, nested.length)

    // the trick here is just to keep recursively spreading every array value we reach
    if (Array.isArray(first)){
        return [...flatten(first), ...flatten(remaining)]
    } 

    return [first, ...flatten(remaining)]
}

function test_someRecursive() {
    const isOdd = (val: number) => val % 2 !== 0
    console.log(someRecursive([1,2,3,4], isOdd)) // true
    console.log(someRecursive([2,4,6,8], isOdd)) // false
}

/**
 * Returns true if the callback tests true on any value
 * If the callback fails on all values, returns false
 * Asking if "some" of the values pass a test
 */
function someRecursive(arr: number[], test: (val: number) => boolean): boolean {
    if (arr.length === 0) return false
    else if (test(arr[arr.length - 1])) return true
    else return someRecursive(arr.slice(0, arr.length - 1), test)
}

function test_isPalindrome() {
    console.log(isPalindrome('awesome')) // false
    console.log(isPalindrome('foobar')) // false
    console.log(isPalindrome('ab')) // false
    console.log(isPalindrome('tacocat')) // true
    console.log(isPalindrome('amanaplanacanalpanama')) // true
    console.log(isPalindrome('aa')) // true
    console.log(isPalindrome('a')) // true
    console.log(isPalindrome('')) // true
}

function isPalindrome(string) {
    if (string.length <= 1) {
        return true
    }
    const equivalent = string[0] === string[string.length - 1]
    if (string.length === 2){ 
        return equivalent
    }
    else if (equivalent) {
        return isPalindrome(string.substr(1, string.length - 2))
    }
    else {
        return false
    }
}

function test_reverse() {
    console.log(reverse('awesome'))
    console.log(reverse('rithmschool'))
}

function reverse(string) {
    if (string.length === 1) return string
    return string[string.length - 1] + reverse(string.substr(0, string.length - 1))
}

function test_fib() {
    console.log(fib(4)) // 3
    console.log(fib(10)) // 55
    console.log(fib(28)) // 317811
}

// @ts-ignore
function fib(n) {
    // return nth number in fibonacci sequence
    if (n < 1) throw new Error('positive integers only!') 
    if (n <= 2) return 1
    if (n > 40) throw new Error('n too high for recursive fib')
    return fib(n - 1) + fib(n - 2)
}

function test_recursiveRange() {
    console.log(recursiveRange(6)) // 21
    console.log(recursiveRange(10)) // 55
}

// @ts-ignore
function recursiveRange(num) {
    if (num === 0) return 0
    if (num < 0) throw new Error('positive integers only!')
    return num + recursiveRange(num - 1)
}

function test_productOfArray() {
    console.log(productOfArray([-1,-2,-3])) // -6
    console.log(productOfArray([-1,-2,-3,6])) // 0
    console.log(productOfArray([1,2,3])) // 6
    console.log(productOfArray([])) // 0
    console.log(productOfArray([1,2,3])) // 6
    console.log(productOfArray([1,2,3,10])) // 60
}

// @ts-ignore
function productOfArray(arr, index?) {
    // there is a shorter array.slice() implementation with no index being passed, but i got caught up in the slice() method
    // so this works fine to demonstrate the algorithm
    if (arr.length === 0) return 0
    if (index && index < 0) return 1
    if (index === undefined) index = arr.length - 1
    return arr[index] * productOfArray(arr, index - 1)
}

function test_factorial() {
    console.log(factorial(8))
    console.log(factorial(4))
    console.log(factorial(0))
    console.log(factorial(1))
    console.log(factorial(1))
}

function factorial(num: number): number {
    if (num === 0) return 1
    if (num < 0) throw new Error('positive integers only!')
    return num * factorial(num-1)
}

function test_power() {
    console.log(power(2,3)) // 8
    console.log(power(4,4)) // 256
    console.log(power(1,1)) // 1
    console.log(power(5,0)) // 1
    console.log(power(1,20)) // 1
}
function power(base: number, exponent: number): number {
    if (exponent === 0) return 1
    if (exponent === 1) return base * exponent
    return base * power(base, exponent - 1)
}