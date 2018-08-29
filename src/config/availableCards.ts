import flowerImg1 from "../assets/images/flower/flower-1.svg";
import flowerImg2 from "../assets/images/flower/flower-2.svg";
import flowerImg3 from "../assets/images/flower/flower-3.svg";
import flowerImg4 from "../assets/images/flower/flower-4.svg";
import pokemonImg1 from "../assets/images/pokemon/pokemon-1.svg";
import pokemonImg2 from "../assets/images/pokemon/pokemon-2.svg";
import pokemonImg3 from "../assets/images/pokemon/pokemon-3.svg";
import pokemonImg4 from "../assets/images/pokemon/pokemon-4.svg";

import { CardData } from "../types/CardData";

const availableCards: CardData[] = [
  { id: "flower-1", set: "flower", imgSrc: flowerImg1, color: "#A6E1DB" },
  { id: "flower-2", set: "flower", imgSrc: flowerImg2, color: "#F5F0ED" },
  { id: "flower-3", set: "flower", imgSrc: flowerImg3, color: "#BAE1FF" },
  { id: "flower-4", set: "flower", imgSrc: flowerImg4, color: "#FDF3C9" },
  { id: "pokemon-1", set: "pokemon", imgSrc: pokemonImg1, color: "#71E096" },
  { id: "pokemon-2", set: "pokemon", imgSrc: pokemonImg2, color: "#FE816D" },
  { id: "pokemon-3", set: "pokemon", imgSrc: pokemonImg3, color: "#668DE5" },
  { id: "pokemon-4", set: "pokemon", imgSrc: pokemonImg4, color: "#FFDC89" }
];

export default availableCards;
