import { GridData } from "../types";

export const isEqual = (oldData: GridData, newData: GridData) =>
  JSON.stringify(oldData) !== JSON.stringify(newData);
