import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: ["solid", "outline"] },
    color: {
      control: "select",
      options: ["default", "primary", "success", "warning", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Solid: Story = { args: { children: "Badge", variant: "solid" } };
export const Outline: Story = { args: { children: "Badge", variant: "outline" } };
export const Primary: Story = { args: { children: "Primary", color: "primary" } };
export const Success: Story = { args: { children: "Active", color: "success" } };
export const Warning: Story = { args: { children: "Pending", color: "warning" } };
export const Destructive: Story = { args: { children: "Error", color: "destructive" } };
