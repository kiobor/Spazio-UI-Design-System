import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Label } from "../Label";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" variant="error" aria-invalid="true" aria-describedby="name-error" />
      <p id="name-error" className="text-sm text-destructive">
        Name is required
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled..." },
};
