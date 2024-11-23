// Referenced from https://github.com/minimal-ui-kit/material-kit-react

import {
  Box,
  ButtonBaseProps,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { charactersState } from "../../../states/states";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Character } from "../../../models/v4/character/character";
import { ComingSoonIcon } from "../../../components/ComingSoonIcon/ComingSoonIcon";

export type CharacterSelectorProps = ButtonBaseProps;

export function CharacterSelector({ sx, ...other }: CharacterSelectorProps) {
  const characters = useSnapshot(charactersState);
  function handleChangeCharacter(character: Character) {
    charactersState.selected = character;
    handleClosePopover();
  }

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null,
  );
  function handleOpenPopover(event: React.MouseEvent<HTMLButtonElement>) {
    setOpenPopover(event.currentTarget);
  }
  function handleClosePopover() {
    setOpenPopover(null);
  }

  return (
    <>
      <ButtonBase
        onClick={handleOpenPopover}
        sx={{
          pl: 2,
          pr: 1,
          py: 2,
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          bgcolor: (theme) => theme.palette.surface0.main,
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {characters.selected?.name}
          </Typography>
        </Box>

        <UnfoldMoreIcon />
      </ButtonBase>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
      >
        <MenuList sx={{ width: 210, p: 0.5 }}>
          {characters.items.map((character, i) => {
            const isSelected = character.id === characters.selected?.id;

            return (
              <MenuItem
                key={character.id}
                selected={isSelected}
                onClick={() => handleChangeCharacter(charactersState.items[i])}
                sx={{ typography: "body2" }}
              >
                <Typography
                  variant="inherit"
                  fontWeight={isSelected ? "bold" : "inherit"}
                >
                  {character.name}
                </Typography>
              </MenuItem>
            );
          })}
          <Tooltip title="Not yet implemented. Coming later">
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                typography: "body2",
              }}
            >
              <>
                <Typography
                  variant="inherit"
                  sx={{ color: (theme) => theme.palette.text.disabled }}
                >
                  Add wanderer
                </Typography>
                <ComingSoonIcon />
              </>
            </MenuItem>
          </Tooltip>
        </MenuList>
      </Popover>
    </>
  );
}
