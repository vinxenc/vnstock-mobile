/**
 * Formatting helpers for the vnstock app.
 *
 * NOTE: The Lynx JS runtime does not guarantee `Intl`, so these format
 * numbers manually instead of relying on `Intl.NumberFormat`.
 */

/** Group digits with a thousands separator, e.g. 1234567 -> "1.234.567". */
function groupDigits(value: number): string {
  return String(Math.abs(Math.round(value))).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.',
  );
}

/** Format a number as Vietnamese Dong, e.g. 1234567 -> "1.234.567 ₫". */
export function formatVND(value: number): string {
  const sign = value < 0 ? '-' : '';
  return `${sign}${groupDigits(value)} ₫`;
}

/** Format a signed percentage change, e.g. 1.234 -> "+1.23%". */
export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
