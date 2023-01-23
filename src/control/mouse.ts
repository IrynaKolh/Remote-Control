import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const mouseUp = async (value: number) => {
  await mouse.move(up(value));
}
export const mouseDown = async (value: number) => {
  await mouse.move(down(value));
}
export const mouseLeft = async (value: number) => {
  await mouse.move(left(value));
}
export const mouseRight = async (value: number) => {
  await mouse.move(right(value));
}
export const getMousePosition = () => {
  const position = mouse.getPosition();
  return position;
};
