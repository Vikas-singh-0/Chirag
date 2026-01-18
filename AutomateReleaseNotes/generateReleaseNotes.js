
import getGenAiInstance from './getGenAiInstance.js';

async function generateReleaseNotes(fileList, diffText, ticketNumber) {
  const prompt = `Please generate a concise and well-structured changelog for 
  both technical and non-technical stakeholders based on the following code changes.
  The changelog should have the following sections:

- **New Features**: Describe any new functionality or capabilities added to the 
system that were not previously available. This could include new tools, workflows
or capabilities that provide additional value to users. 
- If a feature enhances or introduces something completely new, include it here.
  
- **Improvements**: Summarize any changes or refinements made to existing functionality. 
These changes should improve the overall user experience, performance, or reliability 
of the system. This includes:
  - Performance optimizations
  - Bug fixes or error resolution
  - Minor updates or tweaks that make existing features more efficient or easier to use

- **Technical Details**: Provide a brief but informative summary of any key technical changes. 
This section should include relevant information on updates to frameworks, code optimizations, 
architectural changes, or bug fixes that improve the system. Focus on:
  - Performance improvements
  - Changes to dependencies or libraries
  - Updates that impact the internal workings of the system, 
  but try to keep the explanation simple for non-technical readers as well.

The output should be in plain text format with the following structure:

1. **Release Notes for Ticket Number**(as passed in the input)
2. **Formatted DateTime** (as passed in the input)
3. A bullet-point list under each of the above sections.

- If a change involves both a new feature and an improvement 
(e.g., introducing a feature that enhances existing functionality), 
categorize it based on the **primary nature of the change**—whether 
it's **fundamentally new** or an **enhancement** to something that already existed.
  
- The final output should be easy to read, professional, and should help stakeholders of 
all technical levels understand what has changed in this release.
`;

  let result;
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString('en-IN', {
    day: 'numeric',
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    month: 'long',
    timeZone: 'Asia/Kolkata',
    timeZoneName: 'short',
    year: 'numeric',
  }).replace(',', ' -');
  try {
    const genAiInstance = getGenAiInstance();
    result = await genAiInstance.models.generateContent({
      contents: [
        prompt,
        `### Changed Files:\n${fileList}`,
        `### Git Diff:\n${diffText}`,
        `Date ${formattedDateTime}`,
        `Ticket: ${ticketNumber}`,
      ],
      model: 'gemini-2.5-flash',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error generating release notes:', error);
  }

  return result?.text;
}

export default generateReleaseNotes;
