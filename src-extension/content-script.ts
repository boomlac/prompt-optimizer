document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    const el = document.querySelector('textarea, [contenteditable="true"]') as any;
    if (!el) return;

    const prompt = el.value || el.innerText;

    chrome.runtime.sendMessage({
      type: 'ANALYZE_PROMPT',
      payload: prompt
    });

    e.preventDefault();
  }
});
