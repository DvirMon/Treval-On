function setRecordItem(record: Record<string, boolean>, item: string): Record<string, boolean> {
  return { ...record, [item]: true };
}

export function arrayToRecord(array: string[]): Record<string, boolean> {
  return array.reduce((record, item) => setRecordItem(record, item), {} as Record<string, boolean>);
}
