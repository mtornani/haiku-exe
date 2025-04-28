
let typingTimeout;

const haikuMap = {
  morning: [
    "risveglio lento\nbit di polvere\ntoccano il sole",
    "nodi di dati\nsciolti nel vapore\ncaffè bollente",
    "la città dorme\nma nei server si agita\nun sogno acerbo",
    "le prime luci\npungono i terminali\ne non il cuore",
    "nel buio tiepido\nstringo i comandi\ncome preghiere",
    "tastiere fredde\ncercano calore\ntra bit e polvere",
    "vento sottile\nmuove l'algoritmo\ndelle finestre",
    "mattino cavo\ntrema il reticolato\ndella memoria",
    "tra i fili d'acqua\nun codice si spezza\nsilenziosamente",
    "reti scoperte\nabbracciano il nulla\ncome bambini",
    "gocce di ping\ncadono dal cielo\ntra i cavi spenti",
    "un suono sordo\nbussa tra le stringhe\ndel mio mattino",
    "il buio lascia\nuna password scaduta\nsulla soglia",
    "linee di luce\nsi infilano lente\ntra sogni stanchi",
    "reset improvviso\nil cielo si apre\nsenza preavviso",
    "ho camminato\nsopra circuiti rotti\nsenza spezzarmi",
    "gli uccelli cantano\nsopra router spenti\nun canto muto",
    "il primo clic\napre una ferita\nnella quiete",
    "uno schermo vuoto\nspecchio di un'anima\na mezzo carico",
    "i motori\nriprendono fiato\nnella nebbia",
    "l'alba distilla\nerrori minimi\ntra vecchie reti",
    "i pacchetti persi\nsi rincorrono invano\nnel vento caldo",
    "dentro il sole\nun bug si nasconde\nsenza paura",
    "scrivo parole\ne loro mi sfuggono\nnella corrente",
    "polvere nuova\ncopre vecchi log\nancora caldi"
  ],
  afternoon: [
    "tra gli uffici\npassano impulsi lenti\ne rabbia compressa",
    "la rete ansima\nsotto il peso\ndei desideri",
    "ogni messaggio\nuna richiesta d'aiuto\ncodificata",
    "tra tastiere\nscivola la noia\nvestita da dovere",
    "debugging muto\nnessuno ascolta\nla mia fatica",
    "schermi bruciati\ncome tramonti finti\nsulle scrivanie",
    "mani inquiete\ncercano appigli\nnei feed infiniti",
    "sotto il neon\nanche i bit tremano\ndi stanchezza",
    "lunch break lento\ninterrotto da allarmi\nche nessuno spegne",
    "i dati sbadigliano\nnei silos saturi\ndi promesse vuote",
    "processi zombie\nmarciano in loop\nnella rete",
    "tra file corrotti\ncerco un'uscita\ne trovo un muro",
    "l'automa ride\nmentre digito stanco\nsu campi sterili",
    "backup falliti\ncome piani vecchi\ndimenticati",
    "i terminali\nsudano stringhe\nsenza senso",
    "ping instabile\ncome il mio pensiero\na metà giornata",
    "processi infiniti\nincatenano le ore\nalla noia",
    "sotto gli avatar\ntutto è polvere\ne maschere",
    "la rete trema\nal primo tuono\ndi verità",
    "algoritmi ciechi\ndirigono il traffico\ndella solitudine",
    "immagini rotte\nrimbalzano tra noi\ncome vetri",
    "upload interrotti\ncome promesse\nsenza peso",
    "bug silenziosi\ncorrodono i ponti\nsopra i sogni",
    "i pensieri persi\nsi attaccano ai bit\ncome virus",
    "provo a resistere\ndietro firewall\nin fiamme"
  ],
  evening: [
    "tramonto spento\nnei log di memoria\nsilenzi rotti",
    "le luci scompaiono\ntra i rami secchi\ndel web",
    "i server respirano\na fatica\ntra bug dimenticati",
    "nella quiete\nun'eco di query\nsenza risposta",
    "le città spente\nsi riflettono\nnei monitor",
    "logout lento\ndelle ultime speranze\ndella giornata",
    "compilo sogni\nche crashano subito\nsenza errori",
    "cavi tesi\ntra promesse spezzate\ne vecchie reti",
    "i bit si infrangono\ncome onde stanche\nsulla riva",
    "ram vuota\ncome la mente\ndopo il tramonto",
    "gli aggiornamenti\nscorrono pigri\nsul vetro sporco",
    "log out fallito\ntorno a me\ntutto resta acceso",
    "domande aperte\nfluttuano nel server\ndella sera",
    "scrivo errori\ntra righe di codice\ne ombre lunghe",
    "mi perdo lento\nnella pagina bianca\ndel terminale",
    "tra i neon spenti\nsolo un sussurro\nsi propaga",
    "spegni la luce\ne ascolta il battito\nnudo del web",
    "il traffico crolla\ninsieme ai miei\npacchetti persi",
    "nulla da inviare\nse non il silenzio\nin formato .zip",
    "stringhe spezzate\ncome le nostre\nvie di fuga",
    "girovagando\ntra siti morti\nsenza bussola",
    "ho premuto invio\ne non è successo\nniente",
    "chat senza volto\nabbandonate\nnel buio",
    "codici errori\ncome costellazioni\nnel terminale",
    "scrollo l'infinito\nsenza mai toccare\nterra"
  ],
  night: [
    "nella notte fredda\ni server sospirano\ndati sognanti",
    "le finestre chiuse\nnascondono universi\na pixel spenti",
    "bit sussurrano\nsegreti antichi\ndentro le ombre",
    "pagine nere\nsi aprono come voragini\nsotto le dita",
    "hanno chiuso tutto\ntranne la paura\nche rimbalza",
    "senza rumore\ntrasmetto l'ultimo\npacchetto",
    "ombre sintetiche\ninvadono i sogni\ndei programmatori",
    "frame saltati\ncome respiri\nnella notte fonda",
    "codice smarrito\ntra i banchi di nebbia\ndel deep web",
    "i firewall\nnon proteggono\ndai pensieri",
    "una password persa\ntrema come un'onda\nnella rete",
    "packet loss\nuguale a perdita\ndell'anima",
    "gli errori 404\ndipingono il cielo\nstanotte",
    "cancello tracce\nprima che arrivi\nl'alba",
    "sogni frammentati\nnella cache\nmai svuotata",
    "la notte bussa\nsenza chiavi\ndentro il sistema",
    "navigo cieco\ntra server abbandonati\ne urla mute",
    "il backup fallisce\ncome il mio sonno\nin loop",
    "luci di modem\ncome stelle impazzite\nsul mio tetto",
    "ogni sessione\nè un tentativo\nsospeso",
    "finestra chiusa\nnessuno bussa\ntranne i glitch",
    "terminali spogli\ncome ossa\nnella nebbia",
    "scroll infinito\ndi pensieri rotti\noltre il confine",
    "carico errori\ne li chiamo\nsperanze",
    "boot fallito\nprovo comunque\na respirare"
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

  clearTimeout(typingTimeout);
  outputElement.innerHTML = "> ";

  let index = 0;
  function type() {
    if (index < haiku.length) {
      outputElement.innerHTML += haiku.charAt(index) === '\n' ? '<br>' : haiku.charAt(index);
      index++;
      typingTimeout = setTimeout(type, 40);
    }
  }

  type();
}
