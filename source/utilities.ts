export function capitalizeAll(string: string) {
	// ^\w{1} matches the first letter of the word, or (|) \s+ matches any amount of whitespace between the words.
	return string.replaceAll(/(^\w)|(\s+\w)/g, letter => letter.toUpperCase())
}
