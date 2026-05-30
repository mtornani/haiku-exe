# CATALOGO — ELEMENTI NON DICHIARATI
### haiku-exe.com — analisi passiva

---

## haiku.js

**1.** `konamiSequence = konamiSequence.slice(-10);`
Il sistema registra costantemente gli ultimi 10 tasti premuti. Sempre. Anche prima che l'easter egg sia triggerato. Anche se non viene mai triggerato.

**2.** `let tapCount = 0;`
Ogni tocco sul touchscreen viene contato. Non solo i tocchi sulla fase transmission — su qualsiasi fase tranne emergence. Il contatore è sempre attivo.

**3.** `let hasInteracted = false;`
Flag binario. Il sistema sa se hai interagito. Lo registra. Non può tornare a `false`.

**4.** `setTimeout(() => { if (...!hasInteracted) { executeTransmission(); } }, 15000);`
Se non fai nulla per 15 secondi, il sistema agisce per te. Monitora l'inazione e risponde a essa.

**5.** Commento su Layer 5: `// Filtro passa-banda per suono "vento in corridoio vuoto"`
Il rumore è descritto come vento in un corridoio. Un corridoio implica un passaggio. Il visitatore è il passante, non il proprietario.

**6.** Layer 6, commento: `// ~48 BPM - battito lento, inquietante`
Il sistema genera un battito cardiaco. Non è il battito del visitatore.

**7.** `droneGain.gain.linearRampToValueAtTime(0.85, audioContext.currentTime + 8);`
Il volume sale a 0.85, non a 1. Si ferma prima del massimo. Non è un limite tecnico — è una scelta.

**8.** Il rumore bianco in Layer 5: `noiseData[i] = Math.random() * 2 - 1;`
Ogni sessione genera noise diverso. Non è lo stesso file audio per tutti. Ogni visitatore sente qualcosa di unico, generato al momento.

**9.** Le frequenze LFO sul tinnitus (Layer 3): `0.03`, `0.05`, `0.07` Hz.
Cicli di 33, 20 e 14 secondi. Troppo lenti per essere percepiti come pulsazione. Il tinnito artificiale non è mai stabile, ma il movimento è invisibile all'ascoltatore.

**10.** `catch (e) { // Fail silently }`
Nel `playStaticBurst()`. Se l'audio fallisce, non viene detto nulla. Silenzio. Non sapresti che qualcosa è andato storto.

**11.** `console.log('Drone audio inizializzato');` e `console.log('Audio context resumed');`
Il sistema si auto-annuncia nella console — una finestra che il visitatore medio non vede. Commenta il proprio funzionamento per un osservatore invisibile.

**12.** Nei layer dell'easter egg audio: `const env = Math.pow(i / noiseLength, 2);`
Il noise envelope cresce invece di scendere. Il commento lo chiama "reversed feel." Il suono sale mentre la finestra è aperta — cresce mentre sei lì.

---

## style.css

**13.** `.glitch-text::before, .glitch-text::after { content: 'haiku.exe_'; opacity: 0; }`
Ci sono due copie invisibili del titolo sempre presenti nel DOM. Rendered, ma a opacità zero. Non le vedi, ma ci sono.

**14.** `.glitch-text:hover::before, .glitch-text:hover::after { opacity: 0.8; }`
Le copie fantasma diventano visibili solo quando passi sopra. Erano lì prima che tu ci andassi.

**15.** `.phase { pointer-events: none; }` / `.phase.active { pointer-events: all; }`
Le fasi inattive sono nel DOM ma non rispondono. Presenti, non toccabili. Aspettano.

**16.** `.red-overlay { background: radial-gradient(ellipse at center, ...) }`
Il rosso irradia dal centro dello schermo. Dal punto dove guardi.

**17.** `.static-noise { opacity: 0.03; }`
Il layer di static noise è sempre presente a 3% di opacità. È SVG con `fractalNoise` animato — si muove sempre. Il visitatore lo vede come texture, non come rumore. Non sa che si muove.

**18.** `@keyframes subtle-flicker { 0%, 95%, 100% { opacity: 1; } 96% { opacity: 0.8; } ... }`
Il titolo flickera tra 95% e 100% del ciclo di 4 secondi. Dura ~0.2 secondi ogni 4. Potresti vederlo una volta e pensare di averlo immaginato.

**19.** `.hidden-prompt { opacity: 0; }`
La scritta `[CLICK TO EXECUTE]` esiste prima di essere visibile. È nel DOM dall'inizio. Solo nascosta.

---

## index.html

