import { getElementById, throwWarining } from "./utils";

type IImageInfo = {
  src: string;
  alt?: string;
  caption?: string;
};

type IImageCollection = IImageInfo[];

interface _IGalleryOptions {
  images: IImageCollection;
  galleryContainerId: string;
  viewerContainerId: string;
  imgOnLoad?: (img: HTMLImageElement, imgInfo: IImageInfo) => void;
}

type IGalleryOptions = Partial<_IGalleryOptions>;

const defaultOptions: _IGalleryOptions = {
  images: [],
  galleryContainerId: "gallery-content",
  viewerContainerId: "image-viewer",
};

/**
 * Gallery
 * @param options - Gallery options
 */
export function Gallery(options: IGalleryOptions) {
  const { images, galleryContainerId, viewerContainerId, imgOnLoad } = {
    ...defaultOptions,
    ...options,
  };

  if (images.length === 0) {
    throwWarining("No images in the gallery.");
    return;
  }

  const gallery = getElementById(galleryContainerId);
  if (!gallery) {
    throw new Error(
      `Gallery container with ID '${galleryContainerId}' not found.`
    );
  }

  const viewer = getElementById(viewerContainerId);
  if (!viewer) {
    throw new Error(
      `Viewer container with ID '${viewerContainerId}' not found.`
    );
  }

  const viewerImage = viewer.querySelector("img");
  if (!viewerImage) {
    throw new Error("Image element inside the viewer container is missing.");
  }

  let currentIndex = 0;

  function openImageViewer(index: number) {
    currentIndex = index;
    viewer.style.display = "flex";
    viewerImage!.src = images[index].src;
    viewer.setAttribute("aria-hidden", "false");
  }

  function closeImageViewer() {
    viewer.style.display = "none";
    viewerImage!.src = "";
    viewer.setAttribute("aria-hidden", "true");
  }

  function navigateImage(step: number) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    viewerImage!.src = images[currentIndex].src;
  }

  // Attach navigation and close event listeners
  const prevButton = viewer.querySelector("#prev-image");
  const nextButton = viewer.querySelector("#next-image");
  const closeButton = viewer.querySelector("#close-image-viewer");

  if (prevButton) {
    prevButton.addEventListener("click", () => navigateImage(-1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => navigateImage(1));
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeImageViewer);
  }

  // Enable keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (viewer.style.display === "flex") {
      if (event.key === "ArrowLeft") navigateImage(-1);
      if (event.key === "ArrowRight") navigateImage(1);
      if (event.key === "Escape") closeImageViewer();
    }
  });

  // Render the gallery
  images.forEach((image, index) => {
    const container = document.createElement("div");
    container.className = "gallery-image__container";
    container.id = `gallery-image-${index}`;
    container.addEventListener("click", () => openImageViewer(index));

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt ?? `Image ${index}`;
    img.className = "gallery-image";

    if (imgOnLoad) {
      img.onload = () => imgOnLoad(img, image);
    }

    container.appendChild(img);
    gallery.appendChild(container);
  });
}