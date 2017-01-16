module.exports = function getImageDataPixel(imageData, x, y) {
	const rowCol = (y * (imageData.width * 4)) + (x * 4);

	const r = imageData.data[rowCol + 0];
	const g = imageData.data[rowCol + 1];
	const b = imageData.data[rowCol + 2];
	const a = imageData.data[rowCol + 3];

	return [r, g, b, a];
}