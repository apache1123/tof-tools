import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";

import type { Team } from "../models/team";
import { Weapon } from "../models/weapon";
import theme from "../theme";
import { EmptyWeaponEditor, WeaponEditor } from "./WeaponEditor";

export interface TeamProps {
  teamSnap: Team;
  teamState: Team;
}

export function TeamEditor({ teamSnap, teamState }: TeamProps) {
  const stackDividerOrientation = useMediaQuery(theme.breakpoints.down("sm"))
    ? "horizontal"
    : "vertical";

  const {
    weapon1: weapon1State,
    weapon2: weapon2State,
    weapon3: weapon3State,
  } = teamState;
  const {
    weapon1: weapon1Snap,
    weapon2: weapon2Snap,
    weapon3: weapon3Snap,
  } = teamSnap;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Weapons/Matrices
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-evenly"
        spacing={5}
        divider={
          <Divider orientation={stackDividerOrientation} flexItem={true} />
        }
        useFlexGap
        flexWrap="wrap"
        mt={2}
      >
        {weapon1Snap && weapon1State ? (
          <WeaponEditor
            weaponSnap={weapon1Snap}
            weaponState={weapon1State}
            onClearWeapon={() => {
              teamState.weapon1 = undefined;
            }}
            data-testid="weapon1"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              teamState.weapon1 = new Weapon(definition);
            }}
            data-testid="weapon1"
          />
        )}
        {weapon2Snap && weapon2State ? (
          <WeaponEditor
            weaponSnap={weapon2Snap}
            weaponState={weapon2State}
            onClearWeapon={() => {
              teamState.weapon2 = undefined;
            }}
            data-testid="weapon2"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              teamState.weapon2 = new Weapon(definition);
            }}
            data-testid="weapon2"
          />
        )}
        {weapon3Snap && weapon3State ? (
          <WeaponEditor
            weaponSnap={weapon3Snap}
            weaponState={weapon3State}
            onClearWeapon={() => {
              teamState.weapon3 = undefined;
            }}
            data-testid="weapon3"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              teamState.weapon3 = new Weapon(definition);
            }}
            data-testid="weapon3"
          />
        )}
      </Stack>
    </Box>
  );
}
