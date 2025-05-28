function Lamp(x, y, width, height, imgPath) {
	Device.call(this, 'Lamp', x, y, width, height, imgPath);
}
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;

Lamp.prototype.render = function (parent) {
	Device.prototype.render.call(this, parent);
	if (this.element) {
		this.element.classList.add('solid-device');
	}
};

Lamp.prototype.showEffect = function () {
	if (this.effect) {
		this.effect.classList.remove('light');
		var old = this.effect;
		this.effect = null;
		setTimeout(function () {
			old.remove();
		}, 400);
	}

	if (this.state === 'on') {
		var snow = document.createElement('div');
		snow.className = 'effect-overlay';
		snow.style.backgroundImage = 'url(effects/light.gif)';
		this.element.appendChild(snow);
		void snow.offsetWidth;
		snow.classList.add('light');
		this.effect = snow;
	}
};
