# Build Instructions for Hyphen Wellness App

## Quick Start

Run these commands in your terminal:

### 1. Login to Expo (if not already)
```bash
cd expo-app
npx eas-cli login
```

### 2. Initialize EAS Project
```bash
npx eas-cli init
```

When prompted:
- Enter 'y' to create a new project
- Accept the default project name: `@affworld001/hyphen-wellness`

### 3. Build for iOS (TestFlight)
```bash
npx eas-cli build --platform ios --profile production
```

This will:
- Upload your code to Expo's cloud
- Build the iOS app (takes 10-15 minutes)
- Automatically submit to TestFlight when complete

### 4. Monitor Build Progress
```bash
npx eas-cli build:list
```

## App Configuration

- **Owner**: affworld001
- **Bundle ID**: com.hyphenwellness.app
- **Slug**: hyphen-wellness
- **Version**: 1.0.0
- **Build Number**: 1

## Build Profiles (in eas.json)

- **development**: For development/testing
- **preview**: For internal testing
- **production**: For TestFlight/App Store (this is what you need)

## Troubleshooting

### "EAS project not configured"
Run: `npx eas-cli init` and follow the prompts

### "Invalid UUID appId"
Remove the `projectId` from app.json and run init again

### Login issues
Make sure you're logged in: `npx eas-cli whoami`

## Notes

- First build will take longer (15-20 mins)
- Subsequent builds are faster (5-10 mins)
- Your app will be available at: https://expo.dev/accounts/affworld001/projects/hyphen-wellness

