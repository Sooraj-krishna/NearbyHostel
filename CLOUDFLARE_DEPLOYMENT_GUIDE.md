# Cloudflare Pages Deployment Guide

## Overview
This guide will help you deploy your Next.js application to Cloudflare Pages using the `@cloudflare/next-on-pages` adapter, which allows Next.js applications with API routes to run on Cloudflare's edge network.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Database**: Ensure your PostgreSQL database is accessible from Cloudflare's edge locations

## Setup Steps

### 1. Install Dependencies

The project now includes the Cloudflare Pages adapter:

```bash
npm install
```

### 2. Configure Environment Variables

You need to set up environment variables in two places:

#### A. Local Development (.env.local)
Create a `.env.local` file in your project root:

```env
DATABASE_URL=your_postgresql_connection_string
FIREBASE_ADMIN_SDK_KEY=your_firebase_admin_sdk_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

#### B. GitHub Secrets
In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:

```
DATABASE_URL=your_postgresql_connection_string
FIREBASE_ADMIN_SDK_KEY=your_firebase_admin_sdk_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### 3. Get Cloudflare Credentials

#### A. Account ID
1. Log into your Cloudflare dashboard
2. Go to the right sidebar and copy your Account ID

#### B. API Token
1. Go to My Profile → API Tokens
2. Click "Create Token"
3. Use the "Custom token" template
4. Set permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Cloudflare Pages:Edit
5. Set account resources to "Include: All accounts"
6. Create the token and copy it

### 4. Create Cloudflare Pages Project

#### Option A: Via Cloudflare Dashboard
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub repository
4. Set build settings:
   - Framework preset: None
   - Build command: `npm run pages:build`
   - Build output directory: `.vercel/output/static`
   - Root directory: `/` (leave empty)

#### Option B: Via Wrangler CLI
```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create the project
wrangler pages project create nearby-hostels
```

### 5. Deploy

#### Automatic Deployment (Recommended)
1. Push your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy
3. Your app will be available at `https://nearby-hostels.pages.dev`

#### Manual Deployment
```bash
# Build the project
npm run pages:build

# Deploy using Wrangler
wrangler pages deploy .vercel/output/static --project-name=nearby-hostels
```

## Development

### Local Development
```bash
# Start the development server
npm run pages:dev
```

This will start the Cloudflare Pages development server with your Next.js app.

### Testing Production Build
```bash
# Build the project
npm run pages:build

# Test the production build locally
wrangler pages dev .vercel/output/static
```

## Configuration Files

### wrangler.toml
This file contains the Cloudflare Pages configuration:
- Project name and compatibility settings
- Environment variables for different environments
- Build commands

### package.json Scripts
- `pages:build`: Builds the project for Cloudflare Pages
- `pages:deploy`: Deploys to Cloudflare Pages
- `pages:dev`: Starts the development server

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all environment variables are set
   - Ensure your database is accessible from Cloudflare's edge
   - Check the build logs in Cloudflare dashboard

2. **API Route Issues**
   - Ensure your API routes are compatible with Cloudflare Workers
   - Check that you're not using Node.js-specific APIs

3. **Database Connection Issues**
   - Verify your database connection string
   - Ensure your database allows connections from Cloudflare's IP ranges
   - Consider using connection pooling

4. **Environment Variables**
   - Double-check that all required variables are set in GitHub Secrets
   - Verify the variable names match exactly

### Debugging

1. **Check Build Logs**
   - Go to Cloudflare Dashboard → Pages → Your Project → Deployments
   - Click on a deployment to see detailed logs

2. **Local Testing**
   ```bash
   npm run pages:dev
   ```
   This will show you any issues before deployment

3. **Wrangler Logs**
   ```bash
   wrangler pages dev .vercel/output/static --log-level=debug
   ```

## Performance Optimization

1. **Database Optimization**
   - Use connection pooling
   - Implement caching where appropriate
   - Optimize database queries

2. **Image Optimization**
   - Use Cloudinary's optimization features
   - Implement lazy loading for images

3. **Edge Caching**
   - Leverage Cloudflare's edge caching
   - Set appropriate cache headers

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next-on-Pages Documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## Files Modified

1. `package.json` - Added Cloudflare Pages scripts and dependencies
2. `wrangler.toml` - Cloudflare Pages configuration
3. `next.config.ts` - Updated for Cloudflare compatibility
4. `.github/workflows/nextjs.yml` - Updated for Cloudflare deployment
5. `CLOUDFLARE_DEPLOYMENT_GUIDE.md` - This guide 