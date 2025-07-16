(async () => {
  // ─── 1) Your prompts ───────────────────────────────────────────────────────────
  const prompts = [
'A dragon carved into living vines curling around a tower',
'A floating zen garden with drifting sakura petals',
'A lone alchemist’s workshop perched on a cliff edge',
'A city of glass spires glowing under an aurora borealis',
'A secret waterfall cascading onto glowing mossy rocks',
'A pair of lovers rowing through a lantern-lit canal',
'A futuristic skybridge crisscrossing neon skyscrapers',
'A hidden moon temple nestled in a crater lake',
'A convoy of glowing hovercraft racing across acid sands',
'A pair of sisters wandering through a snow-covered pavilion',
'A secret library of floating scrolls in a glass dome',
'A serene mountain path lined with glowing lanterns',
'A neon-drenched bazaar in a canyon of cliffs',
  ];

  // ─── 2) Helpers ─────────────────────────────────────────────────────────────────
  const wait = ms => new Promise(res => setTimeout(res, ms));
  
  // Grab the input and buttons once
  const input     = document.querySelectorAll('.paragraph-input')[1];
  const genButton = document.querySelectorAll('#generateButtonEl')[0];

  // Override alert so it never blocks; collect messages
  const suppressedAlerts = [];
  window.alert = msg => suppressedAlerts.push(msg);

  // Function to click and scroll each save-button
  async function clickAllSaveButtons() {
    const buttons = Array.from(document.querySelectorAll('.private-save-button'));
    console.log(`→ Found ${buttons.length} save buttons.`);
    
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      // Scroll it into view
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await wait(300);
      // Click it
      btn.click();
      console.log(`💾 Clicked save button #${i+1}`);
      // Give time for any suppressed alert
      await wait(300);
    }
  }

  // ─── 3) Main loop ──────────────────────────────────────────────────────────────
  for (let i = 0; i < prompts.length; i++) {
    console.log(`\n🖊 [${i+1}/${prompts.length}] Inserting prompt…`);
    
    // Insert prompt and notify listeners
    input.value = prompts[i];
    input.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Click Generate
    genButton.click();
    console.log('▶️ Generation started; scrolling to bottom…');
    
    // Scroll to bottom so all images load
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    
    // Wait for generation to complete (adjust as needed)
    await wait(120_000);
    
    // Click & scroll through all save buttons
    await clickAllSaveButtons();
    
    // Report suppressed alerts
    if (suppressedAlerts.length) {
      console.log(`🔕 Suppressed ${suppressedAlerts.length} alert(s):`, suppressedAlerts);
      suppressedAlerts.length = 0;
    } else {
      console.log('✅ No alerts this round.');
    }
    
    // Short pause before next prompt
    await wait(2_000);
  }

  console.log('\n🎉 All prompts processed!');
})();
