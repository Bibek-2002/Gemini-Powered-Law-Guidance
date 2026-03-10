# NyayaFlow Assist Deployment Guide

Production and internal distribution guide for the Expo/EAS setup.

## Prerequisites

- Node.js 20+
- npm
- Expo CLI
- EAS CLI

## Install

```bash
npm install
```

## Run in Development

```bash
npm run start
```

## Configure EAS

If this is a fresh clone or new app identity, configure EAS project metadata:

```bash
eas build:configure
```

## Build Artifacts

### Android

```bash
npm run build:android
```

### iOS

```bash
npm run build:ios
```

## Submit to Stores

```bash
npm run submit:android
npm run submit:ios
```

## Icons and Branding Assets

Assets are stored in `assets/`.

- `icon.png` (main icon)
- `adaptive-icon.png`
- `splash-icon.png`
- `favicon.png`
- `nyayaflow-icon.svg` (editable source)

## Runtime Environment Variables

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
```

## Source Layout

```text
AppShell.tsx
routeRegistry.ts
workflows/
fragments/
integrations/
domain/
statutes/
assets/
```

## Release Checklist

1. Confirm environment variables in build profiles.
2. Run local smoke test (`npm run start`).
3. Verify navigation routes and incident export flow.
4. Build Android and/or iOS artifacts.
5. Validate final binary before store submission.
