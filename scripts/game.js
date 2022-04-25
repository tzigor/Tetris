"use strict";

let game = {
    score: 0,  // очки за игру
    timerId: 0,
    active: false,

    /**
     * Запускает новую игру
     */
    new() {
        container.draw();
        container.clear();
        this.score = 0;
        nextBlock.clear();
        nextBlock.create();
        block.create();
        this.score = 0;
        config.level = 0;
        config.prevLevel = 0;
        config.timeInterval = 1000;
        document.querySelector('.score').textContent = 'Score : 0';
        document.querySelector('.level').textContent = 'Level : 0';
        document.querySelector('.sizeSelector').classList.add('hide');
        document.querySelector('.nextBlock').classList.remove('hide');
        document.querySelector('.info').classList.remove('hide');
        document.querySelector('.lowerNav').classList.remove('hide');
        game.timerId = setInterval(block.shiftDown, config.timeInterval);
        newBtnEl.textContent = 'New Game';
        game.active = true;
    },

    stop() {
        clearInterval(game.timerId);
        document.querySelector('.info').classList.add('hide');
        document.querySelector('.lowerNav').classList.add('hide');
        document.querySelector('.sizeSelector').classList.remove('hide');
        document.querySelector('.nextBlock').classList.add('hide');
        document.querySelector('table').remove();
        newBtnEl.textContent = 'Start';
        game.active = false;
    }
};

// Инициация при открытии страницы с игрой

nextBlock.draw();
nextBlock.clear();

const btnPauseEl = document.querySelector('.btnPause');
const btnGridEl = document.querySelector('.btnGrid');
const pauseEl = document.querySelector('.pause');
const tableEl = document.querySelector('tab');
const largeBtn = document.querySelector('.large');
const mediumBtn = document.querySelector('.medium');
const smallBtn = document.querySelector('.small');
const newBtnEl = document.querySelector('.btnNewGame');

// обработка нажатий клавиш управления
window.addEventListener('keydown', (event) => action.move(event));

// запускает новую игру при нажатии кнопки "New Game"
newBtnEl.addEventListener('click', () => {
    if (game.active) game.stop();
    else game.new();
});

// обрабатывает нажатие кнопки темы (светлая/тёмная)
btnGridEl.addEventListener('click', () => {
    if (btnGridEl.classList.contains('tableDark')) {
        btnGridEl.classList.remove('tableDark');
        config.theme = 'blockLight';
    } else {
        btnGridEl.classList.add('tableDark');
        config.theme = 'blockDark';
    };
    container.drawArray();
});

// обрабатывает нажатие кнопки "Pause"
btnPauseEl.addEventListener('click', event => {
    clearInterval(game.timerId);
    pauseEl.classList.remove('hide');
    event.stopPropagation();
    window.addEventListener('click', () => {
        if (!pauseEl.classList.contains('hide')) {
            pauseEl.classList.add('hide');
            game.timerId = setInterval(block.shiftDown, config.timeInterval);
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
        switch (event.target.dataset.size) {
            case '20x10':
                config.rowsCount = 20;
                config.colsCount = 10;
                break;
            case '25x15':
                config.rowsCount = 25;
                config.colsCount = 15;
                break;
            case '30x20':
                config.rowsCount = 30;
                config.colsCount = 20;
                break;
        }
    }
    // размер ячеек в контейнере
    largeBtn.classList.remove('checkedSize');
    mediumBtn.classList.remove('checkedSize');
    smallBtn.classList.remove('checkedSize');
    if (event.target.classList.contains('large') ||
        event.target.classList.contains('largeImg')) {
        config.cellSize = "tdSizeL";
    } else if (event.target.classList.contains('medium') ||
        event.target.classList.contains('mediumImg')) {
        config.cellSize = "tdSizeM";
    } else if (event.target.classList.contains('small') ||
        event.target.classList.contains('smallImg')) {
        config.cellSize = "tdSizeS";
    }
    if (config.cellSize === "tdSizeL") largeBtn.classList.add('checkedSize');
    if (config.cellSize === "tdSizeM") mediumBtn.classList.add('checkedSize');
    if (config.cellSize === "tdSizeS") smallBtn.classList.add('checkedSize');

    // после изменений перерисовываем игровой контейнер
    if (game.active) container.drawArray();
});