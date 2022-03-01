export function getFloatPosition(n: string): number {
  const float = n.lastIndexOf('.');
  return float === -1 ? -1 : n.length - float - 1;
}
