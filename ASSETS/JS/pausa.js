//ELEMENTI DOM
const oraInizio = document.getElementById('inizio');
const oraFine = document.getElementById('fine');
const btnReset = document.getElementById('btnReset');
const conto = document.getElementById('conto');

//FUNZIONI
let intervallo = null;

function avviarePausa() {
  let timer = 900; // 15*60
  let minuti, secondi;
  let inizioPausa = new Date();
  let finePausa = new Date();

  finePausa.setMinutes(inizioPausa.getMinutes() + 15);

  let inizioOreFormat =
    inizioPausa.getHours() < 10
      ? '0' + inizioPausa.getHours()
      : inizioPausa.getHours();

  let inizioMinuFormat =
    inizioPausa.getMinutes() < 10
      ? '0' + inizioPausa.getMinutes()
      : inizioPausa.getMinutes();

  let fineOreFormat =
    finePausa.getHours() < 10
      ? '0' + finePausa.getHours()
      : finePausa.getHours();

  let fineMinuFormat =
    finePausa.getMinutes() < 10
      ? '0' + finePausa.getMinutes()
      : finePausa.getMinutes();

  oraInizio.textContent = `${inizioOreFormat}:${inizioMinuFormat}`;
  oraFine.textContent = `${fineOreFormat}:${fineMinuFormat}`;

  clearInterval(intervallo); //Limpia el itervallo si existia

  intervallo = setInterval(function () {
    // Calcula los minutos y segundos restantes
    minuti = parseInt(timer / 60, 10);
    secondi = parseInt(timer % 60, 10);

    // Agrega un cero inicial si es menor a 10
    minuti = minuti < 10 ? '0' + minuti : minuti;
    secondi = secondi < 10 ? '0' + secondi : secondi;

    conto.textContent = minuti + ':' + secondi;

    // Fin de conteo
    if (--timer < 0) {
      clearInterval(intervallo); // Detiene la ejecución del setInterval
      //   conto.textContent = '¡PAUSA TERMINADA!';
      //   conto.style.color = '#E63946';
      document.getElementById('alerta').style.display = 'block';
      conto.style.display = 'none';
    }
  }, 1000); // 1000 ms = 1 segundo
}

btnReset.addEventListener('click', resetPausa);

function resetPausa() {
  clearInterval(intervallo); // Detiene la ejecución del setInterval
  oraInizio.textContent = '00:00';
  oraFine.textContent = '00:00';
  conto.textContent = '00:00';
  avviarePausa();
}

avviarePausa();
