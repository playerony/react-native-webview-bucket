# React Native WebView Bucket

## Overview

- A minimal Expo app that wraps a website inside a `react-native-webview`.
- Loads your site and keeps platform niceties: splash screen until first render, Android hardware back navigation, external links opening in the system browser.
- Configure the base website URL in `App.js` by replacing the placeholder value `PUT_YOUR_WEBSITE_URL_HERE`.

## Requirements

- Node `>=22` (see `package.json` `engines`)
- Yarn `>=1.22.0` or npm `>=9`
- Expo SDK 54 (managed workflow)
- iOS: Xcode + iOS Simulator (macOS)
- Android: Android Studio + Android Emulator, or a device with USB debugging

## Setup

- Install dependencies: `yarn install` (or `npm install`)
- Start the dev server `yarn start`:
  - iOS: `yarn ios`
  - Android: `yarn android`
  - Web: `yarn web`

## Configuration: Website URL

- Open `App.js`
- Find the constant that holds the site URL. In new setups it appears as:
  - `const WEBSITE_URL = "PUT_YOUR_WEBSITE_URL_HERE"`
- Replace the placeholder with your url, for example:
  - `const WEBSITE_URL = "https://example.com/dashboard"`

## Behavior

- Splash Screen:
  - The splash stays visible until the WebView finishes its initial load, then hides.
- External Links:
  - Non-whitelisted URLs open in the system browser.
- Android Back:
  - Hardware back button navigates back within the WebView history.
