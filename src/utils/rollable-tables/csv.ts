import {
  CsvToObjArrayOptions,
  RollableTable,
  RollableTableItem,
} from "@src/types";
import { file } from "@src/utils";

export const csvToRollableTable = (
  csv: string,
  baseTable: Omit<RollableTable, "items">,
  options: CsvToObjArrayOptions<RollableTableItem>
): RollableTable => ({
  ...baseTable,
  items: file.csv.csvToObjArray<RollableTableItem>(csv, options),
});
