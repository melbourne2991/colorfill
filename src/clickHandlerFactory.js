const getImageDataPixel = require('./getImageDataPixel');

module.exports = function(canvas, ctx, imageData) {
	return (e) => {
		const pos = getPosition(canvas, e);
    const p = getImageDataPixel(imageData, e.x, e.y);

    console.log(pos, p)
	}
}

function getPosition(canvas, e) {
  return {
  	x: e.x - canvas.offsetLeft,
  	y: e.y - canvas.offsetTop
  }
}