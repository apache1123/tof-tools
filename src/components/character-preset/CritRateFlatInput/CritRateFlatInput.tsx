import { Tooltip } from "@mui/material";
import Image from "next/image";

import { NumericInput } from "../../common/NumericInput/NumericInput";

export interface CritRateFlatInputProps {
  value: number;
  onChange(value: number): void;
}

export function CritRateFlatInput({ value, onChange }: CritRateFlatInputProps) {
  return (
    <NumericInput
      id="crit-flat"
      label="Crit"
      required
      error={!value}
      value={value}
      onChange={onChange}
      helperText={
        <Tooltip
          title={
            <Image
              src="/crit_flat_example.png"
              alt="crit-example"
              width={140}
              height={60}
            />
          }
          enterTouchDelay={0}
        >
          <span>Click here for example</span>
        </Tooltip>
      }
    />
  );
}
