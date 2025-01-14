/**
 * LanguageTranslator Module
 * -------------------------
 * This module provides utility functions to dynamically translate the content
 * of a webpage between multiple languages using data attributes and ARIA best practices.
 */

/**
 * Updates the visibility of elements based on the provided language.
 * @param lang - The target language code (e.g., "en" for English, "ml" for Malayalam).
 * @param showSelector - The CSS selector for elements to show.
 * @param hideSelector - The CSS selector for elements to hide.
 */
function updateLanguage(
  lang: string,
  showSelector: string,
  hideSelector: string
): void {
  const showElements = document.querySelectorAll(showSelector);
  const hideElements = document.querySelectorAll(hideSelector);

  showElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.removeAttribute("aria-hidden");
      element.style.display = "block";
    }
  });

  hideElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    }
  });

  // Update the <html> tag's lang attribute
  document.documentElement.lang = lang;
}

/**
 * Translates the webpage to Malayalam.
 * Uses elements marked with [data-ml] for Malayalam and hides [data-en].
 */
export function translateToMl(): void {
  updateLanguage("ml", "[data-ml]", "[data-en]");
}

/**
 * Translates the webpage to English.
 * Uses elements marked with [data-en] for English and hides [data-ml].
 */
export function translateToEn(): void {
  updateLanguage("en", "[data-en]", "[data-ml]");
}

/**
 * Initializes event listeners for language switching.
 * @param mlButtonId - The ID of the button to switch to Malayalam.
 * @param enButtonId - The ID of the button to switch to English.
 */
export function initializeTranslation(
  mlButtonId: string,
  enButtonId: string
): void {
  const toMl = document.getElementById(mlButtonId);
  const toEn = document.getElementById(enButtonId);

  if (toMl) {
    toMl.addEventListener("click", translateToMl);
  }

  if (toEn) {
    toEn.addEventListener("click", translateToEn);
  }
}
