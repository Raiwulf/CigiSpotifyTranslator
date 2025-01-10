import { languages } from '../languages';
import { getSavedLanguage, saveLanguage } from '../utils/storage';

function createSearchInput() {
    const searchInput = document.createElement('input');
    searchInput.style.cssText = `
        width: calc(100% - 16px);
        margin: 8px;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 14px;
    `;
    searchInput.placeholder = 'Search language...';
    
    return searchInput;
}

function createOptionsContainer() {
    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = `
        padding: 8px 0;
    `;

    function createLanguageOptions(filter = '') {
        optionsContainer.innerHTML = '';
        
        // Separate popular and other languages
        const popularLanguages = [
            'en', 'tr', 'pl', 'es', 'fr', 'de', 'pt', 
            'ja', 'it', 'nl'
        ];
        
        const entries = Object.entries(languages);
        const filteredEntries = entries.filter(([_, name]) => 
            name.toLowerCase().includes(filter.toLowerCase())
        );

        // Separate and sort entries
        const popularEntries = filteredEntries
            .filter(([code]) => popularLanguages.includes(code))
            .sort((a, b) => popularLanguages.indexOf(a[0]) - popularLanguages.indexOf(b[0]));
        
        const otherEntries = filteredEntries
            .filter(([code]) => !popularLanguages.includes(code))
            .sort((a, b) => a[1].localeCompare(b[1]));

        // Create divider if both sections have items
        if (popularEntries.length > 0 && otherEntries.length > 0) {
            const divider = document.createElement('div');
            divider.style.cssText = `
                padding: 8px 16px;
                color: #888;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
            `;
            divider.textContent = 'Other Languages';
            
            // Create and append all options
            [...popularEntries, divider, ...otherEntries].forEach(entry => {
                if (entry instanceof HTMLElement) {
                    optionsContainer.appendChild(entry);
                    return;
                }

                const [code, name] = entry;
                const option = document.createElement('div');
                option.style.cssText = `
                    padding: 8px 16px;
                    cursor: pointer;
                    color: white;
                    transition: background-color 0.2s;
                `;
                option.textContent = name;

                option.addEventListener('mouseover', () => {
                    option.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });

                option.addEventListener('mouseout', () => {
                    option.style.backgroundColor = 'transparent';
                });

                option.addEventListener('click', async () => {
                    await saveLanguage(code);
                    const selectButton = option.closest('.language-select').querySelector('button');
                    selectButton.textContent = name;
                    option.closest('.dropdown').style.display = 'none';
                    
                    // Trigger translation
                    document.querySelectorAll('[data-translated="true"]').forEach(el => el.remove());
                    window.translateLyrics(); // We'll need to make this available
                });

                optionsContainer.appendChild(option);
            });
        }
    }

    // Initial render
    createLanguageOptions();

    // Add search handler
    const searchInput = optionsContainer.closest('.dropdown').querySelector('input');
    searchInput.addEventListener('input', (e) => {
        createLanguageOptions(e.target.value);
    });

    return optionsContainer;
}

export function createLanguageSelect() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('language-select');
    selectContainer.style.cssText = `
        position: relative;
        flex: 0 1 200px;
        min-width: 120px;
    `;

    const selectButton = document.createElement('button');
    selectButton.style.cssText = `
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background: rgba(80, 80, 80, 1);
        color: white;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const dropdown = createDropdown();
    
    // Update button text with saved language
    getSavedLanguage().then(lang => {
        selectButton.textContent = languages[lang];
    });

    selectButton.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        if (dropdown.style.display === 'block') {
            dropdown.querySelector('input').focus();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selectContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    selectContainer.appendChild(selectButton);
    selectContainer.appendChild(dropdown);
    return selectContainer;
}

function createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');  // Add class for easier selection
    dropdown.style.cssText = `
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(40, 40, 40, 0.98);
        border-radius: 4px;
        margin-top: 4px;
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    const searchInput = createSearchInput();
    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = `
        padding: 8px 0;
    `;

    function createLanguageOptions(filter = '') {
        optionsContainer.innerHTML = '';
        
        // Separate popular and other languages
        const popularLanguages = [
            'en', 'tr', 'pl', 'es', 'fr', 'de', 'pt', 
            'ja', 'it', 'nl'
        ];
        
        const entries = Object.entries(languages);
        const filteredEntries = entries.filter(([_, name]) => 
            name.toLowerCase().includes(filter.toLowerCase())
        );

        // Separate and sort entries
        const popularEntries = filteredEntries
            .filter(([code]) => popularLanguages.includes(code))
            .sort((a, b) => popularLanguages.indexOf(a[0]) - popularLanguages.indexOf(b[0]));
        
        const otherEntries = filteredEntries
            .filter(([code]) => !popularLanguages.includes(code))
            .sort((a, b) => a[1].localeCompare(b[1]));

        // Create divider if both sections have items
        if (popularEntries.length > 0 && otherEntries.length > 0) {
            const divider = document.createElement('div');
            divider.style.cssText = `
                padding: 8px 16px;
                color: #888;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
            `;
            divider.textContent = 'Other Languages';
            
            // Create and append all options
            [...popularEntries, divider, ...otherEntries].forEach(entry => {
                if (entry instanceof HTMLElement) {
                    optionsContainer.appendChild(entry);
                    return;
                }

                const [code, name] = entry;
                const option = document.createElement('div');
                option.style.cssText = `
                    padding: 8px 16px;
                    cursor: pointer;
                    color: white;
                    transition: background-color 0.2s;
                `;
                option.textContent = name;

                option.addEventListener('mouseover', () => {
                    option.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });

                option.addEventListener('mouseout', () => {
                    option.style.backgroundColor = 'transparent';
                });

                option.addEventListener('click', async () => {
                    await saveLanguage(code);
                    const selectButton = option.closest('.language-select').querySelector('button');
                    selectButton.textContent = name;
                    option.closest('.dropdown').style.display = 'none';
                    
                    // Trigger translation
                    document.querySelectorAll('[data-translated="true"]').forEach(el => el.remove());
                    window.translateLyrics(); // We'll need to make this available
                });

                optionsContainer.appendChild(option);
            });
        }
    }

    // Add search handler to input
    searchInput.addEventListener('input', (e) => {
        createLanguageOptions(e.target.value);
    });

    // Initial render
    createLanguageOptions();

    dropdown.appendChild(searchInput);
    dropdown.appendChild(optionsContainer);
    return dropdown;
} 