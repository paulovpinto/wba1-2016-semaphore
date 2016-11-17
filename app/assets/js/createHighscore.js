/*******************************************************
Dieses Script läd ein highscore Json und das dazugehörige 
HTML Snippet. Anschließend wird der inhalt der Json 
in das Snippet geschrieben und in das Dokument geschrieben.

********************************************************/

console.log("Das createHighscore Scrip wird ausgeführt..");

var quizIdx = 1;

function createHighscore(){
    console.log("createHighscore wurde aufgerufen.");
    
    // Stylesheet austauschen
	var sheeturl = urls["highscore"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);
    
<<<<<<< HEAD

	
	var template = templates["highscore"];
    
    var h_ranking = document.getElementById("h_ranking");
    //Snippet des Ranking_Headers speichern
	var h_listhead = document.getElementById("h_listhead");
    
    console.log(document.getElementById("h_ranking"));
    console.log(document.getElementById("h_listhead"));
    
=======
	
	var template = templates["highscore"];
    

>>>>>>> 8695c84799df5f81b48c68f64f0750ad447ec23e

    var quizze = jsondata["quizubersicht"];

    var i = 1;
    
    for(var quizId in quizze){

        var option = "{{option" + i + "}}";

        var h_quiz = quizze["quiz"+i];

        template = template.replace(option, h_quiz.name);

        i++;

    }

    h_quiz = quizze["quiz" + quizIdx];

    template = template.replace(/{{image}}/, h_quiz.image);
    template = template.replace(/{{author}}/, h_quiz.author);
    template = template.replace(/{{date}}/, h_quiz.date);
    template = template.replace(/{{description}}/, h_quiz.description);


    var item = document.createElement("div");
    item.innerHTML = template;
    
    
<<<<<<< HEAD
    
    
    document.getElementById("content").replaceChild(item, document.getElementById("content").firstChild);
    
    
    
=======
    document.getElementById("content").replaceChild(item, document.getElementById("content").firstChild);
    
    
    var h_ranking = document.getElementById("h_ranking");
    //Snippet des Ranking_Headers speichern
	var h_listhead = document.getElementById("h_listhead");
    
    var currentrank_parsedjson = jsondata["rankingquiz" + quizIdx];
    
    console.log(jsondata["ranking" + quizIdx]);
    
    var scoredata = currentrank_parsedjson.highscore;
    
    var htmlRankings = h_listhead.outerHTML;
    
    //Schleife iteriert durch alle Highscoreeintr#ge des gewählten Quizzes
	for (var i = 0; i < scoredata.length; i++){

        //"reinen" Text des Rankings speichern
        var temp = h_ranking.outerHTML;
>>>>>>> 8695c84799df5f81b48c68f64f0750ad447ec23e

		console.log(schoeneresDatum(scoredata[i].date));
        temp = temp.replace(/{{rankIdx}}/, scoredata[i].rankIdx);
        temp = temp.replace(/{{player}}/, scoredata[i].player);
        temp = temp.replace(/{{points}}/, scoredata[i].points);
        temp = temp.replace(/{{date}}/, schoeneresDatum(scoredata[i].date));

        var item = document.createElement("tr");
        item.innerHTML = temp;

        htmlRankings += temp;
    }
    
    document.getElementById("ranking").innerHTML = htmlRankings;

}

function changeHighscore(stuff){

    quizIdx = stuff;

    createHighscore();

}
