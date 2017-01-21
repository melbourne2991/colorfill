const getOffsetFromCoords = require('./getOffsetFromCoords');

module.exports = function fillPixel(imageData, { x, y }, rgba) {
	const offset = getOffsetFromCoords(imageData.width, { x, y });

  imageData.data[offset + 0] = rgba[0];
  imageData.data[offset + 1] = rgba[1];
  imageData.data[offset + 2] = rgba[2];
  imageData.data[offset + 3] = rgba[3];
}