# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Your site will open at **http://localhost:3000** (or 3001 if 3000 is busy)

### 3. Start Building!

The main application code is in `src/App.jsx`

## 🎯 What You Have

✅ Fully functional React website  
✅ Beautiful responsive design  
✅ Admin CMS dashboard  
✅ Multi-role authentication  
✅ Equipment catalog  
✅ Quote request system  
✅ Client & technician portals  

## 🔐 Demo Login Credentials

Test the authentication system with these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@prolevelrental.com | admin123 |
| Technician | tech@prolevelrental.com | tech123 |
| Client | client@example.com | client123 |

## 📁 Project Structure

```
Pro Level/
├── src/
│   ├── App.jsx          # Main application (all components)
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/
│   └── favicon.svg      # Site icon
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Build configuration
├── tailwind.config.js   # Tailwind CSS config
└── railway.json         # Deployment config
```

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Customization Quick Tips

### Change Brand Colors
Search for `#e94560` in `src/App.jsx` and replace with your color

### Edit Hero Text
Admin Dashboard → Content tab → Edit hero fields

### Add Equipment
Admin Dashboard → Equipment tab → Add Equipment button

### Modify Services
Edit the `services` array in the `ServicesPage` component

## 📦 Deploy to Railway

1. Push code to GitHub
2. Connect repository on [railway.app](https://railway.app)
3. Deploy automatically

See **DEPLOYMENT.md** for detailed instructions.

## 🐛 Troubleshooting

**Port already in use?**
- Vite will automatically try the next available port

**Dependencies won't install?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Page is blank?**
- Check browser console for errors
- Ensure dev server is running

## 📚 Next Steps

1. ✅ Site is running locally
2. 🎨 Customize content via admin panel
3. 🚀 Deploy to Railway when ready
4. 📧 Add email functionality (see DEV_NOTES.md)
5. 💾 Add database for persistence (see DEV_NOTES.md)

## 🆘 Need Help?

- Check **README.md** for full documentation
- See **DEV_NOTES.md** for technical details
- See **DEPLOYMENT.md** for deployment guide

---

**Your site is ready! Go to http://localhost:3001/ to see it in action!** 🎉
