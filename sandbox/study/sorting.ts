export async function study() {
    // test_radixSort()
    // test_inPlaceMerge()
    test_quickSort()
}

function test_insertionSort() {
    const r = insertionSort([9,5,11,2,4,8])
    return
}

function insertionSort(arr: number[]): number[] {
    if (arr.length < 2) return arr

    // consider the "left subarray" to already be sorted
    // thus the first item at index 0 is already sorted as the only item in the left subarray
    // we will continue to expand the left subarray as we sorted-insert items from the right subarray into it

    // iterate over right subarray (beginning at index 1 as index 0 starts in the left subarray)
    for (let r = 1; r < arr.length; r++) {
        let element = arr[r]

        // now lets iterate over the left subarray
        // this nested loop results in n^2 worst case
            // but if we knew that only one item needed sorting
            // or, even better, knew only the last item needed sorting and could begin the outer loop at r = arr.length - 1
            // then only one inner loop need take place and the sorting performance would be O(n)
            // this is the use case of insertion sort! "re-sorting on insertion"

        let l = r - 1 // the end of left subarray

        // while the values in left subarray are still larger than element
        while (l >= 0 && arr[l] > element) {
            // we need to shift these values up to make space for where element will be inserted
            arr[l+1] = arr[l] // the first value shifted will be shifted into the original index of element, which is fine as we recorded element
            l--
        }

        // after we have shifted these values up
        // we have either reached an item in left subarray that is smaller than element, or we have reached negative index
        // slide in element ahead of the left index, not needing to worry about overwriting as every larger value has been shifted up
        // and the removal of element from its original position made room for that shifting-by-1 of every larger value to the left of it
        arr[l+1] = element
    }

    return arr
}

function test_radixSort() {
    console.log(radixSort([14,2,19,1,52,91,105,5021,2,1,11,15])) // 1 1 2 2 4 5 5 5 9 11 15 91
    console.log(radixSort([]))
    console.log(radixSort([1]))
    console.log(radixSort([10,2]))
    console.log(radixSort([2,1]))
}

function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr

    // i dont know how to derive the math between these two functions
    // in a real-world / interview scenario i know that i could outline these functions
    // and implement a temporary version using string conversion
    // and then acknowledge that i would need to seek a reference for the math
    function getDigit(num: number, d: number) {
        return Math.floor(Math.abs(num) / Math.pow(10, d)) % 10
    }

    function countDigits(num: number) {
        // get absolute value of number
        // determine what power 10 needs to be raised to reach that number (possibly a very messy exponent)
        // floor that messy exponent and then add 1 to it

        // Math.log10(21388) ~= 4.33
        // Math.floor(4.33) = 4, +1 = 5
        // return 5 digits in 21388
        return Math.floor(Math.log10(Math.abs(num))) + 1
    }

    // my original implementation was logically sound, just needed to get rid of the inefficient string methods
    // granted i dont know how fast math operations like floor and log10 are and if thats better or worse than string conversion

    let buckets: number[][] = [[],[],[],[],[],[],[],[],[],[]] // 10 sub-buckets
    let max = 0, traversals = 0

    function emptyBuckets() {
        arr = []
        buckets.forEach(bucket => {
            arr.push(...bucket)
        })
        buckets = [[],[],[],[],[],[],[],[],[],[]] // empty buckets
    }

    // first iteration is split out in order to spare logic that is only needed on first traversal to get maximum digits
    arr.forEach(n => {
        max = Math.max(max, countDigits(n));
        const digit = getDigit(n, traversals)
        buckets[digit].push(n)
    })
    emptyBuckets()
    traversals = 1
    
    while (traversals < max ) {
        arr.forEach(n => {
            const digit = getDigit(n, traversals)
            buckets[digit].push(n)
        })
        emptyBuckets()
        traversals++
    }

    return arr
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

// significantly improved, in-place quicksort, doesnt keep slicing and spreading arrays
function quickSort(arr: number[]): number[] {

    quickSortInPlace(arr)

    function quickSortInPlace(arr: number[], left: number = 0, right: number = arr.length - 1) {
        if (left >= right) return // base case array of 1 or 0 is already sorted

        const PIVOT = sortPivot(arr, left, right)
        // array is now sorted at index PIVOT, just need to sort the left and right subarrays
        quickSortInPlace(arr, left, PIVOT - 1) // if this ends up being a subarray of length 1, it immediately returns
        quickSortInPlace(arr, PIVOT + 1, right)
    }

    function sortPivot(arr: number[], left: number, right: number): number {
        const pivotElement = arr[right]
        let subarrayLength = left
        // creating a subarray to the left of the array where all values are smaller than pivot
        // incrementing an index for the right-bound of that left subarray, subarrayNext
        // each iteration, if the iterated element is smaller than pivot
        // we swap this element with whatever is currently at the boundary of the subarray
        // it is now part of the "smaller than pivot element" subarray and the subarray length / boundary index gets incremented by 1 
        for (let i = left; i < right; i++) {
            if (arr[i] <= pivotElement) {
                swap(arr, subarrayLength, i)
                subarrayLength++
            }
        }
        // now we finally place the pivot element to the right of the subarray. all values to the left are now smaller than pivot element
        swap(arr, subarrayLength, right)
        return subarrayLength // and return the pivot's final index
    }

    function swap(arr: number[], pivot: number, i: number) {
        let temp = arr[pivot]
        arr[pivot] = arr[i]
        arr[i] = temp
    }
    

    return arr
}

