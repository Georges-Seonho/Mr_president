export class Player {
    constructor(name) {
        this._name = name,
        this.budget = 100000,
        this.numOfTurn = 0,
        this.bestScore = 0
    }

    get name() { 
        return this._name; 
    }
}

