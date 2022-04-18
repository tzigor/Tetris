"use strict";

let action = {
    move(event) {
        switch (event.key) {
            case "ArrowUp":
                block.rotate();
                break;
            case "ArrowDown":
                block.shiftDown();
                game.score++;
                document.querySelector('.score').textContent = 'Score : ' + game.score;
                break;
            case "ArrowLeft":
                block.shiftLeft();
                break;
            case "ArrowRight":
                block.shiftRight();
                break;
            case " ":
                game.score += config.rowsCount - block.row;
                block.dropDown();
                document.querySelector('.score').textContent = 'Score : ' + game.score;
                break;
            default:
                ;
        }
    },
};