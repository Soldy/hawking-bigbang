
exports.element = class {
    move() {
        this.position.x=this.position.x + this.vector.x;
        this.position.y=this.position.y + this.vector.y;
        

    }
    turn() {
        this.move();
    }
    constructor() {
        this.id = "";
        this.type = 0;
        this.generation = 0;
        this.position = {
            x: 0,
            y: 0
        };
        this.vector = {
            x: 0,
            y: 0
        };
    }
}




