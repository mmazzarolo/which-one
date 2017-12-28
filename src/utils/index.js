/* @flow */
import { random } from 'lodash';
import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.png';
import image3 from '../assets/images/3.png';
import image4 from '../assets/images/4.png';
import image5 from '../assets/images/5.png';
import image6 from '../assets/images/6.png';
import image7 from '../assets/images/7.png';
import image8 from '../assets/images/8.png';

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const multiRandom = (lower: number = 0, upper: number = 1, count: number = 2): number[] => {
  const pickedNumbers = [];
  const pickNumber = () => {
    const randomNumber = random(lower, upper);
    if (pickedNumbers.includes(randomNumber)) return pickNumber();
    pickedNumbers.push(randomNumber);
    return pickedNumbers.length >= count ? pickedNumbers : pickNumber();
  };
  return pickNumber();
};

const getImageById = (id: number) => {
  switch (id) {
    case 1:
      return image1;
    case 2:
      return image2;
    case 3:
      return image3;
    case 4:
      return image4;
    case 5:
      return image5;
    case 6:
      return image6;
    case 7:
      return image7;
    case 8:
      return image8;
    default:
      return image1;
  }
};

export default {
  delay,
  multiRandom,
  getImageById,
};
