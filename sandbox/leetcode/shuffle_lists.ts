// @ts-nocheck
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reorderList(head: ListNode | null): void {
    if (!head || !head.next || !head.next.next) return // list of length 2 or less will not need to be modified, so check if there is a third node before continuing
    
    // in order to reverse the second half of the list, we need to find the midpoint + 1, which can be done using the fast/slow pointer technique
    function findMidpoint(head: ListNode): ListNode {
        let slow = head, fast = head
        while (fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }    
        return slow
    }
    
    function reverseList(head: ListNode): ListNode {
        if (!head || !head.next) return head // lists less than length 2 are palindromes
    
        // move from left to right. disconnect from the right after saving a temp reference to that right node in "next"
        // save the reference to the current node in "previous". now when we iterate on "next" (to the right) we can connect it to the left

        // initializing at position -1, and the node to our right is the current head
        let previous: ListNode | null = null // to reverse, previous becomes next
        let next = head

        while (next) {
            head = next 
            next = head.next // store node to head's right, this will be the next node to iterate on
            head.next = previous // connect 
            previous = head
        }

        return head
    }
    
    const midpoint = findMidpoint(head)
    let head2 = reverseList(midpoint.next) 
    
    midpoint.next = null // finally, disconnect the lists, now two completely separate structures
   
    // we have split the list in two and reversed one half in 1.5 full traversals
    // one last traversal will alternate connecting nodes from each list, "shuffling" list 2 into list 1
    
    function shuffleLists(head1: ListNode, head2: ListNode) {
        
         // need a pointer for iterating over list 2,
        // a pointer for tracking the next insert position in list 1
        // and temp pointers for preserving future nodes after breaking connections
        
        let current1 = head1, current2 = head2
        let next1, next2
        
        // iterate over list 2
        while (current2) {
            // for each list 2 node, insert it into the next even position in list 1
            next1 = current1.next // preserve both lists
            next2 = current2.next
            
            current1.next = current2 // attach current list2 node to current list1 node
            current2.next = next1 // connect the list2 node to the preserved list1 
            
            current1 = next1 // advance list1 to its next original position
            current2 = next2 // advance list2 to its next original position
        }
    }

    shuffleLists(head, head2)
} // dont return anything
// solution could be cleaner, but its O(n) time O(1) space