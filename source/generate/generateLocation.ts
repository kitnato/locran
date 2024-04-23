import { plural } from "pluralize"

import { PLURALIZE_CHANCE } from "@locran/configuration"
import { LOCATIONS } from "@locran/data/locations"
import { generate } from "@locran/generate"

import type { GeneratorParameters } from "@locran/types"

export function generateLocation({ affixStructure, prefixTags, suffixTags }: GeneratorParameters) {
	const filteredLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

	if (filteredLocation === undefined) {
		throw new Error("Invalid location.")
	}

	const { canPluralize, name } = filteredLocation
	const location = generate({
		affixStructure,
		category: "location",
		name: canPluralize && Math.random() <= PLURALIZE_CHANCE ? plural(name) : name,
		prefixTags,
		suffixTags,
	})

	return location
}
