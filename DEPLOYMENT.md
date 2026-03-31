# Deployment Guide for Vercel

## Quick Start

### Option 1: One-Click Deploy (Easiest)

1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjijwang%2Fmyweb&project-name=epoch-time-converter&repo-name=epoch-time-converter)

2. Authorize Vercel with your GitHub account
3. Vercel will automatically:
   - Clone your repository
   - Build your application
   - Deploy it to a live URL
   - Set up a custom domain (optional)

### Option 2: Manual Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Epoch time converter app"
   git push origin main
   ```

2. **Visit Vercel**
   - Go to https://vercel.com
   - Click "New Project"

3. **Import Repository**
   - Select Github as your source
   - Find "myweb" repository
   - Click "Import"

4. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (or auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at a Vercel URL

### Option 3: CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Environment Variables

No environment variables are needed for this application as it's fully client-side.

## Custom Domain

After deployment:
1. Go to your project on Vercel
2. Go to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring & Analytics

Vercel provides:
- Real-time logs
- Performance metrics
- Web analytics
- Error tracking

Access these in the Vercel dashboard for your project.

## Rollback

To rollback to a previous deployment:
1. Go to Vercel dashboard
2. Select your project
3. Go to Deployments
4. Click the three dots on a previous deployment
5. Select "Promote to Production"

## Troubleshooting

### Build fails
- Check that all dependencies are listed in package.json
- Verify Node.js version compatibility (18.x or later)
- Check build logs in Vercel dashboard

### App doesn't work after deployment
- Verify environment variables (if any)
- Check browser console for JavaScript errors
- Test locally with `npm run build` && `npm start`

### Performance issues
- Use Vercel Analytics to identify bottlenecks
- Check if all images are optimized
- Verify API response times

## Support

For Vercel-specific issues, visit:
- https://vercel.com/docs
- https://vercel.com/support

For application issues, check:
- [Project README](../README.md)
- GitHub Issues
