import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

export interface EditCharacterPresetSectionProps {
  title: string;
  summary: ReactNode;
  details: ReactNode;
  expand?: boolean;
}

export function EditCharacterPresetSection({
  title,
  summary,
  details,
  expand,
}: EditCharacterPresetSectionProps) {
  return (
    <Accordion elevation={1} defaultExpanded={expand}>
      <AccordionSummary>
        <Stack
          direction="row"
          sx={{ gap: 2, alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography variant="h6">{title}</Typography>
          {summary}
        </Stack>
      </AccordionSummary>

      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  );
}
