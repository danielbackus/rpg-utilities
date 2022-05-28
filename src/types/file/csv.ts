export type CsvToObjArrayOptions<T> = {
  hasHeaderRow?: boolean;
  separator?: string;
  validators?: {
    input?: (input: string) => boolean;
    output?: (output: { [k: string]: string; }[]) => boolean;
  }
}