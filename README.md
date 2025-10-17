# Vite + React + Tailwind CSS Template

This template provides a modern setup for React development with Vite, TypeScript, Tailwind CSS, and React Router.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Fast development server with Hot Module Replacement (HMR)
- ⚛️ [React 18](https://react.dev/) with TypeScript for type safety
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔄 [React Router](https://reactrouter.com/) - Declarative routing for React
- 📦 [SWC](https://swc.rs/) - Super fast TypeScript/JavaScript compiler
- 🧹 [ESLint](https://eslint.org/) with recommended configurations
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global CSS styles
├── assets/              # Static assets (images, icons, etc.)
├── components/          # Reusable UI components
│   └── LoadingSpinner.tsx  # Loading spinner component
├── pages/               # Page components for routing
│   ├── Home.tsx         # Home page
│   ├── About.tsx        # About page
│   └── NotFound.tsx     # 404 page
└── router/              # Routing configuration
    └── index.tsx        # Router setup with lazy loading
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm preview` - Preview the production build locally

## Key Features Implemented

1. **Routing**: Uses React Router for client-side navigation with lazy loading
2. **Responsive Design**: Built with Tailwind CSS for responsive layouts
3. **Lazy Loading**: Pages are loaded on-demand for better performance
4. **Loading States**: Includes a loading spinner component for async operations
5. **404 Handling**: Custom 404 page for undefined routes

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start the development server with `pnpm dev`

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```