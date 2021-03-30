const isEmpty = (obj: Record<string, unknown>): boolean =>
	Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

export default isEmpty;
