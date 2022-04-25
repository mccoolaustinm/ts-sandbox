export async function study() {
    // testHeap()
    testPriorityQueue()
}

function testPriorityQueue() {
    const queue = new PriorityQueue<string>()
    queue.enqueue({value: 'Car oil change', priority: 3})
    queue.enqueue({value: 'Pay bills', priority: 2})
    queue.enqueue({value: 'Clean laundry', priority: 6})
    queue.enqueue({value: 'Clean dishes', priority: 5})
    queue.enqueue({value: 'Maintain github commit streak', priority: 1})
    queue.enqueue({value: 'Birth of child', priority: 0})
    queue.enqueue({value: 'Life or Death :O', priority: 0})

    let highestPriority = queue.dequeue()
    while (highestPriority) {
        console.log(highestPriority.value)
        highestPriority = queue.dequeue()
    }

    return
}

// implemented a cleaner priority queue for use in graph studying
export class PriorityNode<Type> {
    value: Type
    priority: Number
}

export class PriorityQueue<Type> {
    heap: PriorityNode<Type>[] = []
    constructor() {}

    // children of any index are at 2n + 1 and 2n + 2
    // parent of any index is at floor((n-1)/2)

    /** sink the node at top of queue to correct position */
    private _sink() {
        // if there arent at least 2 items, no need to look at the heap at all
        if (this.heap.length < 2) return

        // the node at top of queue becomes our "weight" to "sink" as far as it can
        let i_weight = 0
        const weight = this.heap[i_weight]

        // swap flag will be set true if a swap is made during comparisons
        // make at least one set of comparisons, then continue based if a swap is made
        let swap: boolean
        do {
            // start swap at false, will be set to true if a valid swap is found
            // if it remains false by the end, it will break the loop
            swap = false
            let i_swappedChild: number // the index of either left or right that was chosen to be swapped

            let i_leftChild = (2 * i_weight) + 1
            let i_rightChild = (2 * i_weight) + 2
            let leftChild, rightChild

            // projected indexes can be out of bounds, so we need to carefully check

            // first check if left child exists (right will only exist if left does because of heap structure)
            if (i_leftChild < this.heap.length) {

                leftChild = this.heap[i_leftChild]

                // if left child is of a higher priority (lower value) than weight, prepare to swap
                if (leftChild.priority < weight.priority) {
                    swap = true
                    i_swappedChild = i_leftChild // keep the index to swap to
                    // but we dont swap yet, because we need to see if right might be an even better swap
                }

                // if left child existed, now check if right child exists
                if (i_rightChild < this.heap.length) {

                    rightChild = this.heap[i_rightChild]

                    // three possibilities:
                        // 1. right is not a higher priority than the weight, so we dont swap with right
                        // 2. right is a higher priority than the weight, but so is left and the swap flag was already set
                            // 2a. right is higher priority than left so overwrites the planned swap
                            // 2b. right is lower priority than left, so the left swap continues as planned

                    // a swap wasnt already planned for left, so compare right to weight
                    if (!swap && rightChild.priority < weight.priority){ 
                        swap = true
                        i_swappedChild = i_rightChild
                    }
                    // a swap was planned for left, so compare right to left and overwrites if even higher priority
                    else if (swap && rightChild.priority < leftChild.priority) i_swappedChild = i_rightChild
                }
            }

            // both possible children have been compared to weight and eachother, now make the selected swap if necessary
            if (swap) {
                this.heap[i_weight] = this.heap[i_swappedChild!]
                this.heap[i_swappedChild!] = weight
                i_weight = i_swappedChild!
            }
            // if a swap was made, the loop will continue
        } while (swap)
    }

    dequeue() {
        if (this.heap.length === 0) return undefined

        // dont need to rearrange heap if there were only 2 items or less
        // the highest priority item will be at index 0, so we can shift() it and then there is only 1 item in array
        if (this.heap.length <= 2) return this.heap.shift()

        // if there are more than 2 items, there will be 2+ left after returning the root and we need to rearrange

        // get the node at top of queue (current highest priority / root of heap)
        const min = this.heap[0]

        // and replace it with the node at end of queue (current lowest priority)
        const end = this.heap.pop()!
        this.heap[0] = end

        // and then sink the lowest priority to its new correct position
        // this maintains the correct heap parent/child relationships in the array
        this._sink()

        return min
    }

