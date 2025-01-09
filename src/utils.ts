export function querySelector(selector: string): HTMLElement {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  } else if (!(element instanceof HTMLElement)) {
    throw new Error(`Element with selector ${selector} is not an HTMLElement`);
  }
  return element;
}

export function getElementById(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id ${id} not found`);
  }
  return element;
}

// Image Utils
export const getImage = (i: number) => `/images/gallery/img_${i}.jpg`;

//
export function throwWarining(message: string) {
  console.warn(`[Warning]: ${message}`);
}
