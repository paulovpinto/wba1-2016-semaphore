
var delayQ=3000; // bestimmt die Verzögerung zwischen den Fragen. 1000=1sek
var delayA=3000; //bestimmt die Länge der Verzögerung der Antworten, nachdem die Frage eingeblendet worden ist.

var punkte=0;  //aktuelle Punktzahl

var antworten= Array(10);   // hier wird gespiechert, ob die Frage richtig oder falsch beantwortet wurde um später die Bälle einzufärben
//  var random= math.random();


var $ele;  // aktuell angeklicktes Element
var antwortId; // zum überprüfen der richten Antwort
var timer= null; // das Zeitintervall, mitdem die count Methode ausgeführt wird
var i=10; // Zeit in Sekundend
var darfKlicken=true; // Wird auf false gesetzt, wenn schon eine Antwort für die Frage gegeben wurde

var aktuelleFrage = 0;
var quizLogik = {}; // Quizdaten
quizLogik.data = {};
quizLogik.quiz = {};

var zeit = i; // Zeit für den Timer im View

function updateTimer(){
	document.getElementById("timer-js").style.width = (i * 10) + "%";
	if(zeit <= 0){ clearInterval(timer);
	}
}

function antwortPruefen(ele, answer){

  $ele= $(ele);                              // cast zu jQuery
  antwortId = $(ele).attr("data-antwortId");

  if(devmode) console.log($ele);
  if(devmode) console.log("gegebene Antwort: " + antwortId);
  if(devmode) console.log("richtige Antwort: " + answer);

  if(answer === antwortId){

 		$ele.addClass("richtig");
 		punkte+=i*5+50;
 		if(devmode) console.log("Punkte: "+ punkte);
 		antworten[aktuelleFrage]=true;


  } else {

		if(devmode) console.log("Punkte: "+punkte);
		antworten[aktuelleFrage]=false;
		$ele.addClass("falsch");
		$("#antwort"+answer).addClass("richtig");

  }



}

function count( ){
  i--;

  if(devmode) console.log("Zeit: "+i);
  if(devmode) console.log(quizLogik.quiz);

  // Ändert den Timer im View
  updateTimer();

  if(i===0){
          aktuelleFrage++;
          clearInterval(timer);
          if(aktuelleFrage<=9){ //Zeit abgelaufen & es gibt noch Fragen:

							$("#antwort"+ quizLogik.quiz.allQuestions[aktuelleFrage].question.answer).addClass("richtig"); //Richtige Antwort anzeigen
              setTimeout(function() {neueFrage(quizLogik.quiz.allQuestions[aktuelleFrage].question, aktuelleFrage)}, delayQ);
          }
          else{ // Quizrunde ist vorbei da die Zeit abgelaufen ist & 10 Frage beantwortet worden sind:
              clearInterval(timer);
              setTimeout(function() {createEndscreen(punkte, antworten, quizIdx)},delayQ);
          }
      }


}

function neueFrage( data, aktuelleFrage){
	clearInterval(timer);
	removeFeedback();
	delayA= readTime(data.question);

  $("#frage").html(data.question);
	$("#antwort1").html(data.options[0].option);    // ändert per Id den Inhalt
	$("#antwort2").html(data.options[1].option);    //$ signalisiert das jQuery Objekt, # ersetzt getElementbyId, .html signalisiert html Objekt(Inhalt)
	$("#antwort3").html(data.options[2].option);
	$("#antwort4").html(data.options[3].option);
	$("#antworten").addClass("hidden");

  $("#question").html("Frage: " + (aktuelleFrage+1) +"/10");

	i=10;
	updateTimer();
	setTimeout(function() {

//  console.log(document.getElementbyId("antwort1"));
//  tausch($("#antwort1"), $("#antwort2"));
		$("#antworten").removeClass("hidden");

 setInterval("count()", 1000);

   clearInterval(timer);
   darfKlicken=true;
   timer = setInterval("count()", 1000);


    }, delayA);
  }



function buttonKlick(quizIdx){
    $(".antwort").click(function(e){ //click-Funktion außerhalb von neueFrage schreiben,
    //	var cButton = e.target;
    if(i!==0 && darfKlicken===true ){

			darfKlicken=false;
      clearInterval(timer);
      antwortPruefen(e.target, quizLogik.quiz.allQuestions[aktuelleFrage].question.answer);    // Antwort
      aktuelleFrage++;
      if(devmode) console.log("aktuelle Frage: "+ aktuelleFrage);

          if(aktuelleFrage<=9){
              setTimeout(function() {neueFrage( quizLogik.quiz.allQuestions[aktuelleFrage].question, aktuelleFrage )}, delayQ);
          }
         else{
              //window.location="http://www.google.de";
              //document.getElementById("text").innerHTML = "Jetzt auf Endscreen leiten";

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
	return charCount.length/7/3.5*1000;

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
function tausch(obj1, obj2){

  var temp = document.createElement("p");
  obj1.parentNode.insertBefore(temp, obj1);

  obj2.parentNode.insertBefore(obj1, obj2);

  temp.parentNode.insertBefore(obj2, temp);

  temp.parentNode.removeChild(temp);
}

function ballfüllen(){
  for(j=1;j<11; j++){
    if(antworten[j]===false)
      $("#ball"+j).addclass("ballFalsch");


  } */

//}
