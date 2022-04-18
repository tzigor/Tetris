"use strict";

let action = {
    move(event) {
        switch (event.key) {
            case "ArrowUp":
                block.rotate();
                break;
            case "ArrowDown":
                block.shiftDown();
                break;
            case "ArrowLeft":
                block.shiftLeft();
                break;
            case "ArrowRight":
                block.shiftRight();
                break;
            case " ":
                block.dropDown();
                break;
            default:
                ;
        }
    },
};