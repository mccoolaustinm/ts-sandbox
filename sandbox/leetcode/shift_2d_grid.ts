// https://leetcode.com/problems/shift-2d-grid/
// i really enjoyed solving this one with a doubly linked list

function shiftGrid(grid: number[][], k: number): number[][] {
    
    class ListNode {
        constructor(
            public val: number, 
            public prev: ListNode|null = null,
            public next: ListNode|null = null
        ) {}
    }

    class DoubleLinkedList {
        head: ListNode|null = null
        tail: ListNode|null = null
        length = 0

        constructor(){}

        array() {
            // see notes below about a disassemble() implementation for better space complexity
            const array = []
            let node = this.head
            while (node) {
                array.push(node.val)
                node = node.next
            }
            return array
        }

        push(val: number){
            const node = new ListNode(val)
            if (!this.tail) {
                this.head = node
                this.tail = this.head
            } else {
                node.prev = this.tail
                this.tail.next = node
                this.tail = this.tail.next
            }
            this.length++
        }

        shift() {
            if (this.length <= 1) return

            let oldTail = this.tail!
            // convert (tail - 1) into the new tail
            this.tail = oldTail.prev!
            this.tail.next = null
            oldTail.prev = null

            let oldHead = this.head!
            // convert the old tail into the new head
            this.head = oldTail
            this.head.next = oldHead
            oldHead.prev = this.head
        }
    }
    
    let shift = 0
    let m = grid.length
    let n = grid[0].length

    let list = new DoubleLinkedList()
    for (const n of grid) {
        for (const j of n) {
            list.push(j)
        }
    }
    grid = [] // going to reassemble, dont need to keep this in memory anymore
    // could even have kept space to O(1) by disassembling grid to make the list
    // and then instead of a toArray() function on list, a disassemble() function that destroyed it as it created the array

    while (shift < k) {
        list.shift()
        shift++
    }

    const flattened = list.array()
    for (let r = 0; r < m; r++) {
        let slice = flattened.slice((r * n), (r * n) + n)
        grid.push(slice)
    }

    // reassemble
    return grid
};