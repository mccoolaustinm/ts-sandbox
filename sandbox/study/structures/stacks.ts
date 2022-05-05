class StackByQueues {
    constructor() {}

    // implement using only two queues
    private queue: number[] = []
    private reserveQueue: number[] = []

    /**
                        [queue]     [reserveQueue]
        
        push(1)              1
        
        push(3)              3
                             1
                             
        push(5)              5
                             3
                             1 
                                            
        pop -> 5             
                            =>  shift     1
                            
                            =>  shift     3
                                          1
                                            
                                            
                            =>  shift, return 5
                            
                             1  shift  <=
                             
                             3  shift  <=
                             1
    */

    // visualization: to push, we dont need to do anything except push onto the end of the queue - this is because queues inherently have identical push behavior to stacks
    // but to pop, we can only use shift. that means we have to repeatedly shift until we reach the final index
    // since we are allowed two queues, the other queue must be what stores the shifted values we had to pass in order to reach the final index

    push(x: number): void {
        // while (this.reserveQueue.length) this.queue.push(this.reserveQueue.shift())
        
        this.queue.push(x)
    }

    pop(): number {
        // unshift the queue into the reserve queue until only one item remains
        while (this.queue.length > 1) this.reserveQueue.push(this.queue.shift()!)
        
        // now we can return that last-inserted item
        const top = this.queue.shift()!
        
        // restore the state of the main queue
        while (this.reserveQueue.length) this.queue.push(this.reserveQueue.shift()!)
        
        return top
    }

    top(): number {
        // unshift the queue into the reserve queue until only one item remains
        while (this.queue.length > 1) this.reserveQueue.push(this.queue.shift()!)
        
        // now we can return that last-inserted item
        const top = this.queue[0]
        
        // move the last item to the top of the reserve queue
        this.reserveQueue.push(this.queue.shift()!) 
        
        // and restore the state of the main queue
        while (this.reserveQueue.length) this.queue.push(this.reserveQueue.shift()!)
        
        return top
    }

    empty(): boolean {
        return this.queue.length === 0 && this.reserveQueue.length === 0
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */