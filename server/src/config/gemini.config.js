import { GoogleGenAI } from "@google/genai";
import env from "./env.js";
import { ApiError } from "../utils/ApiErrors.js";

const ai = new GoogleGenAI({ apiKey: env.gemini_api_key });
const MODEL_NAME = "gemini-2.5-flash";

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    return response.text;
  } catch (err) {
    console.error("Gemini API error: ", err.message);
    throw new ApiError(400, `Gemini API Failed ${err.message}`);
  }
};

export { ai, MODEL_NAME, generateContent };
