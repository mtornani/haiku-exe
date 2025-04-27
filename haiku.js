
const haikuMap = {
  morning: [
    `risveglio lento
bit di polvere
toccano il sole`,
    `nodi di dati
sciolti nel vapore
caffè bollente`,
    `la città dorme
ma nei server si agita
un sogno acerbo`,
    `le prime luci
pungono i terminali
e non il cuore`,
    `nel buio tiepido
stringo i comandi
come preghiere`,
    `tastiere fredde
cercano calore
tra bit e polvere`,
    `vento sottile
muove l'algoritmo
delle finestre`,
    `mattino cavo
trema il reticolato
della memoria`,
    `tra i fili d'acqua
un codice si spezza
silenziosamente`,
    `reti scoperte
abbracciano il nulla
come bambini`,
    `gocce di ping
cadono dal cielo
tra i cavi spenti`,
    `un suono sordo
bussa tra le stringhe
del mio mattino`,
    `il buio lascia
una password scaduta
sulla soglia`,
    `linee di luce
si infilano lente
tra sogni stanchi`,
    `reset improvviso
il cielo si apre
senza preavviso`,
    `ho camminato
sopra circuiti rotti
senza spezzarmi`,
    `gli uccelli cantano
sopra router spenti
un canto muto`,
    `il primo clic
apre una ferita
nella quiete`,
    `uno schermo vuoto
specchio di un'anima
a mezzo carico`,
    `i motori
riprendono fiato
nella nebbia`,
    `l'alba distilla
errori minimi
tra vecchie reti`,
    `i pacchetti persi
si rincorrono invano
nel vento caldo`,
    `dentro il sole
un bug si nasconde
senza paura`,
    `scrivo parole
e loro mi sfuggono
nella corrente`,
    `polvere nuova
copre vecchi log
ancora caldi`
  ],
  afternoon: [
    `tra gli uffici
passano impulsi lenti
e rabbia compressa`,
    `la rete ansima
sotto il peso
 dei desideri`,
    `ogni messaggio
una richiesta d'aiuto
codificata`,
    `tra tastiere
scivola la noia
vestita da dovere`,
    `debugging muto
nessuno ascolta
la mia fatica`,
    `schermi bruciati
come tramonti finti
sulle scrivanie`,
    `mani inquiete
cercano appigli
nei feed infiniti`,
    `sotto il neon
anche i bit tremano
di stanchezza`,
    `lunch break lento
interrotto da allarmi
che nessuno spegne`,
    `i dati sbadigliano
nei silos saturi
di promesse vuote`,
    `processi zombie
marciano in loop
nella rete`,
    `tra file corrotti
cerco un'uscita
e trovo un muro`,
    `l'automa ride
mentre digito stanco
su campi sterili`,
    `backup falliti
come piani vecchi
dimenticati`,
    `i terminali
sudano stringhe
senza senso`,
    `ping instabile
come il mio pensiero
a metà giornata`,
    `processi infiniti
incatenano le ore
alla noia`,
    `sotto gli avatar
tutto è polvere
e maschere`,
    `la rete trema
al primo tuono
di verità`,
    `algoritmi ciechi
dirigono il traffico
della solitudine`,
    `immagini rotte
rimbalzano tra noi
come vetri`,
    `upload interrotti
come promesse
senza peso`,
    `bug silenziosi
corrodono i ponti
sopra i sogni`,
    `i pensieri persi
si attaccano ai bit
come virus`,
    `provo a resistere
dietro firewall
in fiamme`
  ],
  evening: [
    `tramonto spento
nei log di memoria
silenzi rotti`,
    `le luci scompaiono
tra i rami secchi
del web`,
    `i server respirano
a fatica
tra bug dimenticati`,
    `nella quiete
un'eco di query
senza risposta`,
    `le città spente
si riflettono
nei monitor`,
    `logout lento
delle ultime speranze
della giornata`,
    `compilo sogni
che crashano subito
senza errori`,
    `cavi tesi
tra promesse spezzate
e vecchie reti`,
    `i bit si infrangono
come onde stanche
sulla riva`,
    `ram vuota
come la mente
dopo il tramonto`,
    `gli aggiornamenti
scorrono pigri
sul vetro sporco`,
    `log out fallito
torno a me
tutto resta acceso`,
    `domande aperte
fluttuano nel server
della sera`,
    `scrivo errori
tra righe di codice
e ombre lunghe`,
    `mi perdo lento
nella pagina bianca
del terminale`,
    `tra i neon spenti
solo un sussurro
si propaga`,
    `spegni la luce
e ascolta il battito
nudo del web`,
    `il traffico crolla
insieme ai miei
pacchetti persi`,
    `nulla da inviare
se non il silenzio
in formato .zip`,
    `stringhe spezzate
come le nostre
vie di fuga`,
    `girovagando
tra siti morti
senza bussola`,
    `ho premuto invio
e non è successo
niente`,
    `chat senza volto
abbandonate
nel buio`,
    `codici errori
come costellazioni
nel terminale`,
    `scrollo l'infinito
senza mai toccare
terra`
  ],
  night: [
    `nella notte fredda
i server sospirano
dati sognanti`,
    `le finestre chiuse
nascondono universi
a pixel spenti`,
    `bit sussurrano
segreti antichi
dentro le ombre`,
    `pagine nere
si aprono come voragini
sotto le dita`,
    `hanno chiuso tutto
tranne la paura
che rimbalza`,
    `senza rumore
trasmetto l'ultimo
pacchetto`,
    `ombre sintetiche
invadono i sogni
dei programmatori`,
    `frame saltati
come respiri
nella notte fonda`,
    `codice smarrito
tra i banchi di nebbia
del deep web`,
    `i firewall
non proteggono
dai pensieri`,
    `una password persa
trema come un'onda
nella rete`,
    `packet loss
uguale a perdita
dell'anima`,
    `gli errori 404
dipingono il cielo
stanotte`,
    `cancello tracce
prima che arrivi
l'alba`,
    `sogni frammentati
nella cache
mai svuotata`,
    `la notte bussa
senza chiavi
dentro il sistema`,
    `navigo cieco
tra server abbandonati
e urla mute`,
    `il backup fallisce
come il mio sonno
in loop`,
    `luci di modem
come stelle impazzite
sul mio tetto`,
    `ogni sessione
è un tentativo
sospeso`,
    `finestra chiusa
nessuno bussa
tranne i glitch`,
    `terminali spogli
come ossa
nella nebbia`,
    `scroll infinito
di pensieri rotti
oltre il confine`,
    `carico errori
e li chiamo
speranze`,
    `boot fallito
provo comunque
a respirare`
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
  const haiku = haikus[randomIndex];
  const outputElement = document.getElementById("output");
  
  outputElement.innerText = "> ";
  
  let index = 0;
  function type() {
    if (index < haiku.length) {
      outputElement.innerText += haiku.charAt(index);
      index++;
      setTimeout(type, 20);
    }
  }
  
  type();
}
