export async function study() {
    test_findLongestSubstring()
}

function test_CountUniqueValues() {
    console.log(countUniqueValues([-2,0,1,1,2,2,2,2,2,3,3,4,5,6,7,7,8,8,9,10])) // 12
}

function test_sameDigitFrequency() {
    console.log(sameDigitFrequency(182, 281))
    console.log(sameDigitFrequency(22, 2222))
    console.log(sameDigitFrequency(34, 14))
}

function test_areThereDuplicates() {
    console.log(areThereDuplicates(1, 2, 3))
    console.log(areThereDuplicates(1, 2, 2))
    console.log(areThereDuplicates('a', 'b', 'c', 'c'))
}

function test_averagePair() {
    console.log(averagePair([1,2,3],2.5)) // true
    console.log(averagePair([1,3,3,5,6,7,10,12,19], 8)) // false
    console.log(averagePair([-1,0,3,4,5,6], 4.1)) // false
    console.log(averagePair([], 4)) // false
}

function test_hasCharactersInOrder() {
    console.log(hasCharactersInOrder('hello', 'hello world')) // true
    console.log(hasCharactersInOrder('sing', 'sting')) // true
    console.log(hasCharactersInOrder('abc', 'abracadabra')) // true
    console.log(hasCharactersInOrder('abc', 'acb')) // false
}

function test_maxSubarraySum() {
    console.log(maxSubarraySum([100,200,300,400], 2)) // 700
    console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)) // 39
    console.log(maxSubarraySum([-3,4,0,-2,6,-1], 2)) // 5
    console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1], 2)) // 5
    console.log(maxSubarraySum([100,200], 3)) // null
}

function test_minSubArrayLen() {
    console.log(minSubArrayLen([2,3,1,2,4,3],7)) // 2
    console.log(minSubArrayLen([2,3,1,2,4,0],7)) // 3
    console.log(minSubArrayLen([2,3,1,9,9,3,7,10],18)) // 2
    console.log(minSubArrayLen([11,5,5,5,5],10)) // 1
    console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33],52)) // 1
    console.log(minSubArrayLen([],0)) // 0
    console.log(minSubArrayLen([1,2,3,4],90)) // 0
}

function test_findLongestSubstring() {
    console.log(findLongestSubstring('')) // 0    
    console.log(findLongestSubstring('rithmschool')) // 7
    console.log(findLongestSubstring('awesom')) // 6
    console.log(findLongestSubstring('thisisawesome')) // 6
    console.log(findLongestSubstring('thecatinthehat')) // 7
    console.log(findLongestSubstring('bbbbbbb')) // 1   
    console.log(findLongestSubstring('abcdefghijklmnopqrstuvwxyz')) // 26
}

function findLongestSubstring(string: string) {
    /**
     * keep a map of the index where each character was found, and
     * if the character is found again, move left bound to that characters index + 1
     */
    if (string.length === 0) return 0
    let left = 0,
        right = 1

    let width = 1
    let longest = width

    let unique: {[key: string]: number} = {}
        unique[string[0]] = 0

    while (right < string.length) {
        let newChar = string[right]

        let previousIndex = unique[newChar]
        // ? got tripped up for a while by 0 being considered falsy
        if ((previousIndex || previousIndex === 0) && previousIndex >= left) { // ignore records behind current left bound
            left = previousIndex + 1 // move left ahead of recorded index
        }
        unique[newChar] = right

        width = (right - left) + 1
        if (width > longest) longest = width

        right++
    }

    return longest

}

