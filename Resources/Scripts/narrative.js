      // Add event listener after all scripts are loaded
      document.addEventListener('DOMContentLoaded', function() {
        const narrativeButton = document.getElementById('narrativeButton');
        if (narrativeButton) {
          narrativeButton.addEventListener('click', function() {
            executeNarrative('Resources/Narrative/Responses.JSON');
          });
        }
      });

var isActive = false;

/**
 * Executes an audio event, playing a spatial sound after a delay.
 * @param {object} event - The event object.
 * @param {string} event.audioSrc - The source URL of the audio file.
 * @param {number} event.delay - The delay before playing the audio.
 */
async function executeAudioEvent(event) {
  if(event.audioSrc) {
    createSpatialSound(event.audioSrc, 0, 0, 0);
  }
  await wait(event.delay);
}

/**
 * Displays a congratulatory message with time elapsed and triggers confetti.
 * @param {number} elapsedTimeMS - The total elapsed time in milliseconds.
 */
async function executeCongrats(elapsedTimeMS)
{
  const totalSeconds = Math.floor(elapsedTimeMS / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Show congrats
  const congratsElement = document.getElementById("congrats");
  if (congratsElement) {
    congratsElement.style.visibility = "visible";
  }

  const mainElement = document.getElementById("main");
  if (mainElement) {
    mainElement.style.filter = "blur(10px)";
  }

  // Set time
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.textContent = `${minutes} minutes and ${seconds} seconds`;
  }

  // Configure confetti cannons
  const confettiCannonConfig = [
    // Left
    {
      getRandomParticleCount: () => { return randomInRange(25, 50); },
      getRandomOrigin: ()=>{ return { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }; }
    },
    // Right
    {
      getRandomParticleCount: () => { return randomInRange(25, 50); },
      getRandomOrigin: ()=>{ return { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }; }
    }
  ];

  // Bind a reactionary SFX
  // This listener will be added every time executeCongrats is called.
  // Consider moving it outside if you only want it to be added once globally.
  window.addEventListener('onConfettiSpawned',
  function(event) { // Event listener receives the event object, access detail via event.detail
    const position = event.detail.position; // Access position from event.detail
    createSpatialSound('Resources/Narrative/SFX_PartyPoppers.mp3', position.x, position.y, 0);
  }, { once: true }); // Added { once: true } to prevent multiple listeners on re-runs

  configureConfetti(300, 800, confettiCannonConfig);

  createSpatialSound('Resources/Narrative/SFX_Congratulations.mp3', 0, 0, 0);
  createSpatialSound('Resources/Narrative/SFX_YAY.mp3', 0, 0, 0);

  triggerConfetti();

  // await(0) is redundant, removed.
}

/**
 * Processes a sequence of narrative responses, typing them out and handling events.
 * @param {Array<object>} responses - An array of response objects.
 */
async function processNarrative(responses) {

 // Retrieve div to manipulate
  const el = document.getElementById("narrative-output");
  if (!el) {
    console.error("Narrative output element not found.");
    return;
  }
  el.textContent = null;

  // Configure
  typoConfigure(
    25, // Input Delay Min
    60, // Input Delay Max
    400, // Reaction time to correct mistake
  );

  // Play audio on callbacks
  const audioTyping = new Audio('Resources/Narrative/SFX_Typing.mp3');
  const audioBackspacing = new Audio('Resources/Narrative/SFX_Backspacing.mp3');

  // Event listeners are added inside processNarrative, which means they'd be added multiple times
  // if executeNarrative is called more than once. Consider moving these to a global listener or
  // making sure processNarrative is only called once per page load. For now, assuming single execution.
  window.addEventListener('onTyping', function(event) {
    audioTyping.play();
  });

    window.addEventListener('onBackspacing', function(event) {
    audioBackspacing.play();
  });

  const startTime = Date.now();

  for (const response of responses) {
    // Start typo on response
    await typeWithPossibleTypo(el, response);
    // Delay at end of typing sentence -- allowing viewer to read
    await wait(1500);
    // If an event is avaliable, execute it
    if(response.event)
    {
      await executeAudioEvent(response.event);
    }
    // delete the sentence and start the next line
    await deleteChars(el, response.text.length + 1);
  }

  await executeCongrats(Date.now() - startTime);
}

/**
 * Initiates the narrative sequence by fetching JSON data and processing it.
 * Prevents multiple concurrent narrative executions.
 * @param {string} jsonFilePath - The path to the JSON file containing narrative responses.
 */
async function executeNarrative(jsonFilePath) {

  if(isActive)
  {
    console.log("Narrative is already active. Skipping execution.");
    return;
  }

  isActive = true;

  try {
    // Load responses from JSON
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    // Process Narrative
    await processNarrative(data);
  } catch (err) {
    console.error('Fetch or narrative processing error:', err);
    isActive = false; // Reset flag on error
  }
}