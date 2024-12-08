import type { Matrix } from "./matrix";
import type { MatrixType } from "./matrix-type";

export class MatrixSlot {
  public constructor(acceptsType: MatrixType) {
    this._acceptsType = acceptsType;
  }

  private readonly _acceptsType: MatrixType;
  private _matrix: Matrix | undefined = undefined;

  public get acceptsType() {
    return this._acceptsType;
  }

  public get matrix(): Matrix | undefined {
    return this._matrix;
  }

  public set matrix(value: Matrix | undefined) {
    if (value && value.type.id !== this._acceptsType.id) {
      throw new Error(
        `Matrix of type ${value.type.id} cannot be set in a slot that accepts ${this._acceptsType.id}`,
      );
    }

    this._matrix = value;
  }
}
