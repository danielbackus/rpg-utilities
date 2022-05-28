import { CsvToObjArrayOptions } from "@src/types/file/csv";

export const CSV_ERRORS = {
  INCONSISTENT_COLUMNS: "Number of columns is inconsistent across rows."
} as const;

export const csvToObjArray = <T extends { [k: string]: string; }>(
  csv: string,
  options?: CsvToObjArrayOptions<T>
): T[] => {
  options?.validators?.input?.(csv);
  const rows = csv.split("\n");
  const [sample] = rows;
  const separator = options?.separator ?? ",";
  const columns = options?.hasHeaderRow
    ? sample.split(separator)
    : new Array(sample.length).map((_, i) => i);

  if (
    !rows
      .map((row) => row.split(separator))
      .map((row) => row?.length)
      .every((rowLength) => rowLength === sample.split(separator).length)
  ) {
    throw new Error(CSV_ERRORS.INCONSISTENT_COLUMNS);
  }

  const output = rows.map((row) => {
    return Object.fromEntries(
      row.split(separator).map((value, index) => [columns[index] ?? index, value])
    );
  });
  options?.validators?.output?.(output);
  return output as T[];
};
