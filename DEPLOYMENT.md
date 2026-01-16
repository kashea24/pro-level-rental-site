# Pro Level Rental - Deployment Guide

## Railway Deployment Instructions

### Prerequisites
1. Create a [Railway account](https://railway.app)
2. Install Railway CLI (optional): `npm install -g @railway/cli`

### Option 1: Deploy via GitHub (Recommended)

1. **Create a Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/pro-level-rental.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect the `railway.json` configuration
   - Click "Deploy"

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Add a Domain**
   ```bash
   railway domain
   ```

### Environment Variables (if needed later)

In Railway dashboard, add any environment variables under:
- Project Settings → Variables

Common variables you might add:
- `NODE_ENV=production`
- API keys for external services
- Database connection strings

### Custom Domain

1. Go to your Railway project
2. Click on "Settings"
3. Scroll to "Domains"
4. Add your custom domain
5. Update your DNS records as instructed

### Monitoring & Logs

- View logs in real-time: Railway Dashboard → Deployments → Logs
- Monitor performance: Railway Dashboard → Metrics

### Automatic Deployments

Once connected to GitHub, Railway will automatically deploy on every push to your main branch.

To disable auto-deploy:
- Go to Settings → Enable/Disable "Auto Deploy"

### Build Configuration

The build is configured in `railway.json`:
- Build command: `npm install && npm run build`
- Start command: `npx serve -s dist -l $PORT`

### Troubleshooting

**Build fails:**
- Check Railway logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**App not loading:**
- Ensure the PORT environment variable is being used
- Check if serve is properly serving the dist folder
- Review browser console for errors

**Need to rebuild:**
```bash
railway up --detach
```

### Estimated Costs

Railway offers:
- $5/month free credit (Hobby plan)
- Pay-as-you-go for additional usage
- This static site should easily fit within free tier

### Support

For Railway-specific issues:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

---

## Other Deployment Options

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### AWS Amplify
- Push to GitHub
- Connect repository in AWS Amplify Console

### Traditional Web Hosting
1. Build: `npm run build`
2. Upload contents of `dist/` folder to your web host
3. Configure server to serve index.html for all routes
