export function toPercentageString(number: number) {
  return number.toLocaleString('en', { style: 'percent' });
}

export function toPercentageString2dp(number: number) {
  return number.toLocaleString('en', {
    style: 'percent',
    maximumFractionDigits: 2,
  });
}

export function toSignedPercentageString1dp(number: number) {
  return number.toLocaleString('en', {
    style: 'percent',
    maximumFractionDigits: 1,
    signDisplay: 'always',
  });
}
