import { mouse, screen, Region } from "@nut-tree/nut-js";
import Jimp from 'jimp';

export const makeScreenShot = async () => {
  const position = mouse.getPosition();
  const width = 200;

  const area = new Region(Math.max(0, (await position).x - width / 2), Math.max(0, (await position).y - width / 2), width, width);
  const sw = await screen.width();
  const sh = await screen.height();
  if (area.left + area.width > sw) {
    area.left = sw - area.width;
  }
  if (area.top + area.height > sh) {
    area.top = sh - area.width;
  }
  const image = await screen.grabRegion(area);
  const imageRGB = await image.toRGB();
  const jimp = new Jimp({ data: imageRGB.data, width: image.width, height: image.height });
  const base64 = await jimp.getBase64Async(Jimp.MIME_PNG);
  return base64.split(',')[1];
};
