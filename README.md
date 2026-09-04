# Spazio UI

An accessible, open-source React design system built with Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/spazio-ui.svg)](https://www.npmjs.com/package/spazio-ui)
[![license](https://img.shields.io/npm/l/spazio-ui.svg)](https://github.com/kiobor/Spazio-UI-Design-System/blob/main/LICENSE)

## Installation

```bash
npm install spazio-ui
```

## Quick Start

```tsx
import { Button, Input, Card } from "spazio-ui";
import "spazio-ui/styles.css";

function App() {
  return (
    <Card>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections |
| Avatar | User profile image with fallback |
| Badge | Status indicator labels |
| Button | Interactive trigger element |
| Card | Content container with sections |
| Input | Text input field |
| Label | Form field label |
| Modal | Dialog overlay with focus trap |
| Select | Dropdown selection |
| Spinner | Loading indicator |
| Switch | Toggle control |
| Tabs | Tabbed content navigation |
| Textarea | Multi-line text input |
| Toast | Notification messages |
| Tooltip | Contextual information popup |

## Features

- 15 accessible React components
- Built with Tailwind CSS 4 + CVA
- Full TypeScript support
- Design tokens synced with Figma (Tokens Studio)
- Keyboard navigation and screen reader support
- Tree-shakeable ESM + CJS builds

## Documentation

- [Storybook](https://spazio-ui-storybook.vercel.app)
- [Documentation Site](https://spazio-ui.vercel.app)

## Development

```bash
git clone https://github.com/kiobor/Spazio-UI-Design-System.git
cd Spazio-UI-Design-System
npm install
npm run dev          # watch mode
npm run storybook    # component playground
```

## Testing

```bash
npm test             # run all tests
npm run test:watch   # watch mode
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

MIT - see [LICENSE](./LICENSE)
