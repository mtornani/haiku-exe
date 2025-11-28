/* ========================================
   HAIKU.EXE - PROTOCOL ENGINE
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

// DOM Elements
const phases = {
  void: document.getElementById('void'),
  emergence: document.getElementById('emergence'),
  transmission: document.getElementById('transmission')
};

const hiddenPrompt = document.getElementById('hidden-prompt');
const haikuOutput = document.getElementById('haiku-output');

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
  
  // Play static sound (optional - add audio later)
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
   AUDIO (subtle static burst)
   ======================================== */

function playStaticBurst() {
  // Create audio context for static noise
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = audioCtx.sampleRate * 0.15; // 150ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1; // Low volume static
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start();
  } catch (e) {
    // Audio not supported, fail silently
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
  
  // Select random haiku from protocol
  const haiku = protocolHaiku[Math.floor(Math.random() * protocolHaiku.length)];
  
  // Transition to transmission phase
  transitionWithGlitch('emergence', 'transmission', () => {
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
}, 15000); // 15 seconds of waiting

/* ========================================
   EASTER EGGS
   ======================================== */

// Konami code reveals something
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key);
  konamiSequence = konamiSequence.slice(-10);
  
  if (konamiSequence.join(',') === konamiCode.join(',')) {
    // Easter egg: reveal hidden message
    revealSecret();
  }
});

function revealSecret() {
  const secret = document.createElement('div');
  secret.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #8B0000;
    font-family: monospace;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    opacity: 0;
    transition: opacity 2s;
    z-index: 2000;
  `;
  secret.textContent = 'LET ME IN';
  document.body.appendChild(secret);
  
  setTimeout(() => secret.style.opacity = '1', 100);
  setTimeout(() => {
    secret.style.opacity = '0';
    setTimeout(() => secret.remove(), 2000);
  }, 5000);
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
