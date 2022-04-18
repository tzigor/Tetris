"use strict";
let game = {
    score: 0,
    new() {
        document.querySelector('table').remove();
        container.draw();
        this.score = 0;
        container.clear();
        nextBlock.clear();
        nextBlock.create();
        block.create();
        document.querySelector('.score').textContent = 'Score : 0';
        //let timerId = setInterval(block.shiftDown, config.timeInterval);
    },
};

container.draw();
nextBlock.draw();
game.new();

window.addEventListener('keydown', function (event) {
    action.move(event);
});

document.querySelector('nav').addEventListener('click', event => {
    if (event.target.classList.contains('btnNewGame')) {
        game.new();
    }
    if (event.target.classList.contains('size')) {
        console.log('frtryhhgg');

        //event.target.classList.toggle('sizeSelected');
    }
});