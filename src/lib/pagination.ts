export type SearchParamValue = string | string[] | undefined;

export function parsePage(value: SearchParamValue) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const page = Number(rawValue);

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
