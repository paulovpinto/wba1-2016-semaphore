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
    
    
    


}

function changeHighscore(stuff){

    quizIdx = stuff;

    createHighscore();

}
