import { Tooltip, Typography } from "@mui/material";
import Image from "next/image";

import type { CoreElementalType } from "../../../definitions/elemental-type";
import { NumericInput } from "../../common/NumericInput/NumericInput";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";

export interface BaseAttackInputProps {
  element: CoreElementalType;
  value: number;
  onChange(value: number): void;
}

export function BaseAttackInput({
  element,
  value,
  onChange,
}: BaseAttackInputProps) {
  return (
    <NumericInput
      id={`base-attack-${element}`}
      label={
        <ElementalStyledText elementalType={element}>
          Base attack ({element})
        </ElementalStyledText>
      }
      required
      error={!value}
      value={value}
      onChangeCommitted={onChange}
      helperText={
        <Tooltip
          title={
            <Image
              src="/base_attack_example.png"
              alt="base-attack-example"
              width={230}
              height={90}
            />
          }
          enterTouchDelay={0}
        >
          <span>
            <Typography variant="inherit" component="span" color="info.main">
              This is <b>NOT</b> your elemental attack value you see on the
              Wanderer screen.{" "}
            </Typography>
            <Typography variant="inherit" component="span">
              Instead, it is the first number when you click on your elemental
              attack value. Click here for example
            </Typography>
          </span>
        </Tooltip>
      }
    />
  );
}
