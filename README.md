# Pro Level Rental

Premium AV Equipment Rental & Production Services website built with React, Vite, and Tailwind CSS.

## Features

- 🎯 Modern, responsive single-page application
- 🎨 Beautiful UI with Tailwind CSS
- 🔐 Multi-role authentication system (Admin, Technician, Client)
- 📦 Equipment catalog with filtering
- 🎬 Service offerings showcase
- 📊 Admin CMS dashboard
- 👥 Client and Technician portals
- 📝 Quote request system
- 📱 Fully responsive design

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Fonts**: Outfit, Space Grotesk (Google Fonts)

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Local Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The site will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Demo Accounts

For testing the authentication system:

- **Admin**: admin@prolevelrental.com / admin123
- **Technician**: tech@prolevelrental.com / tech123
- **Client**: client@example.com / client123

## Deployment to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository or deploy from CLI
3. Railway will automatically detect the `railway.json` configuration
4. The app will build and deploy automatically

### Manual Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Project Structure

```
Pro Level/
├── public/             # Static assets
├── src/
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles with Tailwind
├── index.html         # HTML entry point
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── railway.json       # Railway deployment config
```

## Features Overview

### Public Pages
- **Home**: Hero section, services, featured equipment, testimonials
- **Equipment**: Full catalog with search and category filtering
- **Services**: Detailed service offerings
- **About**: Company information and values
- **Contact**: Contact form and business information

### Authenticated Features
- **Admin Dashboard**: Full CMS control, equipment management, user management
- **Client Portal**: View projects, shared designs, request quotes
- **Technician Portal**: View assignments, availability status, certifications

## Customization

### Colors
The main brand colors are:
- **Primary Gold:** `#D4AF37`
- **Light Gold:** `#E5C158`
- **Black:** `#000000`
- **White:** `#FFFFFF`

Update throughout the code to match your brand if needed.

### Content
All content is stored in the `initialCMSData` object in `App.jsx`. The admin dashboard allows real-time content updates (stored in React state).

### Add Persistence
Currently, data is stored in React state. To add persistence:
- Connect to a backend API
- Use local storage for client-side persistence
- Integrate with a database (Firebase, Supabase, etc.)

## License

All rights reserved © 2026 Pro Level Rental

---

Built with ❤️ for professional AV production services
