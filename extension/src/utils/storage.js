const DEFAULT_LANGUAGE = 'en';

export function getSavedLanguage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['spotifyLyricsTranslationLang'], (result) => {
            resolve(result.spotifyLyricsTranslationLang || DEFAULT_LANGUAGE);
        });
    });
}

export function saveLanguage(lang) {
    return chrome.storage.sync.set({ spotifyLyricsTranslationLang: lang });
} 