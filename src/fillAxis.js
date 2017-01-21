const fillPixel = require('./fillPixel');
const getImageDataPixel = require('./getImageDataPixel');
const eql = require('deep-equal');
const { RGBA_WHITE, RGBA_BLACK } = require('./constants');

module.exports = function fillAxis(imageData, { x, y }, axis, direction) {
    const point = { x, y };
    point[axis] = point[axis] + direction;

    const pixelColor = getImageDataPixel(imageData, point);

    if (eql(pixelColor, RGBA_WHITE)) {
      fillPixel(imageData, point, RGBA_BLACK);
      fillAxis(imageData, point, axis, direction);
    }
}