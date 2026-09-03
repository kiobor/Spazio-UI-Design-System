import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";
import { Label } from "../Label";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Type your message..." },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write something..." />
    </div>
  ),
};

export const Error: Story = {
  args: { variant: "error", placeholder: "Invalid input" },
};
