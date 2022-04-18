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
        const Squareclass = 'block' + c;
        this.getSquare(row, col).classList = Squareclass;
    },

    /**
     * Метод выводит в игровое поле содержимое массива блоков.
     */
    drawArray() {
        for (let row = 0; row < config.rowsCount; row++) {
            for (let col = 0; col < config.colsCount; col++) {
                this.drawSquare(row, col, this.array[row][col]);
            }
        }
    },
};