import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
import { Label } from "../Label";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { "aria-label": "Toggle" } };
export const Checked: Story = { args: { "aria-label": "Toggle", defaultChecked: true } };

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" aria-label="Airplane mode" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  ),
};

export const Small: Story = { args: { "aria-label": "Toggle", size: "sm" } };
export const Disabled: Story = { args: { "aria-label": "Toggle", disabled: true } };
