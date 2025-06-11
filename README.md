# Casey Manos Portfolio

A modern, performant portfolio website built with Astro, React, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) - Fast, content-focused
- **UI**: [React](https://react.dev/) + [TypeScript](https://typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Animations**: [Framer Motion](https://framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🛠️ Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/     # Reusable React components
├── layouts/        # Astro layout templates
├── pages/          # Route pages
└── styles/         # Global styles and utilities
```

## 🌟 Features

- ⚡ **Lightning Fast**: Built with Astro for optimal performance
- 🎨 **Modern Design**: Clean, professional aesthetic with smooth animations
- 🌙 **Dark Mode**: System preference detection with manual toggle
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- 📝 **Substack Integration**: Displays latest blog posts
- ♿ **Accessible**: WCAG compliant with semantic HTML

## 🚀 Deployment

This site is configured for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main

Custom domain `caseymanos.com` is configured in Vercel settings.

## 📝 Content Updates

- **Personal Info**: Update in `src/pages/index.astro`
- **Projects**: Modify the projects grid in the main page
- **Substack Posts**: Update `SUBSTACK_POSTS` in `SubstackSection.tsx`
- **Styling**: Customize colors and design tokens in `tailwind.config.mjs`

## 🔧 Customization

The design system uses CSS custom properties for theming. Key variables are defined in `src/styles/globals.css`:

- Colors: Semantic color tokens for light/dark themes
- Typography: Inter font with custom font weights
- Spacing: Consistent spacing scale
- Animations: Custom keyframes and transitions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
