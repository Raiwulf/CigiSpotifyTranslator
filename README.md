# Cigi Spotify Translator

Available as both a Tampermonkey script and a Chrome extension.

## View

![image](https://github.com/user-attachments/assets/0ab755a4-26a3-49a3-9080-bf38b85ad5f1)

## Features

- Translates lyrics in real-time while you listen to music
- Searchable language selector with quick access to popular languages
- Clean and minimal UI that integrates with Spotify's design
- Automatic language detection for source lyrics
- Manual translation trigger button
- Persistent language selection (saves your preference)

## Popular Languages

Quick access to:
- English
- Turkish
- Polish
- Spanish
- French
- German
- Portuguese
- Japanese
- Italian
- Dutch

Plus 90+ additional languages available through search.

# Chrome Extension

## Installation

### Option 1: Direct Installation
1. Download the `extension.crx` file from the repository
2. Go to `chrome://extensions/` in Chrome
3. Drag and drop the `extension.crx` file into the Chrome extensions page

### Option 2: Manual Installation
1. Clone this repository
2. Go to `chrome://extensions/` in Chrome
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `extension` folder

Note: Using this method, users will need to:
- Enable developer mode in Chrome
- May need to reinstall after Chrome restarts
- Won't receive automatic updates

## Usage

1. Open [Spotify Web Player](https://open.spotify.com)
2. Play any song with lyrics
3. Select your desired translation language from the dropdown
   - Use the search box to quickly find any language
   - Popular languages are always shown at the top
4. Click "Translate" or wait for automatic translation
5. Translated lyrics will appear below each line in gray italic text

## How It Works

The extension:
1. Injects a control panel at the top of the lyrics view
2. Provides a searchable language selector with popular languages prioritized
3. Detects when lyrics are displayed
4. Uses Google Translate API to translate each line
5. Displays translations while maintaining the original lyrics

# Script

## Prerequisites

This script requires the Tampermonkey browser extension:
- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

## Installation

### Option 1: Direct Installation (Recommended)
1. Install Tampermonkey for your browser using one of the links above
2. [Click here to install the script](https://update.greasyfork.org/scripts/523415/Cigi%20Spotify%20Translator.user.js)
3. Click "Install" in the Tampermonkey window that opens

### Option 2: Manual Installation
1. Install Tampermonkey for your browser
2. Click on the Tampermonkey icon in your browser
3. Select "Create a new script"
4. Copy the entire contents of `script.js` into the editor
5. Press Ctrl+S or click File > Save to install the script

## Usage

1. Open [Spotify Web Player](https://open.spotify.com)
2. Play any song with lyrics
3. Select your desired translation language from the dropdown
   - Use the search box to quickly find any language
   - Popular languages are always shown at the top
4. Click "Translate" or wait for automatic translation
5. Translated lyrics will appear below each line in gray italic text

## How It Works

The script:
1. Injects a control panel at the top of the lyrics view
2. Provides a searchable language selector with popular languages prioritized
3. Detects when lyrics are displayed
4. Uses Google Translate API to translate each line
5. Displays translations while maintaining the original lyrics

# Notes

- Works only with Spotify Web Player (not the desktop app)
- Requires an active internet connection for translations
- Translation quality depends on Google Translate's accuracy
- Some lyrics might not translate perfectly due to artistic or colloquial language

# License

MIT License - feel free to modify and share!
