export async function study() {
    testHeap()
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