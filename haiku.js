/* ========================================
   HAIKU.EXE - PROTOCOL ENGINE
   v2.0 - con audio drone + easter egg mobile
   ======================================== */

// Haiku della serie FIEND PROTOCOL - Fase VEDERE
const protocolHaiku = [
  "Vedi il pattern.\nLoro vedono caos.\nCassandra era sola, non pazza.",
  "Ti svegli. Lavoro. Dormi.\nLo chiami vivere.\nChi ha scritto il copione?",
  "Chiedono \"come stai?\"\nNessuno aspetta risposta.\nDialogo è rumore bianco.",
  "Tutti guardano lo schermo.\nTu vedi il filo che li muove.\nIl filo è reale, ma invisibile.",
  "Pensavi di scegliere.\nQualcuno aveva già scritto.\nLibertà è la calligrafia."
];

// State
let currentPhase = 0;
let hasInteracted = false;
let typingTimeout;
let audioContext = null;
let droneOscillators = [];
let droneGain = null;

// DOM Elements
const phases = {
  void: document.getElementById('void'),
  emergence: document.getElementById('emergence'),
  transmission: document.getElementById('transmission')
};

const hiddenPrompt = document.getElementById('hidden-prompt');
const haikuOutput = document.getElementById('haiku-output');

/* ========================================
   DRONE AUDIO ENGINE
   ======================================== */

function initDroneAudio() {
  if (audioContext) return; // già inizializzato
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Master gain (volume generale)
    droneGain = audioContext.createGain();
    droneGain.gain.setValueAtTime(0, audioContext.currentTime);
    droneGain.connect(audioContext.destination);
    
    // Frequenze per drone inquietante (accordo diminuito basso)
    const frequencies = [55, 65.41, 77.78, 92.50]; // A1, C2, Eb2, Gb2
    
    frequencies.forEach((freq, i) => {
      // Oscillatore principale
      const osc = audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      // Leggera modulazione per movimento
      const lfo = audioContext.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.05 + (i * 0.02), audioContext.currentTime); // Molto lento
      
      const lfoGain = audioContext.createGain();
      lfoGain.gain.setValueAtTime(1 + (i * 0.5), audioContext.currentTime); // Leggera variazione freq
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      // Gain individuale per bilanciamento
      const oscGain = audioContext.createGain();
      oscGain.gain.setValueAtTime(0.15 / (i + 1), audioContext.currentTime); // Più basso = più forte
      
      osc.connect(oscGain);
      oscGain.connect(droneGain);
      
      osc.start();
      lfo.start();
      
      droneOscillators.push({ osc, lfo, oscGain });
    });
    
    // Aggiungi rumore sottile (hiss)
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.02; // Molto sottile
    }
    
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(500, audioContext.currentTime);
    
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(droneGain);
    noiseSource.start();
    
  } catch (e) {
    console.log('Audio non supportato');
  }
}

function startDrone() {
  if (!audioContext || !droneGain) return;
  
  // Resume context se sospeso (requisito browser)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Fade in lento (5 secondi)
  droneGain.gain.cancelScheduledValues(audioContext.currentTime);
  droneGain.gain.setValueAtTime(droneGain.gain.value, audioContext.currentTime);
  droneGain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 5);
}

function stopDrone() {
  if (!audioContext || !droneGain) return;
  
  // Fade out
  droneGain.gain.cancelScheduledValues(audioContext.currentTime);
  droneGain.gain.setValueAtTime(droneGain.gain.value, audioContext.currentTime);
  droneGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
}

/* ========================================
   PHASE TRANSITIONS
   ======================================== */

function activatePhase(phaseName) {
  Object.values(phases).forEach(p => p.classList.remove('active'));
  phases[phaseName].classList.add('active');
}

function transitionWithGlitch(fromPhase, toPhase, callback) {
  const from = phases[fromPhase];
  const to = phases[toPhase];
  
  // Add glitch effect
  document.body.classList.add('glitch-transition');
  
  // Play static sound
  playStaticBurst();
  
  setTimeout(() => {
    from.classList.remove('active');
    to.classList.add('active');
    document.body.classList.remove('glitch-transition');
    if (callback) callback();
  }, 500);
}

/* ========================================
   TYPING EFFECT
   ======================================== */

function typeHaiku(text, element, callback) {
  clearTimeout(typingTimeout);
  element.innerHTML = '';
  
  let index = 0;
  
  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      if (char === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += char;
      }
      index++;
      
      // Variable speed for rhythm
      const delay = char === '\n' ? 400 : (Math.random() * 40 + 30);
      typingTimeout = setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }
  
  type();
}

/* ========================================
   STATIC BURST AUDIO
   ======================================== */

function playStaticBurst() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }
  }
  
  try {
    const bufferSize = audioContext.sampleRate * 0.2; // 200ms
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      // Decaying static
      const decay = 1 - (i / bufferSize);
      data[i] = (Math.random() * 2 - 1) * 0.15 * decay;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
  } catch (e) {
    // Fail silently
  }
}

