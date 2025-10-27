# Hyphen Wellness Mobile App

A modern React Native mobile application for the Hyphen Wellness gym management system.

## Features

- 🔐 Secure authentication with token-based login
- 📊 Member dashboard with statistics
- ✅ Gym check-in functionality
- 📱 Modern, beautiful UI with NativeWind styling
- 🎨 Branded with Hyphen Wellness logo
- 🔄 Pull-to-refresh functionality
- 📈 Check-in history tracking

## Tech Stack

- **React Native** 0.81.5
- **Expo** ~54.0.20
- **TypeScript** 5.9.2
- **NativeWind** 4.2.1 (Tailwind CSS for React Native)
- **Axios** for API calls
- **AsyncStorage** for local data persistence

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## API Configuration

The app connects to the backend API at:
- **Production**: `https://gymapi.capitalharvesters.com/api`

Update the API URL in `src/config/constants.ts` if needed.

## Features

### Authentication
- Login with email and password
- Automatic token management
- Persistent login sessions
- Secure logout

### Dashboard
- Welcome screen with user information
- Statistics for today, this week, and this month
- Quick check-in button
- Recent activity feed
- Profile information display

### Check-in System
- One-tap gym check-in
- Check-in history viewing
- Real-time statistics
- Pull-to-refresh for latest data

## App Configuration

- **App Name**: Hyphen Wellness
- **Bundle ID**: com.hyphenwellness.app
- **Logo**: assets/logo.png

## Test Credentials

- **Member**: testmember@hyphenwellness.com / test123
- **Admin**: admin@hyphenwellness.com / admin123
- **Reception**: reception@hyphenwellness.com / reception123

## Project Structure

```
expo-app/
├── src/
│   ├── config/          # Configuration files
│   ├── contexts/        # React contexts (Auth)
│   ├── screens/         # Screen components
│   ├── services/        # API services
│   └── types/           # TypeScript types
├── assets/              # Images and assets
├── App.tsx              # Main app component
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## Development

### Running the App

1. Start the Expo development server:
   ```bash
   npm start
   ```

2. Scan the QR code with:
   - **iOS**: Camera app or Expo Go
   - **Android**: Expo Go app

### Building for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## API Endpoints

The app uses the following API endpoints:

- **Authentication**
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - `GET /auth/profile` - Get user profile
  - `PUT /auth/profile` - Update profile

- **Check-in**
  - `POST /checkin/checkin` - Check in to gym
  - `POST /checkin/checkout/:sessionId` - Check out
  - `GET /checkin/active` - Get active sessions
  - `GET /checkin/today` - Get today's sessions
  - `GET /checkin/member/:memberId/history` - Get member history

## Recent Updates

✅ Fixed API import paths
✅ Fixed check-in history endpoint
✅ Updated authentication handling
✅ Implemented user ID normalization (id/_id)
✅ Added Hyphen Wellness branding
✅ Updated app icon and splash screen
✅ Enhanced error handling
✅ Improved dashboard statistics

## License

Copyright © 2024 Hyphen Wellness
