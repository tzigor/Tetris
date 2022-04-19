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

window.addEventListener('keydown', (event) => action.move(event));
const buttonGridEl = document.querySelector('.btnGrid');
buttonGridEl.addEventListener('click', () => {
    if (buttonGridEl.classList.contains('tableDark')) {
        buttonGridEl.classList.remove('tableDark');
        config.theme = 'blockLight';
    } else {
        buttonGridEl.classList.add('tableDark');
        config.theme = 'blockDark';
    }
});
document.getElementById('arrowUp').addEventListener('click', () => block.rotate());
document.getElementById('arrowDown').addEventListener('click', () => {
    block.shiftDown();
    game.score++;
    document.querySelector('.score').textContent = 'Score : ' + game.score;
});
document.getElementById('arrowLeft').addEventListener('click', () => block.shiftLeft());
document.getElementById('arrowRight').addEventListener('click', () => block.shiftRight());
document.getElementById('space').addEventListener('click', () => {
    game.score += config.rowsCount - block.row;
    block.dropDown();
    document.querySelector('.score').textContent = 'Score : ' + game.score;
});

document.querySelector('nav').addEventListener('click', event => {
    if (event.target.classList.contains('btnNewGame')) {
        game.new();
    }
    if (event.target.classList.contains('bordSize')) {
        document.querySelectorAll('.bordSize').
            forEach(item => item.classList.remove('sizeSelected'));
        event.target.classList.toggle('sizeSelected');
        switch (event.target.textContent) {
            case '20 x 10':
                config.rowsCount = 20;
                config.colsCount = 10;
                break;
            case '25 x 15':
                config.rowsCount = 25;
                config.colsCount = 15;
                break;
            case '30 x 20':
                config.rowsCount = 30;
                config.colsCount = 20;
                break;
        }
    }
    if (event.target.classList.contains('cellSize')) {
        document.querySelectorAll('.cellSize').
            forEach(item => item.classList.remove('cellSelected'));
        event.target.classList.toggle('cellSelected');
        if (event.target.textContent.includes("L")) {
            config.cellSize = "tdSizeL";
        } else if (event.target.textContent.includes("M")) {
            config.cellSize = "tdSizeM";
        } else if (event.target.textContent.includes("S")) {
            config.cellSize = "tdSizeS";
        }

    }
    if (event.target.classList.contains('large')) {
        document.querySelectorAll('.cellSize').
            forEach(item => item.classList.remove('cellSelected'));
        document.getElementById('L').classList.toggle('cellSelected');
        config.cellSize = "tdSizeL";
    }
    if (event.target.classList.contains('medium')) {
        document.querySelectorAll('.cellSize').
            forEach(item => item.classList.remove('cellSelected'));
        document.getElementById('M').classList.toggle('cellSelected');
        config.cellSize = "tdSizeM";
    }
    if (event.target.classList.contains('small')) {
        document.querySelectorAll('.cellSize').
            forEach(item => item.classList.remove('cellSelected'));
        document.getElementById('S').classList.toggle('cellSelected');
        config.cellSize = "tdSizeS";
    }
});