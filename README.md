Building a site for me! Testing new UI libraries, ai dev tools, and just learning while the result is a somewhat decent showcase

## 🌐 Domain Setup

This project is configured for two domains:
- **Primary**: `caseymanos.com` (Vercel deployment)
- **Free Subdomain**: `casey.is-a.dev` (pending registration)

### Setting up casey.is-a.dev

The `casey.json` file in the root directory contains the is-a.dev domain configuration. To activate this free subdomain:

1. **Fork the is-a.dev repository**
   ```bash
   # Visit https://github.com/is-a-dev/register
   # Click "Fork" to create your own copy
   ```

2. **Add the domain configuration**
   ```bash
   # In your fork, create: domains/casey.json
   # Copy the contents from this repo's casey.json
   ```

3. **Submit a Pull Request**
   - Create a PR from your fork to the main is-a.dev repository
   - Title: "Add casey.is-a.dev"
   - Wait for approval (usually within 24-48 hours)

4. **Configure Vercel**
   Once the PR is approved:
   - Go to your Vercel project settings
   - Add `casey.is-a.dev` as a custom domain
   - Vercel will automatically handle the DNS validation

5. **(Optional) Update site URL**
   If you want to use casey.is-a.dev as the primary domain, update `astro.config.mjs`:
   ```javascript
   site: 'https://casey.is-a.dev',
   ```

### DNS Configuration
The domain uses a CNAME record pointing to `cname.vercel-dns.com`, which allows Vercel to serve the site at casey.is-a.dev.

---

## 🚀 Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:4321
npm run build      # Build for production
npm run preview    # Preview production build
```
