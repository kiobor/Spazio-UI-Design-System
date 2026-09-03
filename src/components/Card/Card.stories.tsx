import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    variant: { control: "select", options: ["default", "interactive"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>Manage your project configuration.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-[350px]">
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>This card has a hover effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Click me!</p>
      </CardContent>
    </Card>
  ),
};
