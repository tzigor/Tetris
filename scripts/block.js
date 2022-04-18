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
                    container.array[i + block.row][j + block.col] = 0;
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
                    && container.array[i + block.row][j + block.col] === block.type) {
                    block.tempArray[i][j] = container.array[i + block.row][j + block.col];
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
                    container.array[i + block.row][j + block.col] = block.tempArray[i][j];
                    container.drawSquare(i + block.row, j + block.col, block.type);
                }
            }
        }
    },

    draw() {
        for (let i = 0; i < block.size; i++) {
            for (let j = 0; j < block.size; j++) {
                if (container.array[i + block.row][j + block.col] === block.type) {
                    container.drawSquare(i + block.row, j + block.col, block.type);
                }
            }
        }
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
            while (container.array[i + block.row][j + block.col] !== block.type
                && j < block.size) {
                j++;
            }
            if (j < block.size) {
                // ищем границу блока в ряду i
                while (container.array[i + block.row][j + block.col] === block.type) {
                    j++;
                }
                // если справа от блока есть препятствие (не ноль), то не free
                free = !(container.array[i + block.row][j + block.col] !== 0);
            }
        }
        if (free) {
            block.copyToTempArray();
            block.clearCurrent();
            block.col++;
            block.getFromTempArray();
        }
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
            while (container.array[i + block.row][j + block.col] !== block.type
                && j > 0) {
                j--;
            }
            if (j > 0) {
                // ищем границу блока в ряду i
                while (container.array[i + block.row][j + block.col] === block.type) {
                    j--;
                }
                // если слева от блока есть препятствие (не ноль), то не free
                free = !(container.array[i + block.row][j + block.col] !== 0);
            }
        }
        if (free) {
            block.copyToTempArray();
            block.clearCurrent();
            block.col--;
            block.getFromTempArray();
        }
    },

    /**
     * Сдвигает блок вниз
     */
    shiftDown() {
        let free = true;
        // Проверяем, есть ли препятствие снизу
        for (let j = 0; j < block.size; j++) {
            let i = 0;
            // ищем кирпичик блока в столбце j сверзу вниз
            while (container.array[i + block.row][j + block.col] !== block.type
                && j < block.size) {
                i++;
            }
            if (j < block.size) {
                // ищем границу блока в столбце j
                while (container.array[i + block.row][j + block.col] === block.type) {
                    if (i + block.row < config.rowsCount) i++;
                    lo
                }
                // если снизу от блока есть препятствие (не ноль), то не free
                free = !(container.array[i + block.row][j + block.col] !== 0);
            }
        }
        if (free) {
            block.copyToTempArray();
            block.clearCurrent();
            block.row++;
            block.getFromTempArray();
        }
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
                    container.array[j + block.row][block.size - i - 1 + block.col]
                        = block.tempArray[i][j]; // [row][col]
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
                    container.array[i + block.row][j + block.col]
                        = nextBlock.array[i][j]; // [row][col]
                }
            }
        }
        block.draw();
    },

};