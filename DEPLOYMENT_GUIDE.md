# Gemini Powered Law Assistant Deployment Guide

Deployment checklist for Expo + EAS releases.

## Prerequisites

- Node.js 20+
- npm
- Expo CLI
- EAS CLI

## Install

```bash
npm install
```

## Run Development Build

```bash
npm run start
```

## EAS Configuration (one-time)

```bash
eas build:configure
```

## Identity Check Before Build

Confirm these values in `app.json`:

- `name`: `Gemini Powered Law Assistant`
- `slug`: `gemini-powered-law-assistant-mobile`
- `scheme`: `gemini-powered-law-assistant`
- `android.package`: `com.geminipoweredlawassistant.mobile`
- `ios.bundleIdentifier`: `com.geminipoweredlawassistant.mobile`

## Build Commands

```bash
npm run build:android
npm run build:ios
```

## Submit Commands

```bash
npm run submit:android
npm run submit:ios
```

## Runtime Environment

```bash
EXPO_PUBLIC_LAW_ASSISTANT_API_KEY=your_api_key_here
EXPO_PUBLIC_LAW_ASSISTANT_MODEL=gemini-3-flash-preview
```

## Branding Assets

- `assets/icon.png`
- `assets/splash-icon.png`
- `assets/favicon.png`

## Release Validation Checklist

1. Verify environment variables and EAS secrets.
2. Smoke-test all navigation routes.
3. Confirm statute notebook loads JSON decks correctly.
4. Confirm incident template and incident PDF export flows.
5. Build artifact and run device-level sanity checks.
