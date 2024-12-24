import type { MatrixPreset } from "../../../models/matrix/matrix-preset";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { MatrixPresetDto } from "./dtos/matrix-preset-dto";
import { dtoToMatrixPreset, matrixPresetToDto } from "./dtos/matrix-preset-dto";

export class MatrixPresetRepository extends ValtioRepository<
  MatrixPreset,
  MatrixPresetDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: MatrixPreset): MatrixPresetDto {
    return matrixPresetToDto(item);
  }

  protected override dtoToItem(dto: MatrixPresetDto): MatrixPreset {
    return dtoToMatrixPreset(dto, this.db.get("matrices"));
  }
}
