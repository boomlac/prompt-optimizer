// src-extension/background.ts
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "ANALYZE_PROMPT") {
    const analysis = await fetch("https://your-api/prompt-optimizer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: msg.payload })
    }).then((r) => r.json());
    sendResponse(analysis);
    chrome.runtime.sendMessage({
      type: "PROMPT_ANALYSIS",
      payload: analysis
    });
  }
});
