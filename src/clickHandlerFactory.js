const fill = require('./fill');

module.exports = function(canvas, ctx, imageData) {
	return (e) => {
    fill(ctx, imageData, getPosition(canvas, e));
  }
}

function getPosition(canvas, e) {
  return {
  	x: e.pageX - canvas.offsetLeft,
  	y: e.pageY - canvas.offsetTop
  }
}