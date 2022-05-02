export async function study() {

    // const result2 = trap([]) // 0
    // const result3 = trap([3]) // 0
    // const result6 = trap([3,2]) // 0
    const result0 = trap([3,2,3]) // 1
    const result4 = trap([3,4,3]) // 0
    const result1 = trap([0,1,0,2,1,0,3,1,0,1,2]) // 8
    const result5 = trap([4,2,0,3,2,5]) // 9
    return
}

function _trap(height: number[]): number {
    // brute force
    // lets try an n^2 depth calculation at each index by sending pointers out in both directions to locate the highest walls containing this index
    // the depth at this point will be the height of the lower of the highest two walls, minus the displacement of the wallHeight at this point

    let water = 0
    
    // only need to look at walls that are not at the edge of the graph/container
    // as walls at edge can not have water depth as it would drain out the sides of the graph
    // this also handles edge cases of array length 0...2 which all have guaranteed depth of 0
    for (let h = 1; h < height.length - 1; h++) {
        // define the current point as the floor of its own container
        const floor = height[h]
        let left = h - 1, right = h + 1

        // find the greatest relative heights to the left and right of this point
        // relative is the key - if the height is below the floor, then it doesnt serve as a container wall
        let maxLeft = 0, maxRight = 0

        // send left and right pointers out to edge of graph
        while (left >= 0) {
            // check the relative height at this point compared to the target, and record highest found
            const relativeHeight = height[left] - floor
            if (relativeHeight > maxLeft) maxLeft = relativeHeight
            left--
        }
        while (right < height.length) {
            const relativeHeight = height[right] - floor
            if (relativeHeight > maxRight) maxRight = relativeHeight
            right++
        }
        const depth = Math.min(maxLeft, maxRight) // container height determined by the lower of the two highest relative heights
        water += depth // add the depth of water at this point to the total

    }

    return water
}
// this solution is O(n^2) time and O(1) space. I don't see a way to trade space for time, so need to rethink the approach.

// if we started from left and right, imagining that there are no interior walls, the two outermost walls would determine the depth
// we would need to track the "water level" at any given point in order to subtract the water displacement of the walls themselves
// then we can add or subtract depth as we "discover" interior walls?
// either way, i think this can be done by closing a window similarly to the max water container problem

function trap(height: number[]): number {

    if (height.length < 3) return 0

    let totalVolume = 0
    let left = 0, right = height.length - 1

    let maxLeft = 0, maxRight = 0

    while (left < right) {
        // waterLevel = min(maxLeft,maxRight)
        // depth = waterLevel - floor
        // totalVolume = sum of depths

        const leftWall = height[left], rightWall = height[right]
        maxLeft = Math.max(leftWall, maxLeft), maxRight = Math.max(rightWall, maxRight)

        const waterLevel = Math.min(maxLeft,maxRight) 

        // we choose the smaller wall to increment on, and we choose to calculate the depth at this point
        // even though this wall could be enclosed on the opposite side by a higher wall, that would not increase the water level

        if (leftWall <= rightWall){ 
            // if we increment left forward, we already are certain what the maxLeft to its left is
            const depth = waterLevel - leftWall
            totalVolume += depth
            left++
        }
        else {
            // if we increment right forward, we already are certain what the maxRight to its right is
            const depth = waterLevel - rightWall
            totalVolume += depth
            right--
        }
    }


    return totalVolume
}