import { languages } from './languages';
import { getSavedLanguage, saveLanguage } from './utils/storage';
import { createLanguageSelect } from './components/languageSelect';

let isTranslating = false;

// Translation functions
async function translateText(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0][0][0];
    } catch (error) {
        console.error('Translation failed:', error);
        return '[Translation Error]';
    }
}

async function translateLyrics() {
    if (isTranslating) return;
    isTranslating = true;

    const targetLang = await getSavedLanguage();
    const lyricsDivs = document.querySelectorAll('[data-testid="fullscreen-lyric"] div');

    document.querySelectorAll('[data-translated="true"]').forEach(el => el.remove());

    const originalLines = [];
    lyricsDivs.forEach((div, index) => {
        const originalText = div.textContent.trim();
        if (originalText && originalText !== "♪") {
            originalLines.push({ index, text: originalText });
        }
    });

    const translatedLines = await Promise.all(originalLines.map(async (line) => {
        const translatedText = await translateText(line.text, targetLang);
        return { index: line.index, translatedText };
    }));

    translatedLines.forEach(({ index, translatedText }) => {
        const targetDiv = lyricsDivs[index];
        const translationDiv = document.createElement('div');
        translationDiv.style.color = 'gray';
        translationDiv.style.fontStyle = 'italic';
        translationDiv.textContent = translatedText;
        translationDiv.setAttribute('data-translated', 'true');
        targetDiv.parentNode.insertBefore(translationDiv, targetDiv.nextSibling);
    });

    isTranslating = false;
}

// UI functions
function createHeader() {
    const header = document.createElement('div');
    header.style.cssText = `
        position: sticky;
        top: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
        background: rgba(40, 40, 40, 0.95);
        width: 100%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        margin: 0;
    `;

    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 600px;
        width: 90%;
    `;

    const label = document.createElement('span');
    label.textContent = '🌏';
    label.style.cssText = `
        font-size: 16px;
        color: white;
    `;

    controlsContainer.appendChild(label);
    controlsContainer.appendChild(createLanguageSelect());
    header.appendChild(controlsContainer);

    const mainView = document.querySelector('.main-view-container__scroll-node-child');
    if (mainView) {
        mainView.insertBefore(header, mainView.firstChild);
    }
}

// Observer functions
function observeLyrics() {
    const targetNode = document.querySelector('[data-testid="fullscreen-lyric"]');
    if (!targetNode) return;

    const observer = new MutationObserver(() => {
        translateLyrics();
    });

    observer.observe(targetNode, {
        childList: true,
        subtree: true,
    });
}

function waitForSpotifyContainer() {
    const container = document.querySelector('.main-view-container__scroll-node-child');
    if (container) {
        // Once we have the main container, start waiting for lyrics
        waitForLyrics();
        checkForTranslation();
    } else {
        // Keep checking for the main container
        setTimeout(waitForSpotifyContainer, 1000);
    }
}

function waitForLyrics() {
    const lyricsContainer = document.querySelector('[data-testid="fullscreen-lyric"]');
    if (lyricsContainer) {
        createHeader();
        observeLyrics();
        translateLyrics();
    } else {
        setTimeout(waitForLyrics, 1000);
    }
}

function checkForTranslation() {
    setInterval(() => {
        if (!document.querySelector('[data-translated="true"]') && !isTranslating) {
            translateLyrics();
        }
    }, 2000);
}

// Initialize the extension
async function init() {
    // Start by waiting for Spotify's main container
    waitForSpotifyContainer();
}

// Start the extension
init();

// Make translateLyrics available to components
window.translateLyrics = translateLyrics; 