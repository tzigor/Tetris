"use strict";

let nextBlock = {
    size: 0, // размер следующего блока
    type: 0, // тип следующего блока
    array: [ // массив хранит следующий блок (4 x 4 - максимальный размер блока)
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],

    /**
     * Очищает массив, и чистит "следующий блок" на экране
     */
    clear() {
        this.array.forEach(element => element.fill(0));
        this.drawArray();
    },

    /**
     * Рисует поле Next Block.
     * @param {n: number} размер блока Next Block - n x n.
     */
    draw() {
        document.querySelector(".nextHead").
            insertAdjacentHTML("afterend", this.generate());
    },

    /**
     * Метод генерирует игровое поле на основании размеров в config.
     * @returns {string} html-код таблицы (игрового контейнера).
     */
    generate() {
        let board = "";
        for (let y = 0; y < 4; y++) {
            board += "<tr>";
            for (let x = 0; x < 4; x++) {
                board += `<td data-xnb="${x}" data-ynb="${y}"></td>`; // nb - next block
            }
            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
    },

    /**
     * Рисует "следующий блок" на экране
     */
    drawArray() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.drawSquare(i, j, this.array[i][j]);
            }
        }
    },

    /**
     * Если ячейка с переданными координатами есть, то возвращается ее объект,
     * а иначе null.
     * @param {Row: number, col: number} position
     * @returns {HTMLTableCellElement|null} объект ячейки если есть, в противном случае null.
     */
    getSquare(row, col) {
        return document.querySelector(`[data-xnb="${col}"][data-ynb="${row}"]`);
    },

    /**
     * Метод рисует "кубики" в модуле Next Block для указанной координаты.
     * Для этого он добавляет тегу td класс ".blockN", где N-тип кубика (его цвет)
     * @param {x: number, y: number} position
     * @param {c: number} color 
     */
    drawSquare(row, col, c) {
        let Squareclass = 'tdSizeL nextBlockBG' + ' block' + c;
        this.getSquare(row, col).classList = Squareclass;
    },

    /**
     * Метод создает следующий блок типа type.
     */
    create() {
        nextBlock.clear();
        nextBlock.type = Math.floor(Math.random() * config.blocksCount) + 1;
        nextBlock.array[1][1] = nextBlock.type; // всегда есть
        switch (nextBlock.type) {
            case 1:
                nextBlock.array[0][0] = nextBlock.type;
                nextBlock.array[0][1] = nextBlock.type;
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.size = 2;
                break;
            case 2:
                nextBlock.array[0][0] = nextBlock.type;
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.array[1][2] = nextBlock.type;
                nextBlock.size = 3;
                break;
            case 3:
                nextBlock.array[0][2] = nextBlock.type;
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.array[1][2] = nextBlock.type;
                nextBlock.size = 3;
                break;
            case 4:
                nextBlock.array[0][1] = nextBlock.type;
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.array[1][2] = nextBlock.type;
                nextBlock.size = 3;
                break;
            case 5:
                nextBlock.array[0][1] = nextBlock.type;
                nextBlock.array[0][2] = nextBlock.type;
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.size = 3;
                break;
            case 6:
                nextBlock.array[0][0] = nextBlock.type;
                nextBlock.array[0][1] = nextBlock.type;
                nextBlock.array[1][2] = nextBlock.type;
                nextBlock.size = 3;
                break;
            case 7:
                nextBlock.array[1][0] = nextBlock.type;
                nextBlock.array[1][2] = nextBlock.type;
                nextBlock.array[1][3] = nextBlock.type;
                nextBlock.size = 4;
                break;
        }
        nextBlock.drawArray();
    },
};