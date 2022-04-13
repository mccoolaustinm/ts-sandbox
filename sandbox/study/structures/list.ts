export async function study() {
    testSinglyLinkedList()
}


function testSinglyLinkedList() {
    const list = new SinglyLinkedList<string>()
    list.push('Hello')
    list.push('World')
    list.push('!')

    list.reverse()

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
        public next: ListNode<Type>|null = null,
        public prev: ListNode<Type>|null = null
    ) {}
}

class DoublyLinkedList<Type> {
    public head: ListNode<Type>|null
    public tail: ListNode<Type>|null
    public length: number = 0
    constructor() {}

    push(value: Type) {
        const added = new ListNode(value)
        if (this.length === 0) {
            this.head = added
        } else {
            this.tail!.next = added
        }
        this.length++
        added.prev = this.tail
        this.tail = added
    }

    pop(): Type|undefined {
        if (this.length === 0) return undefined
        const removed = this.tail!
        const left = removed.prev
        this.tail = left
        this.length--
        if (this.length === 0) {
            this.head = null
        } else this.tail!.next = null
        return removed.val
    }

    shift(): Type|undefined {
        if (this.length === 0) return undefined
        const removed = this.head!
        const right = removed.next
        this.head = right
        this.length--
        if (this.length === 0) {
            this.tail = null
        } else this.head!.prev = null
        return removed.val
    }

    unshift(value: Type) {
        const added = new ListNode(value)
        const right = this.head
        this.head = added
        this.head.next = right
        this.length++
        if (this.length === 1) {
            this.tail = this.head
        } else right!.prev = added
    }

    get(index: number) {
        if (index < 0 || index >= this.length) return null

        if (index > this.length / 2) {
            let n = this.tail!
            let count = this.length - 1
            while (count !== index) {
                n = n.prev!
                count--
            }
            return n
        } else {
            let n = this.head!
            let count = 0
            while (count !== index) {
                n = n.next!
                count++
            }
            return n
        }
    }

    set(index: number, value: Type): boolean {
        const n = this.get(index)
        if (!n) return false
        n.val = value
        return true
    }

    insert(index: number, value: Type): boolean {
        if (index < 0 || index > this.length) return false
        if (index === 0) return (this.unshift(value) as unknown as true)
        if (index === this.length) return (this.push(value) as unknown as true)
        
        const added = new ListNode(value)
        const left = this.get(index - 1)!
        const right = left.next!

        left.next = added
        added.prev = left

        added.next = right
        right.prev = added

        this.length++
        return true
    }

    remove(index: number): Type|undefined {
        if (index < 0 || index >= this.length) return undefined
        if (index === 0) return this.shift()
        if (index === this.length-1) return this.pop()

        const removed = this.get(index)!
        const left = removed.prev!
        const right = removed.next!

        left.next = right
        right.prev = left
        this.length--

        return removed.val
    }
}

class SinglyLinkedList<Type> {
    public head: ListNode<Type>|null
    public tail: ListNode<Type>|null
    public length: number = 0
    constructor() {}

    reverse(): SinglyLinkedList<Type> {
        let node = this.head
        this.head = this.tail
        this.tail = node

        let left = null, right = null
        // 3 pointers: left, node, and right

        while(node) {
            right = node.next // store the node to the right before disconnecting (null on last pass)
            node.next = left // disconnect from node on the right and connect to node on left (null on first pass)
            left = node // move left up 1 to current node
            node = right // move node up 1 to next (right) node, (null on last pass)
        } // keep going until node = next results in node being null, then done

        return this // return this for convenient reassignment ie const reversed = list.reverse()
    }

    get(index: number): ListNode<Type>|null {
        if (index < 0 || index >= this.length) return null
        let n = this.head!
        for (let i = 1; i <= index; i++) { // start at 1, if index is 0 loop is skipped and head returned
            n = n.next!
        }
        return n
    }

    set(index: number, value: Type): boolean {
        const n = this.get(index)
        if (!n) return false
        n.val = value
        return true
    }

    insert(index: number, value: Type): boolean {
        if (index < 0 || index > this.length) return false
        if (index === 0) return (this.unshift(value) as unknown as true) // same as !!void => true
        if (index === this.length) return (this.push(value) as unknown as true)

        const before = this.get(index - 1)!
        const after = before.next
        let newNode = new ListNode(value)
        before.next = newNode
        newNode.next = after
        this.length++
        return true
    }

    remove(index: number): Type|undefined {
        if (index < 0 || index >= this.length) return undefined
        if (index === this.length - 1) return this.pop()
        if (index === 0) return this.shift()

        const before = this.get(index - 1)!
        const removed = before.next!
        const after = removed.next
        before.next = after
        this.length--

        return removed.val
    }

    shift(): Type|undefined {
        if (this.length === 0) return undefined
        let oldHead = this.head!
        this.head = oldHead!.next // nulls head if only 1 element
        this.length--
        if (this.length === 0) {
            this.tail = null // make sure tail gets nulled too to allow garbage collection
        }
        return oldHead.val
    }

    unshift(value: Type) {
        let oldHead = this.head
        this.head = new ListNode(value)
        this.head.next = oldHead

        this.length++
        if (this.length === 1) {
            this.tail = this.head // make sure tail gets assigned too if the head is also the tail
        }
    }

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
            this.length = 0
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
