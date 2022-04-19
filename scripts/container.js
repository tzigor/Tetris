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

    clear() {
        for (let i = 0; i < config.rowsCount; i++) {
            for (let j = 0; j < config.colsCount; j++) {
                this.array[i][j] = 0; // [row][col]
            }
        }
        this.drawArray();
    },

    getCell(row, col) {
        if (row < config.rowsCount && col < config.colsCount) {
            return this.array[row][col];
        }
        return 255;
    },

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
        return `<table><tbody>${board}</tbody></table>`;
    },

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
     * @returns {HTMLTableCellElement|null} объект ячейки если есть, в противном случае null.
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
        let Squareclass = config.cellSize + ' ' + config.border + ' block' + c;
        if (c === 0) {
            Squareclass = config.cellSize + ' ' + config.border + ' ' + config.theme;
        }
        this.getSquare(row, col).classList = Squareclass;
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