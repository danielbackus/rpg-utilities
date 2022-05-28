import { CsvToObjArrayOptions } from "@src/types/file/csv";

export const csvToObjArray = <T,>(csv: string, options: CsvToObjArrayOptions<T>):T[]=> {
  options?.validators?.input?.(csv);
  const separator = options.separator ?? ",";
  const rows = csv.split("\n");
  const [sample] = rows;
  const columns = options?.hasHeaderRow ? sample.split(separator) : new Array(sample.length).map((_, i) => i);
  const output = rows.map(row => {
    return Object.fromEntries(
      row.split(separator).map((value, index) => ([columns[index], value]))
    );
  });
  options?.validators?.output?.(output);
  return output as unknown as T[];
}