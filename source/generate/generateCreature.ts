import { CREATURES } from "@locran/data/creatures";
import { generate } from "@locran/generate";
import type { GeneratorParameters } from "@locran/types";

export function generateCreature({ affixStructure, prefixTags, suffixTags }: GeneratorParameters) {
  const filteredCreature = CREATURES[Math.floor(Math.random() * CREATURES.length)];

  if (filteredCreature === undefined) {
    throw new Error("Invalid creature.");
  }

  return generate({
    affixStructure,
    category: "creature",
    name: filteredCreature.name,
    prefixTags,
    suffixTags,
  });
}
