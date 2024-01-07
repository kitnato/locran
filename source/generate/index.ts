import { plural } from "pluralize";

import {
  APOSTROPHE_CHANCE,
  ARTICLE_CHANCE,
  CREATURE_AS_AFFIX_CHANCE,
  PLURALIZE_CHANCE,
} from "@locran/configuration";
import { AFFIXES } from "@locran/data/affixes";
import { CREATURES } from "@locran/data/creatures";
import type { Category, GeneratorParameters } from "@locran/types";
import { capitalizeAll } from "@locran/utilities";

export function generate({
  affixStructure = "none",
  allowProfanity = false,
  category,
  name,
  prefixTags = [],
  suffixTags = [],
}: GeneratorParameters & {
  category: Category;
  name: string;
}) {
  const canHaveCreatureAffix =
    prefixTags.length === 0 &&
    suffixTags.length === 0 &&
    ["artifact", "location"].includes(category) &&
    Math.random() <= CREATURE_AS_AFFIX_CHANCE;
  const filteredCreatureNamePrefixes: string[] = [];

  let prefix = "";
  let suffix = "";

  if (["prefix", "prefixAndSuffix"].includes(affixStructure)) {
    const filteredPrefixes = AFFIXES.filter(
      ({ isProfanity, name: affixName, tags, ...categories }) => {
        // Discard prefix if it's the same as the main name (e.g. "Fungus Fungus").
        if (affixName === name) {
          return false;
        }

        // Filter out only prefixes with profanity filter.
        const isValidPrefix =
          (allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity) &&
          categories[category]?.includes("prefix");

        // If we want a tagged prefix, check if the current affix has all of them, otherwise discard it.
        if (prefixTags.length > 0) {
          return isValidPrefix && prefixTags.every((prefixTag) => tags?.includes(prefixTag));
        }

        // Otherwise, return any prefix.
        return isValidPrefix;
      },
    ).map(({ name }) => name);

    // Artifacts and locations can also have a creature as a prefix.
    if (canHaveCreatureAffix) {
      filteredCreatureNamePrefixes.push(
        ...CREATURES.filter(({ isProfanity }) =>
          allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity,
        ).map(({ name }) => `${name}${Math.random() <= APOSTROPHE_CHANCE ? "'s" : ""}`),
      );
    }

    const prefixes = [...filteredPrefixes, ...filteredCreatureNamePrefixes];

    prefix = capitalizeAll(prefixes[Math.floor(Math.random() * prefixes.length)] ?? "");
  }

  if (["prefixAndSuffix", "suffix"].includes(affixStructure)) {
    const filteredSuffixes = AFFIXES.filter(
      ({ isProfanity, name: affixName, tags, ...categories }) => {
        if (affixName === name) {
          return false;
        }

        const affixes = categories[category];

        if (affixes === undefined) {
          return false;
        }

        const isValidSuffix =
          // Filter out only suffixes with profanity filter.
          ((allowProfanity && Boolean(isProfanity)) || !isProfanity) &&
          (affixes.includes("articledSuffix") || affixes.includes("suffix"));

        // If suffix is tagged, check if the current affix has all of them (with profanity filter).
        if (suffixTags.length > 0) {
          return isValidSuffix && suffixTags.every((suffixTag) => tags?.includes(suffixTag));
        }

        // Otherwise, return any valid suffix.
        return isValidSuffix;
      },
    );

    const filteredCreatureNameSuffixes = [];

    // Artifacts and locations can also have a creature as a suffix, but only if the prefix isn't already a creature.
    if (canHaveCreatureAffix && !filteredCreatureNamePrefixes.includes(prefix)) {
      filteredCreatureNameSuffixes.push(
        ...CREATURES.filter(({ isProfanity }) =>
          allowProfanity ? Boolean(isProfanity) || !isProfanity : !isProfanity,
        ).map(({ name }) => name),
      );
    }

    const suffixes = [...filteredSuffixes, ...filteredCreatureNameSuffixes];
    const suffixChoice = suffixes[Math.floor(Math.random() * suffixes.length)];

    let formattedSuffix = "";

    if (suffixChoice !== undefined) {
      // If the chosen suffix is a creature is can be plural alongside a potential article.
      if (typeof suffixChoice === "string") {
        formattedSuffix =
          Math.random() <= PLURALIZE_CHANCE
            ? `${Math.random() <= ARTICLE_CHANCE ? "the " : ""}${capitalizeAll(
                plural(suffixChoice),
              )}`
            : `the ${capitalizeAll(suffixChoice)}`;
      } else {
        // Otherwise it's an affix with an article depending on its type.
        formattedSuffix = `${
          suffixChoice[category]?.includes("articledSuffix") ? "the " : ""
        }${capitalizeAll(suffixChoice.name)}`;
      }
    }

    if (formattedSuffix !== "") {
      suffix = `of ${formattedSuffix}`;
    }
  }

  return `${prefix === "" ? "" : `${prefix} `}${capitalizeAll(name)}${
    suffix === "" ? "" : ` ${suffix}`
  }`;
}
