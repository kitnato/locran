import { plural } from "pluralize";

import { PLURALIZE_CHANCE } from "@locran/configuration";
import { LOCATIONS } from "@locran/data/locations";
import { generate } from "@locran/generate";
import type { GeneratorParameters } from "@locran/types";

export function generateLocation({
  affixStructure,
  allowProfanity,
  prefixTags,
  suffixTags,
}: GeneratorParameters) {
  const filteredLocations = LOCATIONS.filter((location) => {
    const isProfanity = Boolean(location.isProfanity);

    return allowProfanity ? isProfanity || !isProfanity : !isProfanity;
  });
  const filteredLocation = filteredLocations[Math.floor(Math.random() * filteredLocations.length)];

  if (filteredLocation === undefined) {
    throw new Error("Invalid location.");
  }

  const { canPluralize, name } = filteredLocation;
  const location = generate({
    affixStructure,
    allowProfanity,
    category: "location",
    name: canPluralize && Math.random() <= PLURALIZE_CHANCE ? plural(name) : name,
    prefixTags,
    suffixTags,
  });

  return location;
}
