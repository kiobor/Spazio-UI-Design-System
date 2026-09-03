import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { Label } from "../Label";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="">Select an option...</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="framework">Framework</Label>
      <Select id="framework">
        <option value="">Select...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <Select variant="error" aria-label="framework">
      <option value="">Select...</option>
    </Select>
  ),
};
