function Fruit() {
    this.x;
    this.y;
    this.fruit = document.createElement("div");
    this.fruit.className = "fruit";

    this.update = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        this.fruit.style.left = this.x + "px";
        this.fruit.style.top = this.y + "px";
        container.appendChild(this.fruit);
    };
    
    this.hide = function() {
        this.fruit.remove();
    }

}