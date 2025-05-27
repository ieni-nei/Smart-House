function Robovac(x, y, width, height, imgPath) {
	Device.call(this, 'Robovac', x, y, width, height, imgPath);
	this.moving = false;
}

Robovac.prototype = Object.create(Device.prototype);
Robovac.prototype.constructor = Robovac;

Robovac.prototype.toggle = function () {
	this.moving = !this.moving;
	if (this.moving) this.moveAround();
};

Robovac.prototype.moveAround = function () {
	const robovac = this;
	const container = document.getElementById('house-map');

	function getRandomPosition() {
		const maxX = container.clientWidth - robovac.element.offsetWidth;
		const maxY = container.clientHeight - robovac.element.offsetHeight;

		return {
			left: Math.random() * maxX,
			top: Math.random() * maxY
		};
	}

	function collidesWithSolid(x, y) {
		const roboRect = {
			left: x,
			right: x + robovac.element.offsetWidth,
			top: y,
			bottom: y + robovac.element.offsetHeight
		};

		const solids = container.querySelectorAll('.solid-device');
		for (let el of solids) {
			const elRect = {
				left: el.offsetLeft,
				top: el.offsetTop,
				right: el.offsetLeft + el.offsetWidth,
				bottom: el.offsetTop + el.offsetHeight
			};

			if (
				roboRect.right > elRect.left &&
				roboRect.left < elRect.right &&
				roboRect.bottom > elRect.top &&
				roboRect.top < elRect.bottom
			) {
				return true;
			}
		}
		return false;
	}

	function tryMove() {
		if (!robovac.moving) return;
		let attempt = 0;

		function tryPosition() {
			if (attempt > 5) return;
			const pos = getRandomPosition();

			if (!collidesWithSolid(pos.left, pos.top)) {
				robovac.element.style.transition = 'left 2s linear, top 2s linear';
				robovac.element.style.left = pos.left + 'px';
				robovac.element.style.top = pos.top + 'px';
				setTimeout(tryMove, 2000);
			} else {
				attempt++;
				tryPosition();
			}
		}
		tryPosition();
	}

	tryMove();
};
