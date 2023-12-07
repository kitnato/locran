import { CREATURES } from "@locran/data/creatures";
import { generate } from "@locran/generate";
import type { GeneratorParameters } from "@locran/types";

export function generateCreature({
  allowProfanity,
  nameStructure,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredCreatures = CREATURES.filter(({ isProfanity }) =>
    allowProfanity ? isProfanity === true || !isProfanity : !isProfanity,
  );

  const filteredCreature = filteredCreatures[Math.floor(Math.random() * filteredCreatures.length)];

  if (filteredCreature === undefined) {
    throw new Error("Invalid creature.");
  }

  return generate({
    allowProfanity,
    category: "creature",
    name: filteredCreature.name,
    nameStructure,
    prefixTags,
    suffixTags,
  });
}
