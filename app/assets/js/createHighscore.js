/*******************************************************
Dieses Script erzeugt dynamisch die Highscore Seite.

********************************************************/

console.log("Das createHighscore Scrip wird ausgeführt..");

var quizIdx = 1;

function createHighscore(){
    console.log("createHighscore wurde aufgerufen.");
    
    // Stylesheet austauschen
	var sheeturl = urls["highscore"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);
    

	
	var template = templates["highscore"];
    
    var h_ranking = document.getElementById("h_ranking");
    //Snippet des Ranking_Headers speichern
	var h_listhead = document.getElementById("h_listhead");
    
    console.log(document.getElementById("h_ranking"));
    console.log(document.getElementById("h_listhead"));
    


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
