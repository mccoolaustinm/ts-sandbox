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

    remove(value: Type): boolean {
        //!
        console.warn('bst.remove() not fully implemented, will error')
        if (!this.root) return false
        let vertex: TreeNode<Type>|null = this.root

        let parent: {
            vertex: TreeNode<Type>,
            childIsLeft?: true,
            childIsRight?: true
        }|null = null

        //? first find the vertex
        while (vertex && vertex.val !== value) {
            // start with the basic framework of finding the value
             
            if (value < vertex.val){ 
                vertex = vertex.left
                // but also reassign parent before choosing a child
                parent = {vertex: vertex!, childIsLeft: true}
            }
            else if (value > vertex.val){ 
                vertex = vertex.right
                parent = {vertex: vertex!, childIsRight: true}
            }
        }
        if (!vertex) return false // not found, not removed

        //? remove and reconnect children to parent

        if (!vertex.right) { // vertex has no right child, simplest scenario

            if (!parent){ // no parent, vertex is root, pass left (possibly null) child up to root
                this.root = vertex.left 
                return true
            }

            // connect left (possibly null) child to parent
            if (parent.childIsLeft) parent.vertex.left = vertex.left
            else if (parent.childIsRight) parent.vertex.right = vertex.left

        } else if (!vertex.right.left) { // vertex has a right child with no left child

            // reconnect vertex's left child to the vertex's right child 
            vertex.right.left = vertex.left

            if (!parent){ // no parent, vertex is root, pass right child up to root
                this.root = vertex.right 
                return true
            }

            // connect right child to parent
            if (parent.childIsLeft) parent.vertex.left = vertex.right
            else if (parent.childIsRight) parent.vertex.right = vertex.right

        } else { // vertex has a right child with a left child
            // todo: no idea
            throw new Error('i havent figured out how to do this yet!')
        }

        return true
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