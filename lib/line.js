import { setPixel } from '../engine';
import { abs } from './utils';

// Extremely Fast Line Algorithm Var A (Division)
// Copyright 2001-2, By Po-Han Lin
// http://www.edepot.com
function line(startX, startY, endX, endY, red, green, blue) {
  let yLonger = false;
  let incrementVal;

  let shortLen = endY - startY;
  let longLen = endX - startX;

  if (abs(shortLen) > abs(longLen)) {
    const swap = shortLen;
    shortLen = longLen;
    longLen = swap;
    yLonger = true;
  }

  if (longLen < 0) {
    incrementVal = -1;
  } else {
    incrementVal = 1;
  }

  let divDiff;

  if (shortLen === 0) {
    divDiff = longLen;
  } else {
    divDiff = longLen / shortLen;
  }

  for (let i = 0; i !== longLen; i += incrementVal) {
    if (yLonger) {
      setPixel(startX + i / divDiff, startY + i, red, green, blue);
    } else {
      setPixel(startX + i, startY + i / divDiff, red, green, blue);
    }
  }
}

export { line }; // eslint-disable-line import/prefer-default-export
