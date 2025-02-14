import { Stack } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { MatrixSelector } from "../../components/matrix/MatrixSelector/MatrixSelector";
import { MatrixSlotCard } from "../../components/matrix/MatrixSlotCard/MatrixSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { Matrix } from "../../models/matrix/matrix";
import type { MatrixTypeId } from "../../models/matrix/matrix-type";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { EditMatrix } from "../matrix/EditMatrix";
import { EditWeaponPresetGroupCommon } from "./EditWeaponPresetGroupCommon";

export interface EditWeaponPresetProps {
  weaponPresetProxy: WeaponPreset;
  characterId: CharacterId;
  onFinish(): void;
}

export function EditWeaponPreset({
  weaponPresetProxy,
  characterId,
  onFinish,
}: EditWeaponPresetProps) {
  const weaponPreset = useSnapshot(weaponPresetProxy) as WeaponPreset;
  const { matrixSlots } = weaponPreset;

  const [addingMatrixTypeId, setAddingMatrixTypeId] = useState<
    MatrixTypeId | undefined
  >(undefined);
  const [editingMatrixProxy, setEditingMatrixProxy] = useState<
    Matrix | undefined
  >(undefined);

  const { items: allMatrices, itemProxies: allMatrixProxies } =
    useItemsBelongingToCharacter(db.get("matrices"), characterId);
  const filteredMatrices = addingMatrixTypeId
    ? allMatrices.filter((matrix) => matrix.type.id === addingMatrixTypeId)
    : [];

  return (
    <>
      <EditorModal
        modalContent={
          <>
            <Stack sx={{ gap: 3 }}>
              <EditWeaponPresetGroupCommon
                characterId={characterId}
                weaponDefinitionId={weaponPreset.definition.id}
              />

              <CardList>
                {matrixSlots.getSlots().map((slot) => (
                  <MatrixSlotCard
                    key={slot.acceptsType.id}
                    type={slot.acceptsType}
                    matrix={slot.matrix}
                    onEdit={() => {
                      const editingMatrix = slot.matrix;
                      if (editingMatrix) {
                        const matrixProxy = allMatrixProxies.find(
                          (matrix) => matrix.id === editingMatrix.id,
                        );
                        setEditingMatrixProxy(matrixProxy);
                      }
                    }}
                    onSwap={() => {
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
            </Stack>
          </>
        }
        open={!!weaponPreset}
        onClose={() => {
          onFinish();
        }}
        itemName="Weapon preset"
        showDelete
        onDelete={() => {
          db.get("weaponPresets").remove(weaponPresetProxy.id);
          onFinish();
        }}
        maxWidth={false}
      />

      <StyledModal
        modalContent={
          <MatrixSelector
            matrices={filteredMatrices}
            onSelect={(matrix) => {
              const matrixProxy = db.get("matrices").find(matrix.id);
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

      {editingMatrixProxy && (
        <EditorModal
          modalContent={<EditMatrix matrixProxy={editingMatrixProxy} />}
          open={!!editingMatrixProxy}
          onClose={() => {
            setEditingMatrixProxy(undefined);
          }}
          fullWidth
        />
      )}
    </>
  );
}
