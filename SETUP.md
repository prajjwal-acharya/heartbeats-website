# HeartBeats - Indian Fusion Experience

A modern, visually stunning website for HeartBeats, an Indian Fusion band from NIT Rourkela. Built with React, TypeScript, Three.js, and Firebase.

![HeartBeats](https://via.placeholder.com/800x400?text=HeartBeats+Band)

## ✨ Features

- **3D Hero Section** - Interactive Three.js visualization with floating particles
- **Member Gallery** - Elegant horizontal scroll showcase of band members
- **Past Performances** - Scroll-locked video section with animated transitions
- **Music Section** - Embedded music player integration
- **Join the Band Form** - Application form with Firebase backend
- **Admin Dashboard** - Protected panel to manage applications
- **Responsive Design** - Beautiful on all devices

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- A **Firebase** account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/prajjwal-acharya/heartbeats-website.git
cd heartbeats-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or use an existing one)
3. Name it (e.g., "heartbeats-band")
4. Disable Google Analytics (optional) and create

#### Enable Firestore Database

1. In Firebase Console → **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a region close to you → **Enable**

#### Enable Authentication

1. In Firebase Console → **Build** → **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. Save

#### Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter admin email and password (save these!)

#### Get Firebase Config

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** → Click **Web** (`</>` icon)
3. Register app (name: "heartbeats-web")
4. Copy the `firebaseConfig` values

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini API (optional - for AI features)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser (port may vary if already in use).

---

## 📁 Project Structure

```
heartbeats---indian-fusion-experience/
├── components/          # Reusable React components
│   ├── Hero.tsx         # Hero section with 3D background
│   ├── ThreeHero.tsx    # Three.js 3D visualization
│   ├── Members.tsx      # Band members gallery
│   ├── PastPerformances.tsx  # Scroll-locked video section
│   ├── MusicSection.tsx # Music player section
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Footer component
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Join.tsx         # Join the band form
│   ├── Schedule.tsx     # Upcoming shows
│   ├── Merch.tsx        # Merchandise (coming soon)
│   ├── Admin.tsx        # Admin dashboard
│   └── AdminLogin.tsx   # Admin login
├── services/            # Backend services
│   ├── firebaseConfig.ts    # Firebase initialization
│   ├── applicationService.ts # Application CRUD operations
│   └── geminiService.ts     # AI integration (optional)
├── public/              # Static assets
│   └── performance-video.mp4
├── .env.local           # Environment variables (create this)
├── App.tsx              # Main app with routing
└── package.json         # Dependencies
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🔐 Admin Access

1. Go to `/admin/login`
2. Sign in with the admin credentials you created in Firebase
3. View and manage all applications at `/admin`

### Admin Features
- View all applications with status (pending/reviewed/accepted/rejected)
- Search by name, roll number, email, or role
- Filter by status
- Update application status
- Delete applications

---

## 📝 Application Form Fields

| Field | Validation |
|-------|------------|
| Roll Number | 9 alphanumeric characters |
| Name | Required |
| Email | Auto-generated from roll number (editable) |
| Phone | Valid Indian number (10 digits, starts with 6-9) |
| Role | Dropdown selection |
| Why this role? | Min 20 words |
| Why HeartBeats? | Min 20 words |
| Demo Link | Valid URL (Google Drive) |

---

## 🔒 Firebase Security Rules (Production)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Applications collection
    match /applications/{applicationId} {
      // Anyone can create (submit application)
      allow create: if true;
      // Only authenticated users can read/update/delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

---

## 🐛 Troubleshooting

### "Firebase: No Firebase App" Error
→ Check that all `VITE_FIREBASE_*` variables are set in `.env.local`

### Form submission fails
→ Ensure Firestore is enabled in test mode
→ Check browser console for specific errors

### Admin login fails
→ Verify Authentication is enabled with Email/Password
→ Ensure you created an admin user in Firebase Console

### 3D graphics not loading
→ Your device may not support WebGL. Try a different browser.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary to HeartBeats - NIT Rourkela.

---

## 👥 Contact

**HeartBeats Band** - NIT Rourkela

- Website: [heartbeats.nitrkl.ac.in](#)
- Instagram: [@heartbeats.nitrkl](#)
- Email: heartbeats@nitrkl.ac.in
