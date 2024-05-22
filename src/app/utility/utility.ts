export function isEmptyOrNull(value: any) {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  }
  return false;
}
