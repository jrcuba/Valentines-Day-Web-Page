class BackgroundObject {
    constructor(imagePath, startX, startY) {
        this.img = document.createElement('img');
        this.img.src = imagePath;
        this.img.style.position = 'absolute';
        this.img.style.left = `${startX}px`;
        this.img.style.top = `${startY}px`;
        document.body.appendChild(this.img);

        this.speedX = Math.random() * 10 - 5;
        this.speedY = Math.random() * 10 - 5;
    }

    move() {
        let x = parseFloat(this.img.style.left);
        let y = parseFloat(this.img.style.top);

        x += this.speedX;
        y += this.speedY;

        // Bounce objects when they touch the left or right edges
        if (x < 0 || x + this.img.width > window.innerWidth) {
            this.speedX = -this.speedX;
        }

        // Bounce objects when they touch the bottom edge after traveling three times the distance
        if (y + this.img.height > window.innerHeight * 3) {
            this.speedY = -this.speedY;
        }

        // Bounce objects when they touch the top edge
        if (y < 0) {
            this.speedY = -this.speedY;
        } else if (y + this.img.height < 0) {
            this.img.style.left = `${Math.random() * window.innerWidth}px`;
            this.img.style.top = `${Math.random() * window.innerHeight}px`;
        }

        this.img.style.left = `${x}px`;
        this.img.style.top = `${y}px`;
    }
}

class Heart extends BackgroundObject {
    constructor(startX, startY) {
        super('heart.png', startX, startY);
        this.img.style.width = '1%'; // Reduce size by 100 times
        this.img.style.height = 'auto';
    }
}

class Frozen extends BackgroundObject {
    constructor(startX, startY) {
        super('frozen.png', startX, startY);
        this.img.style.width = '1%'; // Reduce size by 100 times
        this.img.style.height = 'auto';
    }
}

const objects = [];
for (let i = 0; i < 50; i++) {
    objects.push(new Heart(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    objects.push(new Frozen(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

function update() {
    objects.forEach(obj => obj.move());
    requestAnimationFrame(update);
}

update();
