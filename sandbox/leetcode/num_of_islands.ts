export async function study() {
    const i1 = numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]) // 1
    const i2 = numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]) // 3
    const i3 = numIslands([["0","1","0"],["1","0","1"],["0","1","0"]]) // 4
    return
}

function numIslands(grid: string[][]): number {
    const visited = Array(grid.length).fill(undefined).map(() =>Array(grid[0].length).fill(false))
    let islands = 0
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            // iterate left-right top-down 
            // if we haven't visited
            
            if (!visited[row][col] && grid[row][col] === "1") {
                // we know this hasnt been visited, so it represents a new island
                islands++
                // now we need to expand out from this point until we reach the boundaries of this island
                // this will mark every point on the island visited
                // preventing that point from being visited or counted as part of an island again
                exploreIsland(row, col)
            } 
        }
    }
    
    function exploreIsland(row: number, col: number) {
        // break out if we dont need to explore this point
        if (row < 0 || row > grid.length - 1) return // if row is out of bounds (treated as water)
        else if (col < 0 || col > grid[0].length - 1) return // if col is out of bounds (treated as water)
        else if (grid[row][col] === "0") return // dont explore water
        else if (visited[row][col]) return // dont re-explore already explored point
        
        visited[row][col] = true // mark visited, so future exploration will break out early when returning here
        
        exploreIsland(row - 1, col + 0) // up
        exploreIsland(row + 0, col + 1) // right
        exploreIsland(row + 1, col + 0) // down
        exploreIsland(row + 0, col - 1) // left
    }
    
    return islands
};