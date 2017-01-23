const svg = require('./images/random.svg');
const getScaledWidthHeight = require('./getScaledWidthHeight');
const clickHandlerFactory = require('./clickHandlerFactory');


// Prepare canvas & canvas event handlers.
const canvasWidth = 1000;
const canvasHeight = 1000;

const canvas = document.createElement('canvas');

canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const img = new Image();
img.src = svg;

img.onload = () => {
	const scaled = getScaledWidthHeight(
		img.width,
		img.height,
		canvasWidth,
		canvasHeight
	);

	ctx.drawImage(img,
		0, 0, scaled.width, scaled.height 
	);

	const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	
	const clickHandler = clickHandlerFactory(canvas, ctx, imageData);

	canvas.addEventListener("mousedown", clickHandler);
}

