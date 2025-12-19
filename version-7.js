(async () => {
    // --- 1. CONFIGURATION ---
    const TARGET_IMAGES = 300; 
    const MAX_WAIT_TIME_MS = 120000; // 2 minutes max wait per image

    // --- 2. DEFINITIONS ---
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

    // --- 4. TARGETED SAVER LOGIC ---
    
    // This finds the exact button associated with the iframe that just finished
    function saveSpecificImage(sourceWindow) {
        const iframes = document.querySelectorAll('iframe');
        for (const iframe of iframes) {
            // Check if this iframe matches the one that sent the signal
            if (iframe.contentWindow === sourceWindow) {
                // Find the parent container (t2i-image-ctn)
                const container = iframe.closest('.t2i-image-ctn');
                if (container) {
                    // Find the save button INSIDE this specific container
                    const saveBtn = container.querySelector('.private-save-button');
                    if (saveBtn) {
                        saveBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        saveBtn.click();
                        console.log("   → ✅ Found correct iframe & clicked specific save button.");
                        return true;
                    }
                }
            }
        }
        console.warn("   → ❌ Signal received, but could not match iframe to a save button.");
        return false;
    }

    async function waitForGenerationAndSave() {
        return new Promise((resolve) => {
            let resolved = false;
            const startTime = Date.now();

            // 1. Define Listener
            const messageHandler = async (event) => {
                // We listen for the "finished" signal
                if (!resolved && event.data && event.data.type === "finished") {
                    console.log("   → Signal Received: One of the images finished.");
                    
                    // Give DOM a split second to update the button status
                    await wait(500); 
                    
                    // Attempt to save the SPECIFIC image that finished
                    const saved = saveSpecificImage(event.source);
                    
                    if (saved) {
                        cleanup(true);
                    }
                }
            };

            // 2. Start Listener
            window.addEventListener("message", messageHandler);

            // 3. Cleanup Function
            function cleanup(success) {
                if (resolved) return;
                resolved = true;
                window.removeEventListener("message", messageHandler);
                resolve(success);
            }

            // 4. Timeout Failsafe
            const checkTimeout = setInterval(() => {
                if (resolved) {
                    clearInterval(checkTimeout);
                    return;
                }
                if (Date.now() - startTime > MAX_WAIT_TIME_MS) {
                    console.warn("   → Timeout: No result signal.");
                    cleanup(false);
                    clearInterval(checkTimeout);
                }
            }, 1000);
        });
    }

    // --- 5. MAIN EXECUTION LOOP ---
    const genButton = document.querySelector('#generateButtonEl');
    if (!genButton) return console.error("Could not find Generate button");

    window.alert = () => true; 

    console.log(`Starting 'Targeted Save' generation of ${TARGET_IMAGES} images...`);

    for (let i = 0; i < TARGET_IMAGES; i++) {
        const prompt = generatePrompt();
        console.log(`\n[${i + 1}/${TARGET_IMAGES}] Prompt: "${prompt.substring(0, 40)}..."`);
        
        // 1. Enter Prompt
        const input = getPromptInput();
        if (input) {
            input.value = "";
            input.dispatchEvent(new Event('input', { bubbles: true })); 
            await wait(100);
            input.value = prompt;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        await wait(500);

        // 2. Setup Listener
        const processPromise = waitForGenerationAndSave();

        // 3. Click Generate
        genButton.click();
        
        // 4. Wait for specific save completion
        const success = await processPromise;

        if (success) {
            await wait(2000); // Wait for download to initiate
        } else {
            console.error("   → Generation failed/skipped.");
            await wait(3000);
        }
    }

    console.log('\nAll processing complete!');
})();
