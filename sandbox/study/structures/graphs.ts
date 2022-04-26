import { PriorityQueue } from "./heap"

export async function study() {
    testGraph()
}

function testGraph() {
    // const graph = new Graph()
    const graph = new WeightedGraph()
    graph.addVertex('Baltimore')
    graph.addVertex('Ocean City')
    graph.addVertex('Annapolis')
    graph.addVertex('Washington')
    graph.addVertex('Chicago')
    graph.addVertex('Chattanooga')
    graph.addVertex('Shanghai')

    graph.addEdge('Baltimore', 'Annapolis', 1)
    graph.addEdge('Baltimore', 'Ocean City', 2)
    graph.addEdge('Baltimore', 'Washington', 3)
    graph.addEdge('Baltimore', 'Chicago', 9)
    graph.addEdge('Chicago', 'Chattanooga', 7)
    graph.addEdge('Annapolis', 'Washington', 2)
    graph.addEdge('Annapolis', 'Ocean City', 4)
    graph.addEdge('Washington', 'Chattanooga', 8)

    const path = graph.shortestPath('Ocean City', 'Chattanooga') // "Ocean City > Baltimore > Washington > Chattanooga"
    const impossiblePath = graph.shortestPath('Ocean City', 'Shanghai') // undefined

    // graph.removeEdge('Baltimore', 'Washington')
    // graph.removeVertex('Washington')

    // let dfs1 = graph.dfsRecursive('Baltimore')
    // let dfs2 = graph.dfsIterative('Baltimore')
    // let bfs = graph.bfs('Baltimore')
    return
}

interface WeightedEdges {
    [vertex: string]: {[vertex: string]: number}
}

// bad priority queue for dijkstras
// actually just going to make a proper one since i dont feel like i've mastered heaps yet
class BadPriorityQueue<Type> {
    values: {value: Type, priority: number}[]
    constructor(){}

    enqueue(value: Type, priority: number) {
        this.values.push({value, priority})
        this._sort()
    }

    dequeue() {
        return this.values.shift()
    }

    private _sort() {
        this.values.sort((a, b) => a.priority - b.priority)
    }
}

class WeightedGraph {
    edges: WeightedEdges = {}
    constructor() {}

    shortestPath(start: string, end: string): string|undefined {
        // the distances map will eventually store the minimum known total distance from the start vertex (0 for the start vertex itself)
        // it begins with all the unknown distances initialized to infinity (how to implement in other languages? need to try this in c++)
        const bestDistance: {[edge: string]: number} = {}

        // the bestPath map will, for every vertex, identify the vertex from which the shortest path was found from the starting vertex
        // not the same as closest neighbor, as the closest neighbor to a given vertex may actually be farther from the starting vertex
        // initializes as null, and starting vertex will always be null as it has no "prior" vertex to reach it from
        const bestPath: {[edge: string]: string|null} = {}

        // a little helper function for printing the best path to end stored in bestPath as a string
        function bestPathString() {
            if (!bestPath[end]) return undefined
            let pathString = ''
            let previous: string|null = end
            while (previous) {
                pathString = previous + pathString
                previous = bestPath[previous]
                if (previous) pathString = ' > ' + pathString
            }    
            return pathString
        }

        // prioritizes visiting nodes based on the minimum known total distance from the start vertex (0 for the start vertex itself)
        // it begins with all the priorities initialized to the unknown distance of infinity
        const pq = new PriorityQueue<string>()

        for (const vertex in this.edges){ 
            if (vertex === start) bestDistance[vertex] = 0
            else bestDistance[vertex] = Infinity
            bestPath[vertex] = null
            pq.enqueue({value: vertex, priority: bestDistance[vertex]})
        }
        // as the algorithm progresses, the distances and priorities will be updated from infinity
        // priority queue will begin with the starting node as it has been given priority 0

        while (pq.hasNext()) {
            const vertex = pq.dequeue()!.value
            if (vertex === end) return bestPathString() // exit point
            
            const vertex_DistanceFromStart = bestDistance[vertex]
            
            const edges = this.edges[vertex]
            for (const neighbor in edges) {
                const vertex_DistanceToNeighbor = edges[neighbor]
                const neighbor_DistanceFromStart = vertex_DistanceFromStart + vertex_DistanceToNeighbor

                if (neighbor_DistanceFromStart < bestDistance[neighbor]) {
                    bestDistance[neighbor] = neighbor_DistanceFromStart
                    bestPath[neighbor] = vertex

                    // this wont currently overwrite the already queued version of vertex
                    // but the new entry, with a shorter distance, will be visited first
                    // this doesnt break the algorithm
                    // but extra visits will be made that dont accomplish anything (because those visits wont have any new shortest paths)
                    // it just wastes time. to fix, enqueue() should have a unique flag option that overwrites existing queued tasks
                    pq.enqueue({value: neighbor, priority: bestDistance[neighbor]})
                }
            }
        }
    }

