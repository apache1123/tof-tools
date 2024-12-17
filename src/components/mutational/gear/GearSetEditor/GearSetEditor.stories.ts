import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { allExampleGears } from "../../../__fixtures__/gear";
import { exampleGearSet } from "../../../__fixtures__/gear-set";
import { GearSetEditor } from "./GearSetEditor";

const meta: Meta<typeof GearSetEditor> = {
  component: GearSetEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetEditor>;

const gearSetProxy = proxy(exampleGearSet);
const allGearsProxy = proxy(allExampleGears);

export const Default: Story = {
  args: { gearSetProxy, allGearsProxy },
};
