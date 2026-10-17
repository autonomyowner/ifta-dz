export function formatDzd(amount: number): string {
  return `${amount.toLocaleString("fr-DZ").replace(/ /g, " ")} DA`;
}

export function discountPercent(price: number, compare?: number): number | null {
  if (!compare || compare <= price) return null;
  return Math.round(((compare - price) / compare) * 100);
}