**20.** `<meta name="description" content="">`
La meta description è vuota. La pagina si presenta ai crawler come niente.

**21.** `<meta name="robots" content="noindex, nofollow">` + robots.txt con `Disallow: /`
La pagina si nasconde ai motori di ricerca in due modi diversi. Belt and suspenders.

**22.** Le tre fasi VOID, EMERGENCE, TRANSMISSION sono tutte nel DOM simultaneamente fin dal caricamento.
Il visitatore è dentro tutte e tre le fasi nello stesso momento. Ne percepisce una sola.

**23.** I commenti HTML rivelano la struttura prima che l'esperienza cominci:
```html
<!-- PHASE 0: VOID -->
<!-- PHASE 1: EMERGENCE -->
<!-- PHASE 2: TRANSMISSION -->
```
Lo scheletro dell'esperienza è leggibile nel sorgente prima che l'esperienza cominci.

**24.** L'ASCII art nel commento HTML (`VEDERE` in block letters, la mappa delle porte) è visibile solo a chi guarda il sorgente — non a chi usa il sito.

---

## robots.txt

**25.** `# Se stai leggendo questo, sei già dentro.`
robots.txt è letto da crawler e da persone curiose che lo aprono direttamente. Il messaggio è indirizzato a qualcuno che è venuto a cercare.

**26.** Il route map completo nel file che blocca l'indicizzazione:
```
# /vedere
# /accettare
# /affrontare
# /insegnare
# /protocol
```
La mappa di tutto il sito è nel file progettato per impedire che il sito venga mappato.

**27.** `# LET ME IN` — ultima riga del file.
Dopo la regola che blocca tutto, la richiesta di essere fatto entrare. Il blocco è firmato da chi vuole entrare.

---

## 404.html

**28.** Haiku sulla 404:
```
Cercavi qualcosa.
Non era qui.
Forse non esiste.
```
La 404 sa che stavi cercando qualcosa. La seconda riga non dice "la pagina non esiste" — dice che la cosa cercata potrebbe non esistere.

**29.** `RETURN TO VOID` — il link di ritorno.
La home è nominata Void.

---

## haiku.txt

**30.** I titoli di sezione: `[BOOT.SYS]`, `[ORDER.SYS]`, `[GLITCH.BIN]`, `[REBOOT.EXE]`
Contenuto personale/emotivo organizzato sotto nomi di processi di sistema. L'emozione è trattata come un processo.

**31.** `// end of transmission`
L'ultima riga di un file di poesia è formattata come commento di codice.

**32.** Gli haiku in haiku.txt non hanno cornice narrativa — non sono attribuiti a un personaggio. Sono in prima persona, nudi.
> *"non ho piu paura / ma solo perche ormai / sono il mostro io"*

---

## manifesto.txt

**33.** `"Se sei arrivato fin qui, non sei il lettore. Sei il prossimo eseguibile."`
Il file ridefinisce il lettore come oggetto che verrà eseguito — non soggetto che legge.

**34.** `"È un'arma rituale. Un file che infetta."`
Il manifesto si descrive come qualcosa che si propaga. Non un'opera — un'infezione.

---

## protocol.html

**35.** `CLASSIFICAZIONE: RISERVATO | VERSIONE: 2.0 | STATUS: ATTIVO`
STATUS non è "published" o "live" — è ATTIVO. Presente, in corso.

**36.** `console.log('%cHai letto il protocollo.');` / `console.log('%cOra sei parte del sistema.');`
La lettura del protocollo viene registrata nella console. Il sistema nota che hai letto. Enuncia la conseguenza: sei parte del sistema.

**37.** `"Presenza assente."` — nella sezione `// ESTETICA`.
Descrizione esplicita di quello che il sito produce come effetto estetico. Non usata altrove, non collegata ad altri elementi.

**38.** `"C'è un altro livello che mi sfugge."` — obiettivo dichiarato del video perfetto.
Il design goal esplicito è produrre nel visitatore la sensazione che qualcosa stia sfuggendo. La sensazione è il prodotto, non un effetto collaterale.

---

## Cross-file / strutturale

**39.** Il naming delle fasi nel JS: `void`, `emergence`, `transmission`.
Tre parole in sequenza che descrivono qualcosa che si manifesta da un'assenza.

**40.** Il flag `hasInteracted` è impostato su `true` nel momento in cui parte la trasmissione — e non c'è nessun reset.
La memoria dell'interazione persiste per tutta la sessione. Il sistema sa dove sei nello stato.

---

*fine catalogo*
