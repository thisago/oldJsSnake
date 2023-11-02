function Snake(configs) {
    this.id = configs.id ?? 1;
    this.started = false;
    this.scale = configs.scale;
    this.x = configs.x ?? 0;
    this.y = configs.y ?? 0;
    this.xSpeed = this.scale * 1;
    this.ySpeed = 0;

    this.container = configs.container;

    this.element = document.getElementsByClassName("snake")[0];
    this.head = this.element.getElementsByClassName("snake-head")[0];
    this.head.classList.add("right");

    this.body = [];
    this.bodyElmt = [];
    this.total = 0;

    this.difficultyLevel = 0;
    this.lookingAt = "Right";

    this.gameOver = document.createElement("div");
    let tryAgain = document.createElement("button");
    let tryAgainBack = document.createElement("span");
    tryAgain.innerHTML = "Try again";
    tryAgain.appendChild(tryAgainBack);
    tryAgain.onclick = () => {
        this.again();
    };
    this.gameOver.className = "gameOver";
    this.gameOver.innerHTML = "Game Over!";
    this.gameOver.appendChild(tryAgain);


    this.start = function () {
        this.started = true;
        if (this.difficultyLevel == 3) {
            this.element.classList.add("transparent");
        }
        this.changeDirection(configs.lookingAt);
    };


    this.update = function () {
        if (this.started == false) {
            return;
        }


        let x = this.xSpeed;
        let y = this.ySpeed;

        for (let i = 0; i < this.body.length; i++) {
            if (typeof this.body[i] != "undefined") {
                if (this.x + x == this.body[i].x && this.y + y == this.body[i].y) {
                    this.bodyElmt[i].style.border = "1px solid red";
                    this.lose();
                }
            }

            this.body[i] = this.body[i + 1];
        }
        this.body[this.total - 1] = {
            x: this.x,
            y: this.y
        };

        this.x += x;
        this.y += y;

        if (this.difficultyLevel == 0) {
            if (this.x >= containerWidth) {
                this.x = 0;
            }
            if (this.y >= containerHeight) {
                this.y = 0;
            }
            if (this.x < 0) {
                this.x = containerWidth - this.scale;
            }
            if (this.y < 0) {
                this.y = containerHeight - this.scale;
            }
        } else {
            if (this.x >= containerWidth) {
                container.style.bordeRightColor = "red";
            }
            if (this.y >= containerHeight) {
                container.style.borderBottomColor = "red";
            }
            if (this.x < 0) {
                container.style.borderLeftColor = "red";
            }
            if (this.y < 0) {
                container.style.borderTopColor = "red";
            }

            if (this.x >= containerWidth ||
                this.y >= containerHeight ||
                this.x < 0 ||
                this.y < 0) {
                this.lose();
            }

        }

        this.head.style.left = this.x + "px";
        this.head.style.top = this.y + "px";

        for (let i = this.body.length - 1; i >= 0; i--) {
            if (this.body[i] == undefined) {
                continue;
            }
            this.bodyElmt[i].style.top = this.body[i].y + "px";
            this.bodyElmt[i].style.left = this.body[i].x + "px";
        }
        socket.emit("snake", {
            id: this.id,
            x: this.x,
            y: this.y,
            lookingAt: this.lookingAt
        });
    };
    this.changeDirection = function (direction) {
        if (this.started == false) {
            return;
        }
        console.log(direction);

        this.lookingAt = direction;
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -this.scale * 1;
                this.head.classList.remove("right");
                this.head.classList.remove("left");
                this.head.classList.remove("bottom");
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = this.scale * 1;
                this.head.classList.remove("right");
                this.head.classList.remove("left");
                this.head.classList.add("bottom");
                break;
            case 'Left':
                this.xSpeed = -this.scale * 1;
                this.ySpeed = 0;
                this.head.classList.remove("right");
                this.head.classList.add("left");
                this.head.classList.remove("bottom");
                break;
            case 'Right':
                this.xSpeed = this.scale * 1;
                this.ySpeed = 0;
                this.head.classList.add("right");
                this.head.classList.remove("left");
                this.head.classList.remove("bottom");
                break;
        }
    };
    this.grow = function () {
        if (this.started == false) {
            return;
        }
        this.total++;
        this.bodyElmt[this.total - 1] = document.createElement("div");
        this.bodyElmt[this.total - 1].classList.add("snake-part");
        this.bodyElmt[this.total - 1].style.top = this.y + "px";
        this.bodyElmt[this.total - 1].style.left = this.x + "px";
        this.element.appendChild(this.bodyElmt[this.total - 1]);
    }
    this.eat = function (fruit) {
        if (this.started == false) {
            return;
        }
        if (this.x == fruit.x && this.y == fruit.y) {
            this.grow();
            return true;
        }

        return false;
    }

    this.lose = function () {
        if (this.started == false) {
            return;
        }
        clearInterval(this.interval);
        this.started = false;
        this.element.classList.add("death");
        container.appendChild(this.gameOver);
    };

    this.again = function () {
        this.started = true;
        this.gameOver.remove();
        this.x = -this.scale * 1;
        this.y = 0;
        this.changeDirection("Right");
        container.style.bordeRightColor = "";
        container.style.borderBottomColor = "";
        container.style.borderLeftColor = "";
        container.style.borderTopColor = "";

        this.bodyElmt.forEach(bodyPart => {
            bodyPart.remove();
        });
        this.body = [];
        this.bodyElmt = [];
        this.total = 0;

        this.element.classList.remove("death");
    };

    this.die = function (bomb) {
        if (this.started == false) {
            return;
        }
        if (this.x == bomb.x && this.y == bomb.y) {
            this.lose();
            return true;
        }

        return false;
    };
    this.difficulty = function (level) {
        this.difficultyLevel = level
    }


}