import { AFFIX_NAME_TITLE_CHANCE } from "@locran/configuration"
import { AFFIXES } from "@locran/data/affixes"
import { CREATURES } from "@locran/data/creatures"
import { NAMES } from "@locran/data/names"
import { capitalizeAll } from "@locran/utilities"

export function generateName({ isTitled = false }: { isTitled?: boolean }) {
	const prefixes = NAMES.filter(({ affix }) => affix.includes("prefix"))
	const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
	const suffixes = NAMES.filter(({ affix }) => affix.includes("suffix"))
	const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

	if (prefix === undefined || suffix === undefined) {
		throw new Error("Invalid name.")
	}

	const connector = prefix.name.at(-1) === suffix.name[0] ? "-" : ""

	let title

	if (isTitled) {
		const titles = [...CREATURES]

		if (Math.random() <= AFFIX_NAME_TITLE_CHANCE) {
			const filteredAffixes = AFFIXES.filter(({ creature, name }) =>
				name === prefix.name || name === suffix.name || name.endsWith("ing")
					? false
					: creature?.includes("prefix") ?? creature?.includes("suffix"),
			)

			titles.push(...filteredAffixes)
		}

		title = titles[Math.floor(Math.random() * titles.length)]

		if (title === undefined) {
			throw new Error("Invalid title.")
		}
	}

	return `${capitalizeAll(prefix.name)}${connector}${suffix.name}${title === undefined
		? ""
		: `, the ${capitalizeAll(title.name)}`}`
}
