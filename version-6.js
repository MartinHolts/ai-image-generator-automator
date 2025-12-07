(async () => {
    // --- 1. CONFIGURATION ---
    const TARGET_IMAGES = 300; 
    const MAX_WAIT_TIME_MS = 120000; // 2 minutes max wait

    // --- 2. DEFINITIONS (Cyberpunk/Gritty) ---
    const atmosphere_adjectives = [
        "hyper-realistic", "gritty", "cinematic", "battle-hardened", "weather-beaten", 
        "neon-soaked", "dystopian", "atmospheric", "shadowy", "chrome-plated", 
        "high-contrast", "industrial", "futuristic", "tactical", "gloomy", 
        "volumetric", "imposing", "mechanized", "cyber-enhanced", "rain-slicked"
    ];

    const subject_appearance = [
        "special forces soldier in heavy ceramic armor", "rogue android with exposed wiring",
        "corporate assassin in a stealth suit", "mech pilot with neural interface ports",
        "cybernetic mercenary with a robotic arm", "street-level hacker with VR goggles",
        "heavy riot control unit with a shield", "bounty hunter in a trench coat",
        "combat medic with bio-scanners", "nomad warrior with scavenged gear",
        "elite sniper with optical camouflage", "armored enforcer with glowing vents",
        "surveillance drone operator with a datapad", "augmented yakuza gangster with tattoos"
    ];

    const head_details = [
        "glowing red optical sensors scanning the area", "a cracked visor reflecting neon lights",
        "a tactical gas mask emitting steam", "cybernetic eyes zooming in on a target",
        "a half-metal face with exposed circuitry", "a holographic HUD projected over one eye",
        "rain dripping from a reinforced helmet", "scars running across synthetic skin",
        "a neural link cable attached to the neck", "thermal vision goggles glowing green"
    ];

    const gear_features = [
        "heavy combat boots splashing in puddles", "hydraulic joints hissing with movement",
        "a massive railgun slung over the back", "bandoliers of high-explosive rounds",
        "carbon-fiber plating covered in scratches", "a wrist-mounted hacking deck",
        "shoulders reinforced with reactive armor", "a chest rig holding EMP grenades",
        "mechanical legs designed for high jumps", "a cloaking device shimmering on the waist",
        "exposed cooling pipes leaking vapor", "a robotic companion drone hovering nearby"
    ];

    const roles = [
        "a silent guardian of the sector", "a ruthless corporate cleaner", "a survivor of the data wars",
        "a frontline shock trooper", "an underworld deal broker", "a high-tech vigilante",
        "a covert operations specialist", "a heavy weapons expert"
    ];

    const environment_elements = [
        "amidst heavy rainfall and fog", "surrounded by floating holographic ads",
        "illuminated by flickering street lamps", "shrouded in steam from sewer grates",
        "backlit by the engines of a dropship", "reflected in wet asphalt surfaces",
        "bathed in harsh teal and orange lighting", "hidden in the shadows of a skyscraper"
    ];

    const actions = [
        "standing guard with weapon raised", "inspecting a malfunction in their gear",
        "scanning the horizon for hostiles", "crouching behind concrete cover",
        "walking purposefully through the crowd", "hacking into a security terminal",
        "aiming down the sights of a rifle", "smoking a holographic cigarette"
    ];

    const quality_boosters = [
        "8k resolution, unreal engine 5 render", "ray-tracing enabled, sharp focus",
        "photorealistic textures, depth of field", "anamorphic lens flare, film grain",
        "highly detailed, masterpiece composition", "intricate mechanical details, hdr",
        "dramatic lighting, cinematic shot"
    ];

    const locations = [
        "in a neon-lit cyberpunk market", "on the roof of a mega-building",
        "inside a gritty industrial warehouse", "in a flooded slum district",
        "aboard a futuristic transport shuttle", "in a high-tech server room",
        "on a rain-slicked highway bridge", "in a dark, graffiti-covered alley"
    ];

    const prompt_templates = [
        "Sci-fi Concept Art. A {adjective} {subject}, {role} with {head} and {gear}, {environment}, {action} {location}. {quality}.",
        "Cinematic Shot. {adjective} view of a {subject}, {role} featuring {head}, {gear}, {environment}, {action} {location}. {quality}.",
        "Hyper-realistic Design. A {subject}, {role} with {head} and {gear}, {environment}, {action} {location}. {adjective}, {quality}.",
        "Cyberpunk Atmosphere. {adjective} scene: {subject}, {role} with {head}, {gear}, {environment}, {action} {location}. {quality}."
    ];

    // --- 3. HELPER FUNCTIONS ---
    function generatePrompt() {
        const template = prompt_templates[Math.floor(Math.random() * prompt_templates.length)];
        return template
            .replace("{adjective}", atmosphere_adjectives[Math.floor(Math.random() * atmosphere_adjectives.length)])
            .replace("{subject}", subject_appearance[Math.floor(Math.random() * subject_appearance.length)])
            .replace("{role}", roles[Math.floor(Math.random() * roles.length)])
            .replace("{head}", head_details[Math.floor(Math.random() * head_details.length)])
            .replace("{gear}", gear_features[Math.floor(Math.random() * gear_features.length)])
            .replace("{environment}", environment_elements[Math.floor(Math.random() * environment_elements.length)])
            .replace("{action}", actions[Math.floor(Math.random() * actions.length)])
            .replace("{quality}", quality_boosters[Math.floor(Math.random() * quality_boosters.length)])
            .replace("{location}", locations[Math.floor(Math.random() * locations.length)]);
    }

    const wait = ms => new Promise(res => setTimeout(res, ms));

    function getPromptInput() {
        const inputs = document.querySelectorAll('.paragraph-input');
        if (inputs.length >= 2) return inputs[1]; 
        if (inputs.length === 1) return inputs[0]; 
        return document.querySelector('textarea');
    }

    // --- 4. HYBRID LISTENER LOGIC ---
    async function waitForGenerationComplete(initialButtonCount) {
        return new Promise((resolve) => {
            let resolved = false;
            const startTime = Date.now();

            // 1. Listen for Iframe Message (Fastest)
            const messageHandler = (event) => {
                if (!resolved && event.data && event.data.type === "finished") {
                    console.log("   → Signal Received: Iframe finished!");
                    cleanup(true);
                }
            };
            window.addEventListener("message", messageHandler);

            // 2. Poll for Visual Changes (Most Reliable)
            const interval = setInterval(() => {
                if (resolved) return;

                // A. Check for Success (New Save Button)
                const currentButtons = document.querySelectorAll('.private-save-button');
                if (currentButtons.length > initialButtonCount) {
                    console.log("   → Visual Confirm: Save button appeared!");
                    cleanup(true);
                    return;
                }

                // B. Check for Error Text (Fail Fast)
                // We check the iframe's wrapper or the main page for specific error keywords
                const frames = document.querySelectorAll('iframe');
                // Note: We can't read inside the iframe usually, but sometimes the container changes
                // If we see the count hasn't changed in a long time, we rely on timeout.
                
                // C. Check Timeout
                if (Date.now() - startTime > MAX_WAIT_TIME_MS) {
                    console.warn("   → Timeout: No result after 2 minutes.");
                    cleanup(false);
                }
            }, 1000);

            function cleanup(success) {
                if (resolved) return;
                resolved = true;
                window.removeEventListener("message", messageHandler);
                clearInterval(interval);
                resolve(success);
            }
        });
    }

    // --- 5. MAIN EXECUTION LOOP ---
    const genButton = document.querySelector('#generateButtonEl');
    if (!genButton) return console.error("Could not find Generate button");

    window.alert = () => true; 

    console.log(`Starting generation of ${TARGET_IMAGES} images...`);

    for (let i = 0; i < TARGET_IMAGES; i++) {
        // 1. Get Baseline State
        const buttonsBefore = document.querySelectorAll('.private-save-button');
        const countBefore = buttonsBefore.length;

        // 2. Prepare Prompt
        const prompt = generatePrompt();
        console.log(`\n[${i + 1}/${TARGET_IMAGES}] Prompt: "${prompt.substring(0, 40)}..."`);
        
        const input = getPromptInput();
        if (input) {
            input.value = "";
            input.dispatchEvent(new Event('input', { bubbles: true })); 
            await wait(100);
            input.value = prompt;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        await wait(500);

        // 3. Start Listener
        const completionPromise = waitForGenerationComplete(countBefore);

        // 4. Click Generate
        genButton.click();
        
        // 5. Await Result
        const success = await completionPromise;

        // 6. Save or Skip
        if (success) {
            await wait(500); // UI catchup
            const buttonsNow = document.querySelectorAll('.private-save-button');
            if (buttonsNow.length > 0) {
                const lastBtn = buttonsNow[buttonsNow.length - 1];
                lastBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                lastBtn.click();
                console.log(`   → Saved Image #${buttonsNow.length}`);
                await wait(2500); 
            }
        } else {
            console.error("   → Generation failed. Check for AdBlock errors in console.");
            // If it failed, wait a bit longer to let the error clear or network reset
            await wait(5000); 
        }
    }

    console.log('\nAll processing complete!');
})();
