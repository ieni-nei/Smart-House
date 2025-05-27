function Blinds(x, y, width, height, imgPath) {
	Device.call(this, 'Blinds', x, y, width, height, imgPath);
}
Blinds.prototype = Object.create(Device.prototype);
Blinds.prototype.constructor = Blinds;

Blinds.prototype.showEffect = function () {
	this.element.style.transition = 'filter 0.5s ease, width 0.5s ease';
	this.element.style.width = this.state === 'on' ? '2%' : '10%';
};
