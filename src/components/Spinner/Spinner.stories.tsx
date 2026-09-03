import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { "aria-label": "Loading" } };
export const Small: Story = { args: { size: "sm", "aria-label": "Loading" } };
export const Large: Story = { args: { size: "lg", "aria-label": "Loading" } };