/**
 * choose first element as pivot (revisit pivot selection later)
 * find that pivots final index
 *      traverse array and count smaller elements
 *      swap smaller elements to pivot + swaps
 *      swap pivot to pivot + swaps
 * recursively quicksort subarrays to left and right of final pivot position
 */
function _quickSort(arr: number[]): number[] {
    
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
    // keep splitting the array in half, sorting the halves, and merging the halves
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    // mergeTwoSorted will exchange items between sorted arrays to combine them quickly (O(n) time)
    // and mergeSort recursive will keep doing this on smaller and smaller subarrays
    // the mergeSort recursion results in a log n term, and the merging sorted arrays results in an O(n) term
    // hence O(n log n)
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

function _mergeTwoSortedArrays(array1: number[], array2: number[]): number[] {
    const merged: number[] = []
    let pointer1 = 0, pointer2 = 0

    // increment both arrays using their respective pointers. continue until one array is finished, because we can just append the remainder of the other array after that
    while (pointer1 < array1.length && pointer2 < array2.length) {
        // compare the values at the pointers. whichever is smaller gets pushed and that array is incremented
        if (array1[pointer1] <= array2[pointer2]) {
            // array1 contains the next smallest value, so it gets pushed into our merged array first to maintain the sort
            merged.push(array1[pointer1])
            pointer1++
        } else {
            merged.push(array2[pointer2])
            pointer2++
        }
    }
    // one of the arrays has been empty, and we know that all of the values remaining in the other array are still sorted, and larger than merged, and can simply be appended
    
    if (pointer1 < array1.length) merged.push(...array1.slice(pointer1)) // array1 still has values left, so splice from the pointer location and spread the resulting array into the merged array
    else if (pointer2 < array2.length) merged.push(...array2.slice(pointer2))

    return merged
}

function test_inPlaceMerge() {
    let m1 = [1,2,3,8,0,0,0]
    mergeSortedArraysInPlace(m1,4,[2,5,6],3)

    let m2 = [1,2,3,0,0,0]
    mergeSortedArraysInPlace(m2,3,[2,5,6],3)

    let m3 = [0]
    mergeSortedArraysInPlace(m3,0,[1],1)
    return
}

function mergeSortedArraysInPlace(array1: number[], array1DataLength: number, array2: number[], array2Length: number): void {
    // the length property is useful for array1 to know where the valid data is
    // maybe similar to the merge two sorted arrays into new array problem
    // but we can try swapping nums1 items into nums2 as we go?

    let pointer1 = 0, pointer2 = 0
    // while(pointer1 < array1.length) {
    //     // compare the values at the pointers. whichever is smaller gets placed at this location in array1
    //     // unlike the other merge approach, we always increment pointer1 here
    //         // we also need to check that we're not comparing a trailing zero placeholder
    //     if (pointer1 < array1DataLength && array1[pointer1] <= array2[pointer2]) {
    //         // array1 contains the next smallest value, so nothing happens but increment pointer1
    //         pointer1++
    //     } else {
    //         // array2 contains the next smallest non-placeholder value
    //         // we need to place this value in the current location in array1, but we dont want to lose the data of array1
    //         // so lets store it in array2!
    //         let array1Item = array1[pointer1]
    //         array1[pointer1] = array2[pointer2]

    //         // if the array1Item was a valid piece of data and not a placeholder/trailing-zero
    //         // insert the array1 element into correct position in array2
    //         if (pointer1 < array1DataLength) {
    //             let insert = 0
    //             while (array2[insert] < array1Item) insert++
    //             array2.splice(insert, 0, array1Item)    
    //         }

    //         // increment both arrays
    //         pointer1++
    //         pointer2++
    //     }
    // }

    // another option is to not damage array2, especially since the problem didnt give permission to
    // so since i ended up using splice() anyway, i may as well just splice array1

    // let array1Bound = array1.length - array1DataLength
    // while (pointer2 < array2.length) {
    //     // if pointer1 is within the bounds of valid data in array1, ie, not a trailing zero, compare to array2
    //     if (pointer1 < array1Bound && array1[pointer1] <= array2[pointer2]) {
    //         // if pointer1 was not a trailing zero and is sorted before array2, increment pointer1 without altering array1
    //         pointer1++
    //     } else {
    //         // if we have either reached trailing zeroes in array1 or the item at array1 should be sorted higher

    //         array1.splice(pointer1,0,array2[pointer2]) // splice an item from array2 into array1
    //         array1.pop() // remove a trailing placeholder from the end of array1 to keep array1 length consistent
    //         array1Bound++
    //         pointer1++
    //         pointer2++
    //     }
    // }

    array1.splice(array1DataLength)
    while (pointer2 < array2.length) {
        if (array1[pointer1] <= array2[pointer2]) {
            pointer1++
        } else {
            array1.splice(pointer1,0,array2[pointer2]) // splice an item from array2 into array1
            pointer1++
            pointer2++
        }
    }
    return
};

