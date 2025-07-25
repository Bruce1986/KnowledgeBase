export function sanitizeFilename(name) {
  return name.replace(/[\\/:*?"<>|\x00-\x1F\x7F]+/g, '_');
}
