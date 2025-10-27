# HypGym Dubai - Luxury Mobile App 🏋️‍♂️💎

Ultra-luxury fitness mobile app for HypGym Dubai members built with:
- **Expo** (React Native framework)
- **TypeScript** (Type safety)
- **Axios** (API client)
- **AsyncStorage** (Local storage)
- **Native React Native Styles** (Beautiful, luxury UI)

## ✨ Luxury Features

✅ **Premium Login Screen** - Beautiful, gradient-based UI with smooth animations  
✅ **Luxury Dashboard** - VIP member experience with premium design  
✅ **One-Tap Check-in** - Quick gym check-in functionality  
✅ **Real-time Stats** - Today, This Week, This Month attendance tracking  
✅ **Recent Activity** - Check-in history with beautiful timeline  
✅ **Secure Authentication** - JWT-based auth with AsyncStorage  
✅ **Pull to Refresh** - Smooth refresh experience  
✅ **Error Handling** - Graceful error handling with fallbacks  

## 🎨 Design Philosophy

- **Dark Header**: Sleek dark navy background with VIP badge
- **Gradient Cards**: Beautiful white cards with shadows and elevation
- **Premium Typography**: Bold, readable fonts with perfect hierarchy
- **Smooth Animations**: Elegant transitions and interactions
- **Luxury Color Palette**: 
  - Primary: #1E293B (Dark Navy)
  - Accent: #FBBF24 (Premium Gold)
  - Action: #3B82F6 (Royal Blue)
  - Success: #10B981 (Emerald Green)

## 🔐 Demo Credentials

**Member:**
- Email: `testmember@hypgym.com`
- Password: `test123`

**Admin:**
- Email: `admin@hypgym.com`
- Password: `admin123`

**Reception:**
- Email: `reception@hypgym.com`
- Password: `reception123`

## 🚀 Getting Started

### Prerequisites
```bash
npm install -g expo-cli
```

### Install Dependencies
```bash
cd expo-app
npm install --legacy-peer-deps
```

### Run the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

**Start Dev Server:**
```bash
npm start
```

## 📱 Project Structure

```
expo-app/
├── src/
│   ├── config/
│   │   └── constants.ts          # API URL configuration
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication logic
│   ├── screens/
│   │   ├── LoginScreen.tsx     # Luxury login UI
│   │   └── DashboardScreen.tsx  # Premium member dashboard
│   ├── services/
│   │   └── api.ts              # Backend API integration
│   └── types/
│       └── index.ts            # TypeScript definitions
├── App.tsx                      # Main app component
└── package.json                 # Dependencies
```

## 🔌 Backend Integration

The app connects to: `https://gymapi.capitalharvesters.com/api`

### API Endpoints Used:
- `POST /auth/login` - User authentication
- `GET /checkin/history` - Check-in history
- `POST /checkin/checkin` - Check in to gym
- `POST /checkin/checkout/:sessionId` - Check out from gym

## 🎯 Key Features

### 1. Luxury Login Screen
- Beautiful gradient background
- Smooth form inputs with icons
- Password visibility toggle
- Demo credentials display
- Loading states

### 2. Premium Dashboard
- **VIP Header**: Dark navy with gold VIP badge
- **Stats Cards**: Today, This Week, This Month attendance
- **Quick Check-in**: One-tap gym check-in
- **Member Info**: Email, Phone, Role display
- **Recent Activity**: Timeline of recent check-ins
- **Pull to Refresh**: Smooth data refresh

### 3. Error Handling
- Graceful fallbacks on API errors
- User-friendly error messages
- Network error detection
- Empty state handling

## 🔧 Configuration

### API URL
Edit `src/config/constants.ts`:
```typescript
export const API_URL = 'http://3.108.55.246:5001/api';
```

## 📱 Screenshots

- Luxury login with gradient background
- Premium dashboard with VIP header
- Beautiful stats cards with shadows
- Elegant activity timeline
- One-tap check-in button

## 🛠️ Tech Stack

- **Expo SDK**: 54
- **React Native**: 0.81.5
- **TypeScript**: 5.9.2
- **Axios**: 1.13.0
- **AsyncStorage**: 2.2.0

## 📝 License

MIT License - HypGym Dubai

## 👨‍💻 Development

Built with ❤️ for HypGym Dubai members
