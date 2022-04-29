export async function study() {

    const result1 = problem([1,2,3,9], 8) // false
    const result2 = problem([1,2,4,4], 8) // true
    const result3 = problem([-19,-5,-2,4,5,9,25,31,45], 20) // true
    // const result3 = problem()

    return

}
// input: collection of numbers and a sum
// find matching pair in collection that is equal to the sum
// collection is provided as a parameter and is SORTED
// inputs are always integers, CAN be negative
// [1,2,3,9] sum = 8
// [1,2,4,4] sum = 8 
// need to beat n^2 time

function problem(coll: number[], sum: number): boolean {
    // brute force solution: n^2 compare every integer to every other integer
    // map? if we find a new value, add its difference from the sum to map
    // and if that exact diff is ever found as an int, we have found it
    // should only require one pass, so O(n) time and O(n) space for the hashmap
    // perhaps the nature of array being sorted provides a better solution?

    // map / freq counter solution that doesnt take advantage of any sorting
    if (coll.length < 2) return false

    const targets: {[candidate: number]: true} = {} // O(n) space worst case

    // the fact that the array is sorted means the first value in the array is the smallest
    // the difference between this and the target sum is the greatest possible diff

    let maxCandidate = sum - coll[0]

    for (let n = 0; n < coll.length; n++) {
        const candidate = coll[n]
        if (candidate > maxCandidate) return false // if sorted, can short-circuit once values get too high
        if (targets[candidate]) return true // found matching pair
        else {
            const targetDiff = sum - candidate
            targets[targetDiff] = true // now, if we ever find diff in the array, we will have found a matching pair
        }
    }
    
    return false

    // another approach is to use binary search for the diff from each candidate
    // this wont require any space use but i want to say it would n*log n time
    // log n for each search, * n candidate repeating the search

    // i realize later that a solution that was O(n) time and O(1) space instead of O(n) space
    // was to use a closing window approach with a left and right pointer approaching the middle
    // decrement right if the sum of the pointers is too large, increment left if the sum of pointers is too small
    // but this only works if the data is sorted, and the best result we can expect for sorting is another n*logn solution


}