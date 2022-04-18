"use strict";

container.draw();
nextBlock.draw();
nextBlock.create();
block.create();
window.addEventListener('keydown', function (event) {
    action.move(event);
});