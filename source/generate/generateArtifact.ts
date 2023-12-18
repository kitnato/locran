import { plural } from "pluralize";

import { PLURALIZE_CHANCE } from "@locran/configuration";
import { ARTIFACTS } from "@locran/data/artifacts";
import { generate } from "@locran/generate";
import type { ArtifactQuery, GeneratorParameters } from "@locran/types";

export function generateArtifact({
  affixStructure,
  allowProfanity,
  prefixTags,
  query,
  suffixTags,
}: GeneratorParameters & {
  query: ArtifactQuery;
}) {
  const filteredArtifacts = ARTIFACTS.filter((artifact) => {
    const isProfanity = Boolean(artifact.isProfanity);

    return (
      artifact.type === query.type &&
      ("subtype" in query
        ? "subtype" in artifact
          ? artifact.subtype === query.subtype
          : false
        : true) &&
      ("artifactClass" in query
        ? "artifactClass" in artifact
          ? artifact.artifactClass === query.artifactClass
          : false
        : true) &&
      (allowProfanity ? isProfanity || !isProfanity : !isProfanity)
    );
  });
  const filteredArtifact = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)];

  if (filteredArtifact === undefined) {
    throw new Error("Invalid artifact.");
  }

  const { canPluralize, name } = filteredArtifact;

  const artifact = generate({
    affixStructure,
    allowProfanity,
    category: "artifact",
    name: canPluralize && Math.random() <= PLURALIZE_CHANCE ? plural(name) : name,
    prefixTags,
    suffixTags,
  });

  return artifact;
}
