# Oatmeal - Next.js 16 + Headless WordPress Template

A modern, multi-theme SaaS marketing website built with Next.js 16, Tailwind CSS 4, React 19, and Headless WordPress with GraphQL integration.

## Features

- 🚀 **Next.js 16** - App Router, React Server Components, and Server Actions
- 🎨 **Tailwind CSS 4** - CSS-first configuration with Olive color scheme
- 📦 **Headless WordPress** - Content management via WPGraphQL
- 🔐 **JWT Authentication** - Preview mode for draft content
- 🐳 **Docker** - Local development environment
- ☁️ **EC2 Ready** - Deployment configuration included
- 📝 **TypeScript** - Full type safety
- 🎯 **SEO Optimized** - Meta tags, sitemap, structured data
- ♿ **Accessible** - WCAG 2.1 AA compliant

## Tech Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.1
- **UI Library:** React 19.2.3
- **CMS:** WordPress 6.x (Headless)
- **API:** GraphQL via WPGraphQL
- **Client:** Apollo Client 4.x
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or pnpm

### 1. Clone and Install

```bash
git clone <repository-url>
cd nextjs-oatmeal
npm install
```

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
WORDPRESS_GRAPHQL_ENDPOINT=/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start WordPress (Docker)

```bash
docker-compose up -d
```

WordPress will be available at:
- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081
- GraphQL IDE: http://localhost:8080/wp-admin/graphql/ide/

### 4. Configure WordPress

1. Visit http://localhost:8080 and complete WordPress setup
2. Install required plugins (see [docs/WORDPRESS.md](docs/WORDPRESS.md))
3. Set permalinks to "Post name"
4. Import ACF field groups

### 5. Start Next.js Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your site.

## Project Structure

```
nextjs-oatmeal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/          # Route groups
│   │   ├── api/               # API routes
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Tailwind CSS + theme
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Page sections
│   │   └── blocks/            # Reusable blocks
│   ├── lib/
│   │   ├── graphql/           # Apollo Client & queries
│   │   ├── utils/             # Utility functions
│   │   └── wordpress/         # WordPress service
│   └── types/                 # TypeScript types
├── docker/                     # Docker configurations
├── docs/                       # Documentation
├── .env.example               # Environment template
├── docker-compose.yml         # Local WordPress
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server

# Building
npm run build           # Build production bundle
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint

# Testing (coming soon)
npm run test            # Run unit tests
npm run test:e2e        # Run E2E tests
```

## WordPress Integration

All content is managed through WordPress and fetched via GraphQL:

- **Pages:** Home, Pricing, About, Contact, Features
- **Blog:** Posts with categories and tags
- **ACF Fields:** Editable marketing content
- **Menus:** Navigation structure
- **Media:** Images and files

See [docs/WORDPRESS.md](docs/WORDPRESS.md) for detailed setup instructions.

## Customization

### Theme Colors

Edit `src/app/globals.css` to customize the Olive color scheme:

```css
:root {
  --primary: #84cc16;        /* Lime green */
  --primary-hover: #65a30d;  /* Darker lime */
  --background: #fafaf9;     /* Stone white */
  /* ... more colors */
}
```

### Typography

The project uses **Instrument Sans** font. To change:

1. Update `src/app/layout.tsx` to import a different Google Font
2. Update CSS variable in `globals.css`:
   ```css
   --font-sans: 'Your Font', sans-serif;
   ```

### Adding New Pages

1. Create page component in `src/app/(routes)/page-name/page.tsx`
2. Add GraphQL query in `src/lib/graphql/queries/`
3. Create WordPress page with matching slug

## Deployment

### EC2 Deployment

The project includes configuration for EC2 deployment:

1. **Build Docker images:**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy to EC2:**
   ```bash
   ./scripts/deploy.sh
   ```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

Production environment variables:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://wp.yourdomain.com
WORDPRESS_GRAPHQL_ENDPOINT=/graphql
WORDPRESS_PREVIEW_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Architecture

```
┌─────────────────────────────────────┐
│           Next.js 16                │
│  ┌──────────┬──────────┬─────────┐  │
│  │  RSC/SSR │ GraphQL  │   JWT   │  │
│  │   App    │  Client  │  Auth   │  │
│  └──────────┴──────────┴─────────┘  │
└──────────────┬──────────────────────┘
               │ GraphQL Queries
               ▼
┌─────────────────────────────────────┐
│           WordPress                 │
│  ┌──────────┬──────────┬─────────┐  │
│  │ WPGraphQL│    ACF   │   JWT   │  │
│  │  Plugin  │   Pro    │  Auth   │  │
│  └──────────┴──────────┴─────────┘  │
└─────────────────────────────────────┘
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues:

- Check [docs/WORDPRESS.md](docs/WORDPRESS.md) for WordPress setup
- Check [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment help
- Open an issue on GitHub

---

Built with ❤️ using Next.js, Tailwind CSS, and WordPress.