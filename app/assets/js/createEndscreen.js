/****************************
Dieses Script erzeugt dynamisch die endscreen Seite.


*****************************/


function createEndscreen(punkte, antworten, quizIdx){
    
    console.log("createStartscreeen wurde aufgerufen.");
    console.log("Übergabe: " + quizIdx + " " + punkte + " " + antworten);

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
            template = template.replace(ball_src,"../../assets/images/ball.png");
        }
/*        else
            template = template.replace(ball_src,"../../assets/images/r_ball.png");
            */
    }
    


    // Platz in Rangliste anzeigen

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

    var rang = 0;

    var ranking_done = false;

    // TODO Fehler finden und Vereinfachen!!!!
    
    //suche position in der Liste
    
    
    for (var i = 0; i < scoredata.length; i++){

        var temp = snippetranking.outerHTML;

        if(punkte >= scoredata[i].points){
            template = template.replace(/{{rang}}/, " " + scoredata[i].rankIdx);
        	   
            var position = i;
            break;
        }
        
    }

    
    
    
    console.log("breadcrump 3");
    
    
    var rang_arr;
    
    //Ein array mit rang namen und idx für jeden spielstand erzeugen
    //Array deklarieren und mit allen Spielständen füllen
    
    var superContainer = Array(20);
    for( var i = 0; i < scoredata.length; i++ ){
        superContainer[i] = [scoredata[i].points, scoredata[i].rankIdx, scoredata[i].player, schoeneresDatum(scoredata[i].date)];
    }
    
    var neuerEintrag = [0, 24, "Ich", "Heute"];
    
    superContainer.push(neuerEintrag);
    
    //Falls der Rang größer ist als 5
        //Dann schreibe von Rang - 5 bis Rang 
    
    //bubbleSort(superContainer);
    superContainer.sort();  
    
    //document.getElementById("ranking").innerHTML = htmlRankings;

    var item = document.createElement("div");
    item.innerHTML = template;

    document.getElementById("content").replaceChild(item.firstChild, document.getElementById("content").firstChild);
}
