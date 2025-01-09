import "./style.css";
import { initializeScrollAnimation } from "./bg-animation";
import { displayAfterLoad } from "./loader";
import { Gallery } from "./gallery";
import { getImage } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  initializeScrollAnimation("backgroundCanvas", "bg-photo");
});

window.addEventListener("load", () => {
  displayAfterLoad();
  const images = Array.from({ length: 6 }, (_, i) => ({
    src: getImage(i + 1),
    alt: `Image ${i + 1}`,
    caption: `Image ${i + 1}`,
  }));
  Gallery({ images });
});

function translateToMl() {
  const mlElements = document.querySelectorAll("[data-ml]");
  const enElements = document.querySelectorAll("[data-en]");

  mlElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.removeAttribute("aria-hidden");
      element.style.display = "block";
    }
  });

  enElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    }
  });
}

function translateToEn() {
  const mlElements = document.querySelectorAll("[data-ml]");
  const enElements = document.querySelectorAll("[data-en]");

  enElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.removeAttribute("aria-hidden");
      element.style.display = "block";
    }
  });

  mlElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    }
  });
}

const toMl = document.getElementById("lang-ml")!;
const toEn = document.getElementById("lang-en")!;

toMl.addEventListener("click", () => {
  translateToMl();
});

toEn.addEventListener("click", () => {
  translateToEn();
});
