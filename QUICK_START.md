# Quick Start Guide - Hyphen Wellness Mobile App

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your mobile device (iOS or Android)

### Installation Steps

1. **Navigate to the app directory**
   ```bash
   cd expo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - iOS: Press `i` in the terminal or scan QR code with Camera app
   - Android: Press `a` in the terminal or scan QR code with Expo Go
   - Web: Press `w` in the terminal

## 📱 App Features

### Login Screen
- Enter your email and password
- Demo credentials are provided on the screen
- Beautiful UI with Hyphen Wellness branding

### Dashboard
- View your statistics (Today, This Week, This Month)
- Quick check-in button
- Your profile information
- Recent check-in history

### Check-in
- Tap the "Check In" button to check in to the gym
- View your check-in history
- Pull down to refresh data

## 🧪 Test Credentials

- **Member**: testmember@hyphenwellness.com / test123
- **Admin**: admin@hyphenwellness.com / admin123
- **Reception**: reception@hyphenwellness.com / reception123

## 🔧 Development

### Available Commands
```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

### Debugging
- Open Developer Menu: Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Enable Remote JS Debugging: Choose from Developer Menu
- View logs: Check terminal output

## 🛠️ Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS for styling
- **Axios** - HTTP client
- **AsyncStorage** - Local storage

## 📂 Project Structure

```
expo-app/
├── src/
│   ├── config/
│   │   └── constants.ts       # API configuration
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication logic
│   ├── screens/
│   │   ├── LoginScreen.tsx   # Login screen
│   │   └── DashboardScreen.tsx # Dashboard
│   ├── services/
│   │   └── api.ts            # API calls
│   └── types/
│       └── index.ts           # Type definitions
├── assets/
│   └── logo.png               # App logo
├── App.tsx                    # Root component
├── app.json                    # App configuration
└── package.json               # Dependencies
```

## 🌐 API Configuration

The app connects to: `https://gymapi.capitalharvesters.com/api`

To change the API URL, edit: `src/config/constants.ts`

## ⚠️ Common Issues

### Issue: "Module not found"
**Solution**: Run `npm install` again

### Issue: "Unable to resolve module"
**Solution**: Clear cache and restart:
```bash
expo start -c
```

### Issue: App won't load
**Solution**: 
1. Check your internet connection
2. Verify API is accessible
3. Check console for errors

## 📝 Recent Fixes

✅ Fixed all API bugs
✅ Fixed authentication
✅ Fixed check-in history
✅ Updated branding to Hyphen Wellness
✅ Added logo throughout app
✅ Fixed dashboard statistics

## 📞 Support

For issues or questions, check the README.md file for more details.

---

**Happy Coding! 🎉**

