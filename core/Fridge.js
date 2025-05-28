function Fridge(x, y, width, height, imgPath) {
	Device.call(this, 'Fridge', x, y, width, height, imgPath);
}
Fridge.prototype = Object.create(Device.prototype);
Fridge.prototype.constructor = Fridge;

Fridge.prototype.render = function (parent) {
	Device.prototype.render.call(this, parent);
	if (this.element) {
		this.element.classList.add('solid-device');
	}
};

Fridge.prototype.showEffect = function () {
	if (this.effect) {
		this.effect.classList.remove('show');
		var old = this.effect;
		this.effect = null;
		setTimeout(function () {
			old.remove();
		}, 400);
	}

	if (this.state === 'on') {
		var snow = document.createElement('div');
		snow.className = 'effect-overlay';
		snow.style.backgroundImage = 'url(effects/snow.gif)';
		this.element.appendChild(snow);
		void snow.offsetWidth;
		snow.classList.add('show');
		this.effect = snow;
	}
};
