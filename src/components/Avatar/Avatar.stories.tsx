import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/150?img=1", alt: "User avatar", size: "md" },
};

export const WithFallback: Story = {
  args: { alt: "John Doe", fallback: "JD", size: "md" },
};

export const Small: Story = {
  args: { alt: "Small", fallback: "SM", size: "sm" },
};

export const Large: Story = {
  args: { alt: "Large", fallback: "LG", size: "lg" },
};
