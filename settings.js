module.exports = {
  HOST: process.env.HOST || null,
  PORT: process.env.PORT || 5000,
  DEFAULT_SHOT_WIDTH: process.env.DEFAULT_SHOT_WIDTH || 768,
  DEFAULT_SHOT_MIN_HEIGHT: process.env.DEFAULT_SHOT_MIN_HEIGHT || 1,
  WEBSHOTS_QUALITY: process.env.WEBSHOTS_QUALITY || 75,
  AWS_S3_REGION: process.env.AWS_S3_REGION || 'us-east-1',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
};
