export async function study() {
    let f5 = fibonacci(45)
    let ff5 = fastFibonacci(45)
    return
}

function fibonacci(n: number): number {
    if (n > 45) throw new Error(`fibonacci series for n above 45 requires several billion recursive calls`)
    let count: {[key: number]: number} = {}

    const timerStart = new Date()
    function fib(n: number): number {
        if (count[n]) count[n]++
        else count[n] = 1

        if (n === 2 || n === 1) return 1
        else return fib(n-1) + fib(n-2)
    }
    
    let result = fib(n)
    console.log((new Date()).getTime() - (timerStart).getTime())
    console.log(count) // fib(30) requires 514229 calls to fib(2)
    return result
}

function fastFibonacci(n: number) {
    let memo = [1,1]
    let count: {[key: number]: number} = {}

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

    let result = fib(n)
    console.log((new Date()).getTime() - (timerStart).getTime())
    console.log(count)
    return result
}