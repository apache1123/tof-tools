export function toPercentageString(number: number) {
  return number.toLocaleString(undefined, { style: "percent" });
}

export function toPercentageString2dp(number: number) {
  return number.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  });
}

export function toSignedPercentageString1dp(number: number) {
  return number.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "always",
  });
}

export function toIntegerString(number: number) {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
}

export function toSignedString(number: number) {
  return number.toLocaleString(undefined, {
    signDisplay: "always",
  });
}
