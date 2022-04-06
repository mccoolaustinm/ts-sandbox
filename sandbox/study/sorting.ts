export async function study() {
    test_mergeSort()
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

