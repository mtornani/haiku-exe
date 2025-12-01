/* ========================================
   HAIKU.EXE - PROTOCOL ENGINE
   v2.1 - drone potenziato stile camera anecoica
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
let droneGain = null;
let isAudioInitialized = false;

// DOM Elements
const phases = {
  void: document.getElementById('void'),
  emergence: document.getElementById('emergence'),
  transmission: document.getElementById('transmission')
};

const hiddenPrompt = document.getElementById('hidden-prompt');
const haikuOutput = document.getElementById('haiku-output');

/* ========================================
   DRONE AUDIO ENGINE - CAMERA ANECOICA STYLE
   Frequenze che inducono disagio psicologico
   ======================================== */

function initDroneAudio() {
  if (isAudioInitialized) return;
  isAudioInitialized = true;
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Master gain
    droneGain = audioContext.createGain();
    droneGain.gain.setValueAtTime(0, audioContext.currentTime);
    droneGain.connect(audioContext.destination);
    
    // === LAYER 1: Frequenze infrasoniche (disagio fisico) ===
    // 18-19 Hz - sotto la soglia udibile ma percepibile come pressione
    const infrasonic = audioContext.createOscillator();
    infrasonic.type = 'sine';
    infrasonic.frequency.setValueAtTime(18.5, audioContext.currentTime);
    
    const infraGain = audioContext.createGain();
    infraGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    infrasonic.connect(infraGain);
    infraGain.connect(droneGain);
    infrasonic.start();
    
    // === LAYER 2: Drone basso (fondamento) ===
    // Tritono - l'intervallo del diavolo
    const bassFreqs = [55, 77.78]; // A1 e Eb2 - tritono
    bassFreqs.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      osc.type = 'sawtooth'; // Più ricco di armoniche
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      // Filtro per togliere harshness ma mantenere corpo
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioContext.currentTime);
      filter.Q.setValueAtTime(1, audioContext.currentTime);
      
      // LFO lento per pulsazione inquietante
      const lfo = audioContext.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1 + (i * 0.07), audioContext.currentTime);
      
      const lfoGain = audioContext.createGain();
      lfoGain.gain.setValueAtTime(3, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      const oscGain = audioContext.createGain();
      oscGain.gain.setValueAtTime(0.4, audioContext.currentTime);
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(droneGain);
      
      osc.start();
      lfo.start();
    });
    
    // === LAYER 3: Frequenze medie disturbanti ===
    // Simula il "suono del silenzio" - tinnito artificiale
    const tinnitusFreqs = [3800, 4200, 7500]; // Frequenze che simulano acufene
    tinnitusFreqs.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      // Modulazione molto lenta per renderlo "vivo"
      const lfo = audioContext.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.03 + (i * 0.02), audioContext.currentTime);
      
      const lfoGain = audioContext.createGain();
      lfoGain.gain.setValueAtTime(15, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      const oscGain = audioContext.createGain();
      // Volume basso ma percepibile - come acufene reale
      oscGain.gain.setValueAtTime(0.03 - (i * 0.008), audioContext.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(droneGain);
      
      osc.start();
      lfo.start();
    });
    
    // === LAYER 4: Battimenti binaurali (ansia) ===
    // Due frequenze vicine creano pulsazione nel cervello
    const binauralBase = 110; // A2
    const binauralOffset = 4; // 4 Hz difference = theta waves (ansia)
    
    const leftOsc = audioContext.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(binauralBase, audioContext.currentTime);
    
    const rightOsc = audioContext.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(binauralBase + binauralOffset, audioContext.currentTime);
    
    const binauralGain = audioContext.createGain();
    binauralGain.gain.setValueAtTime(0.25, audioContext.currentTime);
    
    leftOsc.connect(binauralGain);
    rightOsc.connect(binauralGain);
    binauralGain.connect(droneGain);
    
    leftOsc.start();
    rightOsc.start();
    
    // === LAYER 5: Rumore filtrato (presenza spettrale) ===
    const noiseLength = audioContext.sampleRate * 4;
    const noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseLength; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    
    // Filtro passa-banda per suono "vento in corridoio vuoto"
    const noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(400, audioContext.currentTime);
    noiseFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
    
    // LFO sul filtro per movimento
    const noiseLfo = audioContext.createOscillator();
    noiseLfo.type = 'sine';
    noiseLfo.frequency.setValueAtTime(0.05, audioContext.currentTime);
    
    const noiseLfoGain = audioContext.createGain();
    noiseLfoGain.gain.setValueAtTime(200, audioContext.currentTime);
    
    noiseLfo.connect(noiseLfoGain);
    noiseLfoGain.connect(noiseFilter.frequency);
    
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.15, audioContext.currentTime);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(droneGain);
    
    noiseSource.start();
    noiseLfo.start();
    
    // === LAYER 6: Sub-pulse (battito cardiaco distorto) ===
    const pulseOsc = audioContext.createOscillator();
    pulseOsc.type = 'sine';
    pulseOsc.frequency.setValueAtTime(35, audioContext.currentTime); // Sub-bass
    
    // Modulazione per creare "pulse"
    const pulseLfo = audioContext.createOscillator();
    pulseLfo.type = 'square';
    pulseLfo.frequency.setValueAtTime(0.8, audioContext.currentTime); // ~48 BPM - battito lento, inquietante
    
    const pulseLfoGain = audioContext.createGain();
    pulseLfoGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    
    const pulseGain = audioContext.createGain();
    pulseGain.gain.setValueAtTime(0.35, audioContext.currentTime);
    
    pulseLfo.connect(pulseLfoGain);
    pulseLfoGain.connect(pulseGain.gain);
    
    pulseOsc.connect(pulseGain);
    pulseGain.connect(droneGain);
    
    pulseOsc.start();
    pulseLfo.start();
    
    console.log('Drone audio inizializzato');
    
  } catch (e) {
    console.error('Errore audio:', e);
  }
}

