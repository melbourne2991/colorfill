const getOffsetFromCoords = require('./getOffsetFromCoords');

module.exports = function getImageDataPixel(imageData, { x, y }) {
	const offset = getOffsetFromCoords(imageData.width, { x, y });

	const r = imageData.data[offset + 0];
	const g = imageData.data[offset + 1];
	const b = imageData.data[offset + 2];
	const a = imageData.data[offset + 3];

	return [r, g, b, a];
}