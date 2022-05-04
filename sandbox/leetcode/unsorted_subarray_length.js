https://leetcode.com/problems/shortest-unsorted-continuous-subarray/

var findUnsortedSubarray = function(nums) {
    // if (nums.length < 2) return 0 // not needed based on problem constraints
    let maxLeft = nums[0], minRight = nums[nums.length - 1] // initialize max and min to the ends of array (0th index is safe based on problem constraints)
    let leftPointer = 1, rightPointer = nums.length - 2 // and then skip the first check since its pointless, the ends would just be compared to themselves
    let leftmostUnsortedIndex, rightmostUnsortedIndex
    
    // skips arrays of length less than 2 as left is set to index 1 on first iteration
    while (leftPointer < nums.length) {
        // from the left, any time a value is less than the largest value found from the left, advance the right bound of the unsorted subarray
        if (nums[leftPointer] < maxLeft) rightmostUnsortedIndex = leftPointer
        else maxLeft = nums[leftPointer]
        
        // from the right, any time a value is larger than the smallest value found from the right, advance the left bound of the unsorted subarray
        if (nums[rightPointer] > minRight) leftmostUnsortedIndex = rightPointer
        else minRight = nums[rightPointer]
        
        leftPointer++
        rightPointer--
    }

    if (leftmostUnsortedIndex === undefined) return 0 // if the loop was never entered or an unsorted value never found, this didnt get assigned
    return rightmostUnsortedIndex - leftmostUnsortedIndex + 1 // length of the subarray is right index - left index, inclusive (add 1)
}