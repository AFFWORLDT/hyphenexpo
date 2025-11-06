# Post-Login Navigation Fix

## Issue
After successful login, the app shows "Unmatched Route" error instead of navigating to the dashboard.

## Root Cause
The LoginScreen component wasn't explicitly navigating after successful login, relying only on the Redirect component in the login.tsx route file.

## Fix Applied
1. Added `useRouter` import to LoginScreen
2. Added explicit navigation after successful login: `router.replace('/(tabs)/dashboard')`
3. Updated login.tsx redirect to use `/(tabs)/dashboard` instead of `/(tabs)`

## Changes Made
- `src/screens/LoginScreen.tsx`: Added router navigation after successful login
- `app/(auth)/login.tsx`: Updated redirect to specific dashboard route

## Testing
After login with member role, the app should now:
1. Successfully authenticate
2. Navigate to `/(tabs)/dashboard`
3. Display the appropriate dashboard based on user role
