
const haikuList = [
  "mi hanno detto 'scegli'\nma tutte le uscite\nerano murate",
  "la rete è un altare\ndi falsi dèi che brillano\nsolo se li guardi",
  "non ho più paura\nma solo perché ormai\nsono il mostro io",
  "bambino di fango\naddestra le formiche\na marciare dritte",
  "una voce dice\n'torna indietro, respira'\nma è già troppa luce"
];

function generateHaiku() {
  const randomIndex = Math.floor(Math.random() * haikuList.length);
  document.getElementById("output").innerText = haikuList[randomIndex];
}
