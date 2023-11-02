let scale = 20;
const containerWidth = 400;
const containerHeight = 400;
const rows = containerHeight / scale;
const columns = containerWidth / scale;

const container = document.getElementsByClassName("container")[0];



(function setup() {
    let configs = {
        x: 0,
        y: 0,
        container: container,
        scale: scale
    };
    const snake = new Snake(configs);
    const fruit1 = new Fruit();
    const fruit2 = new Fruit();
    fruit1.update();
    fruit2.update();
    snake.start();
    snake.grow();
    snake.grow();
    snake.grow();
    snake.grow();
    setInterval(() => {
        snake.update();
        if (snake.eat(fruit1)) {
            fruit1.hide()
            setTimeout(() => {
                fruit1.update();
            }, (Math.floor(Math.random() * 2000) + 500));
        }
        if (snake.eat(fruit2)) {
            fruit2.hide()
            setTimeout(() => {
                fruit2.update();
            }, (Math.floor(Math.random() * 2000) + 500));
        }
    }, 250);

    document.onkeydown = function (event) {
        snake.changeDirection(event.key.replace("Arrow", ""));
    };
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                snake.changeDirection("Left");
            } else {
                snake.changeDirection("Right");
            }
        } else {
            if (yDiff > 0) {
                snake.changeDirection("Up");
            } else {
                snake.changeDirection("Down");
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
})();