function startDrone() {
  if (!audioContext || !droneGain) {
    console.log('Audio context non pronto');
    return;
  }
  
  // Resume context se sospeso
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('Audio context resumed');
    });
  }
  
  // Fade in (8 secondi per buildup graduale)
  droneGain.gain.cancelScheduledValues(audioContext.currentTime);
  droneGain.gain.setValueAtTime(0, audioContext.currentTime);
  droneGain.gain.linearRampToValueAtTime(0.85, audioContext.currentTime + 8);
  
  console.log('Drone started - volume target: 0.85');
}

function stopDrone() {
  if (!audioContext || !droneGain) return;
  
  droneGain.gain.cancelScheduledValues(audioContext.currentTime);
  droneGain.gain.setValueAtTime(droneGain.gain.value, audioContext.currentTime);
  droneGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
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
  
  document.body.classList.add('glitch-transition');
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
  try {
    const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (!audioContext) audioContext = ctx;
    
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const decay = 1 - (i / bufferSize);
      data[i] = (Math.random() * 2 - 1) * 0.4 * decay;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start();
  } catch (e) {
    // Fail silently
  }
}

/* ========================================
   SEQUENCE
   ======================================== */

function startSequence() {
  activatePhase('void');
  
  setTimeout(() => {
    transitionWithGlitch('void', 'emergence', () => {
      setTimeout(() => {
        hiddenPrompt.classList.add('visible');
      }, 4000);
    });
  }, 3000);
}

function executeTransmission() {
  if (hasInteracted) return;
  hasInteracted = true;
  
  // Inizializza audio PRIMA della transizione
  initDroneAudio();
  
  const haiku = protocolHaiku[Math.floor(Math.random() * protocolHaiku.length)];
  
  transitionWithGlitch('emergence', 'transmission', () => {
    // Avvia drone DOPO la transizione
    setTimeout(() => {
      startDrone();
    }, 300);
    
    setTimeout(() => {
      typeHaiku(haiku, haikuOutput);
    }, 800);
  });
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

document.addEventListener('click', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    executeTransmission();
  }
});

document.addEventListener('touchend', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    executeTransmission();
  }
});

document.addEventListener('keydown', (e) => {
  if (phases.emergence.classList.contains('active') && !hasInteracted) {
    if (e.key === 'Enter' || e.key === ' ') {
      executeTransmission();
    }
  }
});

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

// Triple tap (mobile)
let tapCount = 0;
let tapTimeout;
const TAP_DELAY = 400;

