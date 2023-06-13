export const pick = <T extends object>(obj: T, keys: string[]) => {
	keys = [...new Set(keys)];
	const then: Record<string, string[]> = {};
	const result = (Array.isArray(obj) ? [] : {}) as Partial<T>;
	for (const key of keys) {
		if (!key.includes(".")) {
			obj[key] === undefined || (result[key] = obj[key]);
		}
		else {
			const index = key.indexOf(".");
			const k = key.slice(0, index);
			const v = key.slice(index + 1);
			then[k] ? then[k].push(v) : (then[k] = [v]);
		}
	}
	for (const [k, v] of Object.entries(then)) {
		if (!obj[k]) continue;
		result[k] = pick(obj[k], v);
	}
	return result;
};
