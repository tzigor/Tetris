"use strict";
let game = {
    score: 0,
    new() {
        this.score = 0;
        container.clear();
        nextBlock.clear();
        nextBlock.create();
        block.create();
        //let timerId = setInterval(block.shiftDown, config.timeInterval);
    },
};

container.draw();
nextBlock.draw();
game.new();
window.addEventListener('keydown', function (event) {
    action.move(event);
});