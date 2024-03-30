export function toMinutesAndSeconds(milliseconds: number) {
  const date = new Date(milliseconds);
  return `${date.getMinutes()}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
}
