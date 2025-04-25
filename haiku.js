
const haikuMap = {
  morning: [
    "luce intermittente
tra i denti del giorno
qualcosa si muove",
    "le mani fredde
ma già in cerca di forma
nell’aria del mattino",
    "non ho sogni
solo dati corrotti
dal sonno profondo",
    "un file si apre
e dentro: una poesia
non ancora scritta",
    "il silenzio
ha una nota diversa
prima del traffico",
    "il tè fuma lento
e mi ricorda che
esisto appena",
    "una finestra
si apre e il mondo
non risponde",
    "svegliarsi è
una riga di comando
senza output",
    "nella tazza
cerco un senso
non la caffeina",
    "il sole filtra
come un log
a metà pulito",
    "una notifica
è già abbastanza
per rompere il flusso",
    "scrivere al mattino
è parlare a un dio
che ancora dorme",
    "la città sussurra
mentre il cervello
bootstrappa",
    "mi rendo conto
che sto già fingendo
normalità",
    "nella posta
nessuna risposta
dal mio futuro",
    "i passi lenti
sono i più sinceri
all’alba",
    "ho acceso lo schermo
prima del cuore
ancora una volta",
    "la mente stenta
ma il sistema parte
come sempre",
    "la giornata inizia
con la voglia
di evitarla",
    "gli uccelli cantano
ma il mio log
tace",
    "il corpo scricchiola
come una vecchia
applicazione",
    "l’acqua calda
è l’unico conforto
a questo boot",
    "ogni mattino
ha un bug
non documentato",
    "riprogrammare
il risveglio
è utopia",
    "l’alba compila
senza errori
ma senza gioia"
  ],
  afternoon: [
    "la rete pulsa
come un cuore sintetico
nella pausa pranzo",
    "le idee svaniscono
come codice volatile
tra due mail",
    "ogni clic
è un battito
nella giungla digitale",
    "mi guardano
ma nessuno sa
cosa cercavo",
    "speravo in pace
ma è solo un bug
tra due notifiche",
    "le ore centrali
sono il deserto
tra due pensieri",
    "la mente sbanda
ma il corpo
segue il flusso",
    "il pomeriggio
è un ciclo for
senza break",
    "scrollo a vuoto
in cerca di un glitch
nel sistema",
    "il sole alto
non scalda
la mia attenzione",
    "una pausa
può essere solo
apparente",
    "l’energia
è solo un ricordo
del caffè di prima",
    "non distinguo
le cose importanti
dalle urgenti",
    "ho aperto il browser
per cercare me stesso
nella cronologia",
    "l’algoritmo
mi conosce meglio
di quanto vorrei",
    "la mia ombra
sulla scrivania
è l’unica costante",
    "i task
sono trappole
con nomi gentili",
    "lavoro in loop
fino a dimenticare
il perché",
    "non mi cercano
ma si aspettano
che risponda",
    "scrivere è
scavare nella roccia
col cursore",
    "sono stanco
di essere produttivo
senza motivo",
    "l’orologio
è un nemico
che sorride",
    "mi distraggo
per non affrontare
il file giusto",
    "una chiamata
spegne l’anima
due su tre volte",
    "il silenzio
della stanza vuota
è l’unico sincero"
  ],
  evening: [
    "il sole si piega
e io con lui
sotto un loop eterno",
    "si spegne il rumore
e resta il vuoto
da decifrare",
    "nella cartella
c’è un file chiamato
mezzanotte",
    "la città rallenta
ma il mio log
si scrive da solo",
    "eseguo di nuovo
sperando che cambi
la riga finale",
    "la sera arriva
senza spiegazioni
come un bug",
    "i pensieri
divengono file
non salvati",
    "la cena
è un'interruzione
nel ciclo di debug",
    "le luci basse
non nascondono
la stanchezza",
    "guardo il soffitto
aspettando una
notifica interiore",
    "non parlo
da ore, ma il log
grida",
    "scrivo haiku
invece di rispondere
ai messaggi",
    "ogni sera
ha un'eco
di ciò che non ho fatto",
    "la lista
delle cose da fare
è un racconto horror",
    "accendo una luce
solo per negare
che è finita",
    "le finestre
riflettono me stesso
più del solito",
    "sto ancora qui
a cercare il senso
del giorno intero",
    "ogni pixel
è un pensiero
troppo acceso",
    "nessuna pausa
solo un cambio
di contesto",
    "la quiete
è una bugia
del sistema",
    "mi resta solo
un'altra esecuzione
prima del sonno",
    "la sera
è il tempo dei log
dimenticati",
    "ripenso
a ogni errore
come se bastasse",
    "le parole
non dette
pesano nel buffer",
    "una linea verde
sul nero
è tutto ciò che resta"
  ],
  night: [
    "il buio ascolta
e non interrompe
le voci di sottofondo",
    "ho dimenticato
come dormire
senza pensare",
    "l’ultima finestra
non si chiude mai
e mi guarda",
    "il terminale
è acceso anche ora
come me",
    "le ombre digitano
haiku sconnessi
nella mia testa",
    "la notte scrive
quello che il giorno
ha taciuto",
    "sento i log
degli errori
dentro il petto",
    "non c’è debug
per certi incubi
ricorrenti",
    "aspetto
che qualcosa mi svegli
dal risveglio",
    "ogni suono
è un glitch
nell’oscurità",
    "una tab aperta
da ore
che non chiudo",
    "la mente
non accetta
il comando shutdown",
    "l’anima
è in modalità
provvisoria",
    "il buio profondo
è un server
senza risposta",
    "i ricordi
girano in loop
fino al crash",
    "vedo un riflesso
nello schermo spento
e sussulto",
    "l’insonnia
ha un linguaggio
che solo i log capiscono",
    "scorro pensieri
come cartelle
dimenticate",
    "la notte
non ha salvataggi
automatici",
    "scrivo righe
che nessuno leggerà
ma che restano",
    "vorrei spegnere
tutto
ma non riesco",
    "la tastiera
trema come me
nell’ombra",
    "sono offline
ma nessuno se ne accorge",
    "i sogni
sono solo
script malformati",
    "la realtà
è un terminale
che non risponde"
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
  document.getElementById("output").innerText = haikus[randomIndex];
}
