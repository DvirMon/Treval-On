function setRecordItem(record: Record<string, boolean>, item: string): Record<string, boolean> {
  return { ...record, [item]: true };
}

export function arrayToRecord(array: string[]): Record<string, boolean> {
  return array.reduce((record, item) => setRecordItem(record, item), {} as Record<string, boolean>);
}

export function saveToLocalStorage(key: string, value: any): void {
  console.log(value)
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string, remove: boolean = false): T | null {
  const item = localStorage.getItem(key);

  if (remove) {
    localStorage.removeItem(key);
  }

  return item ? JSON.parse(item) as T : null
}