document.addEventListener('touchend', (e) => {
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

function playEasterEggSound() {
  try {
    const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (!audioContext) audioContext = ctx;
    
    if (ctx.state === 'suspended') ctx.resume();
    
    // === Suono "LET ME IN" - voce distorta simulata ===
    
    // Layer 1: Tono basso ominoso (come voce profonda)
    const voice1 = ctx.createOscillator();
    voice1.type = 'sawtooth';
    voice1.frequency.setValueAtTime(85, ctx.currentTime);
    voice1.frequency.linearRampToValueAtTime(80, ctx.currentTime + 1.5);
    
    const voiceFilter = ctx.createBiquadFilter();
    voiceFilter.type = 'lowpass';
    voiceFilter.frequency.setValueAtTime(400, ctx.currentTime);
    voiceFilter.Q.setValueAtTime(5, ctx.currentTime);
    
    // Tremolo per effetto "parlato"
    const tremolo = ctx.createOscillator();
    tremolo.type = 'sine';
    tremolo.frequency.setValueAtTime(6, ctx.currentTime);
    
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.setValueAtTime(0.3, ctx.currentTime);
    
    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0, ctx.currentTime);
    voiceGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.1);
    voiceGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1);
    voiceGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    
    tremolo.connect(tremoloGain);
    tremoloGain.connect(voiceGain.gain);
    
    voice1.connect(voiceFilter);
    voiceFilter.connect(voiceGain);
    voiceGain.connect(ctx.destination);
    
    voice1.start(ctx.currentTime);
    tremolo.start(ctx.currentTime);
    voice1.stop(ctx.currentTime + 2);
    tremolo.stop(ctx.currentTime + 2);
    
    // Layer 2: Frequenza alta disturbante (whisper demoniaco)
    const whisper = ctx.createOscillator();
    whisper.type = 'sine';
    whisper.frequency.setValueAtTime(666, ctx.currentTime); // ;)
    
    const whisperGain = ctx.createGain();
    whisperGain.gain.setValueAtTime(0, ctx.currentTime);
    whisperGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
    whisperGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5);
    whisperGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    
    whisper.connect(whisperGain);
    whisperGain.connect(ctx.destination);
    
    whisper.start(ctx.currentTime);
    whisper.stop(ctx.currentTime + 2);
    
    // Layer 3: Rumore reversed (come voce al contrario)
    const noiseLength = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseLength; i++) {
      // Envelope che sale invece di scendere (reversed feel)
      const env = Math.pow(i / noiseLength, 2);
      noiseData[i] = (Math.random() * 2 - 1) * env * 0.15;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(2, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noiseSource.start(ctx.currentTime);
    
    // Layer 4: "Knock knock" basso - bussata
    [0, 0.3, 0.9].forEach((time) => {
      const knock = ctx.createOscillator();
      knock.type = 'sine';
      knock.frequency.setValueAtTime(60, ctx.currentTime + time);
      knock.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + time + 0.15);
      
      const knockGain = ctx.createGain();
      knockGain.gain.setValueAtTime(0.6, ctx.currentTime + time);
      knockGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.15);
      
      knock.connect(knockGain);
      knockGain.connect(ctx.destination);
      
      knock.start(ctx.currentTime + time);
      knock.stop(ctx.currentTime + time + 0.2);
    });
    
  } catch (e) {
    console.error('Easter egg audio error:', e);
  }
}

function revealSecret() {
  if (document.querySelector('.secret-message')) return;
  
  document.body.classList.add('glitch-transition');
  playStaticBurst();
  playEasterEggSound(); // Audio inquietante per l'easter egg
  
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
  
  setTimeout(() => {
    secret.innerHTML = 'LET ME IN<br><span style="font-size: 0.4em; opacity: 0.6;">/protocol</span>';
  }, 2000);
  
  setTimeout(() => {
    secret.style.opacity = '0';
    setTimeout(() => secret.remove(), 500);
  }, 4000);
}

// Console easter egg
console.log('%c█▓▒░ haiku.exe ░▒▓█', 'color: #8B0000; font-size: 20px; font-weight: bold;');
console.log('%cHai trovato la console. Bene.', 'color: #666;');
console.log('%cMa non è qui che troverai le risposte.', 'color: #666;');
console.log('%c/protocol', 'color: #CC0000;');

/* ========================================
   INIT
   ======================================== */

document.addEventListener('DOMContentLoaded', startSequence);
