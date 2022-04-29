export async function study() {
    const q = new QueueByStacks()

    q.push(1)
    q.push(2)
    const peek = q.peek()
    q.pop()
    const empty = q.empty()
    return
}

// implement a queue "using only two stacks"
// stacks may only use standard stack functions, push to top, pop from top, peek top, length

class QueueByStacks {
    constructor() {}

    private pushStack: number[] = []
    private invertedPopStack: number[] = []

    // O(n) access and insertion when access and insertion are alternated because the stacks have to swap every time
    // O(1) best case access and insertion when one type of operation is repeated (if you push() several times in a row, no stack swapping will be done)

    // visualization: two tubes with tennis balls in them
    // to reach the bottom tennis ball in a tube (1st in queue), dump the balls into the other tube and now it will be at the top
    // then to add another tennis ball and make sure it is last in line, 
        // return the balls to the first tube so that now 1st in queue is at bottom, last in queue is as top, and new ball will fall in over the last in queue

    push(x: number): void {
        // dump anything in the inverted stack into the push-stack to reverse its order
        while (this.invertedPopStack.length) this.pushStack.push(this.invertedPopStack.pop()!)
        
        this.pushStack.push(x)
    }

    pop(): number|undefined {
        // dump anything in the push-stack into the inverted stack to reverse its order. now the item at bottom of push-stack will be at the top of inverted-stack and poppable
        while (this.pushStack.length) this.invertedPopStack.push(this.pushStack.pop()!)
        
        return this.invertedPopStack.pop()
    }

    peek(): number|undefined {
        // dump anything in the push-stack into the inverted stack to reverse its order. now the item at bottom of push-stack will be at the top of inverted-stack and peekable
        while (this.pushStack.length) this.invertedPopStack.push(this.pushStack.pop()!)

        return this.invertedPopStack[this.invertedPopStack.length - 1]
    }

    empty(): boolean {
        return this.pushStack.length === 0 && this.invertedPopStack.length === 0
    }
}