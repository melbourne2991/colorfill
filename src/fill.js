const fillAxis = require('./fillAxis');
const getImageDataPixel = require('./getImageDataPixel');
// const eql = require('deep-equal');
const fillPixel = require('./fillPixel');

const { 
  FORWARD_DIRECTION, 
  BACKWARD_DIRECTION, 
  RGBA_WHITE,
  RGBA_BLACK 
} = require('./constants');

module.exports = function fill(ctx, imageData, fillTarget) {
  const lineSegments = [fillTarget];

  while(lineSegments.length) {
    let origin = lineSegments.pop();

    let pixelColor;
    let noBoundary = true;
    let direction = FORWARD_DIRECTION;
    let checkedForward = false;
    let pos = { x: origin.x, y: origin.y };
    
    let canAddAboveSeg = true;
    let canAddBelowSeg = true;

    while(noBoundary) {
      pixelColor = getImageDataPixel(imageData, pos);

      if(eql(pixelColor, RGBA_WHITE)) {
        fillPixel(imageData, pos, RGBA_BLACK);

        let abovePixelColor = getAbovePixelColor(imageData, pos);
        let belowPixelColor = getBelowPixelColor(imageData, pos);

        // if the pixel immediately above this is not white
        // we wait until we get another white pixel as this cannot
        // be the beginning of a new line segment.
        if(!eql(abovePixelColor, RGBA_WHITE)) {
          canAddAboveSeg = true;
        }

        if(!eql(belowPixelColor, RGBA_WHITE)) {
          canAddBelowSeg = true;
        }

        // when we have a new white pixel this pixels position
        // represents the line segments starting point that needs
        // to be run later, we add it to the stack
        if(canAddAboveSeg && eql(abovePixelColor, RGBA_WHITE)) {
          canAddAboveSeg = false;
          addAboveSeg(lineSegments, pos);
        }

        if(canAddBelowSeg && eql(belowPixelColor, RGBA_WHITE)) {
          canAddBelowSeg = false;
          addBelowSeg(lineSegments, pos);
        }

        pos.x = pos.x + direction;
      } else {
        if(checkedForward) {
          noBoundary = false;
        } else {
          checkedForward = true;
          pos = { x: origin.x + BACKWARD_DIRECTION, y: origin.y };
          direction = BACKWARD_DIRECTION;
        }
      }
    }
  }

  // render it!
  ctx.putImageData(imageData, 0, 0);  
}

function eql(rgba1, rgba2) {
  return (
    rgba1[0] === rgba2[0] &&
    rgba1[1] === rgba2[1] &&
    rgba1[2] === rgba2[2] &&
    rgba1[3] === rgba2[3]
  );
}

function getAbovePixelColor(imageData, {x, y}) {
  return getImageDataPixel(imageData, {x, y: y + 1});
}

function getBelowPixelColor(imageData, {x, y}) {
  return getImageDataPixel(imageData, {x, y: y - 1});
}

function addAboveSeg(lineSegments, {x, y}) {
  lineSegments.push({x, y: y + 1});
}

function addBelowSeg(lineSegments, {x, y}) {
  lineSegments.push({x, y: y - 1});
}
