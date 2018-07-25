/* @flow */
import { random } from "lodash";

const multiRandom = (
  lower: number = 0,
  upper: number = 1,
  count: number = 2
): number[] => {
  const pickedNumbers: number[] = [];
  const pickNumber = (): number[] => {
    const randomNumber = random(lower, upper);
    if (pickedNumbers.includes(randomNumber)) return pickNumber();
    pickedNumbers.push(randomNumber);
    return pickedNumbers.length >= count ? pickedNumbers : pickNumber();
  };
  return pickNumber();
};
export default multiRandom;
