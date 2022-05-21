export async function study() {
    const trie = new Trie()
    let result
    result = trie.insert('apple')
    result = trie.insert('app')
    result = trie.insert('aps')
    result = trie.startsWith('apple')
    result = trie.startsWith('app')
    result = trie.startsWith('apz')
    result = trie.search('appl')
    result = trie.search('apple')
    result = trie.search('apple')
    result = trie.search('apple')

}

// to speed it up, use a character key in a hash map for suffixes instead of an array
// that way we dont have to iterate up to 26 times to get the next node, just hash the char
// although, with such a small array i dont know for sure if hashing is actually faster
interface PrefixNode {
    char: string
    suffixes: PrefixNode[]
    isWord: boolean
}

class Trie {

    private root: PrefixNode = {char: '', suffixes: [], isWord: true}

    constructor() {}

    private getSubPrefix(prefix: string): {complete: boolean, length: number, node: PrefixNode} {
        let node = this.root
        let complete

        let c
        for (c = 0; c < prefix.length; c++) {
            const char = prefix[c]
            let exists = false
            for (const suffix of node.suffixes) {
                if (suffix.char === char){ 
                    exists = true
                    node = suffix
                }
            }
            if (!exists) break
        }

        if (c < prefix.length) complete = false
        else complete = true

        return {
            complete,
            length : c,
            node
        }
    }

    insert(word: string): void {
        // first get an object containing the last node for this prefix
        const subPrefix = this.getSubPrefix(word)
        // if this is both the full prefix and the prefix terminates as a word, return without inserting
        if (subPrefix.complete && subPrefix.node.isWord) return

        // if the prefix isnt complete, starting from the substring at length of the sub-prefix, and at the final node of the prefix, start inserting
        if (!subPrefix.complete) {
            const missing = word.substring(subPrefix.length)
            for (let c = 0; c < missing.length; c++) {
                const char = missing[c]
                const newNode = {char: char, suffixes: [], isWord: false}
                subPrefix.node.suffixes.push(newNode)
                subPrefix.node = newNode
                subPrefix.length++
            } // c should now equal word length and cause next loop to add the trailing suffix node
        }

        // and flag the final node in the now completed prefix as terminating a word
        subPrefix.node.isWord = true
    }

    startsWith(prefix: string): boolean {
        return this.getSubPrefix(prefix).complete
    }

    search(word: string): boolean {
        const subPrefix = this.getSubPrefix(word)
        return subPrefix.complete && subPrefix.node.isWord
    }

    
}