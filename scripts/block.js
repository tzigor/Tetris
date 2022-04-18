"use strict";

let block = {
    row: 0, // текущее положение блока в игровом массиве (левый верхний угол)
    col: 0,
    size: 3, // размер блока
    type: 4, // тип блока
    tempArray: [ // временный массив хранит блок, пока производятся вычисления
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],

    getCell(row, col) {
        return container.getCell(row + block.row, col + block.col);
    },

    setCell(row, col, t) {
        container.setCell(row + block.row, col + block.col, t);
    },

    clearTempArray() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                block.tempArray[i][j] = 0; // [row][col]
            }
        }
    },

    clearCurrent() {
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if (block.tempArray[i][j] === block.type) {
                    block.setCell(i, j, 0);
                    container.drawSquare(i + block.row, j + block.col, 0);
                }
            }
        }
    },

    /**
     * Копирует текущий блок во временный массив
     */
    copyToTempArray() {
        block.clearTempArray();
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if ((i + block.row) < config.rowsCount
                    && block.getCell(i, j) === block.type) {
                    block.tempArray[i][j] = block.getCell(i, j);
                }
            }
        }
    },

    /**
     * Возвращает блок из временного массива в игровой массив
     */
    getFromTempArray() {
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if (block.tempArray[i][j] === block.type) {
                    block.setCell(i, j, block.tempArray[i][j]);
                    container.drawSquare(i + block.row, j + block.col, block.type);
                }
            }
        }
    },

    draw() {
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if (block.getCell(i, j) === block.type) {
                    container.drawSquare(i + block.row, j + block.col, block.type);
                }
            }
        }
    },

    moveAction(newRow, newCol) {
        block.copyToTempArray();
        block.clearCurrent();
        block.row = newRow;
        block.col = newCol;
        block.getFromTempArray();
    },

    /**
     * Сдвигает блок вправо
     */
    shiftRight() {
        let free = true;
        // Проверяем, есть ли препятствие справа
        for (let i = 0; i < block.size; i++) {
            let j = 0;
            // ищем кирпичик блока в ряду i слева направо
            while (block.getCell(i, j) !== block.type && j < block.size) {
                j++;
            }
            if (j < block.size) {
                // ищем границу блока в ряду i
                while (block.getCell(i, j) === block.type) {
                    j++;
                }
                // если справа от блока есть препятствие (не ноль), то не free
                if (block.getCell(i, j) !== 0) {
                    free = false;
                    i = block.size;
                }
            }
        }
        if (free) block.moveAction(block.row, block.col + 1);
    },

    /**
     * Сдвигает блок влево
     */
    shiftLeft() {
        let free = true;
        // Проверяем, есть ли препятствие слева
        for (let i = 0; i < block.size; i++) {
            let j = block.size - 1;
            // ищем кирпичик блока в ряду i справа налево
            while (block.getCell(i, j) !== block.type && j > 0) {
                j--;
            }
            if (j > 0) {
                // ищем границу блока в ряду i
                while (block.getCell(i, j) === block.type) {
                    j--;
                }
                // если слева от блока есть препятствие (не ноль), то не free
                if (block.getCell(i, j) !== 0) {
                    free = false;
                    i = block.size;
                }
            }
        }
        if (free) block.moveAction(block.row, block.col - 1);
    },

    /**
     * Сдвигает блок вниз
     * @returns {boolean} true, если блок достиг дна
     */
    shiftDown() {
        let free = true;
        let spaceEnough = true;
        // Проверяем, есть ли препятствие снизу
        for (let j = 0; j < block.size; j++) {
            let i = 0;
            // ищем кирпичик блока в столбце j сверху вниз 
            while (block.getCell(i, j) !== block.type && i < block.size) {
                i++;
            }
            if (i < block.size) {
                // ищем границу блока в столбце j
                while (block.getCell(i, j) === block.type) {
                    i++;
                }
                // если снизу от блока есть препятствие (не ноль), то не free
                if (block.getCell(i, j) !== 0) {
                    free = false;
                    j = block.size;
                }
            }
        }
        if (free) {
            block.moveAction(block.row + 1, block.col);
            return false;
        } else {
            for (let i = 0; i < block.size; i++) {
                for (let j = 0; j < block.size; j++) {
                    if (block.getCell(i, j) === block.type) {
                        block.setCell(i, j, block.type + 100);
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
                block.create();
                nextBlock.create();
            } else {
                alert('Game Over!');
                game.new();
            }
            return true;
        }
    },

    dropDown() {
        while (!block.shiftDown()) { }
    },

    /**
     * Вращает блок по часовой стрелки
     */
    rotate() {
        if ((block.row + block.size - 1) < config.rowsCount) {
            if (block.col < 0) block.shiftRight();
            if (block.col > config.colsCount - block.size) block.shiftLeft();
            block.copyToTempArray();
            block.clearCurrent();
            // Копируем блок из временного массива с разворотом
            for (let i = 0; i < block.size; i++) {
                for (let j = 0; j < block.size; j++) {
                    container.setCell(j + block.row,
                        block.size - i - 1 + block.col, block.tempArray[i][j]);
                }
            }
            block.draw();
        }
    },

    /**
     * Метод создает новый блок в игровом массиве типа type.
     */
    create() {
        block.col = Math.trunc(config.colsCount / 2) - block.size + 2;
        block.row = 0;
        block.type = nextBlock.type;
        block.size = nextBlock.size;
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if (nextBlock.array[i][j] === block.type) {
                    block.setCell(i, j, nextBlock.array[i][j]); // [row][col]
                }
            }
        }
        block.draw();
    },

};