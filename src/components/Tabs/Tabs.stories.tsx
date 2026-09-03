import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="p-4 text-sm">Manage your account settings.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="p-4 text-sm">Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="p-4 text-sm">Configure your preferences.</p>
      </TabsContent>
    </Tabs>
  ),
};