    /** bubble the node at bottom of the queue to correct position */
    private _bubble() {
        // if there arent at least 2 items, no need to look at the heap at all
        if (this.heap.length < 2) return

        // get the last node in queue to be our "bubble" which will float up
        let i_bubble = this.heap.length - 1
        const bubble = this.heap[i_bubble]

        // continue while bubble isnt already at the top
        // index > 0 also implies that the heap is of at least length 2
        while (i_bubble > 0) {
            // bubble isnt root, so bubble will definitely have a parent at floor((n-1)/2)
            let i_parent = Math.floor((i_bubble - 1) / 2)
            let parent: PriorityNode<Type> = this.heap[i_parent] 

            // if the bubble is lower priority (higher value) than its parent
            // then it has floated as high as it can, break out of loop
            if (bubble.priority >= parent.priority) {
                break
            }

            // otherwise, bubble is higher priority than parent and needs to swap
            this.heap[i_parent] = bubble
            this.heap[i_bubble] = parent
            i_bubble = i_parent
        }
    }

    enqueue(node: PriorityNode<Type>) {
        this.heap.push(node)
        this._bubble()
    }
}

function testHeap() {
    const heap = new MaxBinaryHeap<number>()
    heap.insert(20)
    heap.insert(50)
    heap.insert(25)
    heap.insert(90)
    heap.insert(37)
    heap.insert(91)
    heap.extractMax()
    heap.extractMax()
    heap.extractMax()
    heap.extractMax()
    heap.extractMax()
    heap.extractMax()
    return
}

class MaxBinaryHeap<Type> {
    values: Type[] = []
    constructor() {}

    // instructor version, maybe easier to read
    _extractMax(): Type|undefined {
        if (this.values.length === 0) return undefined
        if (this.values.length === 1) return this.values.pop()
        const max = this.values[0]
        const end = this.values.pop()!
        this.values[0] = end

        this._sink()

        return max
    }

    _sink() {
        const length = this.values.length
        const weight = this.values[0]
        let p = 0
        while(true) {
            let l = (2 * p) + 1
            let r = (2 * p) + 2
            let left, right
            let swap = null
            if (l < length){ 
                left = this.values[l]
                if (left > weight) {
                    swap = l
                }
            }
            if (r < length){ 
                right = this.values[r]
                if (    (!swap && right > weight) || 
                        (left && swap && right > left)) 
                {
                    swap = r
                }
            }
            if (!swap) break
            this.values[p] = this.values[swap]
            this.values[swap] = weight
            p = swap
        }
    }

    extractMax(): Type|undefined {
        if (this.values.length === 0) return undefined
        if (this.values.length === 1) return this.values.pop()
        // swap max/root with newest element (index 0 with index length - 1)
        let max = this.values[0]
        this.values[0] = this.values[this.values.length - 1]
        this.values.pop() // removed last element, but we have moved what was there to the root position

        // now sink the root element down to its correct position
        let p = 0
        let l = 2*p + 1
        let r = 2*p + 2
        let parent = this.values[p]
        let left = l < this.values.length ? this.values[l] : null
        let right = r < this.values.length ? this.values[r] : null

        let invalid: boolean = (left && parent < left) || (right && parent < right) ? true : false

        while(invalid) {
            // if only left child, or left is greater than right
            if ((left && !right) || left && right && left >= right) {
                // swap parent and left
                this.values[l] = parent
                this.values[p] = left
                p = l
            // if only right child, or right is greater than left
            } else if ((right && !left) || right && left && right > left) {
                // swap parent and right
                this.values[r] = parent
                this.values[p] = right
                p = r
            }

            l = 2*p + 1, r = 2*p + 2
            parent = this.values[p]
            left = l < this.values.length ? this.values[l] : null
            right = r < this.values.length ? this.values[r] : null

            // check again if out of order
            invalid = (left && parent < left) || (right && parent < right) ? true : false
        }

        return max
    }

    insert(value: Type) {
        // push to end of array
        // find parent at (n-1)/2
        // if parent is larger, swap with parent

        this.values.push(value)

        if (this.values.length > 1) {
            let c = this.values.length - 1
            let p = Math.floor((c - 1) / 2)
            let child = this.values[c]
            let parent = this.values[p]

            while(parent && parent < child) {
                // swap
                this.values[p] = child
                this.values[c] = parent
                
                c = p
                p = Math.floor((c - 1) / 2)
                parent = this.values[p]
            }
        }

        return
    }
}