

const element  = require('./element.js').element;


exports.univers = class {
    position(x, y) {
        return (x).toString() + "," + (y).toString();
    }
    horizonCalc() {
        this.horizon = this.mass / ((this.size.x * this.size.y) + 1) / (((this.size.x * this.size.y) / 2) + 1);
    }
    speed() {
        return Math.floor((Math.random() * this.horizon + 1) - (this.horizon / 2));
    }
    createMatter() {
        let type = Math.floor((Math.random() * 2));
        let generation = Math.floor((Math.random() * 2));
        this.createElement(generation, type);
        if (generation === 1)
            this.createElement(-1 * generation, type);
    }
    createElement(generation, type) {
        let id = this.matter.length;
        this.matter.push(new element());
        this.matter[id].type = type;
        this.matter[id].generation = generation;
        this.matter[id].position.x = Math.floor((Math.random() * this.size.x));
        this.matter[id].position.y = Math.floor((Math.random() * this.size.y));        
        this.matter[id].vector.x = this.speed();
        this.matter[id].vector.y = this.speed();
            if (typeof this.space[(this.matter[id].position.x).toString() + "," + (this.matter[id].position.y).toString()] === "undefined") {
                this.space[(this.matter[id].position.x).toString() + "," + (this.matter[id].position.y).toString()] = [];
                this.growing(this.matter[id].position.x, this.matter[id].position.y);
                delete this.matter[id];
            }         
    }
    newMatters() {
        this.horizonCalc();
        for (let i = 0; i < this.mass - this.matter.length; i++)
            this.createMatter();
    }
    antiMatterReaction(id) {
        let position = this.position(this.matter[id].position.x, this.matter[id].position.y);
        for (let e in this.space[position]) {
            if ((this.matter[this.space[position][e]].generation !== 0) && (this.matter[this.space[position][e]].generation === this.matter[id].generation * -1)) {
                delete this.matter[this.space[position][e]];
                this.space[position].splice(e, 1);
                delete this.matter[id];
                return;
            }
        }
        this.space[position].push(id);
    }
    growing(x, y) {
        if (this.size.min.x > x)
            this.size.min.x = x;
        if (this.size.min.y > y)
            this.size.min.y = y;
        if (this.size.max.x < x)
            this.size.max.x = x;
        if (this.size.max.y < y)
            this.size.max.y = y;
    }
    howBigTheUniverse() {
        this.size.x = (this.size.min.x * -1) + this.size.max.x;
        this.size.y = (this.size.min.y * -1) + this.size.max.y;
    }
    turn() {
        this.newMatters();
        for (let i in this.matter) {
            let pass = (this.matter[i].position.x).toString() + "," + (this.matter[i].position.y).toString();
            this.matter[i].turn();
            this.space[pass].splice(this.space[pass].indexOf(i), 1);
            if (typeof this.space[(this.matter[i].position.x).toString() + "," + (this.matter[i].position.y).toString()] === "undefined") {
                this.space[(this.matter[i].position.x).toString() + "," + (this.matter[i].position.y).toString()] = [];
                this.growing(this.matter[i].position.x, this.matter[i].position.y);
                delete this.matter[i];
            } else {
                this.antiMatterReaction(i);
            }
        }
        this.howBigTheUniverse();
        this.print();
    }
    print() {
        console.log('============================================================================');
        console.log('universum size x : ' + this.size.x.toString() + ' || y : ' + this.size.y.toString());
        console.log('universum mass : ' + this.matter.length.toString());
        console.log('universum max mass : ' + this.mass.toString());
        console.log('speed of horizon : ' + this.horizon);
        console.log('speed : ' + this.speed());
        console.log('============================================================================');
    }
    printMatter(id){
        console.log('============================================================================');
        console.log('id : ' + id);
        console.log('type : ' + this.matter[id].type);
        console.log('generation : ' + this.matter[id].generation);          
        console.log('position x : ' + this.matter[id].position.x);
        console.log('position y : ' + this.matter[id].position.y);
        console.log('vector x : ' + this.matter[id].vector.x);
        console.log('vector y : ' + this.matter[id].vector.y);   
        console.log('============================================================================');
    }
    constructor() {
        this.id = "";
        this.mass = 300;
        this.horizon = 0;
        this.matter = [];
        this.created = {
            element: 0,
          
        }
        this.size = {
            x: 1,
            y: 1,
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: 0,
                y: 0
            }
        };
        this.space = {}
    }
}