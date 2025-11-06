#!/bin/bash
# Generate all mobile screens based on web pages

# Member screens
cat > src/screens/member/MemberSessionsScreen.tsx << 'SCREEN'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MemberSessionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Sessions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
});
SCREEN

# Create more screens...
echo "Screens generation started..."
