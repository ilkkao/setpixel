import font from '../../common/defaultFont';
import { setPixel } from './layers';

export default function print(x, y, text, red = 255, green = 255, blue = 255) {
  let offset = 0;

  for (let i = 0; i < text.length; i++) {
    const data = font[text[i]];

    for (let column = 0; column < data.length; column++) {
      for (let row = 0; row < 8; row++) {
        if ((data[column] & (1 << (7 - row))) !== 0) {
          setPixel(x + column + offset, y + row, red, green, blue);
        }
      }
    }

    offset += data.length + 1;
  }
}
