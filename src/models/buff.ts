export interface Buff {
  name: string;
  value: number;
  description?: string;
}

export interface MatrixBuff extends Omit<Buff, 'value'> {
  starValues: { star: 0 | 1 | 2 | 3; value: number }[];
}
