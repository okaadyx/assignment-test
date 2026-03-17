# 🚜 Expo Mobile Application - Test Project

[![Expo](https://img.shields.io/badge/Expo-54.0.33-blue?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61dafb?logo=react&logoColor=white)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

This is a **production-grade foundation** for a mobile application built with **Expo** and **React Native**. It features a highly modular architecture, robust authentication flows, and optimized state management.

## 🚀 Overview

This repository demonstrates best practices in modern mobile development, including:
- **Scalable Folder Structure**: Separation of concerns across core modules.
- **Hook-Driven Logic**: Consolidated authentication logic for maintainability.
- **Type Safety**: Full TypeScript implementation across all layers.
- **Efficient Data Handling**: Leveraging TanStack Query for server state.

---

## 📸 Visual Walkthrough

*(Replace these with actual screenshots of your application)*

| Onboarding | Login | Signup |
| :---: | :---: | :---: |
| ![Onboarding](https://via.placeholder.com/200x400?text=Onboarding) | ![Login](https://via.placeholder.com/200x400?text=Login) | ![Signup](https://via.placeholder.com/200x400?text=Signup) |

---

## 🏗️ Architecture & Design Patterns

The project follows a **Feature-Based Modular Architecture** to ensure scalability and ease of testing.

### 📁 Directory Deep-Dive

- **`app/`**: Utilizes **Expo Router** for file-based navigation.
  - `auth/`: Contains all identity management screens (Login, Signup, Recovery).
  - `_layout.tsx`: Root provider configuration (QueryClient, Theme, Navigation).
- **`components/`**: Atomic design approach.
  - `core/`: Fundamental base components (Buttons, Inputs).
  - `auth/`: Specialized components for authentication flows.
  - `modal/`: Global state-driven modals.
- **`hooks/`**: Business logic extraction.
  - `auth-hooks.ts`: Consolidated logic for Login, OTP, and Password Reset.
  - `useSignupForm.ts`: Specialized multi-step signup logic.
- **`services/`**: API abstraction layer using **Axios**.
- **`constants/`**: Design system tokens (Colors, Spacing, Typography).

### ⚓ Key Implementation: "One Hook" Pattern
Simpler authentication flows are consolidated into a single `auth-hooks.ts` to reduce file clutter, while complex flows like Signup maintain their own files for clarity.

---

## 🏁 Getting Started

### 📋 Prerequisites

- **Node.js**: v18.x or later.
- **npm** or **yarn**.
- **Expo Go**: Available on iOS and Android.

### ⚙️ Installation

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/okaadyx/assignment-test
   cd assignment-test
   ```

2. **Install**:
   ```bash
   npm install
   ```

### 🚀 Development Flow

- **Start Server**: `npx expo start`
- **Android**: Press `a` (requires Android Studio / Emulator).
- **iOS**: Press `i` (requires Xcode / Simulator).
- **Web**: Press `w` (browser view).

---

## 📦 Production & Deployment

This project is ready for **EAS (Expo Application Services)**.

### 🛠️ Building for Production

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Configure Project**:
   ```bash
   eas build:configure
   ```

3. **Build APK/AAB (Android)**:
   ```bash
   eas build --platform android --profile production
   ```

4. **Build IPA (iOS)**:
   ```bash
   eas build --platform ios --profile production
   ```

### 🔒 Environment Management
Sensitive endpoints are abstracted in `services/index.ts`. For production, migrate these to a `.env` file and use `expo-constants` to expose them safely.

---

## 🧪 Quality Assurance

- **Linting**: `npm run lint` to maintain code style.
- **TypeScript**: Automated type checking via CLI or IDE.
- **Testing**: Designed for easy integration with **Jest** and **React Native Testing Library**.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

Built with ❤️ by the Developer Community.
