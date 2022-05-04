// https://leetcode.com/problems/valid-palindrome-ii/ 

function validPalindrome(s: string): boolean {
    
    function validSubPalindrome(s: string, left: number, right: number): boolean {
        while (left < right) {
            
            if (s[left] !== s[right]) return false

            left++
            right--
        }
        return true
    }
    
    // first see if the entire string is a valid palindrome
    let left = 0, right = s.length - 1
    while (left < right) {
        if (s[left] !== s[right]) {
            // check both possible substrings between these indices, skipping either left or right, return true if either passes
            return validSubPalindrome(s, left + 1, right) || validSubPalindrome(s, left, right - 1) 
        }
        left++
        right--
    }
    return true 
}