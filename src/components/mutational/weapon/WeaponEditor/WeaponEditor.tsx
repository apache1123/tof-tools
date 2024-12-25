import { Stack } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import type { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixPreset } from "../../../../models/matrix/matrix-preset";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import type { Weapon } from "../../../../models/weapon/weapon";
import { MatrixSelectorModal } from "../../../presentational/matrix/MatrixSelectorModal/MatrixSelectorModal";
import { MatrixSlotCardList } from "../../../presentational/matrix/MatrixSlotCardList/MatrixSlotCardList";
import { WeaponDefinitionCardContent } from "../../../presentational/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../../../presentational/weapon/WeaponStarsSelector/WeaponStarsSelector";
import { WeaponMatrixPresetsEditor } from "../WeaponMatrixPresetsEditor/WeaponMatrixPresetsEditor";

export interface WeaponEditorProps {
  weaponProxy: Weapon;
  allMatrixProxies: Matrix[];
  matrixPresetProxies: MatrixPreset[];
  onAddPreset(): void;
}

export function WeaponEditor({
  weaponProxy,
  allMatrixProxies,
  matrixPresetProxies,
  onAddPreset,
}: WeaponEditorProps) {
  const {
    definitionId,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
    stars,
    matrixSlots,
  } = useSnapshot(weaponProxy) as Weapon;

  const [addingMatrixTypeId, setAddingMatrixTypeId] = useState<
    MatrixTypeId | undefined
  >(undefined);

  const allMatrices = useSnapshot(allMatrixProxies) as Matrix[];
  const filteredMatrices = addingMatrixTypeId
    ? allMatrices.filter((matrix) => matrix.type.id === addingMatrixTypeId)
    : [];

  return (
    <>
      <Stack sx={{ gap: 2, alignItems: "center" }}>
        <WeaponDefinitionCardContent
          id={definitionId}
          weaponDisplayName={weaponDisplayName}
          simulacrumDisplayName={simulacrumDisplayName}
          iconWeaponName={iconWeaponName}
          elementalIcon={elementalIcon}
          type={type}
          iconSize={120}
        />
        <WeaponStarsSelector
          stars={stars}
          onStarsChange={(stars) => {
            weaponProxy.stars = stars;
          }}
        />
        <MatrixSlotCardList
          matrixSlots={matrixSlots.getSlots()}
          onClick={(matrixSlot) => {
            setAddingMatrixTypeId(matrixSlot.acceptsType.id);
          }}
          onRemove={(matrixSlot) => {
            weaponProxy.matrixSlots.getSlot(matrixSlot.acceptsType.id).matrix =
              undefined;
          }}
        />
        <WeaponMatrixPresetsEditor
          weaponProxy={weaponProxy}
          matrixPresetProxies={matrixPresetProxies}
          onAdd={onAddPreset}
        />
      </Stack>

      <MatrixSelectorModal
        open={!!addingMatrixTypeId}
        matrices={filteredMatrices}
        onSelect={(matrix) => {
          const matrixProxy = allMatrixProxies.find(
            (matrixProxy) => matrixProxy.id === matrix.id,
          );
          if (!matrixProxy) throw new Error("Matrix not found");

          weaponProxy.matrixSlots.getSlot(matrix.type.id).matrix = matrixProxy;

          setAddingMatrixTypeId(undefined);
        }}
        onClose={() => setAddingMatrixTypeId(undefined)}
      />
    </>
  );
}
