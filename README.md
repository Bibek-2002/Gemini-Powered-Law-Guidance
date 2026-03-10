# NyayaFlow Assist

NyayaFlow Assist is a React Native + Expo application for structured legal drafting and on-device legal workflow management.

## Core Modules

- Advisory Engine: AI-assisted legal query analysis
- Docket Vault: local record capture, edit, and retrieval
- Statute Explorer: searchable statute and section browsing
- Incident Studio: incident report draft + PDF export workflow
- Source Archive: quick access to reference legal material

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation
- AsyncStorage

## Local Development

```bash
npm install
npm run start
```

## Environment Variables

Create `.env` in project root:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
```

## Build Commands

```bash
npm run android
npm run ios
npm run build:android
npm run build:ios
```

## Project Layout

```text
AppShell.tsx
routeRegistry.ts
workflows/
fragments/
integrations/
domain/
statutes/
assets/
images/
```

## App Identity

- Display Name: `NyayaFlow Assist`
- Expo Slug: `nyayaflow-assist`
- Android Package: `com.bibek.nyayaflowassist`
- iOS Bundle ID: `com.bibek.nyayaflowassist`

## Notes

- This app is an assistive legal workflow tool and not a substitute for professional legal advice.
- All locally saved records remain on-device unless explicitly shared by the user.
