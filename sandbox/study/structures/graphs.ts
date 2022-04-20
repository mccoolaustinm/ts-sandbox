export async function study() {
    testGraph()
}

function testGraph() {
    const graph = new Graph()
    graph.addVertex('Baltimore')
    graph.addVertex('Annapolis')
    graph.addVertex('Washington')
    graph.addVertex('Chattanooga')

    graph.addEdge('Baltimore', 'Annapolis')
    graph.addEdge('Baltimore', 'Washington')
    graph.addEdge('Annapolis', 'Washington')

    graph.removeEdge('Baltimore', 'Washington')
    graph.removeVertex('Washington')
    return
}

interface AdjacencyList {
    [key: string]: string[]
}

class Graph {
    edges: AdjacencyList = {}
    constructor() {}

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