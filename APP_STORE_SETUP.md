# Hyphen Wellness - App Store Setup Guide

## Current Configuration ✅

Your app is configured with:
- **App Name**: Hyphen Wellness
- **Bundle ID (iOS)**: com.hyphenwellness.app
- **Package Name (Android)**: com.hyphenwellness.app
- **Owner**: affworld001
- **Version**: 1.0.0
- **Build Number (iOS)**: 1
- **Version Code (Android)**: 1

## Next Steps to Launch

### 1. Create EAS Project

Run this command in the terminal:

```bash
cd expo-app
npx eas init
```

This will:
- Ask you to confirm creating a project for `@affworld001/hyphen-wellness`
- Generate a unique EAS project ID
- Link your local project to your Expo account

### 2. Build for iOS App Store

```bash
npx eas build --platform ios --profile production
```

**Before building**, make sure you have:
- ✅ Apple Developer account
- ✅ Paid Apple Developer Program enrollment
- ✅ iOS certificate and provisioning profile configured in EAS

### 3. Build for Android Play Store

```bash
npx eas build --platform android --profile production
```

**Before building**, make sure you have:
- ✅ Google Play Developer account ($25 one-time fee)
- ✅ Android keystore configured in EAS

### 4. Submit to App Stores

After successful builds:

**iOS Submission:**
```bash
npx eas submit --platform ios
```

**Android Submission:**
```bash
npx eas submit --platform android
```

## Configuration Details

### iOS Permissions:
- 📷 Camera (QR scanning, profile photos)
- 📸 Photo Library (uploading photos)
- 📍 Location (gym check-ins, nearby sessions)
- 🔊 Microphone (training session recordings)
- 🏃 Motion Sensors (workout tracking)
- 📬 Push Notifications

### Android Permissions:
- 📷 Camera & Audio Recording
- 📸 Storage (read/write)
- 📍 Location (fine & coarse)
- 📬 Notifications
- 🌐 Internet & Network
- 📲 Wake Lock & Vibrate

### Plugins Configured:
- ✅ expo-router (navigation)
- ✅ expo-splash-screen
- ✅ expo-notifications
- ✅ expo-build-properties (iOS frameworks, Android SDK 35)

## Testing Before Launch

1. **Test on physical devices:**
   ```bash
   npx eas build --platform ios --profile preview
   npx eas build --platform android --profile preview
   ```

2. **Test locally:**
   ```bash
   npm start
   ```

## Important Notes

⚠️ **Make sure these files exist in `assets/` folder:**
- `icon.png` (1024x1024 for iOS, 512x512 for Android)
- `favicon.png` (for web)

⚠️ **Update version numbers** before each new release:
- iOS: Update `version` and `buildNumber` in app.json
- Android: Update `versionCode` in app.json

⚠️ **Test thoroughly** before submitting to production!

## Quick Commands Reference

```bash
# Login to EAS
npx eas login

# Check login status
npx eas whoami

# Build for iOS
npx eas build --platform ios

# Build for Android  
npx eas build --platform android

# Build for both
npx eas build --platform all

# Submit both platforms
npx eas submit --platform all

# View build status
npx eas build:list
```

