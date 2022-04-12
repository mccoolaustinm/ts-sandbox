export async function study() {
    let board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
    gameOfLife(board)
    return
}

// this solution is very messy and i need to revisit when im more familiar with algorithms
// i have no clue how you're supposed to modify everything "simultaneously" in place in O(1) space
// it must be simultaneous because elements interact with eachother and updating one first distorts the rest
// so my only solution was to do a pass over the matrix and update a new matrix with the next generation of values
// then reassign the old matrix to the new matrix
    // but then i ran into weird javascript rules about parameter reassignment and had to deep copy the next generation
    // which is an absolute waste of time but i didnt want to spend 2 hours learning about javascript idiosyncracies in order to submit a solution that otherwise already worked

// im pretty sure solution is O(n) time. it doesnt check every element * element, just up to 8 neighbors for every N, 
// so it certainly isnt n^2, it grows linearly with 8 checks per additional value. the grid size itself increases squared by nature of being a 2D grid, but thats not the fault of the solution

/**
 Do not return anything, modify board in-place instead.
 */
 function gameOfLife(board: number[][]): void {
    const m = board.length
    const n = board[0].length
    
    // build the matrix outline so we dont have to deal with it when inserting cell states later
    const next: number[][] = [...Array(m)].map(x => Array(n)) 

    function checkCell(r: number, c: number): number {
        if (r < 0 || c < 0) return 0
        else if (r >= m || c >= n) return 0
        else return board[r][c]
    }

    function countAliveNeighbors(r: number, c: number) {

        let alive = 0
        alive += checkCell(r - 1, c - 1)
        alive += checkCell(r - 1, c - 0)
        alive += checkCell(r - 1, c + 1)
        alive += checkCell(r - 0, c - 1)
                // cell is checkCell(r - 0, c - 0)
        alive += checkCell(r - 0, c + 1)
        alive += checkCell(r + 1, c - 1)
        alive += checkCell(r + 1, c - 0)
        alive += checkCell(r + 1, c + 1)
        return alive
    }

    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const neighborsAlive = countAliveNeighbors(r, c)
            if (neighborsAlive < 2 || neighborsAlive > 3) next[r][c] = 0
            else if (neighborsAlive === 3) next[r][c] = 1
            else if (cell === 1) next[r][c] = 1
            else next[r][c] = 0
        })
    })

    // im really not happy with this. i got stuck in implementation issues
    // and i have no idea why i cant just reassign the array board = next
    // but for some reason that doesnt work, maybe a javascript quirk with parameter reassignment that i dont understand
    for (const r in next) {
        for (const c in next[r]) {
            board[r][c] = next[r][c]
        }
    }
    return
};