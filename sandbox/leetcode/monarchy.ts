export async function study() {
    const mon = new Monarchy('Jake');
    mon.birth('Catherine', 'Jake');
    mon.birth('Tom', 'Jake');
    mon.birth('Celine', 'Jake');
    mon.birth('Peter', 'Celine');
    mon.birth('Jane', 'Catherine');
    mon.birth('Farah', 'Jane');
    mon.birth('Mark', 'Catherine');
    console.log(mon.getOrderOfSuccession());

    mon.death('Jake');
    mon.death('Jane');

    console.log(mon.getOrderOfSuccession());
    return
}

interface Royal {
    name: string
    children: Royal[]
    alive: boolean
}

class Monarchy {
    private monarch: Royal

    constructor(name: string) {
        this.monarch = this.newRoyal(name)
    }

    private newRoyal(name: string) {
        return {
            name: name,
            children: [],
            alive: true
        }
    }

    private getRoyal(name: string): Royal|undefined {
        const stack: Royal[] = []
        stack.push(this.monarch)
        while (stack.length > 0) {
            const royal = stack.pop()!
            if (royal.name === name) return royal
            else stack.push(...royal.children)
        }
        return undefined
    }

    birth(name: string, parentName: string): boolean {
        if (this.getRoyal(name) !== undefined) return false // cant re-use a name - this royal already exists
        const ancestor = this.getRoyal(parentName)
        if (ancestor === undefined) return false
        const descendent = this.newRoyal(name)
        ancestor.children.push(descendent)
        return true
    }

    death(name: string): boolean {
        const royal = this.getRoyal(name)
        if (royal === undefined) return false
        royal.alive = false
        return true
    }

    getOrderOfSuccession(): string[] {
        const order: string[] = []

        // succession order is the firstborn child of the firstborn child - essentially, the leftmost branch of the family tree is always prioritized
        function traverseFirstbornDFSOrder(royal: Royal) {
            if (royal.alive) order.push(royal.name)
            for (const child of royal.children) {
                traverseFirstbornDFSOrder(child)
            }
        }

        traverseFirstbornDFSOrder(this.monarch)

        return order
    }
}