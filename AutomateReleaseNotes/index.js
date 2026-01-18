import initReleaseNotesGeneration from "./src/initReleaseNotesGeneration.js";

const  GEMINI_API_KEY = "AIzaSyDg8Tarq_rJKFnf9RjpAuA6lIGpzjQlzyg";

if (GEMINI_API_KEY) {
  initReleaseNotesGeneration();
} else {
  console.log('GEMINI_API_KEY is not defined. Please try again');
}