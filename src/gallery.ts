import { getElementById, querySelector, throwWarining } from "./utils";

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

  const gallery = getElementById(galleryContainerId);

  if (images.length < 1) {
    throwWarining("No images in the gallery.");
  }

  function openImageViewer(i: number) {
    const viewer = document.getElementById(viewerContainerId);
    const img = viewer?.querySelector("img");
    viewer!.style.display = "flex";
    img!.src = images[i].src;

    const prev = viewer?.querySelector("#prev-image");
    prev?.addEventListener("click", () => {
      if (i === 0) {
        openImageViewer(images.length - 1);
        return;
      }
      openImageViewer(i - 1);
    });

    const next = viewer?.querySelector("#next-image");
    next?.addEventListener("click", () => {
      if (i >= images.length) {
        openImageViewer(0);
        return;
      }
      openImageViewer(i + 1);
    });
  }

  // Render the gallery
  images.forEach((image, i) => {
    const container = document.createElement("div");
    container.className = "gallery-image__container";
    container.id = `gallery-image-${i}`;
    container.addEventListener("click", () => {
      openImageViewer(i);
    });

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt ?? `Image ${i}`;
    img.className = "gallery-image";
    if (imgOnLoad && typeof imgOnLoad === "function") {
      img.onload = () => imgOnLoad(img, image);
    }

    container.appendChild(img);

    gallery.appendChild(container);

    // Initialize viewer

    const closeButton = querySelector(
      `#${viewerContainerId} > #close-image-viewer`
    );
    closeButton?.addEventListener("click", () => {
      const viewer = getElementById(viewerContainerId)!;
      viewer.style.display = "none";
    });
  });
}