    addVertex(vertex: string) {
        if (this.edges[vertex]) return false
        this.edges[vertex] = {}
        return true
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        if (!this.edges[vertex1] || !this.edges[vertex2]) return false
        this.edges[vertex1][vertex2] = weight
        this.edges[vertex2][vertex1] = weight
        return true
    }

    removeEdge(vertex1: string, vertex2: string) {
        // doesnt test for existence
        delete this.edges[vertex1][vertex2]
        delete this.edges[vertex2][vertex1]
    }

    removeVertex(vertex: string) {
        for (const edge in this.edges[vertex]) this.removeEdge(vertex, edge)
        delete this.edges[vertex]
    }

}

interface Edges {
    [vertex: string]: string[]
}

class Graph {
    edges: Edges = {}
    constructor() {}

    // this seems really space heavy, like O(3n) space
    dfsRecursive(start: string): string[]|undefined {
        const results: string[] = []
        if (!this.hasVertex(start)) return undefined

        const visited: {[key: string]: true} = {}

        const traverse = (vertex: string) => {
            visited[vertex] = true
            results.push(vertex)
            this.edges[vertex].forEach(neighbor => {
                if (!visited[neighbor]) traverse(neighbor)
            })
        }
        traverse(start)
        return results
    }

    dfsIterative(start: string): string[]|undefined {
        const results: string[] = []
        if (!this.hasVertex(start)) return undefined
        const visited: {[key: string]: true} = {}

        const stack: string[] = []
        stack.push(start)
        while (stack.length > 0) {
            const vertex = stack.pop()!
            if (!visited[vertex]) {
                visited[vertex] = true
                results.push(vertex)
                this.edges[vertex].forEach(neighbor => {
                    stack.push(neighbor)
                })
            }
        }

        return results
    }

    bfs(start: string): string[]|undefined {
        const results: string[] = []
        if (!this.hasVertex(start)) return undefined

        const visited: {[key: string]: true} = {}
        visited[start] = true
        
        const queue: string[] = []
        queue.push(start)

        while(queue.length > 0) {
            const vertex = queue.shift()!
            results.push(vertex)
            this.edges[vertex].forEach(neighbor => {
                if(!visited[neighbor]) {
                    visited[neighbor] = true
                    queue.push(neighbor)
                }
            })
        }

        return results
    }

    hasVertex(vertex: string) {
        if (this.edges[vertex]) return true
        else return false
    }

    addVertex(vertex: string) {
        if (this.hasVertex(vertex)) return false
        this.edges[vertex] = []
        return true
    }

    hasEdge(vertex1: string, vertex2: string) {
        return this.edges[vertex1].includes(vertex2)
    }

    findEdges(vertex1: string, vertex2: string): [number,number] | undefined {
        let indices: [number,number] = [
            this.edges[vertex1].indexOf(vertex2),
            this.edges[vertex2].indexOf(vertex1)
        ]
        return indices[0] > -1 ? indices : undefined
    }

    addEdge(vertex1: string, vertex2: string) {
        if (!this.hasVertex(vertex1) || !this.hasVertex(vertex2)) return false
        if (this.hasEdge(vertex1, vertex2)) return false
        this.edges[vertex1].push(vertex2)
        this.edges[vertex2].push(vertex1)
    }

    removeEdge(vertex1: string, vertex2: string) {
        if (!this.hasVertex(vertex1) || !this.hasVertex(vertex2)) return false
        const edgeIndices = this.findEdges(vertex1, vertex2)
        if (!edgeIndices) return false
        if (edgeIndices[0] >= 0) this.edges[vertex1].splice(edgeIndices[0],1)
        if (edgeIndices[0] >= 0) this.edges[vertex2].splice(edgeIndices[1],1)
    }

    removeVertex(vertex: string) {
        if (!this.hasVertex(vertex)) return false
        this.edges[vertex].forEach(edge => {
            this.removeEdge(vertex, edge)
        })
        delete this.edges[vertex]
        return true
    }
}