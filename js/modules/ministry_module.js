export class Ministry {
    constructor(name, icon) {
    this.happiness = 10,
    this.name = name,
    this.icon = icon
    }

    setARevolt() {
        let loss = Math.floor(Math.random()*3)
        this.happiness -= loss;
        console.log(`A scandal was brought to the public! The ministry ${this.name} as lost ${loss} points of happiness.`);
    }
}

