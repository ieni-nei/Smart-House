function AC(x, y, width, height, imgPath) {
	Device.call(this, 'AC', x, y, width, height, imgPath);
}
AC.prototype = Object.create(Device.prototype);
AC.prototype.constructor = AC;

AC.prototype.showEffect = function () {
	if (this.state === 'on') {
		const wind = document.createElement('div');
		wind.className = 'effect-overlay';
		wind.style.backgroundImage = 'url(effects/wind.gif)';
		this.element.appendChild(wind);
		void wind.offsetWidth;
		wind.classList.add('show');
		this.effect = wind;
	} else {
		if (this.effect) {
			this.effect.classList.remove('show');
			setTimeout(() => {
				this.effect.remove();
				this.effect = null;
			}, 400);
		}
	}
};
