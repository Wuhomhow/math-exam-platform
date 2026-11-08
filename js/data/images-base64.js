// Lightweight loader: splits the 68MB base64 map into two parts (<35MB each)
// to prevent browser freeze and avoid GitHub's 50MB file size warnings.
(function() {
  window.IMAGE_BASE64_MAP = window.IMAGE_BASE64_MAP || {};
  if (typeof window.ensureImageBase64Loaded === 'function') {
    window.ensureImageBase64Loaded();
  }
})();
