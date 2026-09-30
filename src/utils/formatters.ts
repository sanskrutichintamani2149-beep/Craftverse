/**
 * Indian currency formatters and number helpers
 */

export const formatINR = (amount: number | undefined | null, includeDecimals = false): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export const formatCompactINR = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';

  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 10000000) {
    // Crores
    const cr = abs / 10000000;
    return `${sign}₹${cr.toFixed(cr >= 10 ? 1 : 2).replace(/\.0+$/, '')} Cr`;
  }
  if (abs >= 100000) {
    // Lakhs
    const lk = abs / 100000;
    return `${sign}₹${lk.toFixed(lk >= 10 ? 1 : 2).replace(/\.0+$/, '')} L`;
  }
  if (abs >= 1000) {
    // Thousands
    const k = abs / 1000;
    return `${sign}₹${k.toFixed(1).replace(/\.0+$/, '')}k`;
  }

  return formatINR(amount);
};

export const parseNumberInput = (value: string | number): number => {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
