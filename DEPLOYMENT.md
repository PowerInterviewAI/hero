# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. A GitHub repository for this project
2. GitHub Pages enabled in repository settings

### Setup Steps

1. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Vite + React + TypeScript setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/power-interview-hero.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

3. **Update base URL in vite.config.ts:**
   - Change the `base` property to match your repository name:
     ```typescript
     base: '/your-repo-name/';
     ```

4. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically trigger on pushes to the `main` branch
   - Check the "Actions" tab in your GitHub repository to monitor deployment progress
   - Once complete, your site will be available at: `https://yourusername.github.io/your-repo-name/`

### Manual Deployment

If you prefer manual deployment:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Environment Variables

For production deployments, you can set environment variables:

1. Create a `.env.production` file (not committed to git)
2. Add your production environment variables:
   ```
   VITE_API_BASE_URL=https://production-api.example.com
   VITE_ENABLE_ANALYTICS=true
   ```

### Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Other Hosting Options

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Traditional Web Server

Simply upload the contents of the `dist` folder to your web server's public directory.
