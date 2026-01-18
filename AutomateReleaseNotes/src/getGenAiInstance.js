import { GoogleGenAI } from '@google/genai';


let genAIInstance;

function getGenAiInstance() {
  const  GEMINI_API_KEY = "AIzaSyDg8Tarq_rJKFnf9RjpAuA6lIGpzjQlzyg";
  if (!genAIInstance) {
    if (GEMINI_API_KEY) {
      genAIInstance = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
  }
  return genAIInstance;
}

export default getGenAiInstance;


