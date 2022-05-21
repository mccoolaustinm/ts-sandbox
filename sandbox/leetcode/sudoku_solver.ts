export async function study() {
    let board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
    solveSudoku(board)
    return

}

/**
 Do not return anything, modify board in-place instead.
 */
 function solveSudoku(board: string[][]) {
    
    const given = JSON.parse(JSON.stringify(board)) // cheap deep copy of provided board
    const blocks: {[key: number]: [number,number][]} = {}

    function inRow(num: string, row: number) {
        // iterate col, row stays constant
        for (const col in board[row]) {
            if (board[row][col] === num) 
                return true
            
        }
        return false
    }

    function inCol(num: string, col: number) {
        // iterate row, col stays constant
        for (const row in board) {
            if (board[row][col] === num) 
                return true
            
        }
        return false
    }
    
    // precompute the positions in each block, just to simplify inBlock() code
    ;(function buildBlocks() {
        for (let b = 0; b < 9; b++) {
            blocks[b] = []
            const minR = Math.floor((b) / 3) * 3
            const minC = ((b) % 3) * 3
                
            for (let r = minR; r < minR + 3; r++) {
                for (let c = minC; c < minC + 3; c++) {
                    blocks[b].push([r,c])
                }
            }
        }   
    })()
    
    function inBlock(num: string, row: number, col: number) {
        // first, figure out the bounds of this block based on provided cell (row and col)
        const rowGroup = Math.floor(row  / 3) * 3 // 0, 3, 6
        const colGroup = Math.floor(col / 3) // 0 to 2
        const blockID = rowGroup + colGroup
        const block = blocks[blockID]
        for (const pos of block) {
            if (board[pos[0]][pos[1]] === num) 
                return true
        }
        return false
    }
    
    function valid(solution: string, row: number, col: number) {
        return !inRow(solution, row) && !inCol(solution, col) && !inBlock(solution, row, col)
    }

    function solve(row: number, col: number): boolean {
        // made it to end of board, this board is valid, pass true all the way up the recursive stack
        if (row === 9) 
            return true 
        
        const nextRow = col === 8 ? row + 1 : row
        const nextCol = col === 8 ? 0 : col + 1

        // solution was provided in the given board, so skip to next cell
        if (given[row][col] !== '.') 
            return solve(nextRow, nextCol) 
        
        for (let s = 1; s <= 9; s++) {
            
            const solution = s.toString()
            if (valid(solution, row, col)) {
                // if the solution isnt immediately known to be invalid
                board[row][col] = solution // try placing that solution in the board
                // and try solving the next cell
                if (solve(nextRow, nextCol)) {
                    // this is also the final base case
                    // it can only be possible if solve made it to the only base case that returns true
                    // which is making it beyond position 8,8 (outside the board) with everything still being valid
                    return true 
                } else board[row][col] = '.'
            }
        }
        
        return false // none of the solves worked, so return false - something higher up the recursive stack is incorrect
    }
    
    solve(0,0)

    return
};