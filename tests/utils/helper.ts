export function normalizeCurrency(value: string | number): string {
    return Number(String(value).replace('$', '')).toFixed(2);
}