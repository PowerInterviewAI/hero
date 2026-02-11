# Power Interview Hero

A modern interview preparation platform built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- ⚡️ **Vite** - Lightning-fast development and build tool
- ⚛️ **React 18** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **shadcn/ui** - Beautiful, accessible components built with Radix UI
- 📝 **TypeScript** - Type safety and better developer experience
- 💅 **Prettier** - Code formatting with import sorting
- 🔍 **ESLint** - Code linting for best practices
- 🎣 **Husky & lint-staged** - Pre-commit hooks for code quality
- 📦 **Production-ready** - Optimized build configuration

## 📁 Project Structure

```
power-interview-hero/
├── src/
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable React components
│   │   └── ui/         # shadcn/ui components
│   ├── config/         # Configuration files
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries (cn function)
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # Vite type definitions
├── public/             # Public static files
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/power-interview-hero.git
   cd power-interview-hero
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Format code with Prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

Lint code:

```bash
npm run lint
```

## 🎨 shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components.

### Available Components

- **Button** - Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Flexible card component for content grouping

### Adding More Components

Due to peer dependency conflicts, components are added manually:

1. Install required dependencies:

   ```bash
   npm install @radix-ui/[package-name] --legacy-peer-deps
   ```

2. Copy component code from [ui.shadcn.com](https://ui.shadcn.com/) to `src/components/ui/`

3. Export the component in `src/components/index.ts`

For detailed instructions, see [src/components/ui/README.md](src/components/ui/README.md).

### Using Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';

<Button variant="default" size="lg">
  Click me
</Button>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

## 📦 Deployment

This project is configured for GitHub Pages deployment. The build will be automatically deployed when you push to the main branch.

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build ready for deployment.

## 🔧 Configuration

### Vite Configuration

See [vite.config.ts](vite.config.ts) for Vite configuration options.

### Tailwind Configuration

See [tailwind.config.js](tailwind.config.js) for Tailwind CSS customization.

### Prettier Configuration

See [.prettierrc](.prettierrc) for code formatting rules.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Community & Support

- **Discord**: [Join our Discord community](https://discord.gg/HZ9sHsh2U7)
- **Telegram**: [@power_interview_ai](https://t.me/power_interview_ai)
- **GitHub**: [PowerInterviewAI/client](https://github.com/PowerInterviewAI/client)
- **Email**: power-interview@protonmail.com
