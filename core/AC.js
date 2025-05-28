function AC(x, y, width, height, imgPath) {
	Device.call(this, 'AC', x, y, width, height, imgPath);
}
AC.prototype = Object.create(Device.prototype);
AC.prototype.constructor = AC;

AC.prototype.showEffect = function () {
	if (this.effect) {
		this.effect.classList.remove('wind');
		var old = this.effect;
		this.effect = null;
		setTimeout(function () {
			old.remove();
		}, 400);
	}

	if (this.state === 'on') {
		var snow = document.createElement('div');
		snow.className = 'effect-overlay';
		snow.style.backgroundImage = 'url(effects/wind.gif)';
		this.element.appendChild(snow);
		void snow.offsetWidth;
		snow.classList.add('wind');
		this.effect = snow;
	}
};
