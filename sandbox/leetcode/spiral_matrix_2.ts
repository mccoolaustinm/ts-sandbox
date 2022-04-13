export async function study() {
    let x = generateMatrix(3)
    return
}


// adding the values here will be trivial, we are just incrementing from 1 to n^2
// the challenge i think is to navigate to the cell
// my first impression is to simulate the spiral for an O(n) solution accessing each cell once
// but as with all of these im left wondering if there is a way to instantly derive the location of a value from a mathmatical relationship
function generateMatrix(n: number): number[][] {
    // matrix will be n x n because it contains n^2 values, lets start by just framing the matrix structure
    const matrix = [...Array(n)].map(x => Array(n))

    // borrowed this helper function from the game of life problem
    function checkCellIsAvailable(r: number, c: number): number {
        if (r < 0 || c < 0) return 0
        else if (r >= n || c >= n) return 0
        else return matrix[r][c] ? 0 : 1
    }
    const min = 1, max = Math.pow(n,2)
    let row = 0, col = 0, currentDirection: 'right'|'down'|'left'|'up' = 'right'
    matrix[row][col] = min
    // start with 1 already entered and m = 2 so first move is right into [0][1] to simplify the loop and have one less logic iteration
    for (let m = min + 1; m <= max; m++){

        // each cell will either have 1 or 2 empty neighbors in a "+" configuration (not counting corners)
        // if the cell has 2 empty neighbors, it can keep going in the direction the spiral has been moving in
        // if it only has 1, it must "turn" into that empty neighbor, and record the new direction it has moved in
        // this way we dont need to check a long list of possibilities - just which direction is available to turn in
            // 1. can i keep moving in the same direction ive been moving in?
                // true - increment in same direction
                // false - increment in direction of only empty neighbor

        let right = checkCellIsAvailable(row, col + 1)
        let down = checkCellIsAvailable(row + 1, col)
        let left = checkCellIsAvailable(row, col - 1)
        let up = checkCellIsAvailable(row - 1, col)
        let possibilities = right + down + left + up

        if (right && (currentDirection === 'right' || possibilities === 1)) { 
            currentDirection = 'right' // store new direction for next iteration
            col++
        } else if (down && (currentDirection === 'down' || possibilities === 1)) { 
            currentDirection = 'down' // store new direction for next iteration
            row++
        } else if (left && (currentDirection === 'left' || possibilities === 1)) { 
            currentDirection = 'left' // store new direction for next iteration
            col--
        } else if (up && (currentDirection === 'up' || possibilities === 1)) { 
            currentDirection = 'up' // store new direction for next iteration
            row--
        }

        matrix[row][col] = m
    }

    return matrix
};