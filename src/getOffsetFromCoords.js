module.exports = function getOffsetFromCoords(width, { x, y }) {
	return (y * (width * 4)) + (x * 4);
}