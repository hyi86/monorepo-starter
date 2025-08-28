export type SelectionMode = 'none' | 'all' | 'column' | 'row';

export type Column = {
  id: string;
  width: number;
};

export type Data = {
  [key: string]: any;
  id: string;
  value: string;
};

export type Cell = {
  row: number;
  col: number;
};
