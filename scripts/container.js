"use strict";

let container = {

    array: [],

    /**
     * Инициализирует массив игрового поля с размерами из config.
     */
    initArray() {
        for (let i = 0; i < config.rowsCount; i++) {
            this.array[i] = new Array();
            for (let j = 0; j < config.colsCount; j++) {
                this.array[i][j] = 0; // [row][col]
            }
        }
    },

    /**
     * Очищает массив контейнера, и выводит пустой контейнер на экран (чистит)
     */
    clear() {
        this.array.forEach(element => element.fill(0));
        this.drawArray();
    },

    /**
     * Возвращает ячейку игрового контейнера с проверкой на доступные границы
     * @param {row: number, col: number} позиция ячейки в контейнере
     * @returns {number} Содержимое контейнера, либо 255, если row или col
     * выходят за доступные границы
     */
    getCell(row, col) {
        if (row < config.rowsCount && col < config.colsCount) {
            return this.array[row][col];
        }
        return 255;
    },

    /**
     * Заносит ячейку в массива контейнера с проверкой на доступные границы
     * @param {row: number, col: number} позиция ячейки в контейнере
     * @param {t: number} тип блока
     */
    setCell(row, col, t) {
        if (row < config.rowsCount && col < config.colsCount) {
            this.array[row][col] = t;
        }
    },

    /**
     * Метод рисует игровое поле и игрока на нем.
     */
    draw() {
        document.querySelector('.gameContainer').
            insertAdjacentHTML("afterbegin", this.generate());
        this.initArray();
    },

    /**
     * Метод генерирует игровое поле на основании размеров в config.
     * @returns {string} html-код таблицы (игрового контейнера).
     */
    generate() {
        let board = "";
        for (let row = 0; row < config.rowsCount; row++) {
            board += "<tr>";
            for (let col = 0; col < config.colsCount; col++) {
                board += `<td data-x="${col}" data-y="${row}"></td>`;
            }
            board += "</tr>";
        }
        return `<table class="tableLight shadow" ><tbody>${board}</tbody></table>`;
    },

    /**
     * Метод очищает полностью заполненный ряд в контейнере.
     */
    clearBottom() {
        let fullsCount = 0;
        for (let i = config.rowsCount - 1; i > 0; i--) {
            let full = true;
            for (let j = 0; j < config.colsCount; j++) {
                if (this.array[i][j] < 100) full = false;
            }
            if (full) {
                for (let jd = 0; jd < config.colsCount; jd++) {
                    for (let id = i; id > 0; id--) {
                        this.array[id][jd] = this.array[id - 1][jd];
                    }
                }
                this.drawArray();
                fullsCount++;
                i++;
            }
        }
        // подсчёт очков за заполненные строки
        if (fullsCount === 1) {
            game.score += 100;
        } else if (fullsCount === 2) {
            game.score += 300;
        } else if (fullsCount === 3) {
            game.score += 700;
        } else if (fullsCount > 3) {
            game.score += 1500;
        }
    },

    /**
     * Если ячейка с переданными координатами есть, то возвращается ее объект,
     * а иначе null.
     * @param {x: number, y: number} position
     * @returns {HTMLTableCellElement|null} объект ячейки если есть, 
     * в противном случае null.
     */
    getSquare(row, col) {
        return document.querySelector(`[data-x="${col}"][data-y="${row}"]`);
    },

    /**
     * Метод рисует "кубики" в игровом контейнере для указанной координаты.
     * Для этого он добавляет тегу td класс ".blockN", где N-тип кубика (его цвет)
     * @param {x: number, y: number} position
     * @param {c: number} color 
     */
    drawSquare(row, col, c) {
        const square = this.getSquare(row, col);
        if (square !== null) {
            let Squareclass = config.cellSize + ' ' + config.border + ' ' + config.theme + ' block' + c;
            square.classList = Squareclass;
        }
    },

    /**
     * Метод выводит в игровое поле содержимое массива блоков.
     */
    drawArray() {
        for (let row = 0; row < config.rowsCount; row++) {
            for (let col = 0; col < config.colsCount; col++) {
                if (this.array[row][col] > 100) {
                    this.drawSquare(row, col, this.array[row][col] - 100);
                } else {
                    this.drawSquare(row, col, this.array[row][col]);
                }

            }
        }
    },
};