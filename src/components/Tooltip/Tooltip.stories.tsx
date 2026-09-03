import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="This is a tooltip" side="top">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};
