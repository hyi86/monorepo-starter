// date to unix epoch
export function toUnix(dateStr: string) {
  return new Date(dateStr).getTime() / 1000;
}
