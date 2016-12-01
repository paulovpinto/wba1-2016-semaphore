/****************************
Dieses Script erzeugt dynamisch die endscreen Seite.


*****************************/


function createEndscreen(punkte, antworten, quizIdx){
    
    $(".beenden").removeClass("active");
    
    if(devmode) console.log("createStartscreeen wurde aufgerufen.");
    if(devmode) console.log("Übergabe: " + quizIdx + " " + punkte + " " + antworten);

    // Stylesheet austauschen
    var sheeturl = urls["schlussscreen"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);

    // Snippet ziehen
    var template = templates["schlussscreen"];

    // JSON Daten holen
    var quizze = jsondata["quizubersicht"];
    var quiz = quizze["quiz"+quizIdx];

    // Gespieltes Quiz Informationen
    template = template.replace(/{{name}}/, quiz.name);
    template = template.replace(/{{image}}/, quiz.image);
    template = template.replace(/{{punkte}}/, punkte);

    // Zufallsquizze "füllen"
    var r_quizze = [0, 0 , 0];
    for(var i=0;i<3; i++){

        var rng = Math.floor(Math.random()*(10-1+1)+1);

        if(rng != quiz.quizIdx && r_quizze.indexOf(rng) == -1){

            r_quizze[i] = rng;
            var r_quiz = quizze["quiz"+rng];

            template = template.replace(/{{r_name}}/, r_quiz.name);
            template = template.replace(/{{r_image}}/, r_quiz.image);

        }
        else{
            
            i--;
        }
    }
    
    // Ball-Farben für die Antworten zuweisen
    for(var i=0; i< antworten.length; i++){

        var ball_src = "{{ball" + (i+1) + "}}";

        if(antworten[i]){
            template = template.replace(ball_src,"../../assets/images/Ball.png");
        }
		else
            template = template.replace(ball_src,"../../assets/images/no-Ball.png");

    }
    


    //Document holen und merken
    var target = document.getElementById("content");
    target.innerHTML = templates["schlussscreen"];

    //Snippet der Ranking-Liste speichern
    var snippetranking = document.getElementById("tabellenranking");

    //Snippet des Ranking_Headers speichern
	var listhead = document.getElementById("listhead");

    //Eventuelle Eltern löschen
    snippetranking.parentNode.removeChild(snippetranking);
	listhead.parentNode.removeChild(listhead);

    var currentrank_parsedjson = jsondata["rankingquiz" + quizIdx];

    var htmlRankings = listhead.outerHTML;

    var scoredata = currentrank_parsedjson.highscore;

    
    //suche position in der Liste und zeige nach erreichten Punkten an
    
    for (var i = 0; i < scoredata.length; i++){

        if(punkte >= scoredata[i].points){
            template = template.replace(/{{rang}}/, " " + scoredata[i].rankIdx);
        	   
            var position = (i+1);
            break;
        }
        else{
            template = template.replace(/{{rang}}/, " " + "16");
        }
        
    }

    
    var neues_Ranking = [];

    var mein_rang = scoredata.length +1;
    
    var aktueller_rang = 1;

    var eingetragen = false;
    
    // Speichern des erreichten Ergebnisses in der Highscoreliste an Richtiger Stelle
    for( var i = 0; i < scoredata.length; i++ ){
        if(punkte > scoredata[i].points && !eingetragen){
            var mein_eintrag = {};
            mein_eintrag.player = "Ich";
            mein_eintrag.points = punkte;
            mein_eintrag.rankIdx = aktueller_rang;
            mein_eintrag.date = new Date();
            mein_rang = aktueller_rang;
            aktueller_rang++;
            neues_Ranking.push(mein_eintrag);
            eingetragen = true;
        }
        scoredata[i].rankIdx = aktueller_rang;
        
        neues_Ranking.push(scoredata[i]);
        
        aktueller_rang++;
    }

    var item = document.createElement("div");
    item.innerHTML = template;

    document.getElementById("content").replaceChild(item.firstChild, document.getElementById("content").firstChild);
    
    // Wenn Postion > 5, wird der erreichte Rang + die 4 davor angezeigt
    if(position > 5){
        
        for(var i = (position-5); i < (position); i++){
            
           var temp = snippetranking.outerHTML;
		   	temp = temp.replace(/{{points}}/, neues_Ranking[i].points);
            temp = temp.replace(/{{rankIdx}}/, neues_Ranking[i].rankIdx);
            temp = temp.replace(/{{player}}/, neues_Ranking[i].player);
            temp = temp.replace(/{{date}}/, schoeneresDatum(neues_Ranking[i].date));
            
            var item = document.createElement("tr");
            item.innerHTML = temp;
            
            htmlRankings += temp;
        }
        
    }
    // Ansonsten einfach Rang 1-5, wo dann der erreichte Rang drinsteht
    else{
        for(var i = 0; i < 5; i++){
            
            var temp = snippetranking.outerHTML;
        
            temp = temp.replace(/{{points}}/, neues_Ranking[i].points);
            temp = temp.replace(/{{rankIdx}}/, neues_Ranking[i].rankIdx);
            temp = temp.replace(/{{player}}/, neues_Ranking[i].player);
            temp = temp.replace(/{{date}}/, schoeneresDatum(neues_Ranking[i].date));
            
            var item = document.createElement("tr");
            item.innerHTML = temp;
            
            htmlRankings += temp;
            
        }
    }
    
    document.getElementById("ranking").innerHTML = htmlRankings;
    
    document.getElementById("erneut-spielen").addEventListener('click', function (event) {
	    initQuiz(quizIdx);
	});
}
