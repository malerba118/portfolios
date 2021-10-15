import { nanoid } from "nanoid";
// import compress from "browser-image-compression";

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    // image.width = window.innerWidth * 4;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    // image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} percentCrop - percentCrop
 * @param {number} rotation - optional rotation parameter
 */
export const getCroppedImg = async (imageSrc, percentCrop, rotation = 0) => {
  const image = await createImage(imageSrc);
  const pixelCrop = {
    x: (percentCrop.x * image.width) / 100,
    width: (percentCrop.width * image.width) / 100,
    y: (percentCrop.y * image.height) / 100,
    height: (percentCrop.height * image.height) / 100,
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return imageCompression.canvasToFile(
    canvas,
    "image/png",
    nanoid(),
    Date.now(),
    10
  );
};

// /**
//  * @param {String} url - Image src
//  * @param {Object} crop - crop Object
//  * @param {String} fileName - Name of the returned file in Promise
//  */
// export async function getCroppedImg(url, crop) {
//   const image = await createImage(url);
//   const canvas = document.createElement("canvas");
//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;
//   canvas.width = crop.width;
//   canvas.height = crop.height;
//   const ctx = canvas.getContext("2d");

//   // New lines to be added
//   const pixelRatio = window.devicePixelRatio;
//   canvas.width = crop.width * pixelRatio;
//   canvas.height = crop.height * pixelRatio;
//   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//   ctx.imageSmoothingQuality = "high";

//   ctx.drawImage(
//     image,
//     crop.x * scaleX,
//     crop.y * scaleY,
//     crop.width * scaleX,
//     crop.height * scaleY,
//     0,
//     0,
//     crop.width,
//     crop.height
//   );

//   return compress.canvasToFile(canvas, "image/jpeg", nanoid(), Date.now(), 1);
// }
