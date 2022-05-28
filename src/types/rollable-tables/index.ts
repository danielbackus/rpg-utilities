export type RollableTableResult = string | RollableTable;

export type RollableTableItem = {
  min: number;
  max: number;
  results: string;
};

export type RollableTable = {
  name: string;
  roll: string; // a FoundryVTT roll expression
  items: RollableTableItem[];
}

export type RollableTables = {
  [k in number]: RollableTable
}