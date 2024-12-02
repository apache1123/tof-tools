import type { Matrix } from "./matrix";
import type { MatrixType } from "./matrix-type";

export class MatrixSlot {
  public constructor(acceptsType: MatrixType) {
    this._acceptsType = acceptsType;
  }

  private _acceptsType: MatrixType;
  private _matrix: Matrix | undefined = undefined;

  public get acceptsType() {
    return this._acceptsType;
  }

  public get matrix(): Matrix | undefined {
    return this._matrix;
  }

  public set matrix(value: Matrix | undefined) {
    if (value && value.type !== this._acceptsType) {
      throw new Error(
        `Matrix of type ${value.type} cannot be set in a slot that accepts ${this._acceptsType}`,
      );
    }
  }
}
