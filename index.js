(() => {
  // 1) Your prompts
  const prompts = [
    'A calm lagoon of milky-white water surrounded by smooth pebble beaches',
    'A misty forest at dawn with glowing mushrooms',
    'A futuristic cityscape at sunset, neon reflections in rain pools',
    // …etc…
  ];

  // 2) Helpers
  const input      = document.querySelectorAll('.paragraph-input')[1];
  const genButton  = document.querySelectorAll('#generateButtonEl')[0];
  const saveButtons = () => Array.from(document.querySelectorAll('.private-save-button'));

  let idx = 0;

  const runOnce = () => {
    if (idx >= prompts.length) {
      console.log('✅ All prompts done.');
      return;
    }

    // 3) Insert prompt
    input.value = prompts[idx];
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log(`🖊  Prompt #${idx+1}:`, prompts[idx]);

    // 4) Click generate
    genButton.click();
    console.log('▶️  Generation started');

    // 5) Wait for your generation time, then save
    setTimeout(() => {
      saveButtons().forEach(btn => btn.click());
      console.log(`💾 Prompt #${idx+1} saved.`);
      idx++;
      runOnce();
    }, 2 * 90_000); // adjust if you need more/less than 2 minutes
  };

  runOnce();
})();
