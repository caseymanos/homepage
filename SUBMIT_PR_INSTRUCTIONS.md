# Submit casey.is-a.dev Domain Registration

## Quick Steps

Good news: **casey** is available! ✅

### Option 1: Using GitHub Web Interface (Easiest)

1. **Go to**: https://github.com/is-a-dev/register
2. **Click**: "Fork" button (top right)
3. **In your fork**: Navigate to `domains/` folder
4. **Click**: "Add file" → "Create new file"
5. **Name it**: `casey.json`
6. **Paste this content**:
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
7. **Commit**: "Add casey.is-a.dev domain"
8. **Create PR**: Click "Contribute" → "Open pull request"
9. **Title**: "Add casey.is-a.dev"
10. **Submit**: Create pull request

### Option 2: Using Git Command Line

```bash
# 1. Fork the repo on GitHub first: https://github.com/is-a-dev/register

# 2. Clone YOUR fork
git clone https://github.com/caseymanos/register.git
cd register

# 3. Create a new branch
git checkout -b add-casey-domain

# 4. Copy your casey.json to domains/
cp /path/to/your/homepage/casey.json domains/casey.json

# 5. Commit and push
git add domains/casey.json
git commit -m "Add casey.is-a.dev domain"
git push origin add-casey-domain

# 6. Create PR on GitHub
# Visit: https://github.com/caseymanos/register
# Click "Compare & pull request"
```

## What Happens Next?

1. ⏳ **Review**: is-a.dev team reviews (24-48 hours)
2. ✅ **Approval**: They merge your PR
3. 🌐 **DNS**: Domain becomes active (few hours for propagation)
4. 🚀 **Vercel**: Add `casey.is-a.dev` as custom domain in Vercel settings

## Need Help?

Check the [is-a.dev documentation](https://is-a.dev/docs) or their [example PRs](https://github.com/is-a-dev/register/pulls?q=is%3Apr+is%3Amerged).
