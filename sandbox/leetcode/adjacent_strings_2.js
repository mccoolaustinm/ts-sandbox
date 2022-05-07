
// so k does not refer to the number of operations we make
// k determines what qualifies to be removed from the string - if k is three, we are looking for strings like "aaa"
// k of 2 removes strings like "aa" and k must be at least 2, so we don't have to handle a remove all characters edge case for k of 1
// i believe the characters need to be adjacent, so in "aaba" k of 3 we would not remove anything
// we keep making this operation as many times as we can, requiring one pass of the /new/ shortened string each time because character adjacency changes


/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 var removeDuplicates = function(s, k) {
    if (s.length < k) return s
    
    // to achieve O(n), we need to make sure we only make 1 pass over the string
    // and we can't use any substring() calls, which will result in something like an O(n * n/k) time (maybe fast enough to avoid TLE, but not optimal)
    // I don't think this can be done in O(1) space, so I'll use a stack that tracks substrings, an O(n) solution

    const substrings = []
    
    // fill the stack with substrings of repeating characters and always work on whatever is at the top of stack
    // to save space we could implement the stack with objects containing character counts, but that's trivial and i'm done with this problem and embarrassed that i didn't immediately think of a one-stack solution
    for (const char of s) {
        const top = substrings.length - 1
        if (top >= 0) {
            let peek = substrings[top]
            if (peek[0] === char) {
                peek = peek + char
                
                if (peek.length === k) substrings.pop()
                else substrings[top] = peek
                
            } else substrings.push(char)
        } else substrings.push(char)
    }
    
    // return whats left in the stack
    return substrings.join('')
};

// note: very confused by my runtimes, this is definitely an O(n) solution