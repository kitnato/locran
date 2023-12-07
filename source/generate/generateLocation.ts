import { plural } from "pluralize";

import { PLURALIZE_CHANCE } from "@locran/configuration";
import { LOCATIONS } from "@locran/data/locations";
import { generate } from "@locran/generate";
import type { GeneratorParameters } from "@locran/types";

export function generateLocation({
  allowProfanity,
  nameStructure,
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
  const isPluralized = Math.random() <= PLURALIZE_CHANCE;
  const location = generate({
    allowProfanity,
    category: "location",
    name,
    nameStructure,
    prefixTags,
    suffixTags,
  });

  if (canPluralize && isPluralized) {
    return plural(location);
  }

  return location;
}
