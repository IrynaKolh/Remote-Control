import { mouse, straightTo, Button, Point} from "@nut-tree/nut-js";

export const drawCircle = async (r: number) => {
  const start = await mouse.getPosition();
  const center = new Point(start.x, start.y + r);
  const step = 1 / r;

  await mouse.pressButton(Button.LEFT);

  for (let rad = 0; rad <= Math.PI * 2; rad += step) {
    const y = r * Math.cos(rad);
    const x = r * Math.sin(rad);
    await mouse.move(straightTo(new Point(center.x + x, center.y - y)));
  }

  await mouse.releaseButton(Button.LEFT);
};
