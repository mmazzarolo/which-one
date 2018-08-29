import cards from "../config/availableCards";

import { CardData } from "../types/CardData";

const getCardData = (id: string): CardData => {
  const cardData = cards.find(x => x.id === id);
  return cardData || cards[0];
};

export default getCardData;
