
const haikuMap = {
  morning: [
    `luce intermittente
tra i denti del giorno
qualcosa si muove`,
    `le mani fredde
ma gia in cerca di forma
nell'aria del mattino`,
    `non ho sogni
solo dati corrotti
dal sonno profondo`,
    `un file si apre
e dentro: una poesia
non ancora scritta`,
    `il silenzio
ha una nota diversa
prima del traffico`
  ],
  afternoon: [
    `la rete pulsa
come un cuore sintetico
nella pausa pranzo`,
    `le idee svaniscono
come codice volatile
tra due mail`,
    `ogni clic
è un battito
nella giungla digitale`,
    `mi guardano
ma nessuno sa
cosa cercavo`,
    `speravo in pace
ma è solo un bug
tra due notifiche`
  ],
  evening: [
    `il sole si piega
e io con lui
sotto un loop eterno`,
    `si spegne il rumore
e resta il vuoto
da decifrare`,
    `nella cartella
c’è un file chiamato
mezzanotte`,
    `la città rallenta
ma il mio log
si scrive da solo`,
    `eseguo di nuovo
sperando che cambi
la riga finale`
  ],
  night: [
    `il buio ascolta
e non interrompe
le voci di sottofondo`,
    `ho dimenticato
come dormire
senza pensare`,
    `l’ultima finestra
non si chiude mai
e mi guarda`,
    `il terminale
è acceso anche ora
come me`,
    `le ombre digitano
haiku sconnessi
nella mia testa`
  ]
};

function getTimeSlot() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

function generateHaiku() {
  const slot = getTimeSlot();
  const haikus = haikuMap[slot];
  const randomIndex = Math.floor(Math.random() * haikus.length);
  document.getElementById("output").innerText = '> ' + haikus[randomIndex];
}
