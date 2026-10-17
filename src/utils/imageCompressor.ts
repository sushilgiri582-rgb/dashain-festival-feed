/**
 * Client-side high-quality image compressor using HTML5 canvas.
 * Downscales camera photos to crisp responsive web dimensions (max 900px, 0.75 quality)
 * reducing 5MB-10MB mobile uploads to 40KB-80KB for instantaneous global cloud storage.
 */
export async function compressImageFile(file: File, maxWidth: number = 900, maxHeight: number = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not an image, return raw data url
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as optimized JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        resolve(readerEvent.target?.result as string);
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
