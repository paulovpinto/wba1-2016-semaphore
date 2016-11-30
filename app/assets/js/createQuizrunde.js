function initQuiz(quizIdx){

	$(".beenden").addClass("active");
	
	beenden.addEventListener('click', function (event) {
	    if(!loaderisready) console.log("Preloader war noch nicht fertig!!!");
	    console.log("Die Beenden Schaltfäche wurde ausgelost.");
	    quiz_beenden();
	});

	function getQuizJson( jsonurl, callback ){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {

			// Wenn der Ajax Request komplett ist, rufen wir die Callbackfunktion auf, übergeben das Ergebnis des Ajax Requests und die QuizID.
			if (this.readyState == 4) { callback.call(this, quizIdx); }
		};

		xhttp.open("GET", jsonurl, true);
		xhttp.send();

	}

	var jsonurl = jsonbasis + "/questions-" + quizIdx + ".json";
	getQuizJson(jsonurl, function(){  startQuiz(quizIdx, this.responseText); });
	

}


function startQuiz( quizIdx, json ){

    if(devmode) console.log("createStartscreeen wurde aufgerufen.");

	// Stylesheet austauschen
	var sheeturl = urls["quizrunde"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);

    // Snippet ziehen
    var template = templates["quizrunde"];

	quizLogik.quiz = JSON.parse(json);

	quizLogik.data = quizLogik.quiz.allQuestions[0].question


	aktuelleFrage = 0;
	document.getElementById("content").innerHTML = template;
	buttonKlick(quizIdx);
	neueFrage( quizLogik.data, aktuelleFrage);

}
