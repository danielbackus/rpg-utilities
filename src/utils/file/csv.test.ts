import { assert, describe, expect, it } from "vitest";

import { csvToObjArray, CSV_ERRORS } from "./csv";

describe("utils/file/csv", () => {
  describe("csvToObjArray", () => {
    describe("with invalid csv string", () => {
      describe("with one line", () => {
        const csvString =
          "Even though this has separators, this is not really a CSV.";

        it("should return as best it can", () => {
          // we cannot determine this is not a CSV conclusively
          // so just return the weird data in case the user wants it
          expect(csvToObjArray(csvString)).toEqual([
            {
              0: "Even though this has separators",
              1: " this is not really a CSV.",
            },
          ]);
        });
      });
      describe("with many lines", () => {
        const csvString = `
          <p>This, as you can see, is definitely not a csv.</p>
          <p>It has all kinds of weird stuff, like text, separators, and html tags.</p>
        `;
        it("should throw", () => {
          expect(() => csvToObjArray(csvString)).toThrowError(
            CSV_ERRORS.INCONSISTENT_COLUMNS
          );
        });
      });
    });
  });
});
