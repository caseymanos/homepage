#!/bin/bash
# Script to submit casey.is-a.dev domain to is-a.dev
# Run this script after ensuring you have GitHub CLI (gh) installed

set -e

echo "🚀 Submitting casey.is-a.dev domain registration..."
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    echo ""
    echo "Alternative: See DOMAIN-SETUP-INSTRUCTIONS.md for manual submission"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ You're not authenticated with GitHub CLI."
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"
echo ""

# Fork the repository
echo "📋 Forking is-a-dev/register repository..."
gh repo fork is-a-dev/register --clone=false || echo "Fork already exists"

# Get the fork name
FORK_REPO=$(gh api user | jq -r '.login')/register

echo "✅ Fork created/found: $FORK_REPO"
echo ""

# Clone the fork
TEMP_DIR=$(mktemp -d)
echo "📥 Cloning fork to $TEMP_DIR..."
git clone "https://github.com/$FORK_REPO.git" "$TEMP_DIR"

cd "$TEMP_DIR"

# Create branch
echo "🌿 Creating branch 'add-casey-domain'..."
git checkout -b add-casey-domain

# Copy casey.json
echo "📄 Adding casey.json to domains/..."
cp "$(dirname "$0")/casey.json" domains/casey.json

# Configure git
git config user.name "Casey Manos"
git config user.email "casey@caseymanos.com"

# Commit
echo "💾 Committing changes..."
git add domains/casey.json
git commit -m "Add casey.is-a.dev domain

Domain configuration for Casey Manos Portfolio website.
Hosted on Vercel with CNAME record to cname.vercel-dns.com"

# Push
echo "⬆️ Pushing to fork..."
git push -u origin add-casey-domain

# Create PR
echo "🎯 Creating pull request..."
gh pr create \
    --repo is-a-dev/register \
    --title "Add casey.is-a.dev" \
    --body "## Domain Registration Request

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

Thank you for reviewing!"

# Cleanup
cd -
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Pull request submitted successfully!"
echo "🔗 Check status: gh pr list --repo is-a-dev/register --author @me"
echo ""
echo "⏳ Wait for approval (usually 24-48 hours)"
echo "📧 You'll receive an email notification when the PR is reviewed"
