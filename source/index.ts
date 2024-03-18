import { addPluralRule } from "pluralize"

addPluralRule(/ix$/i, `ices`)
addPluralRule(/us$/i, `i`)

export { generateArtifact } from "@locran/generate/generateArtifact"
export { generateCreature } from "@locran/generate/generateCreature"
export { generateLocation } from "@locran/generate/generateLocation"
export { generateName } from "@locran/generate/generateName"
