(() => {
  const file = document.getElementById('support-screenshot');
  if (!file) return;
  file.addEventListener('change', () => {
    const selected = file.files[0];
    file.setCustomValidity(selected && selected.size > 10 * 1024 * 1024
      ? 'Choose a screenshot smaller than 10 MB.' : '');
    file.reportValidity();
  });
})();
