/*
Couresty of: https://codepen.io/liu-yanlong/pen/ByaVGYx
https://github.com/matteobruni/tsparticles
https://particles.js.org
https://confetti.js.org
*/

let confettiTimeout; // Renamed 'timeout' to 'confettiTimeout' for clarity and to avoid potential conflicts
let gConfettiCannonConfigs = [];
let gConfettiConfig = {}; // Renamed 'gConfig' to 'gConfettiConfig' for clarity

/**
 * Configures the confetti behavior.
 * @param {number} delayMin - Minimum delay between confetti bursts.
 * @param {number} delayMax - Maximum delay between confetti bursts.
 * @param {Array<object>} cannonConfigs - Array of configurations for different confetti cannons.
 */
function configureConfetti(delayMin, delayMax, cannonConfigs) {
  gConfettiConfig.delayMin = delayMin;
  gConfettiConfig.delayMax = delayMax;
  gConfettiCannonConfigs = cannonConfigs;
}

const duration = 60 * 60 * 1000; // 1 hour duration
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Triggers a confetti burst and schedules the next one.
 */
function triggerConfetti() {
  const timeLeft = animationEnd - Date.now();

  // Stop if animation time is up
  if (timeLeft <= 0) {
    console.log("Animation ended, stopping confetti.");
    clearTimeout(confettiTimeout); // Clear any pending timeouts
    return;
  }

  // Select random cannon
  const randomIndex = Math.floor(Math.random() * gConfettiCannonConfigs.length);
  const confettiCannon = gConfettiCannonConfigs[randomIndex];

  // Calculate particle count based on remaining time
	const particleCount = confettiCannon.getRandomParticleCount() * (timeLeft / duration);

  // Create confetti emitter options
  const currentConfettiOptions = {
    ...defaults, // Spread default properties
    particleCount,
    origin: confettiCannon.getRandomOrigin()
  };

  // Dispatch event
  const spawnedConfettiEvent = new CustomEvent('onConfettiSpawned', {
    detail: { position: currentConfettiOptions.origin }
  });
  window.dispatchEvent(spawnedConfettiEvent);

  // Fire confetti
  confetti(currentConfettiOptions);

  // Schedule next shot with random delay
  const nextDelay = randomInRange(gConfettiConfig.delayMin, gConfettiConfig.delayMax);
  confettiTimeout = setTimeout(triggerConfetti, nextDelay);
}