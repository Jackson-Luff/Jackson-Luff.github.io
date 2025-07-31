// Global configuration for typing behavior
const gConfigure = {
    inputDelayMin: 50,
    inputDelayMax: 120,
    delayOnMistake: 400,
};

// Custom events for typing and backspacing
const eventTyping = new CustomEvent('onTyping');
const eventBackspacing = new CustomEvent('onBackspacing');

/**
 * Configures the typing behavior delays.
 * @param {number} inputDelayMin - Minimum delay between typing characters.
 * @param {number} inputDelayMax - Maximum delay between typing characters.
 * @param {number} delayOnMistake - Delay when a typo is made before correction.
 */
function typoConfigure(inputDelayMin, inputDelayMax, delayOnMistake) {
    gConfigure.inputDelayMin = inputDelayMin;
    gConfigure.inputDelayMax = inputDelayMax;
    gConfigure.delayOnMistake = delayOnMistake;
}

const wait = ms => new Promise(r => setTimeout(r, ms));
const randomDelay = () => Math.random() * (gConfigure.inputDelayMax - gConfigure.inputDelayMin) + gConfigure.inputDelayMin;

/**
 * Types a single character into an element.
 * @param {HTMLElement} el - The element to type into.
 * @param {string} ch - The character to type.
 */
async function typeChar(el, ch) {
    el.textContent += ch;
    window.dispatchEvent(eventTyping);
    await wait(randomDelay());
}

/**
 * Deletes a specified number of characters from an element.
 * @param {HTMLElement} el - The element to delete characters from.
 * @param {number} count - The number of characters to delete.
 */
async function deleteChars(el, count) {
    while (count-- > 0) {
        el.textContent = el.textContent.slice(0, -1);
        window.dispatchEvent(eventBackspacing);
        await wait(randomDelay() * 0.6);
    }
}

/**
 * Types a sentence into an element, with a possible simulated typo and correction.
 * @param {HTMLElement} el - The element to type into.
 * @param {object} response - An object containing the text and typoChance.
 * @param {string} response.text - The sentence to type.
 * @param {number} response.typoChance - The probability (0-1) of a typo occurring.
 */
async function typeWithPossibleTypo(el, response) {
    const maybeTypo = Math.random() < response.typoChance;
    const sentence = response.text;

    let typoPos, wrongChar, rightChar;

    if (maybeTypo) {
        // Choose a typo position in the second half of the sentence
        typoPos = Math.floor(sentence.length / 2) + Math.floor(Math.random() * (sentence.length / 2));
        rightChar = sentence[typoPos];
        // Ensure wrongChar is different from rightChar and not a space
        do {
            wrongChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        } while (wrongChar === rightChar || wrongChar === ' ');
    }

    const prefix = sentence.slice(0, typoPos ?? sentence.length);
    const suffix = sentence.slice((typoPos ?? sentence.length) + 1);

    // Type prefix
    for (const ch of prefix) {
        await typeChar(el, ch);
    }

    if (maybeTypo) {
        // Insert wrong char
        await typeChar(el, wrongChar);
        // Pause to simulate realization
        await wait(gConfigure.delayOnMistake);
        // Delete wrong char
        await deleteChars(el, 1);
        // Type correct and rest
        await typeChar(el, rightChar);
        for (const ch of suffix) {
            await typeChar(el, ch);
        }
    } else {
        // Type rest normally
        for (const ch of sentence.slice(prefix.length)) {
            await typeChar(el, ch);
        }
    }

    el.textContent += "\n";
}