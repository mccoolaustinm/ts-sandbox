export async function study() {
    testGraph()
}

function testGraph() {
    const graph = new Graph()
    graph.addVertex('Baltimore')
    graph.addVertex('Ocean City')
    graph.addVertex('Annapolis')
    graph.addVertex('Washington')
    graph.addVertex('Chattanooga')

    graph.addEdge('Baltimore', 'Annapolis')
    graph.addEdge('Baltimore', 'Ocean City')
    graph.addEdge('Baltimore', 'Washington')
    graph.addEdge('Annapolis', 'Washington')
    graph.addEdge('Washington', 'Chattanooga')

    // graph.removeEdge('Baltimore', 'Washington')
    // graph.removeVertex('Washington')

    let dfs1 = graph.dfsRecursive('Baltimore')
    let dfs2 = graph.dfsIterative('Baltimore')
    let bfs = graph.bfs('Baltimore')
    return
}

interface AdjacencyList {
    [key: string]: string[]
}

class Graph {
    edges: AdjacencyList = {}
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