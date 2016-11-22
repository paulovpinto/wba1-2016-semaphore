/****************************
Dieses Script erzeugt dynmaisch die startscreen Seite

*****************************/

console.log("Das Script createStartscreen wird ausgeführt..");

function createStartscreen(quizId){
    console.log("createStartscreeen wurde aufgerufen.");
    console.log("Übergabe: " + quizId);

	// Stylesheet austauschen
	var sheeturl = urls["startscreen"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);
	
    // Snippet ziehen 
    var template = templates["startscreen"];

	var quizze = jsondata["quizubersicht"];
	var quiz = quizze[quizId];
    console.log(quizze);
    console.log(quiz);

	// Wir brauchen geteilten Text zum Ausklappen
	var description_text = quiz.description.split(/ /);
	var words = description_text.length;
	var anzahl_worte_desc1 = 6;
	var trim = (words < anzahl_worte_desc1)? words : anzahl_worte_desc1;
	var description1 = description_text.slice(0, trim).join(" ");
	var description2 = description_text.slice(trim, words).join(" ");

	var item = document.createElement("div");
	item.innerHTML = template;
	item.firstChild.id = quizId;

	// HTML in Wrap einfügen
	//document.getElementById("content").replaceChild(item.firstChild, document.getElementById("content").firstChild);
	
	document.getElementById("content").innerHTML = template;

	/*	document.getElementById("playButton").onclick = function(){
		initQuiz(quiz.quizIdx);
	}  */

    var ubersicht_parsedjson = jsondata["quizubersicht"];
    var currentrank_parsedjson = jsondata["ranking" + quizId];
    var currentinfo_object = ubersicht_parsedjson[quizId];


 // JSON Merken
  //  var  model.data.rankingjson = JSON.parse(this.responseText);

    var target = document.getElementById("content");
    target.innerHTML = templates["startscreen"];

	//Snippet des gesamten Startscreens speichern
	var snippetstart = document.getElementById("start");
	//Snippet der Ranking-Liste speichern
	var snippetranking = document.getElementById("tabellenranking");
    //Snippet des Ranking_Headers speichern
	var listhead = document.getElementById("listhead");

	//eventuelle "Eltern" löschen
	snippetstart.parentNode.removeChild(snippetstart);
	snippetranking.parentNode.removeChild(snippetranking);
	listhead.parentNode.removeChild(listhead);


    var info = currentinfo_object;
	//"reinen" Text in der Variable speichern
	var template = snippetstart.outerHTML;

	template = template.replace(/{{name}}/, info.name);
    template = template.replace(/{{author}}/, info.author);
	template = template.replace(/{{date}}/, schoeneresDatum(info.date));
	template = template.replace(/{{image}}/, info.image);
	template = template.replace(/{{description1}}/, description1);
	template = template.replace(/{{description2}}/, description2);

	//"reinen" Text des Listen Headers speichern
	var htmlRankings = listhead.outerHTML;

    var scoredata = currentrank_parsedjson.highscore;

	//Schleife iteriert durch alle Highscoreeintr#ge des gewählten Quizzes
	for (var i = 0; i < scoredata.length; i++){

        //"reinen" Text des Rankings speichern
        var temp = snippetranking.outerHTML;

		console.log(schoeneresDatum(scoredata[i].date));
        temp = temp.replace(/{{rankIdx}}/, scoredata[i].rankIdx);
        temp = temp.replace(/{{player}}/, scoredata[i].player);
        temp = temp.replace(/{{points}}/, scoredata[i].points);
        temp = temp.replace(/{{date}}/, schoeneresDatum(scoredata[i].date));

        var item = document.createElement("tr");
        item.innerHTML = temp;

        htmlRankings += temp;
    }

    document.getElementById("content").innerHTML = template;
    document.getElementById("ranking").innerHTML = htmlRankings;
	  // return this.responseText;

	document.getElementById("playButton").onclick = function(){
		initQuiz(quiz.quizIdx);
	}
	
	// Desc Text Funktionen

    $('.teasertext .Beschreibung_lang').addClass("hidden");
	console.log("javascript eingebunden")

    $('.teasertext').click(function() {
        var $this = $(this);

        var $beschreibung = $this.find(".Beschreibung_lang");
        
        console.log($beschreibung);
        $beschreibung.toggleClass("hidden");
        
    });

}


/***********
highscorecontent

{{rankIdx}}
{{player}}}
{{date}}
{{points}}
*/

