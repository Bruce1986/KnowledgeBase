import { sanitizeFilename } from './src/utils.js';

async function saveCurrentPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    const title = tab.title || 'page';
    const filename = 'webpages/' + sanitizeFilename(title) + '.html';
    await chrome.downloads.download({ url: tab.url, filename, saveAs: false });
  } catch (error) {
    console.error(`Error saving page: ${error}`);
  }
}

chrome.action.onClicked.addListener(saveCurrentPage);
chrome.commands.onCommand.addListener((command) => {
  if (command === 'save-page') {
    saveCurrentPage();
  }
});
