window.onload = function () {
	var controller = new SmartHouseController();
	var house = document.getElementById('house-map');

	var lamp = new Lamp(20, 4, 100, 100, 'furniture/lamp.png');
	lamp.onToggle = (dev) => {
		controller.light += dev.state === 'on' ? 20 : -20;
		controller.updateMetrics();
	};
	lamp.render(house);
	controller.registerDevice(lamp);

	var ac = new AC(8, -10, 100, 100, 'furniture/ac.png');
	ac.onToggle = (dev) => controller.updateMetrics();
	ac.render(house);
	controller.registerDevice(ac);

	var blinds = new Blinds(95, 30, 80, 120, 'furniture/blinds.png');
	blinds.onToggle = (dev) => {
		controller.light += dev.state === 'on' ? 30 : -30;
		controller.updateMetrics();
	};
	blinds.render(house);
	controller.registerDevice(blinds);

	var fridge = new Fridge(60, 50, 300, 300, 'furniture/fridge.png');
	fridge.onToggle = (dev) => controller.updateMetrics();
	fridge.render(house);
	controller.registerDevice(fridge);

	var robovac = new Robovac(30, 20, 100, 100, 'furniture/robovac.png');
	robovac.onToggle = (dev) => controller.updateMetrics();
	robovac.render(house);
	controller.registerDevice(robovac);

	controller.updateMetrics();
	controller.startMonitoring();

	document.getElementById('toggle-all').addEventListener('click', () => {
		controller.toggleAll();
	});


	renderFurniture('Bed', 0, 3, 'furniture/bed.png', 200, 200);
	renderFurniture('Wardrobe', 47, -15, 'furniture/wardrobe.png', 300, 300);
	renderFurniture('carpet', 3, 35, 'furniture/carpet.png', 250, 270);
};

function renderFurniture(name, x, y, imagePath, width, height) {
	var el = document.createElement('div');
	el.className = 'furniture ' + name.toLowerCase();
	el.style.left = x + '%';
	el.style.top = y + '%';
	el.style.width = width + 'px';
	el.style.height = height + 'px';
	el.title = name;
	el.style.backgroundImage = 'url(' + imagePath + ')';

	document.getElementById('house-map').appendChild(el);
}
