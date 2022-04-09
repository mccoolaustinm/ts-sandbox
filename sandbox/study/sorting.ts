export async function study() {
    test_radixSort()
}

function test_radixSort() {
    console.log(_radixSort([14,2,19,1,52,91,105,5021,2,1,11,15])) // 1 1 2 2 4 5 5 5 9 11 15 91
    console.log(_radixSort([]))
    console.log(_radixSort([1]))
    console.log(_radixSort([10,2]))
    console.log(_radixSort([2,1]))
}

function _radixSort(arr: number[]): number[] {

    if (arr.length <= 1) return arr

    // so we need to create buckets for each digit 0 - 9
    // we need a helper function to get the digit at position
    // we need to traverse the array left to right and place elements in correct bucket making use of get digit
    // we are done after i traversals where i is the number of digits in the largest number in array
    
    let buckets: number[][] = [[],[],[],[],[],[],[],[],[],[]] // 10 sub-buckets

    // my only idea for dealing with the digits is to convert to strings and back which is very inefficient
    // but lets implement anyway
    // and just focus on how the sort works for now
    let max = -1, traversals = 0
    while (max === -1 || traversals < max ) {
        arr.forEach(n => {
            let s = (''+n)
            if (s.length > max) max = s.length;
            s = s.padStart(max,'0')
            const digit = parseInt(s[s.length - 1 - traversals])
            buckets[digit].push(n)
        })
        arr = []
        buckets.forEach(bucket => {
            arr.push(...bucket)
        })
        buckets = [[],[],[],[],[],[],[],[],[],[]] // empty buckets
        traversals++
    }

    return arr
}

function test_quickSort() {
    // console.log(quickSort([4,2,5,1]))
    console.log(quickSort([4,2,9,1,5,91,5,5,2,1,11,15])) // 1 1 2 2 4 5 5 5 9 11 15 91
    console.log(quickSort([]))
    console.log(quickSort([1]))
    console.log(quickSort([1,2]))
    console.log(quickSort([2,1]))
}

/**
 * choose first element as pivot (revisit pivot selection later)
 * find that pivots final index
 *      traverse array and count smaller elements
 *      swap smaller elements to pivot + swaps
 *      swap pivot to pivot + swaps
 * recursively quicksort subarrays to left and right of final pivot position
 *      
 */
function quickSort(arr: number[]): number[] {
    
    if (arr.length <= 1) return arr // base case array of 1 or 0 is sorted
    
    const p = 0
    const pivot = arr[p]
    let swaps = 0
    
    // traverse array and count smaller elements
    for (let i = p + 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            swaps++
            const temp = arr[i]
            arr[i] = arr[p + swaps]
            arr[p + swaps] = temp
        }
    }

    const final = p + swaps
    const temp = arr[p]
    arr[p] = arr[final]
    arr[final] = temp

    const left = arr.slice(0,final)
    const right = arr.slice(final + 1)

    return [...quickSort(left), pivot, ...quickSort(right)] // recompose array with quicksort recursion on left and right side of pivot
}

function test_mergeSort() {
    console.log(mergeSort([4,2,5,1]))
    console.log(mergeSort([4,2,9,1,5,91,5,5,2,1,11,15]))
    console.log(mergeSort([]))
    console.log(mergeSort([1]))
    console.log(mergeSort([1,2]))
    console.log(mergeSort([2,1]))
}

// hint: mergeSort is recursive with a base case where arr is of length 1 or 0
function mergeSort(arr: number[]): number[] {
    // base case, we do something here instead of calling mergeSort again
    if (arr.length <= 1) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return mergeTwoSortedArrays(mergeSort(left), mergeSort(right))
}

function test_mergeTwoSortedArrays() {
    console.log(mergeTwoSortedArrays([1,2,3,4], [1,2,3,4])) // [1 1 2 2 3 3 4 4]
    console.log(mergeTwoSortedArrays([1,4,8,9], [1,3,6,8])) // [1 1 3 4 6 8 8 9]
    console.log(mergeTwoSortedArrays([2], [1])) // [1 2]
    console.log(mergeTwoSortedArrays([1], [1])) // [1 1]
    console.log(mergeTwoSortedArrays([1], [])) // [1]
    console.log(mergeTwoSortedArrays([], [1,2])) // [1 2]
    console.log(mergeTwoSortedArrays([], [])) // []
}

function mergeTwoSortedArrays(n: number[], m: number[]): number[] {
    const merged: any[] = []
    let i = 0, j = 0
    // continue while neither array has been finished
    while (i < n.length && j < m.length) {
        // push next val of whichever array is smaller, increment the array that had the smaller value
        if (n[i] <= m[j]) {
            merged.push(n[i])
            i++
        } else {
            merged.push(m[j])
            j++
        }
    }

    // push in the remainder of whichever array wasnt fully processed (we can assume this is sorted by param constraints)
    // if both arrays are empty, 0 will not be LESS THAN the length of either (0) so the original empty "merged" array will return
    if (i < n.length) merged.push(...n.slice(i))
    else if (j < m.length) merged.push(...m.slice(j))

    return merged
}

