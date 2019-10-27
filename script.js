/**
 * Verkefni 7 – Gisk leikur
 *
 * Leikur sem snýst um að giska á tölu milli 0 og 100
 */


/**
 * Global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur enginn leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *  - Fyrsti leikur kláraðist í tveimur ágiskunum.
 *  - Seinni leikur kláraðist í þremur ágiskunum.
 */

 const games = [];


 /**
  * Byrjar leikinn okkar með því að kalla í play().
  * Eftir að play() klárar þá er boðið notandanum að spila annann leik með confirm()
  * Ef notandi ýtir á "ok" þá er annar leikur spilaður.
  * Ef notandi ýtir á "cancel" þá eru sóttar niðurstöður með getResults() og þær birtar með alert().
  */
function start() {
  do {
    play();
  } while (confirm("Viltu spila annan leik?"))
  getResults();
}

/**
 * Spilar einn leik. Sér um að:
 *  - Velja tölu af handahófi í byrjun með randomNumber()
 *  - Biðja notanda um tölu með prompt()
 *  - Vinna úr intaki frá notanda með parseGuess()
 *  - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *  - Halda utan um fjölda ágiskana
 *  - Vista fjölda ágiskana í "games" fylki þegar búið er að giska rétt
 * 
 * Ef notandi ýtir á cancel þegar beðið er um ágiskun skal hætta í leik en ekki vista ágiskanir
 *  - t.d. með því að nota break í lykkju.
 * 
 * Þarf að útfæra með lykkju og flæðisstýringum
 */
function play() {
  const quit =  false;
  alert("Ég er að hugsa mér tölu milli 1 og 100. Sjáum hvað þú þarft margar ágiskanir til að finna hana!");
  let numberOfGuesses = 0;
  const random = randomNumber(1,100);
  let answer = null;
  do {
    const userGuess = prompt('Hvaða tölu er ég að hugsa mér? Svar: ');
    if (userGuess === null) {
      alert("Hætt í leik.");
      return;
    }
    numberOfGuesses++;
    const parsedGuess = parseGuess(userGuess);
    answer = getResponse(parseGuess(userGuess), random);
    alert(`${answer}`);
  } while (answer !== "Rétt")
  games.push(numberOfGuesses);
  alert(`Þú notaðir ${numberOfGuesses} ágiskanir til að finna töluna.`)
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjölda leikja er skilað ásamt meðalfjölda giska, t.d.:
 *    "þú spilaðir 10 leiki
 *     Meðalfjöldi ágiskana var 5"
 * ATH að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er skilað:
 *    "Þú spilaðir engann leik >_<"
 */
function getResults(){
  const numberOfGames = games.length;
  if (numberOfGames === 0) {
    alert(`
      Þú spilaðir ${numberOfGames} leiki.
      Þar með er ekki hægt að reikna meðaltal ágiskana í þínu tilviki.
      `);
  } else {
    const average = +(calculateAverage().toFixed(2));
    alert(`
      Þú spilaðir ${numberOfGames} leiki. 
      Meðalfjöldi ágiskana var ${average}.
    `);
  }
}

/**
 * Reiknar út og skilar meðalfjölda ágiskana í öllum leikjum sem geymdir eru í 
 * global breytu "games". Skilar gildi með tveimur aukastöfum.
 * Ef games = [3,3,4] er niðurstaðan (3+3+4)/3 = 3.66666667
 * og henni skilað sem 3.67
 * 
 * þarf að útfæra með lykkju.
 */
function calculateAverage(){
  let sum = 0;
  for (i in games) {
    sum += i;
  }
  return (sum / games.length);
}

/**
 * Tekur in input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er skilað null
 */
function parseGuess(input){
  const parsedInput = parseInt(input);
  if (isNaN(parsedInput)) {
    return null;
  } else {
    return parsedInput;
  }
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *  - guess sem tölu, ágiskun notanda
 *  - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 * 
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct){
  if (isNaN(guess) || guess < 0) {
    return 'Ekki rétt';
  } else if (Math.abs(correct - guess) === 0) {
    return 'Rétt';
  } else if (Math.abs(correct - guess) < 5) {
    return 'Mjög nálægt';
  } else if (Math.abs(correct - guess) < 10) {
    return 'Nálægt';
  } else if (Math.abs(correct - guess) < 20) {
    return 'Frekar langt frá';
  } else if (Math.abs(correct - guess) < 50) {
    return 'Langt frá';
  } else {
    return 'Mjög langt frá';
  }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();