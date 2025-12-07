(async () => {
    // --- Define Arrays for Prompt Components ---
    const atmosphere_adjectives = [
        "breathtakingly serene", "vibrantly lush", "majestically towering", "peacefully quiet",
        "radiantly sunlit", "mysteriously foggy", "pristinely untouched", "wildly overgrown",
        "ethereally misty", "rustically charming", "calmly flowing", "dramatically rugged",
        "softly illuminated", "vividly colorful", "gently swaying", "harmoniously balanced",
        "crisply refreshing", "naturally intricate", "golden-hued", "truly picturesque"
    ];

    const nature_subjects = [
        "ancient oak tree with sprawling branches", "cascading waterfall with crystal clear water",
        "blooming wildflower meadow in full spring", "jagged mountain peak piercing the clouds",
        "dense tropical rainforest with hanging vines", "tranquil alpine lake reflecting the sky",
        "rolling green hill dotted with sheep", "desert canyon with red rock formations",
        "moss-covered boulder in a quiet stream", "towering pine forest shrouded in mist",
        "coastal cliff overlooking a churning ocean", "glowing autumn grove with falling leaves",
        "bamboo forest filtering dappled light", "frozen tundra with sparkling ice formations",
        "lavender field stretching to the horizon", "secluded beach with white sand dunes"
    ];

    const texture_details = [
        "intricate bark textures that tell a story of time", "delicate petals that catch the morning dew",
        "rugged stone surfaces worn by the elements", "vibrant green leaves fluttering in the wind",
        "soft moss patches that invite touch", "rippling water surfaces distorting reflections",
        "wispy clouds drifting lazily above", "scattered pebbles creating natural patterns",
        "sunbeams piercing through the canopy", "frost patterns clinging to the surface",
        "droplets of rain sliding down foliage", "shifting sands shaped by the breeze"
    ];

    const landscape_features = [
        "roots that weave deeply into the earth", "branches that reach towards the sunlight",
        "rivers that carve through the landscape", "stones that glisten with river water",
        "grasses that sway rhythmically in the wind", "vines that climb and embrace the surroundings",
        "cliffs that stand as silent sentinels", "clouds that paint shadows on the ground",
        "flowers that bloom with vibrant energy", "ferns that unfurl in the damp shade",
        "snowdrifts that blanket the terrain", "waves that crash with rhythmic power",
        "leaves that create a canopy overhead", "pebbles that line the riverbed",
        "sand dunes that shift with the wind", "icicles that hang like crystal chandeliers",
        "cacti that stand tall against the heat", "mist that hugs the valley floor",
        "streams that babble over rocks", "shadows that stretch long in the evening",
        "horizons that glow with sunset colors", "valleys that cradle lush vegetation",
        "peaks that catch the first light of day", "clearings that offer a peaceful respite",
        "undergrowth that teems with hidden life", "canopies that filter the harsh sun",
        "breezes that carry the scent of pine", "reflections that double the beauty",
        "textures that contrast rough and smooth", "colors that change with the seasons",
        "light that dances on the water", "shadows that cool the forest floor",
        "silhouettes that stand against the sky", "paths that wind into the unknown",
        "rocks that anchor the scene", "sediment layers revealing history",
        "drifts that soften the landscape", "currents that guide the water",
        "foliage that creates a natural frame", "vistas that inspire awe",
        "ecosystems thriving in harmony", "natural formations of perfect geometry",
        "droplets that act like prisms", "rays of light creating a divine atmosphere",
        "sounds of nature visualized", "seasonal changes captured in a moment",
        "textures of earth and stone", "crystalline structures of ice and snow"
    ];

    const symbolic_roles = [
        "a guardian of the wilderness", "a symbol of natural peace", "a masterpiece of evolution", "a quiet observer of time",
        "a sanctuary for wildlife", "a display of raw power", "a haven of tranquility", "a breath of fresh air",
        "a testament to endurance", "a healer of the spirit", "a source of life",
        "an enchanting natural wonder", "a hidden gem of the world", "a radiant display of flora"
    ];

    const lighting_conditions = [
        "golden sunlight bathing the scene", "soft morning mist wrapping the forms",
        "a blanket of fresh white snow", "dappled shadows creating depth",
        "a vibrant rainbow arching overhead", "starry night skies twinkling above",
        "a hazy twilight glow", "morning dew glistening like jewels",
        "autumn colors of red and gold", "a dusting of frost",
        "rain clouds gathering dramatically", "a clear blue sky",
        "fog rolling over the hills", "moonlight illuminating the dark",
        "warm sunset hues", "cool blue shadows of winter"
    ];

    const natural_actions = [
        "blooming vibrantly under the sun", "swaying gently in the breeze",
        "flowing steadily downstream", "standing tall against the wind",
        "reflecting the beauty of the sky", "glowing in the golden hour",
        "rustling quietly in the silence", "erupting with spring colors",
        "resting peacefully under the stars", "transforming with the seasons",
        "providing shelter to the forest", "cascading down with energy",
        "reaching for the clouds", "shimmering in the heat",
        "enduring the passage of time", "dancing with the wind",
        "cooling the air around it", "anchoring the soil firmly",
        "echoing the sounds of nature", "stretching towards the light"
    ];

    const visual_descriptions = [
        "the landscape radiating natural beauty", "nature's design showcased perfectly",
        "the environment pulsing with life", "the scenery shimmering with vitality",
        "the view flush with color", "the natural world teasing the senses",
        "the scene sparkling with detail", "the wilderness dripping with atmosphere",
        "the ecosystem glowing with health", "the earth ready for exploration"
    ];

    const scenic_locations = [
        "in a deep ancient forest", "on a high snowy plateau",
        "in a sun-drenched valley", "inside a hidden cave system",
        "on the banks of a winding river", "in a field of tall grass",
        "on a rocky mountain ledge", "under the canopy of giant sequoias",
        "in a botanical garden", "on a pristine sandy beach",
        "in a misty moorland", "beside a tranquil pond"
    ];

    const prompt_templates = [
        "Fine art nature photography. A {atmosphere} {subject}, {role} with {texture} and {feature}, {description}, naturally {action} in {lighting} {location}. Vivid, organic, detailed, 8k resolution.",
        "National Geographic style photo. Imagine a {atmosphere}, {subject}, {role} with {texture}, {feature}, {description}, quietly {action} in {lighting} {location}.",
        "Landscape painting style. Picture a {atmosphere} {subject}, {role} with {texture} and {feature}, {description}, peacefully {action} in {lighting} {location}.",
        "Cinematic nature shot: {atmosphere} {subject}, {role} with {texture}, {feature}, {description}, beautifully {action} in {lighting} {location}.",
        "Botanical illustration. Depict a {atmosphere}, {subject}, {role} with {texture} and {feature}, {description}, vibrantly {action} in {lighting} {location}."
    ];

    // --- Generate a Single Prompt ---
    function generatePrompt() {
        const template = prompt_templates[Math.floor(Math.random() * prompt_templates.length)];
        const atmosphere = atmosphere_adjectives[Math.floor(Math.random() * atmosphere_adjectives.length)];
        const subject = nature_subjects[Math.floor(Math.random() * nature_subjects.length)];
        const texture = texture_details[Math.floor(Math.random() * texture_details.length)];
        const feature = landscape_features[Math.floor(Math.random() * landscape_features.length)];
        const role = symbolic_roles[Math.floor(Math.random() * symbolic_roles.length)];
        const lighting = lighting_conditions[Math.floor(Math.random() * lighting_conditions.length)];
        const action = natural_actions[Math.floor(Math.random() * natural_actions.length)];
        const description = visual_descriptions[Math.floor(Math.random() * visual_descriptions.length)];
        const location = scenic_locations[Math.floor(Math.random() * scenic_locations.length)];

        return template
            .replace("{atmosphere}", atmosphere)
            .replace("{subject}", subject)
            .replace("{role}", role)
            .replace("{texture}", texture)
            .replace("{feature}", feature)
            .replace("{description}", description)
            .replace("{action}", action)
            .replace("{lighting}", lighting)
            .replace("{location}", location);
    }

    // --- Generate 25 Unique Prompts ---
    console.log('Generating 25 unique nature prompts...');
    const promptsSet = new Set();
    while (promptsSet.size < 25) {
        promptsSet.add(generatePrompt());
    }
    const prompts = Array.from(promptsSet);
    console.log('Prompts generated successfully! Starting automation...');

    // --- Automation Setup ---
    const generationWaitTime = 130000; // 130 seconds; adjust as needed
    const wait = ms => new Promise(res => setTimeout(res, ms));
    const input = document.querySelectorAll('.paragraph-input')[1];
    const genButton = document.querySelectorAll('#generateButtonEl')[0];
    const suppressedAlerts = [];
    window.alert = msg => suppressedAlerts.push(msg);

    async function clickAllSaveButtons() {
        const buttons = Array.from(document.querySelectorAll('.private-save-button'));
        console.log(`→ Found ${buttons.length} save buttons.`);

        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            btn.scrollIntoView({ behavior: 'smooth', block: 'end' });
            await wait(300);
            btn.click();
            console.log(` Clicked save button #${i + 1}`);
            await wait(300);
        }
    }

    // --- Automation Loop ---
    for (let i = 0; i < prompts.length; i++) {
        console.log(`\n [${i + 1}/${prompts.length}] Inserting prompt: "${prompts[i]}"`);
        input.value = prompts[i];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        genButton.click();
        console.log(' Generation started.');
        await wait(generationWaitTime);
        await clickAllSaveButtons();
        if (suppressedAlerts.length) {
            console.log(` Suppressed ${suppressedAlerts.length} alert(s):`, suppressedAlerts);
            suppressedAlerts.length = 0;
        } else {
            console.log(' No alerts this round.');
        }
        await wait(2000);
    }

    console.log('\n All prompts processed!');
})();