//? find the minimum length Y of subset M from array N, which has a sum S >= target T
//? hint: multiple pointers, probably contracting from each side, because subset needs to be contiguous
// minSubArrayLen([2,3,1,2,4,3], 7) ~ [4,3] has length 2 and sum >= 7
function _minSubArrayLen(posIntegers: number[], target: number) {
    //? what happens if we start at end and move back? could continually shrink the window until it cant be shrunk anymore
    //? will that not work because it isnt sorted? but its "growth" is intrinsically sorted, because it is only positive integers
    //? ie it cant shrink by including more values, so in that sense we can keep reducing toward the middle while keeping sum above T
    //? what would we do if there were negatives? then expanding the window could actually reduce the sum
    //! doesnt work, fails on [2,3,1,9,9,3,7,10],18 because it removes the first 9 in favor of the last 10
    //! so it turns out that it does need to be sorted for a closing window to be useful?
    
    if (posIntegers.length === 0) return 0 // edge case, empty array cant sum to anything but 0, and target sum 0 can have 0 addends

    let minLength = posIntegers.length
    let windowSum = 0

    // first sum the starting window that includes the entire array
    let left = 0,    
        right = -1 // just makes the first sum a bit simpler
    while (right + 1 < posIntegers.length) {
        const attach = posIntegers[right + 1]

        if (attach >= target) return 1 // short circuit, found a single value higher than target
        if (attach < 0) throw new Error(`minSubArrayLen contains negative: ${attach}`)

        windowSum += attach
        right++
    }

    if (windowSum < target) return 0 // edge case, posIntegers too small

    while (left < right) {
        // loop needs to break early if we cant shrink anymore without S going below T
        // each loop should decide whether to increment left or decrement right to shrink the array
        const leftEdge = posIntegers[left]
        const rightEdge = posIntegers[right]

        // remove whichever edge is contributing less to the sum
        if (rightEdge < leftEdge) {
            right--
            windowSum -= rightEdge
        } else {
            left++
            windowSum -= leftEdge
        }
        // if subtracting the smallest edge still caused us to go under the target,
        // then we know we cant get the window any smaller than it already is (because it has to be contiguous)
            // ie, even if there was a smaller value somewhere in the middle of the window to remove, we couldnt reach it
        if (windowSum < target) return minLength 

        // otherwise just reduce the minLength and repeat
        minLength -= 1
    }    
}

function minSubArrayLen(posIntegers: number[], target: number) {
    if (posIntegers.length === 0) return 0 // edge case, empty array cant sum to anything but 0, and target sum 0 can have 0 addends

    let minWidth = Infinity // see ternary at end of function
    
    let left = 0,    
        right = 0

    let windowSum = posIntegers[left]

    // window will need to touch every value at least once, because array isnt sorted
    // so can expect to loop from left to right
    while (left < posIntegers.length && right < posIntegers.length) {

        if (windowSum >= target) {
            
            // check width and compare to recorded minimum
            const width = (right - left) + 1
            if (width === 1 || posIntegers[right] >= target) return 1 // single value > target
            if (width < minWidth) minWidth = width

            // shrink window from the left
            windowSum -= posIntegers[left]
            left++
        } else {
            // open window to the right
            right++
            windowSum += posIntegers[right]
        }
    }
    return minWidth <= posIntegers.length ? minWidth : 0  // return 0 if the entire array sum < target
}

//? hint: sliding window, find the highest sum S of a consecutive subset M of length Y from N 
    // ([100, 200, 300, 100, 50, 400, 50], 2) ~ [200, 300] = 500
    // should be O(N+M) time and O(1) space
function _maxSubarraySum(array: number[], subLength: number) {
    if (array.length < subLength) return null // edge case, array too short

    // bounds of the sliding window
    let lBound = 0,
        rBound = lBound + (subLength - 1) // inclusive, need to subtract 1

    let windowSum = 0

    // start by just getting S1 of the first subset M1 of length Y from N
    for (let i = lBound; i < subLength; i++) { // moving this logic into the while loop might be easier to read
        windowSum += array[i]
    } 
    let maxSum = windowSum // assign maxSum to the first subset sum S1

    while (rBound + 1 < array.length) {
        // don't need to keep redoing the entire sum, we only needed to do that once
        // now we just chop off the beginning and add on to the end as we slide the window
        // this allows us to stay O(N) time, whereas re-summing would require nested loops
        
        const remove = array[lBound]
        const attach = array[rBound + 1]

        windowSum -= remove
        windowSum += attach

        if (windowSum > maxSum) maxSum = windowSum

        rBound++
        lBound++
    }

    return maxSum
}

//? hint: sliding window, find the highest sum S of a consecutive subset M of length Y from N 
// refactored version
function maxSubarraySum(array: number[], subLength: number) {
    if (array.length < subLength) return null

    let left = 0,
        right = 0

    let windowSum = 0,
        maxSum = windowSum
        
    while (right < array.length) {
        
        const attach = array[right]
        windowSum += attach

        if (right - left === subLength) { // start moving left bound once window is subLength wide
            // i think its easier to read the logic here
            // but it would be more efficient for large arrays to build the window in an earlier for loop
            const remove = array[left]
            windowSum -= remove
            left++ 
        }

        if (windowSum > maxSum) maxSum = windowSum

        right++
    }

    return maxSum
}

//? name is misleading, but this function checks that the characters in sequence are present in testString and in the correct order
    // ie, it doesnt care if the sequence is interrupted, only that the individual characters are present
    // it would make more sense to think of sequence as an array of characters to find, not a string
    // multiple pointer gets O(N+M) time and O(1) space, there is a recursive O(N+M) time solution, but it exceeds O(1) space
