import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Toast",
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

function ToastDemo({ variant }: { variant: "default" | "success" | "error" | "warning" | "info" }) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({ title: `${variant} toast`, description: "This is a description.", variant })
      }
    >
      Show {variant} toast
    </Button>
  );
}

export const Success: StoryObj = {
  render: () => <ToastDemo variant="success" />,
};

export const Error: StoryObj = {
  render: () => <ToastDemo variant="error" />,
};

export const Warning: StoryObj = {
  render: () => <ToastDemo variant="warning" />,
};

export const Info: StoryObj = {
  render: () => <ToastDemo variant="info" />,
};
