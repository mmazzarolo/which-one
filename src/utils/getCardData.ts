import { get } from "lodash";
import cards from "../config/cards";

const getCardData = (id: string): { src: string; backgroundColor: string } => {
  const cardData = get(cards, id);
  return cardData;
};

export default getCardData;