function hasCharactersInOrder(sequence: string, testString: string) {
    if (testString.length === 0) return true // edge case
    let seqPtr = 0
    let testPtr = 0

    while (testPtr < testString.length) { // ran out of characters to test, break and return false
        const seq = sequence[seqPtr],
            test = testString[testPtr]
        if (seq === test) seqPtr++
        if (seqPtr === sequence.length) return true // completed the sequence, return true
        testPtr++

    }
    return false
}   


//? hint: multiple pointers, must be done in O(N) time and O(1) space
/**
 * determine if there is a sorted array pair with average equaling target
 */
function _averagePair(sorted: number[], target: number) {
    //? this version works if we only care about ADJACENT pairs
    if (sorted.length < 2) return false
    let left = 0,
        right = 1
    while (right < sorted.length) {
        const avg = (sorted[left] + sorted[right]) / 2
        if (avg === target) return true
        left++
        right++
    }
    return false
}

//? hint: multiple pointers, must be done in O(N) time and O(1) space
/**
 * determine if there is a sorted array pair with average equaling target
 */
function averagePair(sorted: number[], target: number) {
    //? this version works if we don't care about adjacency, ie ([5,6,7,10],8) would return true because 6 and 10 avg to 8
    if (sorted.length < 2) return false
    let left = 0,
        right = sorted.length - 1
    while (left < right) {
        const avg = (sorted[left] + sorted[right]) / 2
        if (avg === target) return true
        else if (avg < target) left++
        else right--
    }
    return false
}

// ? Can be solved using the Frequency Counter OR Multiple Pointers pattern
function areThereDuplicates(...args: any) {
    // multiple pointers solution requires that the array be sorted i think, spent a while trying to think of any other way
    if (args.length < 2) return false
    args = args.sort()
    let   left = 0,
            right = 1
    while (left < args.length && right < args.length) {
        if (args[left] === args[right]) return true
        if (right > left) left += 2
        else right += 2
    }
    return false
}


// ? Frequency Counter Pattern (same as anagram, just did it again to use Map)
function sameDigitFrequency(num1: number, num2: number) {
    const string1 = num1.toString(), string2 = num2.toString()
    if (string1.length !== string2.length) return false
    const freqCounter = new Map()
    for (const char of string1) {
        if (!freqCounter.has(char)) freqCounter.set(char, 1)
        else freqCounter.set(char, freqCounter.get(char) + 1)
    }
    for (const char of string2) {
        if (!freqCounter.has(char)) return false
        else freqCounter.set(char, freqCounter.get(char) - 1)
    }
    return true
}

// ? Multiple Pointers Pattern
function countUniqueValues(sorted: number[]) {
    if (sorted.length === 0) return 0
    let left = 0, 
        right = 1
    let uniques = 1 // always at least one unique value

    while (right < sorted.length) {
        const   LEFT = sorted[left], 
                RIGHT = sorted[right]
        if (LEFT !== RIGHT) {
            console.log('unique!')
            uniques++
            left = right // left needs to move up to where right is, since we know right is now at a new number
            right++
        } else {
            right++
        }
    }
    return uniques
}

function _validAnagram(str1: string, str2: string) {
    if (str1.length !== str2.length) return false // dont need to check str2 for extra chars now
    const str1Map: {[key: string]: number} = {}
    const str2Map: {[key: string]: number} = {}
    for (const char of str1.toLowerCase()) {
        if (!str1Map[char]) str1Map[char] = 0
        str1Map[char] += 1
    }
    for (const char of str2.toLowerCase()) {
        if (!str2Map[char]) str2Map[char] = 0
        str2Map[char] += 1
    }
    for (const key in str1Map) {
        if (str1Map[key] !== str2Map[key]) return false
    }
    return true
}

// ? Frequency Counter Pattern
// 2N time down from 3N time, and N space down from 2N space
function validAnagram(str1: string, str2: string) {
    if (str1.length !== str2.length) return false // dont need to check str2 for extra chars now
    const str1Map: {[key: string]: number} = {}
    for (const char of str1.toLowerCase()) {
        if (!str1Map[char]) str1Map[char] = 0
        str1Map[char] += 1
    }
    for (const char of str2.toLowerCase()) {
        if (!str1Map[char]) return false // 0 is falsey
        str1Map[char] -= 1
    }
    return true
}

function test_validAnagram() {
    console.log(`anagram, nagrama: ${validAnagram('anagram', 'nagrama')}`)
    console.log(`anagram, nagrama: ${validAnagram('anagram', 'nafgrama')}`)
    console.log(`anagram, nagrama: ${validAnagram('anagram', 'nagramb')}`)
}