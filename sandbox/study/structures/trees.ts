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

        if (!vertex.right) { //? vertex has no right child, simplest scenario

            if (!parent){ // no parent, vertex is root, pass left (possibly null) child up to root
                this.root = vertex.left 
                return true
            }

            // connect left (possibly null) child to parent
            if (parent.childIsLeft) parent.vertex.left = vertex.left
            else if (parent.childIsRight) parent.vertex.right = vertex.left

        } else if (!vertex.right.left) { //? vertex has a right child with no left child

            // reconnect vertex's left child to the vertex's right child 
            vertex.right.left = vertex.left

            if (!parent){ // no parent, vertex is root, pass right child up to root
                this.root = vertex.right 
                return true
            }

            // connect right child to parent
            if (parent.childIsLeft) parent.vertex.left = vertex.right
            else if (parent.childIsRight) parent.vertex.right = vertex.right

        } else { //? vertex has a right child with a left child

            // if the vertex has a deep right subtree, then we need to find the best candidate to replace the vertex from its right tree
            // now, we know that every item in a right subtree is larger than the vertex
            // and every item that is left of the vertex is smaller
            // so the smallest item in the right subtree is larger than the largest item of the left subtree
            // if we find the smallest item in the right subtree, that item can replace the vertex
                // it will be the *leftmost* descendent of the right subtree
            // we will need to locate the leftmost right-descendent and substitute it for the vertex

            // need to find the right child's leftmost descendent (and its parent, for the sake of moving it)
            let leftmostParent = vertex.right 
            let leftmostDescendent = vertex.right.left // traverse the right child's left subtree
            while (leftmostDescendent.left) { // while we can go further left
                leftmostParent = leftmostDescendent
                leftmostDescendent = leftmostParent.left!
            }

            // move leftmost's right subtree up to leftmost's parent's left (where leftmost itself previously was)
            // by nature of BST ordering, everything in leftmost's right subtree can still fit as its parent's left subtree
            leftmostParent.left = leftmostDescendent.right
            // we went as far left as we could to find leftmost, so by definition leftmost's "left" is empty and nothing needs to be moved
            leftmostDescendent.left = vertex.left 
            // and leftmost's right was given up to its parent
            // now that the leftmost has been removed from the vertex's right subtree, we can be sure that
                // since the leftmost is the smallest item in the right subtree
                // everything else in the vertex's right subtree is *larger* than the leftmost and can be valid as its right tree
            // and since the leftmost was previously in the vertex's right subtree, we can be sure that
                // everything in the vertex's left subtree is *smaller* than the leftmost and can be valid as its left tree
            // thus leftmost is valid to replace the vertex we want to remove
            leftmostDescendent.right = vertex.right 

            if (!parent){ // no parent, vertex is root, so the leftmost that replaced it will also be its root
                this.root = leftmostDescendent
                return true
            }

            // connect right child to parent
            if (parent.childIsLeft) parent.vertex.left = leftmostDescendent
            else if (parent.childIsRight) parent.vertex.right = leftmostDescendent
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