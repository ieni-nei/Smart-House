function Device(name, x, y, width, height, imgPath) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.imgPath = imgPath || '';
	this.state = 'off';
	this.element = null;
}

Device.prototype.render = function (parentElement) {
	const el = document.createElement('div');
	el.className = 'device';
	el.style.left = this.x + '%';
	el.style.top = this.y + '%';
	el.style.width = this.width + 'px';
	el.style.height = this.height + 'px';

	if (this.imgPath) {
		el.style.backgroundImage = `url(${this.imgPath})`;
		el.style.backgroundSize = 'cover';
	}

	el.addEventListener('click', () => {
		this.toggle();
		this.showEffect();
	});

	parentElement.appendChild(el);
	this.element = el;
};

Device.prototype.toggle = function () {
	this.state = this.state === 'on' ? 'off' : 'on';
	if (typeof this.onToggle === 'function') {
		this.onToggle(this);
	}
};

Device.prototype.showEffect = function () { };
