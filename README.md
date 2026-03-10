# LawAI Mobile

LawAI Mobile is a React Native + Expo application focused on legal workflow support:

- AI legal query assistant
- Case database with local storage
- Bare Acts lookup
- FIR format download and custom FIR PDF generation
- Original documents browser

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation
- AsyncStorage

## Run Locally

```bash
npm install
npm run start
```

## Environment Setup

Create or update `.env` in project root:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
EXPO_PUBLIC_GEMINI_MODEL=gemini-3-flash-preview
```

## Build Scripts

```bash
npm run android
npm run ios
npm run build:android
npm run build:ios
```

## Project Structure

```text
App.tsx
pages/
components/
Json/
assets/
images/
```

## App Identity

- Display Name: `LawAI Mobile`
- Expo Slug: `lawai-mobile`
- Android Package: `com.lawai.mobile`
- iOS Bundle ID: `com.lawai.mobile`
