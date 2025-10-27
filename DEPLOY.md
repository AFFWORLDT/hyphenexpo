# Deploy to TestFlight

## Prerequisites
1. Expo account
2. Apple Developer account
3. EAS CLI installed

## Steps to Deploy

### 1. Login to Expo
```bash
cd expo-app
npx eas-cli login
```

### 2. Configure Build
```bash
npx eas-cli build:configure
```

### 3. Build for iOS (TestFlight)
```bash
npx eas-cli build --platform ios --profile production
```

This will:
- Build the iOS app on Expo's cloud servers
- Automatically handle code signing
- Submit to TestFlight (if configured)

### 4. Monitor Build Progress
```bash
npx eas-cli build:list
```

### 5. Submit to TestFlight (if not auto-submitted)
```bash
npx eas-cli submit --platform ios
```

## Environment Variables

If needed, set environment variables:
```bash
npx eas-cli build --platform ios --profile production --env API_URL=https://gymapi.capitalharvesters.com/api
```

## Build Profiles

- **development**: For development builds
- **preview**: For internal testing
- **production**: For TestFlight and App Store

## Troubleshooting

If you get signing errors:
1. Make sure you have an Apple Developer account
2. Run: `npx eas-cli build --platform ios --profile production --no-wait --non-interactive`

