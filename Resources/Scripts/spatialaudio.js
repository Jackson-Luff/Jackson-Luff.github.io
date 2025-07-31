const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Use webkitAudioContext for broader compatibility

// Set listener position (usually at the origin)
audioContext.listener.setPosition(0, 0, 0);

/**
 * Creates and plays a spatialized sound.
 * @param {string} src - The URL of the audio file.
 * @param {number} x - X coordinate for the sound source.
 * @param {number} y - Y coordinate for the sound source.
 * @param {number} z - Z coordinate for the sound source.
 */
function createSpatialSound(src, x, y, z) {
  // Check if context is suspended (e.g., before user interaction) and resume
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const source = audioContext.createBufferSource();
  const panner = new PannerNode(audioContext, {
    positionX: x,
    positionY: y,
    positionZ: z,
    panningModel: 'HRTF', // High-quality 3D audio
    distanceModel: 'inverse',
    refDistance: 1
  });

  // Load sound via fetch
  fetch(src)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      source.buffer = buffer;
      source.connect(panner);
      panner.connect(audioContext.destination);
      source.start();
    })
    .catch(e => console.error('Error with spatial audio:', e));
}