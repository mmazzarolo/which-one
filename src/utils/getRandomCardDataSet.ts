import { sample } from "lodash";
import availableCards from "../config/availableCards";

import { CardDataSet } from "../types/CardDataSet";

const getRandomCardDataSet = (): CardDataSet => {
  const randomCardData = sample(availableCards);
  return randomCardData ? randomCardData.set : availableCards[0].set;
};

export default getRandomCardDataSet;
