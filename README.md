<p align="center">
  <picture>
    <source media="(max-width: 640px)" srcset="public/logo-sm.svg" width="100">
    <img src="public/logo.svg" alt="Neighborhood Lens Logo" width="400">
  </picture>
</p>

# Neighborhood Lens 🏘️

Neighborhood Lens is a modern web application that helps users explore and understand neighborhoods through data-driven insights and community engagement. The platform features interactive property tours, detailed neighborhood analytics, and a seamless user experience for both property seekers and community members.

## Features 🌟

- Interactive neighborhood maps with property locations
- Community insights and detailed statistics
- Real-time data visualization and analytics
- User-generated content and reviews
- Virtual property tours and 360° views
- Comprehensive property listings
- Mobile-responsive design

## Project Structure 📁

```
neighborhood-lens/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── components/         # App-specific components
│   │   │   └── tour-map.tsx   # Interactive map component
│   │   ├── more/              # Additional pages
│   │   └── page.tsx           # Main landing page
│   └── components/            # Shared components
│       └── properties/        # Property-related components
│           ├── property-carousel.tsx
│           └── property-card/
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── styles/                    # Global styles
├── tsconfig.json             # TypeScript configuration
└── postcss.config.mjs        # PostCSS configuration
```

## Prerequisites 📋

Before you begin, ensure you have installed:

- Node.js (v18.0.0 or higher)
- pnpm (v8.0.0 or higher)
- Git

## Environment Setup 🔧

1. Clone the repository:

```bash
git clone https://github.com/lucerowb/neighborhood-lens.git
cd neighborhood-lens
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

some environment variables:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_API_URL=your_api_url_here
DATABASE_URL=your_database_url_here
...
```

## Installation 💻

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development Guidelines 🛠️

- Follow the [Next.js Style Guide](https://nextjs.org/docs/basic-features/pages)
- Use TypeScript for type safety
- Implement responsive design principles
- Write unit tests for new features
- Use PostCSS for styling optimizations
- Follow component-based architecture

## Key Components

- `TourMap`: Interactive map component for visualizing property locations and neighborhood data
- `PropertyCarousel`: Dynamic carousel for browsing featured properties
- `PropertyCard`: Reusable component for displaying property information
- More components can be found in the `src/components` directory

## Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm type-check # Run TypeScript compiler check
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ using [Next.js](https://nextjs.org)
