# NyayaNexus Studio Deployment Guide

Deployment checklist for Expo + EAS builds of NyayaNexus Studio.

## Prerequisites

- Node.js 20+
- npm
- Expo CLI
- EAS CLI

## Install Dependencies

```bash
npm install
```

## Development Run

```bash
npm run start
```

## Configure EAS (First-Time Setup)

```bash
eas build:configure
```

## Build Commands

### Android

```bash
npm run build:android
```

### iOS

```bash
npm run build:ios
```

## Submit Commands

```bash
npm run submit:android
npm run submit:ios
```

## Branding Assets

Assets are under `assets/`:

- `icon.png`
- `adaptive-icon.png`
- `splash-icon.png`
- `favicon.png`
- `nyayanexus-icon.svg` (editable vector source)

## Runtime Environment

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
```

## Source Layout

```text
WorkspaceNavigator.tsx
appRoutes.ts
workflows/
fragments/
integrations/
domain/
assets/
images/
```

## Release Checklist

1. Validate `.env` and EAS profile secrets.
2. Run smoke test and verify navigation routes.
3. Confirm incident template + PDF export flow.
4. Build target platform artifact.
5. Test generated artifact before distribution.
