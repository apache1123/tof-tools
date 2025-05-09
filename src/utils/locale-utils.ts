export function getNumberSeparators(): {
  decimalSeparator: string;
  groupSeparator: string;
} {
  const formatter = new Intl.NumberFormat();
  const parts = formatter.formatToParts(10000.1);
  const decimalSeparator =
    parts.find((part) => part.type === "decimal")?.value ?? ".";
  const groupSeparator =
    parts.find((part) => part.type === "group")?.value ?? ",";
  return { decimalSeparator, groupSeparator };
}

export function toShortNumberFormat(number: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
}
