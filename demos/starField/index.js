import { line, trunc } from 'lib/core';
import { SCREEN_HEIGHT, SCREEN_WIDTH, rand, mainLoop, setPixel } from 'platform';

const stars = new Array(5000);
const NUMBER_OF_STARS = 3600;

function initStar(star, initial) {
  // origin is in the center of the screen
  star[0] = rand(SCREEN_WIDTH * 6) - SCREEN_WIDTH * 3; // x
  star[1] = rand(SCREEN_HEIGHT * 6) - SCREEN_HEIGHT * 3; // y

  if (initial) {
    star[2] = rand(14) + 1; // z
    star[3] = rand(205) + 50; // brightness
    star[4] = rand(10) + 1; // speed
    star[5] = rand(800) === 1 ? 2 : 1; // size
    star[6] = 0
    star[7] = 0
    star[8] = 0
  } else {
    star[2] = 15; // z
  }
}

function drawStar(x, y, size, red, green, blue) {
  setPixel(x, y, red, green, blue);

  if (size == 2) {
    setPixel(x + 1, y, red, green, blue);
    setPixel(x, y + 1, red, green, blue);
    setPixel(x + 1, y, red, green, blue);
  }
}

function draw() {
  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    drawStar(stars[i][6], stars[i][7], stars[i][8], 0, 0, 0);

    let x = stars[i][0] / stars[i][2] + SCREEN_WIDTH / 2;
    let y = stars[i][1] / stars[i][2] + SCREEN_HEIGHT / 2;

    if (stars[i][2] < 0 || x > SCREEN_WIDTH || x < 0 || y > SCREEN_HEIGHT || y < 0) {
      initStar(stars[i], false);
    } else {
      let size = trunc(stars[i][5] / (stars[i][2] / 3));

      if (size < 1) {
        size = 1;
      }

      if (size > 2) {
        size = 2;
      }

      stars[i][2] = stars[i][2] - stars[i][4] / 120;

      let brightness = trunc(stars[i][3] / (stars[i][2] / 3));

      if (brightness > 255) {
        brightness = 255;
      }

      drawStar(x, y, size, brightness, brightness, brightness);

      stars[i][6] = x;
      stars[i][7] = y;
      stars[i][8] = size;
    }
  }
}

function start() {
  for (var i = 0; i < stars.length; i++) {
    stars[i] = new Array(5);
    initStar(stars[i], true);
  }

  mainLoop(draw);
}

export default start;