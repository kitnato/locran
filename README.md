# LOCRAN

The LOCRAN (LOcation, CReature, Artifact, monster Name) system pseudo-randomly generates a variety of names for different irreverent fantasy-themed wildernesses, items and monsters.

At its core is a multi-part JSON library of (loosely) heroic-fantasy-world-themed words. This forms the basis for the generation and composition of (somewhat) coherent names for locations, creatures, artifacts and monster names.

## Affixes & filtering

Creatures can contain a prefix (e.g. Pustulant Ogre), suffix (e.g. Faerie of Woe) or both (e.g. Lackadaisical Jester of Brine). Locations and artifacts can additionally contain an articled suffix (e.g. Quivering Fortress of the Lord; or Arbalest of the Night). Monster names work by combining two defined names and adding an optional title which may be a creature or affix (e.g. Rotaxe; or Snaggledrool, the Dragon).

Parameters for themed [tags](#tags) and affix composition can be passed to customize the outcome.

## Installation

Install as an NPM package in your Typescript (or JS) project.

`npm install @kitnato/locran`

## Usage

Used as an ES6 module.

### Configuration

Defines the percentage chance of certain word arrangements. This is static, but can be viewed under [`source/configuration.ts`](./source/configuration.ts).

### Generators

The main functionality are the following methods:

```js
import {
  generateArtifact,
  generateCreature,
  generateLocation,
  generateName,
} from "@kitnato/locran";
```

They each take `GeneratorParameters` and a certain `Query` type (see [typing](#typing)) to return the desired output.

Example signature for generating a high-quality prefixed item name with a 40% chance for any suffix:

```js
const weapon = generateArtifact({
  affixStructure: Math.random() <= 0.4 ? "prefixAndSuffix" : "prefix",
  prefixTags: ["highQuality"],
  query: {
    artifactClass: "piercing",
    subtype: "melee",
    type: "weapon",
  },
});

console.log(weapon); // e.g. "Gilded Butter Knife of Destitution"
```

### Tags

Tags are attached to certain affixes to filter for specific themes or moods. They are the following:

- `elemental`
- `highQuality`
- `lowQuality`

### Typing

Typescript types can be freely imported and used in your project:

```js
import * from "@kitnato/locran/build/types";
```

This is useful when implementing for example the same classification of armor, shield and weapon types, or for making a custom query builder. Their definitions are found in [`source/types.ts`](./source/types.ts).

## Local development

You will need to use a command-line interface (CLI), as well as the following installed globally:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en) 18 or later
- NPM 8 or later

Steps to follow before commencing development:

1. Open the CLI and change into a suitable directory (e.g. `cd locran`).
2. Run `git clone git@github.com:kitnato/locran.git`
3. Run `cd locran`
4. Run `npm install`
5. Run `npm run prepare`

Committing changes will now run `lint-staged` to prepare the code for production.

Any changes should be in the form of a pull request on a separate feature branch.

## License

![CC BY-NC-SA 4.0](/assets/by-nc-sa.eu.svg?raw=true)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0).
