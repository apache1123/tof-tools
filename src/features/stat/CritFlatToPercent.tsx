import { Box, Paper, Stack, Typography } from "@mui/material";
import { proxy, useSnapshot } from "valtio";

import { NumericInput } from "../../components/common/NumericInput/NumericInput";
import { NumericString } from "../../components/common/NumericString/NumericString";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { maxCharacterLevel } from "../../definitions/character-level";
import { calculateCritRatePercentFromFlat } from "../../utils/stat-calculation-utils";

const state = proxy<{ critFlat: number; characterLevel: number }>({
  critFlat: 0,
  characterLevel: maxCharacterLevel,
});

export function CritFlatToPercent() {
  const snap = useSnapshot(state);

  const critPercent = calculateCritRatePercentFromFlat(
    snap.critFlat,
    snap.characterLevel,
  );

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <SectionHeading>Calculate crit rate % from crit</SectionHeading>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box width={200}>
            <NumericInput
              id="crit-flat"
              label="Crit"
              variant="filled"
              value={snap.critFlat}
              onChangeCommitted={(value) => {
                state.critFlat = value;
              }}
            />
          </Box>
          <Box width={200}>
            <NumericInput
              id="char-level"
              label="Character level"
              variant="filled"
              value={snap.characterLevel}
              onChangeCommitted={(value) => {
                state.characterLevel = value;
              }}
              helperText={
                snap.characterLevel !== maxCharacterLevel ? (
                  <Box component="span" sx={{ color: "warning.main" }}>
                    Current max character level is {maxCharacterLevel}
                  </Box>
                ) : undefined
              }
            />
          </Box>
        </Stack>
        <Typography>
          Crit rate %:{" "}
          <NumericString value={critPercent} variant="percentage2dp" />
        </Typography>
      </Stack>
    </Paper>
  );
}
