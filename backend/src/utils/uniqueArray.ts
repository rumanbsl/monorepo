export default function uniqueArray<T>(arg: T[]) {
  const unique = new Set(arg);
  return [...unique];
}
