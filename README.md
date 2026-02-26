# Instracta

A React application migrated from Base44, built with Vite, React, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Build

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues automatically:
```bash
npm run lint:fix
```

### Type Checking

Run TypeScript type checking:
```bash
npm run typecheck
```

## Project Structure

```
src/
├── components/     # Reusable components
│   └── ui/        # UI components (shadcn/ui)
├── pages/         # Page components
├── layouts/       # Layout components
├── hooks/         # Custom React hooks
├── context/       # React context providers
├── api/           # API clients
└── lib/           # Utility functions
```

## Contact Form Setup

The contact form sends emails to **michaelouru2@gmail.com** using Web3Forms (free service).

### Quick Setup:

1. Get your free access key from [https://web3forms.com/](https://web3forms.com/)
2. Create a `.env` file in the project root:
   ```env
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```
3. That's it! The form will now send real emails.

For detailed instructions, see [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)

**Note:** The form works without the key for local testing, but won't send real emails.

## Tech Stack

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **shadcn/ui** - Beautiful component library (49 components)
- **Radix UI** - Headless UI primitives
- **React Router 6** - Client-side routing
- **React Query 5** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Framer Motion 11** - Animation library
- **Lucide React** - Icon library

## Path Aliases

- `@/` points to `src/` directory
- Example: `import { Button } from "@/components/ui/button"`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_WEB3FORMS_KEY`
4. Deploy!

Vercel will auto-detect Vite and configure everything.

## License

This project is private and proprietary.
