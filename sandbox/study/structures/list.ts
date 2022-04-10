export async function study() {
    testSinglyLinkedList()
}


function testSinglyLinkedList() {
    const list = new SinglyLinkedList<string>()
    list.push('Hello')
    list.push('World')
    list.push('!')

    let x = list.pop()
    let y = list.pop()
    let z = list.pop()
    return
}



/**
 * linked list: ordered list where items are not mapped to an index 
 * but instead are linked to the next / previous element
 * therefore it is impossible to instantly access an abritrary element
 * but extremely easy to access the first / last element depending on whether singly or doubly linked
 * and very efficient to add elements to the beginning or in the middle compared to an array
 * 
 * in fact one of the best use cases for a linked list is when items need to be added/removed at both ends frequently
 * whereas to do this with arrays, the entire array has to be reindexed whenever an item is added/removed before the end
 * in other words, arrays allow random access and linked lists do not
 * and array splicing is expensive whereas linked list splicing is not
 */

class ListNode<Type> {
    constructor(
        public val: Type, 
        public next: ListNode<Type>|null = null
    ) {}
}

class SinglyLinkedList<Type> {
    public head: ListNode<Type>|null
    public tail: ListNode<Type>|null
    public length: number = 0
    constructor() {}

    push(value: Type) {
        const node = new ListNode<Type>(value)
        if (!this.tail) {
            this.head = node
            this.tail = this.head
        } else {
            this.tail.next = node
            this.tail = this.tail.next
        }
        this.length++
    }

    pop(): Type|undefined {
        if (this.length === 0) return undefined
        if (this.length === 1) {
            const popped = this.head!
            this.head = null, this.tail = null
            return popped.val
        }
        // valid for lists of length 2 or more
        let n = this.head!
        while (n.next) {
            if (!n.next.next) { // is the next node the final node
                n.next = null // if yes, disconnect this node from final node
            } else {
                n = n.next // if not, move on
            }
        }
        this.length--
        let popped = this.tail! // store what the tail was so it can be returned
        this.tail = n
        return popped.val
    }
}
