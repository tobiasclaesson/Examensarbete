export function checkArrayForDuplicates(arr: string[]): boolean {
  return new Set(arr).size !== arr.length;
}
