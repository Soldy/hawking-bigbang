



const univers = require('./universe.js').univers;

exports.everyThing = class {
    createMatter() {

    }
    bigBang() {
        let id = this.agentVoid.length;
        this.agentVoid.push(new univers());
        this.agentVoid[id].mass = Math.floor((Math.random() * 300) + 1);
        console.log('And a universe just born');
    }
    turn() {
        for (let i in this.agentVoid) {
            this.agentVoid[i].turn();
        }
        var that = this;
        setTimeout(() => {
            that.turn();
        }, 1000);
    }
    constructor() {

        this.agentVoid = [];
        console.log('nothing');
        console.log('No space, no time....');
        this.turn();
    }
}

