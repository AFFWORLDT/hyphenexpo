# Changelog - Hyphen Wellness Mobile App

## [1.0.0] - 2024

### Added
- ✅ Complete mobile app with React Native and Expo
- ✅ Authentication system with secure token management
- ✅ Member dashboard with statistics
- ✅ Check-in/check-out functionality
- ✅ Beautiful UI with modern design
- ✅ NativeWind for Tailwind CSS styling
- ✅ TypeScript support
- ✅ Pull-to-refresh functionality

### Fixed
- ✅ Fixed API import path (config/constants.ts was missing)
- ✅ Fixed check-in history endpoint to use correct API route
- ✅ Fixed authentication to handle both `id` and `_id` fields from backend
- ✅ Fixed dashboard statistics calculation
- ✅ Fixed check-in API calls to include memberId parameter
- ✅ Fixed response data handling in AuthContext
- ✅ Fixed API endpoint routes

### Changed
- 🎨 Rebranded from "HypGym Dubai" to "Hyphen Wellness"
- 🎨 Updated app name throughout the application
- 🎨 Updated logo to use logo.png from assets
- 🎨 Updated all email examples to @hyphenwellness.com
- 🎨 Changed app package name to hyphen-wellness
- 🎨 Updated bundle identifier to com.hyphenwellness.app
- 🎨 Enhanced dashboard with logo display

### Technical
- ⚙️ Added NativeWind Babel plugin
- ⚙️ Configured proper TypeScript paths
- ⚙️ Set up proper API interceptors for auth
- ⚙️ Added error handling for network requests
- ⚙️ Implemented proper loading states
- ⚙️ Added user ID normalization

### Files Modified
- `src/config/constants.ts` - Created API configuration
- `src/services/api.ts` - Fixed API endpoints
- `src/contexts/AuthContext.tsx` - Enhanced authentication handling
- `src/screens/LoginScreen.tsx` - Updated branding and logo
- `src/screens/DashboardScreen.tsx` - Updated branding and statistics
- `app.json` - Updated app configuration
- `package.json` - Updated package name
- `babel.config.js` - Added NativeWind plugin
- `README.md` - Created comprehensive documentation

## Issues Fixed
1. ✅ API Configuration Error - Fixed missing constants file
2. ✅ Check-in History Error - Fixed incorrect endpoint route
3. ✅ Authentication Error - Fixed user ID field mapping
4. ✅ Dashboard Statistics - Fixed date calculations
5. ✅ Logo Display - Added proper logo implementation

## Testing
- Tested login functionality
- Tested check-in flow
- Tested dashboard statistics
- Tested pull-to-refresh
- Tested authentication persistence

