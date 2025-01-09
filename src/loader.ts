// loader.ts

import AOS, { type AosOptions } from "aos";
import "aos/dist/aos.css";
import { getElementById, querySelector } from "./utils";

/**
 * Display the content after the loader has been displayed for a certain duration
 * @param element The element to be displayed after loading
 */
function defaultOnLoadCallback(element: HTMLElement) {
  element.style.display = "block";
  element.setAttribute("aria-hidden", "false");
}

interface _DisplayAfterLoadOptions {
  /**
   * The id of the loader element
   */
  loaderId: string;
  /**
   * The selectors of the content elements to be displayed
   */
  contentSelectors: string[];
  /**
   * The configuration for the AOS library
   */
  aosConfig: AosOptions;
  /**
   * Whether to enable AOS
   */
  enableAos: boolean;
  /**
   * The duration of the loader
   */
  loaderDuration: number;
  /**
   * The callback to be called after the element is loaded
   */
  onLoadCallback: (element: HTMLElement) => void;
}

/**
 * The options for the displayAfterLoad function
 */
export type DisplayAfterLoadOptions = Partial<_DisplayAfterLoadOptions>;

/**
 * The default options for the displayAfterLoad function
 */
export const defaultOptions: _DisplayAfterLoadOptions = {
  loaderId: "page-loader",
  contentSelectors: ["main", "footer"],
  aosConfig: {
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  },
  enableAos: true,
  loaderDuration: 1600,
  onLoadCallback: defaultOnLoadCallback,
};

/**
 * Display the content after the loader has been displayed for a certain duration
 * @param options The options for the displayAfterLoad function
 */
export function displayAfterLoad(options?: DisplayAfterLoadOptions) {
  // TODO: Improve by adding deep merge
  const {
    loaderId,
    contentSelectors,
    aosConfig,
    enableAos,
    loaderDuration,
    onLoadCallback,
  } = { ...defaultOptions, ...options };

  const loader = getElementById(loaderId);

  const contentElements = contentSelectors.map((selector) => {
    return querySelector(selector);
  });

  setTimeout(() => {
    loader.style.display = "none";

    contentElements.forEach((element) => {
      onLoadCallback(element);
    });

    if (enableAos) {
      AOS.init(aosConfig);
    }
  }, loaderDuration);
}
