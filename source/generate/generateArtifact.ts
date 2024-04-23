import { plural } from "pluralize"

import { PLURALIZE_CHANCE } from "@locran/configuration"
import { ARTIFACTS } from "@locran/data/artifacts"
import { generate } from "@locran/generate"

import type { ArtifactQuery, GeneratorParameters } from "@locran/types"

export function generateArtifact({
	affixStructure,
	prefixTags,
	query,
	suffixTags,
}: GeneratorParameters & {
	query: ArtifactQuery
}) {
	const filteredArtifacts = ARTIFACTS.filter(
		artifact => artifact.type === query.type && (
			"subtype" in query ? "subtype" in artifact ? artifact.subtype === query.subtype : false : true
		) && ("artifactClass" in query ? "artifactClass" in artifact ? artifact.artifactClass === query.artifactClass : false : true),
	)
	const filteredArtifact = filteredArtifacts[Math.floor(Math.random() * filteredArtifacts.length)]

	if (filteredArtifact === undefined) {
		throw new Error("Invalid artifact.")
	}

	const { canPluralize, name } = filteredArtifact

	const artifact = generate({
		affixStructure,
		category: "artifact",
		name: canPluralize && Math.random() <= PLURALIZE_CHANCE ? plural(name) : name,
		prefixTags,
		suffixTags,
	})

	return artifact
}
