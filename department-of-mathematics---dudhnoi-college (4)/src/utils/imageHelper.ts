/**
 * Advanced Client-Side Logo & Image Processing Helper
 * Automatically removes background (white / off-white / solid backdrops),
 * crops to the exact bounding box of the emblem/text, and auto-resizes.
 */

export interface ProcessLogoOptions {
  maxDim?: number;
  removeBackground?: boolean;
  colorTolerance?: number; // 0-255 color distance tolerance for BG removal
}

export function processLogoImage(
  fileOrSrc: File | string,
  callback: (processedDataUrl: string) => void,
  options: ProcessLogoOptions = {}
): void {
  const maxDim = options.maxDim || 360;
  const tolerance = options.colorTolerance || 32;

  const handleLoadedImage = (img: HTMLImageElement) => {
    try {
      const origW = img.width;
      const origH = img.height;
      if (origW === 0 || origH === 0) {
        callback(typeof fileOrSrc === 'string' ? fileOrSrc : '');
        return;
      }

      // Step 1: Draw on full unscaled canvas
      const rawCanvas = document.createElement('canvas');
      rawCanvas.width = origW;
      rawCanvas.height = origH;
      const rawCtx = rawCanvas.getContext('2d', { willReadFrequently: true });
      if (!rawCtx) {
        callback(typeof fileOrSrc === 'string' ? fileOrSrc : '');
        return;
      }

      rawCtx.drawImage(img, 0, 0, origW, origH);
      const imgData = rawCtx.getImageData(0, 0, origW, origH);
      const pixels = imgData.data;

      // Step 2: Detect background color by sampling corner & border regions
      const corners = [
        [4, 4],
        [origW - 5, 4],
        [4, origH - 5],
        [origW - 5, origH - 5],
        [Math.floor(origW / 2), 4],
        [Math.floor(origW / 2), origH - 5],
      ];

      let bgR = 255;
      let bgG = 255;
      let bgB = 255;
      let totalSamples = 0;
      let sumR = 0, sumG = 0, sumB = 0;
      let isBgTransparentCorner = false;

      for (const [cx, cy] of corners) {
        const x = Math.max(0, Math.min(origW - 1, cx));
        const y = Math.max(0, Math.min(origH - 1, cy));
        const idx = (y * origW + x) * 4;
        const a = pixels[idx + 3];

        if (a < 20) {
          isBgTransparentCorner = true;
          break;
        }

        sumR += pixels[idx];
        sumG += pixels[idx + 1];
        sumB += pixels[idx + 2];
        totalSamples++;
      }

      if (totalSamples > 0 && !isBgTransparentCorner) {
        bgR = Math.round(sumR / totalSamples);
        bgG = Math.round(sumG / totalSamples);
        bgB = Math.round(sumB / totalSamples);
      }

      // Check if background removal should proceed (if not already transparent)
      const isWhiteOrLight = bgR > 210 && bgG > 210 && bgB > 210;
      const shouldRemoveBg = options.removeBackground !== false && !isBgTransparentCorner;

      let minX = origW;
      let minY = origH;
      let maxX = -1;
      let maxY = -1;

      // Step 3: Remove background pixels & find content bounding box
      for (let y = 0; y < origH; y++) {
        for (let x = 0; x < origW; x++) {
          const idx = (y * origW + x) * 4;
          let r = pixels[idx];
          let g = pixels[idx + 1];
          let b = pixels[idx + 2];
          let a = pixels[idx + 3];

          if (a > 10 && shouldRemoveBg) {
            // Euclidean distance to background color
            const dr = r - bgR;
            const dg = g - bgG;
            const db = b - bgB;
            const dist = Math.sqrt(dr * dr + dg * dg + db * db);

            // Additional check for near-white pixels if corner is light
            const isNearWhite = isWhiteOrLight && r >= 238 && g >= 238 && b >= 238;

            if (dist <= tolerance || isNearWhite) {
              pixels[idx + 3] = 0; // Make transparent
              a = 0;
            } else if (dist < tolerance + 18) {
              // Soft anti-aliasing feather edge
              const feather = (dist - tolerance) / 18;
              pixels[idx + 3] = Math.round(a * feather);
              a = pixels[idx + 3];
            }
          }

          // Track bounding box of non-transparent content
          if (a > 15) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      // Put key-extracted image data back onto raw canvas
      rawCtx.putImageData(imgData, 0, 0);

      // Step 4: Determine crop rectangle with small padding
      let cropX = 0;
      let cropY = 0;
      let cropW = origW;
      let cropH = origH;

      if (maxX >= minX && maxY >= minY) {
        const pad = Math.max(4, Math.round(Math.min(origW, origH) * 0.02));
        cropX = Math.max(0, minX - pad);
        cropY = Math.max(0, minY - pad);
        cropW = Math.min(origW - cropX, maxX - minX + 1 + pad * 2);
        cropH = Math.min(origH - cropY, maxY - minY + 1 + pad * 2);
      }

      // Step 5: Scale to final maxDim canvas maintaining ratio
      let targetW = cropW;
      let targetH = cropH;

      if (cropW > cropH) {
        if (cropW > maxDim) {
          targetH = Math.round(cropH * (maxDim / cropW));
          targetW = maxDim;
        }
      } else {
        if (cropH > maxDim) {
          targetW = Math.round(cropW * (maxDim / cropH));
          targetH = maxDim;
        }
      }

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = targetW;
      finalCanvas.height = targetH;
      const finalCtx = finalCanvas.getContext('2d');

      if (finalCtx) {
        finalCtx.imageSmoothingEnabled = true;
        finalCtx.imageSmoothingQuality = 'high';
        finalCtx.clearRect(0, 0, targetW, targetH);
        finalCtx.drawImage(
          rawCanvas,
          cropX, cropY, cropW, cropH,
          0, 0, targetW, targetH
        );
        const resultPng = finalCanvas.toDataURL('image/png');
        callback(resultPng);
      } else {
        callback(rawCanvas.toDataURL('image/png'));
      }
    } catch (err) {
      console.error('Error processing logo image:', err);
      if (typeof fileOrSrc === 'string') {
        callback(fileOrSrc);
      }
    }
  };

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => handleLoadedImage(img);
  img.onerror = () => {
    if (typeof fileOrSrc === 'string') {
      callback(fileOrSrc);
    }
  };

  if (typeof fileOrSrc === 'string') {
    img.src = fileOrSrc;
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        img.src = src;
      }
    };
    reader.readAsDataURL(fileOrSrc);
  }
}
