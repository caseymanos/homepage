# 🌐 Casey.is-a.dev Domain Setup Instructions

## ⚠️ Action Required

I've prepared everything for your **casey.is-a.dev** domain registration, but I can't automatically submit the pull request due to authentication limitations in this environment.

## ✅ What's Already Done

- ✅ `casey.json` configuration file created
- ✅ Domain verified as available (no conflicts)
- ✅ Automated submission script created (`submit-domain.sh`)
- ✅ Documentation updated

## 🚀 How to Submit the PR

### Option 1: Use the Automated Script (Easiest)

If you have GitHub CLI installed:

```bash
./submit-domain.sh
```

If you don't have GitHub CLI, install it:
```bash
# macOS
brew install gh

# Linux (Debian/Ubuntu)
sudo apt install gh

# Windows
winget install GitHub.cli

# Then authenticate
gh auth login
```

### Option 2: Manual Submission (Web Interface)

1. **Go to is-a-dev register page**
   - Visit: https://github.com/is-a-dev/register

2. **Fork the repository**
   - Click the "Fork" button in the top-right corner
   - Wait for the fork to complete

3. **Add your domain file**
   - In your fork, navigate to the `domains/` folder
   - Click "Add file" → "Create new file"
   - Name it: `casey.json`
   - Copy and paste this content:

```json
{
  "description": "Casey Manos Portfolio - Modern developer portfolio with Substack integration",
  "repo": "https://github.com/caseymanos/homepage",
  "owner": {
    "username": "caseymanos",
    "email": "casey@caseymanos.com"
  },
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}
```

4. **Commit the file**
   - Scroll down to "Commit new file"
   - Use commit message: `Add casey.is-a.dev domain`
   - Select "Create a new branch" and name it `add-casey-domain`
   - Click "Propose new file"

5. **Create Pull Request**
   - You'll be automatically redirected to create a PR
   - Title: `Add casey.is-a.dev`
   - Description:
```
## Domain Registration Request

**Domain**: casey.is-a.dev
**Owner**: @caseymanos
**Repository**: https://github.com/caseymanos/homepage

### Description
Portfolio website for Casey Manos featuring:
- Modern Astro-based static site
- React components with Three.js visualizations
- Substack blog integration
- Deployed on Vercel

### DNS Configuration
- **Record Type**: CNAME
- **Target**: cname.vercel-dns.com

The site is already deployed and ready to serve at this domain once approved.

Thank you for reviewing!
```
   - Click "Create pull request"

## ⏳ What Happens Next?

1. **Wait for Review** (24-48 hours typically)
   - is-a.dev maintainers will review your PR
   - You'll get an email notification

2. **PR Gets Merged**
   - Your domain will be activated
   - DNS propagation takes a few hours

3. **Configure Vercel**
   - Go to your Vercel project settings
   - Add `casey.is-a.dev` as a custom domain
   - Vercel will auto-validate DNS

4. **Done!** 🎉
   - Your site will be live at https://casey.is-a.dev

## 📊 Check PR Status

Once submitted, track your PR at:
https://github.com/is-a-dev/register/pulls

Or use:
```bash
gh pr list --repo is-a-dev/register --author @me
```

## ❓ Need Help?

- is-a.dev Documentation: https://is-a.dev/docs
- Check existing domains: https://github.com/is-a-dev/register/tree/main/domains
- is-a.dev Discord: https://discord.gg/PgYPgUC

---

**Note**: The domain `casey.is-a.dev` is currently available and ready to be claimed!
