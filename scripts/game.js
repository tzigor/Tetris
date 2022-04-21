"use strict";

let game = {
    score: 0,  // очки за игру
    timerId: 0,

    /**
     * Запускает новую игру
     */
    new() {
        document.querySelector('table').remove();
        container.draw();
        this.score = 0;
        container.clear();
        nextBlock.clear();
        nextBlock.create();
        block.create();
        this.score = 0;
        config.level = 0;
        config.prevLevel = 0;
        document.querySelector('.score').textContent = 'Score : 0';
        document.querySelector('.level').textContent = 'Level : 0';
        btnPauseEl.textContent = "Pause";
        game.timerId = setInterval(block.shiftDown, config.timeInterval);
    },
};

// Инициация при открытии страницы с игрой
container.draw();
nextBlock.draw();
container.clear();
nextBlock.clear();

const btnPauseEl = document.querySelector('.btnPause');
const btnGridEl = document.querySelector('.btnGrid');
const pauseEl = document.querySelector('.pause');

// запускает новую игру при нажатии кнопки "New Game"
document.querySelector('.btnNewGame').addEventListener('click', () => {
    clearInterval(game.timerId);
    game.new();
});

// обрабатывает нажатие кнопки темы (светлая/тёмная)
btnGridEl.addEventListener('click', () => {
    if (btnGridEl.classList.contains('tableDark')) {
        btnGridEl.classList.remove('tableDark');
        config.theme = 'blockLight';
    } else {
        btnGridEl.classList.add('tableDark');
        config.theme = 'blockDark';
    }
});

// обрабатывает нажатие кнопки "Pause"
btnPauseEl.addEventListener('click', event => {
    console.log(game.timerId);
    clearInterval(game.timerId);
    pauseEl.classList.remove('hide');
    event.stopPropagation();
    window.addEventListener('click', () => {
        if (!pauseEl.classList.contains('hide')) {
            pauseEl.classList.add('hide');
            game.timerId = setInterval(block.shiftDown, config.timeInterval);
            console.log(game.timerId);
        }
    });
});

// обработка кнопок управления движением блока
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

// обработка другимих элементов управления 
document.querySelector('nav').addEventListener('click', event => {

    // размер контейнера для игры
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

    // размер ячеек в контейнере
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