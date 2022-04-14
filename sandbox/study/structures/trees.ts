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
}

