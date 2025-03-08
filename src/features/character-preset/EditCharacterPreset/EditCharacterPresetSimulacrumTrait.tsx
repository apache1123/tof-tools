import { Box } from "@mui/material";
import { useSnapshot } from "valtio";

import { ErrorText } from "../../../components/common/ErrorText/ErrorText";
import { SimulacrumIcon } from "../../../components/simulacrum/SimulacrumIcon/SimulacrumIcon";
import { SimulacrumTraitAutocomplete } from "../../../components/simulacrum/SimulacrumTraitAutocomplete/SimulacrumTraitAutocomplete";
import { getSimulacrumTrait } from "../../../definitions/simulacra/simulacrum-traits";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";

export interface EditCharacterPresetSimulacrumTraitProps {
  characterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetSimulacrumTrait({
  characterPresetProxy,
}: EditCharacterPresetSimulacrumTraitProps) {
  const { simulacrumTrait } = useSnapshot(characterPresetProxy);

  return (
    <EditCharacterPresetSection
      title="Simulacrum trait"
      summary={
        simulacrumTrait ? (
          <Box sx={{ my: -1, display: "flex", alignItems: "center" }}>
            <SimulacrumIcon simulacrumId={simulacrumTrait.id} size={60} />
          </Box>
        ) : (
          <ErrorText sx={{ py: 0 }}>Trait not set</ErrorText>
        )
      }
      details={
        <SimulacrumTraitAutocomplete
          value={simulacrumTrait?.id}
          onChange={(value) => {
            characterPresetProxy.simulacrumTrait = value
              ? getSimulacrumTrait(value)
              : undefined;
          }}
        />
      }
    />
  );
}