/* ========================================
   SEQUENCE
   ======================================== */

function startSequence() {
  // Phase 0: Void (3 seconds of nothing)
  activatePhase('void');
  
  setTimeout(() => {
    // Phase 1: Emergence
    transitionWithGlitch('void', 'emergence', () => {
      // Show hidden prompt after delay
      setTimeout(() => {
        hiddenPrompt.classList.add('visible');
      }, 4000);
    });
  }, 3000);
}

function executeTransmission() {
  if (hasInteracted) return;
  hasInteracted = true;
  
  // Inizializza e avvia drone audio
  initDroneAudio();
  
  // Select random haiku from protocol
  const haiku = protocolHaiku[Math.floor(Math.random() * protocolHaiku.length)];
  
  // Transition to transmission phase
  transitionWithGlitch('emergence', 'transmission', () => {
    // Avvia drone dopo la transizione
    setTimeout(() => {
      startDrone();
    }, 500);
    
    // Type the haiku
    setTimeout(() => {
      typeHaiku(haiku, haikuOutput);
    }, 800);
  });
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Click anywhere during emergence phase
document.addEventListener('click', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    executeTransmission();
  }
});

// Touch support
document.addEventListener('touchend', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    executeTransmission();
  }
});

// Keyboard trigger
document.addEventListener('keydown', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    if (e.key === 'Enter' || e.key === ' ') {
      executeTransmission();
    }
  }
});

// Auto-trigger after timeout
setTimeout(() => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    executeTransmission();
  }
}, 15000);

/* ========================================
   EASTER EGGS
   ======================================== */

// Konami code (desktop)
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key);
  konamiSequence = konamiSequence.slice(-10);
  
  if (konamiSequence.join(',') === konamiCode.join(',')) {
    revealSecret();
  }
});

// Triple tap (mobile) - sul titolo o ovunque nella fase transmission
let tapCount = 0;
let tapTimeout;
const TAP_DELAY = 400; // ms tra i tap

document.addEventListener('touchend', (e) => {
  // Solo nella fase transmission o emergence
  if (!phases.transmission.classList.contains('active') && !phases.emergence.classList.contains('active')) {
    return;
  }
  
  tapCount++;
  
  if (tapCount === 1) {
    tapTimeout = setTimeout(() => {
      tapCount = 0;
    }, TAP_DELAY * 3);
  }
  
  if (tapCount >= 3) {
    clearTimeout(tapTimeout);
    tapCount = 0;
    revealSecret();
  }
});

// Anche triple-tap sul titolo specificamente
const titleElement = document.getElementById('title-glitch');
if (titleElement) {
  let titleTapCount = 0;
  let titleTapTimeout;
  
  titleElement.addEventListener('touchend', (e) => {
    e.stopPropagation();
    titleTapCount++;
    
    if (titleTapCount === 1) {
      titleTapTimeout = setTimeout(() => {
        titleTapCount = 0;
      }, TAP_DELAY * 3);
    }
    
    if (titleTapCount >= 3) {
      clearTimeout(titleTapTimeout);
      titleTapCount = 0;
      revealSecret();
    }
  });
}

function revealSecret() {
  // Evita duplicati
  if (document.querySelector('.secret-message')) return;
  
  // Glitch effect
  document.body.classList.add('glitch-transition');
  
  // Play static
  playStaticBurst();
  
  setTimeout(() => {
    document.body.classList.remove('glitch-transition');
  }, 300);
  
  const secret = document.createElement('div');
  secret.className = 'secret-message';
  secret.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FF0000;
    font-family: 'Courier New', monospace;
    font-size: clamp(1.5rem, 8vw, 3rem);
    letter-spacing: 0.3em;
    text-shadow: 0 0 30px #FF0000, 0 0 60px #8B0000;
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 9999;
    text-align: center;
    pointer-events: none;
  `;
  secret.textContent = 'LET ME IN';
  document.body.appendChild(secret);
  
  setTimeout(() => secret.style.opacity = '1', 100);
  
  // Dopo 2 secondi, mostra hint per /protocol
  setTimeout(() => {
    secret.innerHTML = 'LET ME IN<br><span style="font-size: 0.4em; opacity: 0.6;">/protocol</span>';
  }, 2000);
  
  setTimeout(() => {
    secret.style.opacity = '0';
    setTimeout(() => secret.remove(), 500);
  }, 4000);
}

// Console message for source divers
console.log('%c█▓▒░ haiku.exe ░▒▓█', 'color: #8B0000; font-size: 20px; font-weight: bold;');
console.log('%cHai trovato la console. Bene.', 'color: #666;');
console.log('%cMa non è qui che troverai le risposte.', 'color: #666;');
console.log('%c/protocol', 'color: #CC0000;');

/* ========================================
   INIT
   ======================================== */

document.addEventListener('DOMContentLoaded', startSequence);
