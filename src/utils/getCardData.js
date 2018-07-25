/* @flow */
import image1 from "../assets/images/flowers-1.svg";
import image2 from "../assets/images/flowers-2.svg";
import image3 from "../assets/images/3.png";
import image4 from "../assets/images/4.png";
import image5 from "../assets/images/5.png";
import image6 from "../assets/images/6.png";
import image7 from "../assets/images/7.png";
import image8 from "../assets/images/8.png";

const getCardData = (id: number): { src: string, backgroundColor: string } => {
  switch (id) {
    case 1:
      return { src: image1, backgroundColor: "#A6E1DB" };
    case 2:
      return { src: image2, backgroundColor: "#F8FCDA" };
    // case 3:
    //   return image3;
    // case 4:
    //   return image4;
    // case 5:
    //   return image5;
    // case 6:
    //   return image6;
    // case 7:
    //   return image7;
    // case 8:
    //   return image8;
    default:
      return { src: image1, backgroundColor: "red" };
  }
};

export default getCardData;
