import "./style.css";
import { initializeScrollAnimation } from "./bg-animation";
import { displayAfterLoad } from "./loader";
import { Gallery } from "./gallery";
import { getImage } from "./utils";
import { initializeTranslation } from "./translator";

document.addEventListener("DOMContentLoaded", () => {
  initializeScrollAnimation("backgroundCanvas", "bg-photo");
  initializeTranslation("lang-ml", "lang-en");
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
