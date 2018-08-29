import { sampleSize } from "lodash";
import availableCards from "../config/availableCards";
import getRandomCardDataSet from "./getRandomCardDataSet";

import { CardData } from "../types/CardData";

const getRandomCardDataPair = (): CardData[] => {
  const randomCardDataSet = getRandomCardDataSet();
  const sameSetCardData = availableCards.filter(
    x => x.set === randomCardDataSet
  );
  const cardDataPairs = sampleSize(sameSetCardData, 2);
  return cardDataPairs;
};

export default getRandomCardDataPair;
