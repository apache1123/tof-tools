import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { MatrixSelector } from "../../components/matrix/MatrixSelector/MatrixSelector";
import { MatrixSlotCard } from "../../components/matrix/MatrixSlotCard/MatrixSlotCard";
import type { CharacterId } from "../../models/character/character";
import type { Matrix } from "../../models/matrix/matrix";
import type { MatrixTypeId } from "../../models/matrix/matrix-type";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useMatrices } from "../matrices/useMatrices";

export interface WeaponPresetEditorProps {
  weaponPresetProxy: WeaponPreset;
  characterId: CharacterId;
}

export function WeaponPresetEditor({
  weaponPresetProxy,
  characterId,
}: WeaponPresetEditorProps) {
  const { matrixSlots } = useSnapshot(weaponPresetProxy);

  const [addingMatrixTypeId, setAddingMatrixTypeId] = useState<
    MatrixTypeId | undefined
  >(undefined);

  const { matrixProxies } = useMatrices(characterId);

  const allMatrices = useSnapshot(matrixProxies) as Matrix[];
  const filteredMatrices = addingMatrixTypeId
    ? allMatrices.filter((matrix) => matrix.type.id === addingMatrixTypeId)
    : [];

  return (
    <>
      <CardList>
        {matrixSlots.getSlots().map((slot) => (
          <MatrixSlotCard
            key={slot.acceptsType.id}
            type={slot.acceptsType}
            matrix={slot.matrix}
            onClick={() => {
              setAddingMatrixTypeId(slot.acceptsType.id);
            }}
            onRemove={() => {
              weaponPresetProxy.matrixSlots.getSlot(
                slot.acceptsType.id,
              ).matrix = undefined;
            }}
          />
        ))}
      </CardList>

      <StyledModal
        modalContent={
          <MatrixSelector
            matrices={filteredMatrices}
            onSelect={(matrix) => {
              const matrixProxy = matrixProxies.find(
                (matrixProxy) => matrixProxy.id === matrix.id,
              );
              if (!matrixProxy) throw new Error("Matrix not found");

              weaponPresetProxy.matrixSlots.getSlot(matrix.type.id).matrix =
                matrixProxy;

              setAddingMatrixTypeId(undefined);
            }}
          />
        }
        open={!!addingMatrixTypeId}
        onClose={() => setAddingMatrixTypeId(undefined)}
        showCancel
        maxWidth={false}
        fullWidth
      />
    </>
  );
}
