window.onload = function () {
	var controller = new SmartHouseController();
	var house = document.getElementById('house-map');

	var lamp = Device.addDevice(Lamp, {
		x: 23,
		y: 4,
		width: 100,
		height: 100,
		img: 'furniture/lamp.png',
		container: house,
		controller: controller,
		onToggle: function (dev) {
			controller.light += dev.state === 'on' ? 20 : -20;
			controller.updateMetrics();
		}
	});

	var ac = Device.addDevice(AC, {
		x: 8,
		y: -10,
		width: 100,
		height: 100,
		img: 'furniture/AC.png',
		container: house,
		controller: controller,
		onToggle: function (dev) {
			controller.updateMetrics();
		}
	});

	var blinds1 = Device.addDevice(Blinds, {
		x: 91,
		y: 25,
		width: 120,
		height: 120,
		img: 'furniture/Blinds.png',
		container: house,
		controller: controller,
		onToggle: function (dev) {
			controller.light += dev.state === 'on' ? 30 : -30;
			controller.updateMetrics();
		}
	});

	var blinds2 = Device.addDevice(Blinds, {
		x: 30,
		y: 88,
		width: 120,
		height: 120,
		img: 'furniture/Blinds.png',
		container: house,
		controller: controller,
		onToggle: blinds1.onToggle
	});

	Device.addDevice(Fridge, {
		x: 65,
		y: 50,
		width: 300,
		height: 300,
		img: 'furniture/Fridge.png',
		container: house,
		controller: controller,
		onToggle: function (dev) {
			controller.updateMetrics();
		}
	});

	Device.addDevice(Robovac, {
		x: 10,
		y: 70,
		width: 100,
		height: 100,
		img: 'furniture/Robovac.png',
		container: house,
		controller: controller,
		onToggle: function (dev) {
			controller.updateMetrics();
		}
	});

	controller.updateMetrics();
	controller.startMonitoring();

	document.getElementById('toggle-all').addEventListener('click', function () {
		controller.toggleAll();
	});


	renderFurniture('Bed', 0, 3, 'furniture/bed.png', 200, 200, true);
	renderFurniture('Chair', 0, 35, 'furniture/chair.png', 150, 150);
	renderFurniture('Wardrobe', 47, -9, 'furniture/wardrobe.png', 300, 300, true);
	renderFurniture('Carpet', 30, 35, 'furniture/carpet.png', 250, 270);
};

function renderFurniture(name, x, y, imagePath, width, height, isSolid = false) {
	var el = document.createElement('div');
	el.className = 'furniture ' + name.toLowerCase();
	if (isSolid) el.classList.add('solid-device');

	el.style.left = x + '%';
	el.style.top = y + '%';
	el.style.width = width + 'px';
	el.style.height = height + 'px';
	el.title = name;
	el.style.backgroundImage = 'url(' + imagePath + ')';
	el.style.backgroundSize = 'cover';

	document.getElementById('house-map').appendChild(el);
}
