"use strict";

let block = {
    row: 0, // текущее положение блока в игровом массиве (левый верхний угол)
    col: 0, //
    size: 3, // размер блока
    type: 4, // тип блока
    tempArray: [ // временный массив хранит блок, пока производятся вычисления
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],

    /**
     * Возвращает ячейку текущего блока с проверкой на доступные границы
     * @param {row: number, col: number} позиция ячейки в блоке
     * @returns {number} Содержимое контейнера, либо 255, если row или col
     * выходят за доступные границы
     */
    getCell(row, col) {
        return container.getCell(row + this.row, col + this.col);
    },

    /**
     * Заносит содержимое ячейки массива контейнера с проверкой на доступные границы
     * @param {row: number, col: number} позиция ячейки в блоке
     * @param {t: number} тип блока
     */
    setCell(row, col, t) {
        container.setCell(row + this.row, col + this.col, t);
    },

    /**
     * Чистит временный массив
     */
    clearTempArray() {
        this.tempArray.forEach(element => element.fill(0));
    },

    /**
     * Чистит текущий блок в контейнере
     */
    clearCurrent() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tempArray[i][j] === this.type) {
                    this.setCell(i, j, 0);
                    container.drawSquare(i + this.row, j + this.col, 0);
                }
            }
        }
    },

    /**
     * Копирует текущий блок во временный массив
     */
    copyToTempArray() {
        this.clearTempArray();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if ((i + this.row) < config.rowsCount
                    && this.getCell(i, j) === this.type) {
                    this.tempArray[i][j] = this.getCell(i, j);
                }
            }
        }
    },

    /**
     * Возвращает блок из временного массива в игровой массив
     */
    getFromTempArray() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tempArray[i][j] === this.type) {
                    this.setCell(i, j, this.tempArray[i][j]);
                    container.drawSquare(i + this.row, j + this.col, this.type);
                }
            }
        }
    },

    /**
     * Рисует текущий блок в контейнере
     */
    draw() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.getCell(i, j) === this.type) {
                    container.drawSquare(i + this.row, j + this.col, this.type);
                }
            }
        }
    },

    /**
     * Копирует текущий блок во временный массив, удаляет текущий блок из
     * контейнера, меняет позицию блока в контейнере, и возвращает туда блок
     * @param {newRow: number, newCol: number} новая позиция блока в контаре
     */
    moveAction(newRow, newCol) {
        this.copyToTempArray();
        this.clearCurrent();
        this.row = newRow;
        this.col = newCol;
        this.getFromTempArray();
    },

    /**
     * Сдвигает блок вправо
     */
    shiftRight() {
        let free = true;
        // Проверяем, есть ли препятствие справа
        for (let i = 0; i < this.size; i++) {
            let j = 0;
            // ищем кирпичик блока в ряду i слева направо
            while (this.getCell(i, j) !== this.type && j < this.size) {
                j++;
            }
            if (j < this.size) {
                // ищем границу блока в ряду i
                while (this.getCell(i, j) === this.type) {
                    j++;
                }
                // если справа от блока есть препятствие (не ноль), то не free
                if (this.getCell(i, j) !== 0) {
                    free = false;
                    i = this.size;
                }
            }
        }
        if (free) this.moveAction(this.row, this.col + 1);
    },

    /**
     * Сдвигает блок влево
     */
    shiftLeft() {
        let free = true;
        // Проверяем, есть ли препятствие слева
        for (let i = 0; i < this.size; i++) {
            let j = this.size - 1;
            // ищем кирпичик блока в ряду i справа налево
            while (this.getCell(i, j) !== this.type && j > 0) {
                j--;
            }
            if (j > 0) {
                // ищем границу блока в ряду i
                while (this.getCell(i, j) === this.type) {
                    j--;
                }
                // если слева от блока есть препятствие (не ноль), то не free
                if (this.getCell(i, j) !== 0) {
                    free = false;
                    i = this.size;
                }
            }
        }
        if (free) this.moveAction(this.row, this.col - 1);
    },

    /**
     * Сдвигает блок вниз
     * Так же генерит новый блок при достижении дна предыдущего
     * Так же отслеживает "событие" конца игры при отсутствии
     * свободного места для нового блока
     * @returns {boolean} true, если блок достиг дна
     */
    shiftDown() {
        // при наборе 1000 очков повышаем уровень (ускоряем падение)
        config.level = Math.trunc(game.score / 3000);
        if (config.level !== config.prevLevel) {
            if (config.level < 5) config.timeInterval = 1000 - 200 * config.level;
            clearInterval(game.timerId);
            game.timerId = setInterval(this.shiftDown, config.timeInterval);
            document.querySelector('.level').textContent = 'Level : ' + config.level;
        }
        config.prevLevel = config.level;

        let free = true;
        let spaceEnough = true;
        // Проверяем, есть ли препятствие снизу
        for (let j = 0; j < this.size; j++) {
            let i = 0;
            // ищем кирпичик блока в столбце j сверху вниз 
            while (this.getCell(i, j) !== this.type && i < this.size) {
                i++;
            }
            if (i < this.size) {
                // ищем границу блока в столбце j
                while (this.getCell(i, j) === this.type) {
                    i++;
                }
                // если снизу от блока есть препятствие (не ноль), то не free
                if (this.getCell(i, j) !== 0) {
                    free = false;
                    j = this.size;
                }
            }
        }
        if (free) {
            this.moveAction(this.row + 1, this.col);
            return false;
        } else {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.getCell(i, j) === this.type) {
                        this.setCell(i, j, this.type + 100);
                    }
                }
            }
            container.clearBottom();
            // проверяем, есть ли место для создания блока
            for (let j = 0; j < nextBlock.size; j++) {
                if (container.getCell(1,
                    (Math.trunc(config.colsCount / 2) - nextBlock.size + 2) + j) !== 0) spaceEnough = false;
            }
            if (spaceEnough) {
                this.create();
                nextBlock.create();
            } else {
                // свободного места нет, Game Over
                clearInterval(game.timerId);
                const gameOverEl = document.querySelector('.gameOver');
                gameOverEl.classList.remove('hide');
                game.stop();
                window.addEventListener('click', () => gameOverEl.classList.add('hide'));
            }
            return true;
        }
    },

    /**
     * Роняет блок на дно
     */
    dropDown() {
        while (!this.shiftDown()) { }
    },

    /**
     * Вращает блок по часовой стрелки
     */
    rotate() {
        let free = true;
        if ((this.row + this.size - 1) < config.rowsCount) {
            if (this.col < 0) this.shiftRight();
            if (this.col > config.colsCount - this.size) this.shiftLeft();

            // проверяем, есть ли место для разворота
            for (let i = 0; i < this.size; i++) {
                if (this.getCell(i, 0) !== 0 && this.getCell(i, 0) !== this.type)
                    free = false;
                if (this.getCell(i, this.size - 1) !== 0 && this.getCell(i, this.size - 1) !== this.type)
                    free = false;
            }

            if (free) {
                this.copyToTempArray();
                this.clearCurrent();
                // Копируем блок из временного массива с разворотом
                for (let i = 0; i < this.size; i++) {
                    for (let j = 0; j < this.size; j++) {
                        container.setCell(j + this.row,
                            this.size - i - 1 + this.col, this.tempArray[i][j]);
                    }
                }
                this.draw();
            }

        }
    },

    /**
     * Метод создает новый блок в игровом массиве типа type.
     */
    create() {
        this.col = Math.trunc(config.colsCount / 2) - this.size + 2;
        this.row = 0;
        this.type = nextBlock.type;
        this.size = nextBlock.size;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (nextBlock.array[i][j] === this.type) {
                    this.setCell(i, j, nextBlock.array[i][j]); // [row][col]
                }
            }
        }
        this.draw();
    },

};