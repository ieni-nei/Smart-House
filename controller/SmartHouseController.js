function SmartHouseController() {
	this.devices = [];
	this.temp = 22;
	this.energy = 0;
	this.light = 20;
	this.intervalId = null;
}

SmartHouseController.prototype.updateMetrics = function () {
	document.getElementById('temp-value').textContent = this.temp.toFixed(1) + ' °C';
	document.getElementById('energy-value').textContent = this.energy.toFixed(1) + ' КВт';
	document.getElementById('light-value').textContent = this.light.toFixed(1) + ' %';
};

SmartHouseController.prototype.registerDevice = function (device) {
	this.devices.push(device);
};

SmartHouseController.prototype.toggleAll = function () {
	let i = 0;
	const toggleNext = () => {
		if (i >= this.devices.length) return;
		this.devices[i].toggle();
		i++;
		setTimeout(toggleNext, 300);
	};
	toggleNext();
};


SmartHouseController.prototype.startMonitoring = function () {
	if (this.intervalId) return;

	this.intervalId = setInterval(() => {
		let deltaTemp = 0.05;
		let deltaEnergy = 0;
		let deltaLight = 0;

		this.devices.forEach(device => {
			if (device instanceof AC && device.state === 'on') {
				deltaTemp -= 0.1;
				deltaEnergy += 0.1;

				if (this.temp < 10) {
					device.toggle();
					this.temp = 10;
				}
			}
			if (device instanceof Fridge && device.state === 'on') {
				deltaEnergy += 0.3;
				deltaTemp -= 0.01;
			}
			if (device instanceof Lamp && device.state === 'on') {
				deltaEnergy += 0.01;
			}
			if (device instanceof Robovac && device.moving) {
				deltaEnergy += 0.1;
			}
		});

		this.temp = Math.min(35, this.temp + deltaTemp);
		this.energy += deltaEnergy;
		this.light = Math.max(0, Math.min(100, this.light + deltaLight));

		this.updateMetrics();
	}, 1000);
};
