Building a site for me! Testing new UI libraries, ai dev tools, and just learning while the result is a somewhat decent showcase

## 🌐 Domain Setup

This project is configured for two domains:
- **Primary**: `caseymanos.com` (Vercel deployment)
- **Free Subdomain**: `casey.is-a.dev` (pending registration)

### Setting up casey.is-a.dev

**📋 What's Ready:**
- ✅ `casey.json` - Domain configuration file (ready to submit)
- ✅ `submit-domain.sh` - Automated submission script  
- ✅ [`DOMAIN-SETUP-INSTRUCTIONS.md`](./DOMAIN-SETUP-INSTRUCTIONS.md) - Detailed setup guide

**🚀 To Submit:**

**Option 1: Automated (if you have GitHub CLI)**
```bash
./submit-domain.sh
```

**Option 2: Manual Submission**  
See [`DOMAIN-SETUP-INSTRUCTIONS.md`](./DOMAIN-SETUP-INSTRUCTIONS.md) for complete step-by-step instructions.

**After PR Approval:**
1. Add `casey.is-a.dev` to your Vercel project as a custom domain
2. Vercel will automatically handle DNS validation
3. Your site will be live at https://casey.is-a.dev! 🎉

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
