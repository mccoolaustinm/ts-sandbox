export async function study() {
    testBST()
}

function testBST() {
    const tree = new BinarySearchTree<number>()
    tree.insert(50)
    tree.insert(23)
    tree.insert(12)
    tree.insert(41)
    tree.insert(92)
    tree.insert(75)

    let _41 = tree.find(41)
    let _92 = tree.find(92)
    let _93 = tree.find(93)
    let n = new BinarySearchTree<number>().find(30)
    let bfs = tree.bfs()
    let dfs_preOrder = tree.dfs('pre')
    let dfs_inOrder = tree.dfs('in')
    let dfs_postOrder = tree.dfs('post')
    return
}

class TreeNode<Type> {
    constructor(
        public val: Type, 
        public left: TreeNode<Type>|null = null,
        public right: TreeNode<Type>|null = null
    ) {}
}

class BinarySearchTree<Type> {
    constructor(
        public root: TreeNode<Type>|null = null
    ) {}

    insert(value: Type) {
        const added = new TreeNode(value)
        if (!this.root) {
            this.root = added
            return true
        }

        let vertex = this.root
        while (true) {
            if (added.val === vertex.val) return false
            else if (added.val < vertex.val) {
                if (vertex.left) vertex = vertex.left
                else {
                    vertex.left = added
                    return true
                }
            } else if (added.val > vertex.val) {
                if (vertex.right) vertex = vertex.right
                else {
                    vertex.right = added
                    return true
                }
            }
        }
    }

    find(value: Type) {
        let vertex: TreeNode<Type>|null = this.root
        while(vertex && vertex.val !== value) {
            if (value < vertex.val) vertex = vertex.left
            else if (value > vertex.val) vertex = vertex.right
        }
        return vertex
    }

    bfs(): Type[] {
        if (!this.root) return []

        const visited: Type[] = []
        const queue: TreeNode<Type>[] = []
        queue.push(this.root)

        while(queue.length) {
            const vertex = queue.shift()!
            visited.push(vertex.val)

            if (vertex.left) queue.push(vertex.left)
            if (vertex.right) queue.push(vertex.right)
        }
        return visited
    }

    dfs(order: 'pre'|'post'|'in'): Type[] {
        if (!this.root) return []
        const visited: Type[] = []

        visit(this.root)

        function visit(vertex: TreeNode<Type>) {
            // the position of this push statement is all that differentiates pre- and post-order
            if (order === 'pre') visited.push(vertex.val)
            if (vertex.left) visit(vertex.left)
            if (order === 'in') visited.push(vertex.val)
            if (vertex.right) visit(vertex.right)
            if (order === 'post') visited.push(vertex.val) 
        }

        return visited
    }
}