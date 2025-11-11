require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  hfApiKey: process.env.HUGGINGFACE_API_KEY,
  hfTextModel: process.env.HUGGINGFACE_TEXT_MODEL,
  hfImageModel: process.env.HUGGINGFACE_IMAGE_MODEL,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};