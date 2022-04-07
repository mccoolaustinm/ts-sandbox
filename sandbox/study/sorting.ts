export async function study() {
    test_quickSort()
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

