import { sanitizeFilename } from './src/utils.js';

async function saveCurrentPage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;
  const url = tab.url;
  const title = tab.title || 'page';
  const filename = 'webpages/' + sanitizeFilename(title) + '.html';
  chrome.downloads.download({ url, filename, saveAs: false });
}

chrome.action.onClicked.addListener(saveCurrentPage);
chrome.commands.onCommand.addListener((command) => {
  if (command === 'save-page') {
    saveCurrentPage();
  }
});
