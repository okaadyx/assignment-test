# Expo Mobile Application - Test Project

This is a modern mobile application built with **Expo** and **React Native**, designed with a focus on a seamless user experience, robust authentication, and a clean architectural pattern.

## 🚀 Overview

This project provides a comprehensive foundation for a mobile app, featuring a full authentication suite, onboarding flows, and a scalable component-driven architecture.

## ✨ Key Features

- **Dynamic Onboarding**: A smooth introduction to the application for new users.
- **Robust Authentication**:
  - **Login / Signup**: Secure user registration and access.
  - **Forgot / Reset Password**: Easy recovery flow for forgotten credentials.
  - **OTP Verification**: Enhanced security with 6-digit OTP codes.
- **Modern UI Components**: Reusable, themed components for consistent design across the app.
- **State Management**: Using `@tanstack/react-query` for efficient data fetching and caching.
- **File-Based Routing**: Leverages `expo-router` for intuitive navigation and deep linking.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: `@expo/vector-icons`
- **Animation**: `react-native-reanimated`

## 📂 Project Structure

```text
├── app/                  # Main application screens and routing
│   ├── auth/             # Authentication-related screens (Login, Signup, OTP, etc.)
│   ├── _layout.tsx       # Root layout configuration
│   └── index.tsx         # Entry point screen
├── components/           # Reusable UI components
│   ├── auth/             # Auth-specific components
│   ├── core/             # Fundamental UI elements (Buttons, Inputs)
│   ├── header/           # Reusable header components
│   └── modal/            # System-wide modal components
├── hooks/                # Custom React hooks (Forms, API logic)
├── services/             # API services and data fetching logic
├── constants/            # Application-wide constants (Colors, Typography)
├── lib/                  # Utilities and shared libraries
├── types/                # TypeScript type definitions
└── assets/               # Static assets (Images, Fonts)
```

## 🏁 Getting Started

### 1. Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn
- [Expo Go](https://expo.dev/go) app (for mobile testing) or an Android/iOS emulator

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Running the App

```bash
# Start the development server
npx expo start
```

In the terminal output, you'll see a QR code. Scan it with the **Expo Go** app to run the app on your physical device. Alternatively, use:
- `a` to open on Android Emulator
- `i` to open on iOS Simulator
- `w` to open on Web

## 📜 Available Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Opens the app in an Android emulator.
- `npm run ios`: Opens the app in an iOS simulator.
- `npm run web`: Opens the app in a web browser.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

Built with ❤️ using Expo.
