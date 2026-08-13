const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Helper to upload image buffer to Cloudinary (or fallback to base64 data URI if credentials invalid)
 */
const uploadToCloudinary = (fileBuffer, mimetype = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

    if (!isCloudinaryConfigured) {
      // Fallback mode: convert buffer to base64 Data URL so application works without external dependencies
      const base64Str = fileBuffer.toString('base64');
      const dataUrl = `data:${mimetype};base64,${base64Str}`;
      return resolve({
        url: dataUrl,
        publicId: `arya-blooms/local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'arya-blooms', resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.warn('[Cloudinary Upload Error] Falling back to Data URL representation:', error.message);
          const base64Str = fileBuffer.toString('base64');
          const dataUrl = `data:${mimetype};base64,${base64Str}`;
          return resolve({
            url: dataUrl,
            publicId: `arya-blooms/fallback-${Date.now()}`
          });
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Helper to delete image from Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('arya-blooms/local-') || publicId.startsWith('arya-blooms/fallback-')) {
    return true;
  }
  try {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

    if (isCloudinaryConfigured) {
      await cloudinary.uploader.destroy(publicId);
    }
    return true;
  } catch (error) {
    console.error('[Cloudinary Delete Error]:', error.message);
    return false;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary
};
