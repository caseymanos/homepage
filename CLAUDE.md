# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Casey Manos Portfolio Website** - Modern, professional portfolio with Substack integration
- **Primary Domain**: `caseymanos.com`
- **Free Subdomain**: `casey.is-a.dev` (pending is-a.dev registration)
- Status: Production-ready, fully configured for Vercel deployment
- License: MIT

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build
- `npm run check` - Run Astro type checking

## Tech Stack

- **Framework**: Astro 4 with static output (chosen over Next.js for performance)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS with shadcn/ui-inspired design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel with static adapter and web analytics

## Architecture

### Hybrid Rendering Pattern
- Astro pages with React components loaded client-side where needed
- Use `client:load` directive for interactive components (ThemeToggle, SubstackSection)
- Static generation for optimal performance

### Design System
- **Theming**: CSS custom properties in `src/styles/globals.css` with semantic color tokens
- **Fonts**: Inter Variable for text, JetBrains Mono for code
- **Dark Mode**: Class-based switching with system preference detection + localStorage persistence
- **Custom Utilities**: `.gradient-text`, `.glass` for glassmorphism effects

### Key Components
- `ThemeToggle.tsx` - Dark/light mode toggle with system detection
- `SubstackSection.tsx` - Blog posts display with subscription CTA
- `Layout.astro` - Base layout with SEO optimization

### Content Management
- **Personal Info**: Update in `src/pages/index.astro` (hero, about, projects sections)
- **Blog Posts**: Modify `SUBSTACK_POSTS` array in `SubstackSection.tsx`
- **Substack URL**: Currently placeholder, update to actual Substack URL
- **Projects**: Replace placeholder projects in projects grid with real ones

### Current Status
✅ All core functionality implemented
✅ Production-ready configuration
✅ Responsive design with mobile-first approach
✅ SEO optimization with meta tags and Open Graph
⚠️ Uses placeholder content (Substack posts, project links)

### Next Development Steps
1. Replace placeholder Substack posts with real content
2. Update project showcases with actual work
3. Verify mobile responsiveness across devices
4. Test theme switching functionality
5. Deploy to Vercel and configure custom domain