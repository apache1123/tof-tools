import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import type { EditorModalProps } from "../../components/common/Modal/EditorModal";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { MatrixSelectorModal } from "../../components/matrix/MatrixSelectorModal/MatrixSelectorModal";
import { MatrixSlotCard } from "../../components/matrix/MatrixSlotCard/MatrixSlotCard";
import type { Matrix } from "../../models/matrix/matrix";
import type { MatrixTypeId } from "../../models/matrix/matrix-type";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";

export interface WeaponPresetEditorProps extends EditorModalProps {
  weaponPresetProxy: WeaponPreset;
  allMatrixProxies: Matrix[];
}

export function WeaponPresetEditor({
  weaponPresetProxy,
  allMatrixProxies,
  ...props
}: WeaponPresetEditorProps) {
  const { matrixSlots } = useSnapshot(weaponPresetProxy);

  const [addingMatrixTypeId, setAddingMatrixTypeId] = useState<
    MatrixTypeId | undefined
  >(undefined);

  const allMatrices = useSnapshot(allMatrixProxies) as Matrix[];
  const filteredMatrices = addingMatrixTypeId
    ? allMatrices.filter((matrix) => matrix.type.id === addingMatrixTypeId)
    : [];

  return (
    <EditorModal
      modalContent={
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

          <MatrixSelectorModal
            open={!!addingMatrixTypeId}
            matrices={filteredMatrices}
            onSelect={(matrix) => {
              const matrixProxy = allMatrixProxies.find(
                (matrixProxy) => matrixProxy.id === matrix.id,
              );
              if (!matrixProxy) throw new Error("Matrix not found");

              weaponPresetProxy.matrixSlots.getSlot(matrix.type.id).matrix =
                matrixProxy;

              setAddingMatrixTypeId(undefined);
            }}
            onClose={() => setAddingMatrixTypeId(undefined)}
          />
        </>
      }
      maxWidth={false}
      {...props}
    />
  );
}
