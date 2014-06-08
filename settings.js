module.exports = {
  HOST: process.env.HOST || null,
  PORT: process.env.PORT || 5000,
  DEFAULT_SHOT_WIDTH: process.env.DEFAULT_SHOT_WIDTH || 768,
  DEFAULT_SHOT_MIN_HEIGHT: process.env.DEFAULT_SHOT_MIN_HEIGHT || 700,
  WEBSHOTS_QUALITY: process.env.WEBSHOTS_QUALITY || 75,
};
