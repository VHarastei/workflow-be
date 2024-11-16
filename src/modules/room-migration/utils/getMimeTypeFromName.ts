export const getMimeTypeFromName = (fileName) => {
  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    tiff: 'image/tiff',
    tif: 'image/tiff',
    ico: 'image/x-icon',
    heic: 'image/heic',
    default: 'application/octet-stream',
  };

  const extension = fileName.split('.').pop().toLowerCase();
  return mimeTypes[extension] || mimeTypes.default;
};
