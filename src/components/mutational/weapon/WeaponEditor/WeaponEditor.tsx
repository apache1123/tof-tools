import { Stack } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import type { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import type { Weapon } from "../../../../models/weapon/weapon";
import { MatrixSelectorModal } from "../../../presentational/matrix/MatrixSelectorModal/MatrixSelectorModal";
import { MatrixSlotCardList } from "../../../presentational/matrix/MatrixSlotCardList/MatrixSlotCardList";
import { WeaponDefinitionCardContent } from "../../../presentational/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../../../presentational/weapon/WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponEditorProps {
  weaponProxy: Weapon;
  allMatricesProxy: Matrix[];
}

export function WeaponEditor({
  weaponProxy,
  allMatricesProxy,
}: WeaponEditorProps) {
  const {
    id,
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

  const allMatrices = useSnapshot(allMatricesProxy) as Matrix[];
  const filteredMatrices = addingMatrixTypeId
    ? allMatrices.filter((matrix) => matrix.type.id === addingMatrixTypeId)
    : [];

  return (
    <>
      <Stack sx={{ gap: 2, alignItems: "center" }}>
        <WeaponDefinitionCardContent
          id={id}
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
          matrixSlots={matrixSlots}
          onClick={(matrixSlot) => {
            setAddingMatrixTypeId(matrixSlot.acceptsType.id);
          }}
        />
      </Stack>

      <MatrixSelectorModal
        open={!!addingMatrixTypeId}
        matrices={filteredMatrices}
        onSelect={(matrix) => {
          const matrixProxy = allMatricesProxy.find(
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
