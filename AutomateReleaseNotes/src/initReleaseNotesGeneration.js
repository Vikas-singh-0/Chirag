import fs from 'fs';
import generateReleaseNotes from './generateReleaseNotes.js';
import getGitChangesMethod from './getGitChangesMethod.js';

async function initReleaseNotesGeneration() {
  let releaseNotes;
  try {
    const { diffText, filteredFiles, ticketNumber } = getGitChangesMethod();
    if (diffText && filteredFiles) {
      releaseNotes = await generateReleaseNotes(filteredFiles, diffText, ticketNumber);
      if (releaseNotes) {
        fs.writeFileSync('notes.txt', releaseNotes);
      } else {
        console.log('No release notes generated');
      }
    } else {
      console.log('No changes to generate release notes');
    }
  } catch (error) {
    console.log('Error generating release notes:', error);
  }
}

export default initReleaseNotesGeneration;