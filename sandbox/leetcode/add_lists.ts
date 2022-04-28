export async function study() {
    // let l1 = new ListNode(2, new ListNode(4, new ListNode(3))) // 342
    // let l2 = new ListNode(5, new ListNode(6, new ListNode(4))) // 465
    // let result1 = addTwoNumbers(l1, l2) // should return 807 as linked list 7 > 0 > 8

    // let l3 = new ListNode(0) // 0
    // let l4 = new ListNode(0) // 0
    // let result2 = addTwoNumbers(l3, l4) // should return 0

    let l5 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))) // 999999
    let l6 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))) // 9999
    let result3 = addTwoNumbers(l5, l6) // should return 1009998 in list 8 > 9 > 9 > 9 > 0 > 0 > 1

    return

}

 class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const root = new ListNode(0)
    let n1 = l1
    let n2 = l2
    let r = root
    while (n1 || n2 || r.val > 9) {
        
        let sum = (n1 ? n1.val : 0) + (n2 ? n2.val : 0) + r.val
        r.val = sum % 10
        r.next = new ListNode(Math.floor(sum / 10))
        
        n1 = n1 ? n1.next : null
        n2 = n2 ? n2.next : null

        // get rid of leading zero on result
        if (!n1 && !n2 && r.next.val === 0) r.next = null
        else r = r.next // or advance r for next loop
    }
    
    return root
};