import dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_PATH || ".env" });

export const env = {
  port: process.env.PORT || 5001,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongo_uri: process.env.MONGO_URI,
  node_env: process.env.NODE_ENV,
  gemini_api_key: process.env.GEMINI_API_KEY,
};

export default env;
