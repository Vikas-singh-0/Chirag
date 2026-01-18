import initReleaseNotesGeneration from "./src/initReleaseNotesGeneration.js";
import 'dotenv/config';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY) {
  initReleaseNotesGeneration();
} else {
  console.log('GEMINI_API_KEY is not defined. Please try again');
}