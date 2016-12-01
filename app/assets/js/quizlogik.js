//Variablen
var delayQ=3000; // bestimmt die Verzögerung zwischen den Fragen. 1000=1sek
var delayA=3000; //bestimmt die Länge der Verzögerung der Antworten, nachdem die Frage eingeblendet worden ist.

var antworten= Array(10);   // hier wird gespiechert, ob die Frage richtig oder falsch beantwortet wurde um später die Bälle einzufärben
//  var random= math.random();
var $ele;  // aktuell angeklicktes Element
var antwortId; // zum überprüfen der richten Antwort
var timer= null; // das Zeitintervall, mitdem die count Methode ausgeführt wird
var i=10; // Zeit in Sekundend
var darfKlicken=true; // Wird auf false gesetzt, wenn schon eine Antwort für die Frage gegeben wurde
var punkte=0;  //aktuelle Punktzahl
var aktuelleFrage = 0;
var quizLogik = {}; // Quizdaten
quizLogik.data = {};
quizLogik.quiz = {};
var zeit = i; // Zeit für den Timer im View

//Funktionen
// Setzt den Animationsbalken entsprechend der abgelaufenen Zeit
function updateTimer(){
	document.getElementById("timer-js").style.width = (i * 10) + "%";
	if(zeit <= 0){ clearInterval(timer);
	}
}


function antwortPruefen(ele, answer){

  $ele= $(ele);                                              // cast zu jQuery
  antwortId = $(ele).attr("data-antwortId");

  if(devmode) console.log($ele);                            // Konsolenausgaben nur bei Debugg-Mode
  if(devmode) console.log("gegebene Antwort: " + antwortId);
  if(devmode) console.log("richtige Antwort: " + answer);

  if(answer === antwortId){  //wenn gegebene Antwort richtig ist

 		$ele.addClass("richtig");  // grün einfärben und blinken
 		punkte+=i*5+50;            // Punkteberechnung: je richtige Antwort 50 + jede rest Sekunde 5 Punkte
 		if(devmode) console.log("Punkte: "+ punkte);
 		antworten[aktuelleFrage]=true;   // befüllen des Arrays um auf Endscreen die Bälle zu zeichnen
  }
	else {   // wenn gegebene Antwort falsch ist

		if(devmode) console.log("Punkte: "+punkte);
		antworten[aktuelleFrage]=false;   // befüllen des Arrays um auf Endscreen die Bälle zu zeichnen
		$ele.addClass("falsch");         //rot einfärben der Antwort
		$("#antwort"+answer).addClass("richtig"); //Antwort die richtig gewesen wäre grün färben und blinken
  }
}//antwortPrüfen ende


function count( ){
  i--; //Zeit wird eins runter gezählt

  if(devmode) console.log("Zeit: "+i);
  if(devmode) console.log(quizLogik.quiz);

  updateTimer();   // Ändert den Timer im View

  if(i===0){
          aktuelleFrage++;
          clearInterval(timer);
          if(aktuelleFrage<=9){ //Zeit abgelaufen & es gibt noch Fragen:
							$("#antwort"+ quizLogik.quiz.allQuestions[aktuelleFrage].question.answer).addClass("richtig"); //Richtige Antwort anzeigen
              setTimeout(function() {neueFrage(quizLogik.quiz.allQuestions[aktuelleFrage].question, aktuelleFrage)}, delayQ); //neueFrage mit zeitverzögerung ausführen
          }
          else{ // Quizrunde ist vorbei da die Zeit abgelaufen ist & 10 Frage beantwortet worden sind:
              clearInterval(timer);
              setTimeout(function() {createEndscreen(punkte, antworten, quizIdx)},delayQ); //Endscreen mit verzögerung laden
          }
      }
}//count ende

function neueFrage( data, aktuelleFrage){
	clearInterval(timer);
	removeFeedback();
	delayA= readTime(data.question); //setzt Zeitverzögerung der Antworten nach Fragenlänge

  $("#frage").html(data.question);
	$("#antwort1").html(data.options[0].option);    // ändert per Id den Inhalt
	$("#antwort2").html(data.options[1].option);    //$ signalisiert das jQuery Objekt, # ersetzt getElementbyId, .html signalisiert html Objekt(Inhalt)
	$("#antwort3").html(data.options[2].option);
	$("#antwort4").html(data.options[3].option);
	$("#antworten").addClass("hidden");            //versteckt zunächst die Antworten

  $("#question").html("Frage: " + (aktuelleFrage+1) +"/10"); //Anzeigen die wievielte Frage gerade an der Reihe ist

	i=10;
	updateTimer();

	setTimeout(function() {

	 	$("#antworten").removeClass("hidden"); // zeigt Antworten wieder
   	clearInterval(timer);
   	darfKlicken=true;
   	timer = setInterval("count()", 1000);
 	}, delayA); //mit Verzögerun, damit man Zeit hat die Frage zu lesen
}//neueFrage ende


function buttonKlick(quizIdx){
    $(".antwort").click(function(e){ //click-Funktion außerhalb von neueFrage schreiben,

    if(i!==0 && darfKlicken===true ){

			darfKlicken=false;
      clearInterval(timer);
      antwortPruefen(e.target, quizLogik.quiz.allQuestions[aktuelleFrage].question.answer);    // Antwort
      aktuelleFrage++;
      if(devmode) console.log("aktuelle Frage: "+ aktuelleFrage);

      if(aktuelleFrage<=9){
              setTimeout(function() {neueFrage( quizLogik.quiz.allQuestions[aktuelleFrage].question, aktuelleFrage )}, delayQ);
      } else{
              if(devmode) console.log("Quizrunde ist vorbei");
              for(k=0; k<10;k++){
              		if(devmode) console.log(antworten[k]);
              }
              setTimeout(function() {createEndscreen(punkte, antworten, quizIdx)},delayQ);
      }
     }
  }); // ende click-Funktion
} // ende buttonKlick

function removeFeedback(){

	$("#antwort1").removeClass("richtig");
	$("#antwort1").removeClass("falsch");
	$("#antwort2").removeClass("richtig");
	$("#antwort2").removeClass("falsch");
	$("#antwort3").removeClass("richtig");
	$("#antwort3").removeClass("falsch");
	$("#antwort4").removeClass("richtig");
	$("#antwort4").removeClass("falsch");
}

function readTime(charCount){
	if(devmode) console.log(charCount.length);
	if(devmode) console.log(charCount.length/7/3.5*1000);
	return charCount.length/7/3.5*1000; //Lesezeitberechnung: anzahlFragenlänge/(7 Zeichen ein druchschnittswort)/(3.5 Wörter pro Sekunde lesen)*(1000 für auf sek)

}


function quiz_beenden(){
	for(var i=0; i<antworten.length; i++){
		if(!antworten[i]){
			antworten[i] = false;
		}
	}
	createEndscreen(punkte, antworten, quizIdx)
}
/*
// versuchter Tausch der Antworten, um sie an beliebige Stellen zu schreiben
function tausch(obj1, obj2){

  var temp = document.createElement("p");
  obj1.parentNode.insertBefore(temp, obj1);

  obj2.parentNode.insertBefore(obj1, obj2);

  temp.parentNode.insertBefore(obj2, temp);

  temp.parentNode.removeChild(temp);
}
//anfänge für das Bälle füllen auf dem Endscreen, was dann das zsm Team übernehmen wolte
function ballfüllen(){
  for(j=1;j<11; j++){
    if(antworten[j]===false)
      $("#ball"+j).addclass("ballFalsch");


  } */

//}
