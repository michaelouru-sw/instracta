# Instracta

**Trackable Learning Journeys** - A modern eLearning platform transforming static training into living learning ecosystems that drive performance and accountability.

## About

Instracta is a comprehensive eLearning solution offering:

- 🎓 **Custom eLearning Development** - SCORM/xAPI-compliant course creation
- 🎨 **Instructional Design** - Pedagogically sound learning experiences
- 🤖 **AI-Powered Content Generation** - Automated content creation and enhancement
- 🔗 **LMS Integration** - Seamless integration with major learning management systems
- 📊 **Analytics & Tracking** - Comprehensive learner progress monitoring

## Features

- ✨ Modern, responsive UI built with React and Tailwind CSS
- 🎯 49 pre-built UI components from shadcn/ui
- 🚀 Lightning-fast development with Vite
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion
- 📧 Integrated contact form with email notifications
- ♿ Accessible components built on Radix UI primitives

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/michaelouru-sw/instracta.git
cd instracta
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env with your configuration
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

### Code Quality

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues automatically:
```bash
npm run lint:fix
```

Run TypeScript type checking:
```bash
npm run typecheck
```

## Project Structure

```
instracta/
├── public/             # Static assets
├── src/
│   ├── api/           # API client configurations
│   ├── components/    # Reusable React components
│   │   ├── home/     # Homepage sections
│   │   └── ui/       # shadcn/ui components (49 components)
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Layout components
│   ├── lib/          # Utility functions
│   └── pages/        # Page components
├── index.html        # Entry HTML
├── vite.config.js    # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Tech Stack

### Core
- **React 18.2** - Modern UI library with hooks
- **Vite 6.1** - Next-generation frontend tooling
- **JavaScript (ES2020+)** - Modern JavaScript features

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Vendor prefix automation

### UI Components
- **shadcn/ui** - High-quality component library (49 components included)
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful & consistent icon set
- **class-variance-authority** - Type-safe component variants
- **tailwind-merge** - Intelligent Tailwind class merging

### Routing & State
- **React Router 6.26** - Declarative routing for React
- **React Query 5.84** - Powerful data synchronization

### Forms & Validation
- **React Hook Form 7.54** - Performant form handling
- **Zod 3.24** - TypeScript-first schema validation

### Animations
- **Framer Motion 11.16** - Production-ready motion library
- **@hello-pangea/dnd 17** - Drag and drop interactions

### Development Tools
- **ESLint 9.19** - Code linting and quality
- **TypeScript 5.9** - Type checking (via tsconfig/jsconfig)

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file based on `.env.example`:

```env
# Contact Form (Web3Forms)
VITE_WEB3FORMS_KEY=your_access_key_here
```

**Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

## Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/`

Example:
```jsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/michaelouru-sw/instracta)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure environment variables (see [Environment Variables](#environment-variables))
4. Deploy!

Vercel automatically detects Vite projects and configures them correctly.

### Other Platforms

This project can be deployed to any static hosting platform that supports Node.js builds:

- **Netlify** - Supports Vite out of the box
- **Cloudflare Pages** - Fast global CDN
- **AWS Amplify** - AWS-native hosting
- **GitHub Pages** - Free hosting for public repos

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

© 2026 Instracta. All rights reserved.

---

**Built with ❤️ by the Instracta Team**
