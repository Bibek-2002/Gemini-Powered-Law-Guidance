# Gemini Powered Law Assistant

Gemini Powered Law Assistant is a React Native (Expo) mobile app for legal workflow support. It combines AI-assisted legal analysis, a local matter ledger, statute quick-reference decks, and incident reporting utilities in one mobile workspace.

## Feature Modules

- `Command Center`: home launchpad and workflow routing.
- `Research Desk`: AI query analysis and structured legal summary generation.
- `Docket Vault`: save, review, and edit local matter records.
- `Statute Notebook`: searchable statute section reference decks.
- `Incident Studio`: guided intake form and PDF export.
- `Incident Template`: plain text incident template export.
- `Source Archive`: browse reference documents.

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation (native stack)
- AsyncStorage
- Native `fetch` for model API calls

## Directory Map

```text
RootNavigator.tsx
appRoutes.ts
views/
uiBlocks/
services/
entities/
legalData/
assets/
```

## Statute Library JSON

Statute decks are stored in `legalData/statuteLibrary/` and normalized through `legalData/statuteLibrary/index.ts`.

- `criminal_offence_digest.json`
- `procedure_track_bnss.json`
- `evidence_logic_bsa.json`
- `civil_remedy_compass.json`
- `motor_claims_playbook.json`
- `cyber_compliance_snapshot.json`

## App Identity

- Display Name: `Gemini Powered Law Assistant`
- Expo Slug: `gemini-powered-law-assistant-mobile`
- Scheme: `gemini-powered-law-assistant`
- Android Package: `com.geminipoweredlawassistant.mobile`
- iOS Bundle ID: `com.geminipoweredlawassistant.mobile`
- npm Package Name: `gemini-powered-law-assistant-mobile`

## Environment Setup

Create a `.env` file in project root:

```bash
EXPO_PUBLIC_LAW_ASSISTANT_API_KEY=your_api_key_here
EXPO_PUBLIC_LAW_ASSISTANT_MODEL=gemini-3-flash-preview
```

## Local Development

```bash
npm install
npm run start
```

## Native Run Commands

```bash
npm run android
npm run ios
```

## Build and Submit

```bash
npm run build:android
npm run build:ios
npm run submit:android
npm run submit:ios
```
