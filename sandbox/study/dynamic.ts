export async function study() {
    // let f45 = fibonacci(45)
    let fm45 = fibonacciMemoized(100)
    let ft45 = fibonacciTabulated(100)
    let fb45 = bestFib(100)
    return
}

function fibonacci(n: number): number {
    if (n > 45) throw new Error(`fibonacci series for n above 45 requires several billion recursive calls`)
    const count: {[key: number]: number} = {}

    const timerStart = new Date()
    function fib(n: number): number {
        if (count[n]) count[n]++
        else count[n] = 1

        if (n === 2 || n === 1) return 1
        else return fib(n-1) + fib(n-2)
    }
    
    const result = fib(n)
    console.log((new Date()).getTime() - (timerStart).getTime())
    console.log(count) // fib(30) requires 514229 calls to fib(2)
    return result
}

// O(n) time and O(n) space but can overflow call stack
function fibonacciMemoized(n: number) {
    if (n > 8000) throw new Error(`fibonacci series memoized overflows the call stack for n over 8000`)
    const memo = [1,1]
    const count: {[key: number]: number} = {}

    const timerStart = new Date()
    function fib(n: number): number {

        if (count[n]) count[n]++
        else count[n] = 1

        if (memo.length >= n) return memo[n-1]
        else {
            memo[n-1] = fib(n-1) + fib(n-2)
            return memo[n-1]
        }
    }

    const result = fib(n)
    console.log((new Date()).getTime() - (timerStart).getTime())
    console.log(count)
    return result
}

// O(n) time and O(n) space
function fibonacciTabulated(n: number) {
    const tab = [0,1]
    
    for (let t = 2; t <= n; t++) {
        tab.push(tab[t-1] + tab[t-2])
    }

    return tab[n]

}

// O(n) time and O(1) space
function bestFib(n: number) {
    if (n < 1) return 0
    
    let t_minus_2 = 0, t_minus_1 = 1
    
    for (let t = 2; t <=n; t++) {
        let fib_t = t_minus_1 + t_minus_2
        t_minus_2 = t_minus_1
        t_minus_1 = fib_t
    }

    return t_minus_1
}