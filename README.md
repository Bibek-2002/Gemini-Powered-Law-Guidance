# NyayaNexus Studio

NyayaNexus Studio is a React Native (Expo) mobile workspace for legal research support, case note management, statute quick-reference, and incident intake drafting.

## What This App Focuses On

- Fast legal query analysis with Gemini-backed structured output
- Local case notebook (on-device storage)
- Curated statute notebook with searchable section highlights
- Incident report drafting with PDF export
- Reference archive for legal source material

## Product Modules

- `Command Center`: launchpad and workflow entry
- `Research Desk`: AI analysis + draft-to-case save flow
- `Docket Vault`: local case records and edits
- `Statute Notebook`: curated act/section reference cards
- `Incident Studio`: template export + final incident PDF generation
- `Source Archive`: source browsing and quick access

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation (native stack)
- AsyncStorage

## Project Structure

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

## Environment Variables

Create `.env` in the project root:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
```

## Run Locally

```bash
npm install
npm run start
```

## Build and Submit

```bash
npm run android
npm run ios
npm run build:android
npm run build:ios
npm run submit:android
npm run submit:ios
```

## App Identity

- Display Name: `NyayaNexus Studio`
- Expo Slug: `nyayanexus-studio`
- Scheme: `nyayanexus-studio`
- Android Package: `com.bibek.nyayanexusstudio`
- iOS Bundle ID: `com.bibek.nyayanexusstudio`

## Data and Compliance Notes

- Case records are stored on-device unless manually shared by the user.
- AI output is assistive; verify legal conclusions before formal use.
- The app is a workflow aid and not legal representation or legal advice.
