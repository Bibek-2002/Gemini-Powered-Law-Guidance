# Gemini-Powered-Law-Guidance Public

Gemini-Powered-Law-Guidance Public is a React Native (Expo) mobile application for legal workflow support. It combines AI-assisted legal analysis, a local case ledger, statute quick-reference decks, and incident reporting utilities in one mobile workspace.

## Product Goals

- Provide fast first-pass legal issue analysis with structured AI output.
- Keep case notes and saved responses available on-device for continuity.
- Offer searchable statute decks for rapid section lookup during drafting.
- Generate incident templates and printable reports from the same workflow.
- Keep module boundaries clear so future expansion remains maintainable.

## Feature Modules

- `Command Center`: home launchpad and workflow routing.
- `Research Desk`: Gemini query analysis and structured legal summary generation.
- `Docket Vault`: save, review, and edit local case records.
- `Statute Notebook`: tabbed searchable statute section reference decks.
- `Incident Studio`: guided intake form and PDF export.
- `Incident Template`: plain text incident template export.
- `Source Archive`: browse reference documents.

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation (native stack)
- AsyncStorage
- Axios

## Directory Map

```text
RootNavigator.tsx
appRoutes.ts
views/
uiBlocks/
integrations/
domain/
dataLayer/
assets/
images/
```

## Statute Data Layer (JSON)

The statute decks are maintained as JSON files in `dataLayer/statuteDecks/` and normalized through `dataLayer/statuteDecks/index.ts`.

- `criminal_offence_digest.json`
- `procedure_track_bnss.json`
- `evidence_logic_bsa.json`
- `civil_remedy_compass.json`
- `motor_claims_playbook.json`
- `cyber_compliance_snapshot.json`

## App Identity

- Display Name: `Gemini-Powered-Law-Guidance Public`
- Expo Slug: `gemini-powered-law-guidance-public`
- Scheme: `gemini-powered-law-guidance-public`
- Android Package: `com.bibek.geminipoweredlawguidancepublic`
- iOS Bundle ID: `com.bibek.geminipoweredlawguidancepublic`
- npm Package Name: `gemini-powered-law-guidance-public`

## Environment Setup

Create a `.env` file in project root:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
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

## Compliance and Usage Notes

- AI output is assistive content and must be legally verified before final use.
- Case records are stored locally unless a user explicitly exports or shares files.
- This product supports legal workflows; it is not a law firm service or legal representation.
