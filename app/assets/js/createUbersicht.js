/***************************************************
Dieses Script erzeugt dynamisch die übersicht Seite

****************************************************/

if(devmode) console.log("Das Script createUbersichtscreen wird ausgeführt..");

function createQuizOverview(){
	
	
	$(".beenden").removeClass("active");
	    
    if(devmode) console.log("createUbersicht wurde aufgerufen.")
	
	// Stylesheet austauschen
	var sheeturl = urls["quizOverview"].replace(/\.html/, ".css");
	document.getElementById('css-for-view').setAttribute('href', sheeturl);
	
    // JSON Merken
    var json = jsondata["quizubersicht"];
	
	// Template einbauen
	var target = document.getElementById("content");
	target.innerHTML = templates["quizOverview"];
    
    // Kachel holen
    var snippet = document.getElementsByClassName("quizkachel")[0];

	
    // JSON verarbeiten
    for(var quizId in json){
        var temp = snippet.outerHTML;
        var quiz = json[quizId];

        // Tokens werden durch "richtige" Daten ersetzt
        temp = temp.replace(/{{name}}/, quiz.name);
        temp = temp.replace(/{{author}}/, quiz.author);
        temp = temp.replace(/{{date}}/, schoeneresDatum(quiz.date));
        temp = temp.replace(/{{counter}}/, quiz.counter);
        temp = temp.replace(/{{counter}}/, quiz.counter);
        temp = temp.replace(/{{image}}/, quiz.image);
        temp = temp.replace(/{{description}}/, quiz.description);
        temp = temp.replace(/{{description}}/, quiz.description);

        var item = document.createElement("div");
        item.innerHTML = temp;
        item.firstChild.id = quizId;
        
        // Auswählen Button bekommt funktion
        var auswahlButton = item.firstChild.querySelector(".auswahl-button");
        auswahlButton.id = quizId;
        auswahlButton.onclick = function() {

            if(devmode) console.log(this.id);
            createStartscreen(this.id);
        };
        
        // Kachel in Wrap einfügen
        document.getElementById("snippetQuiz").appendChild(item.firstChild);
	}
	
	// Kacheltemplate loeschen
	document.getElementById("snippetQuiz").removeChild(document.getElementsByClassName("quizkachel")[0]);

    
    //ACHTUNG! VON QUIZÜBERSICHT EINGEFÜGT. 
    //Funktion zum Anzeigen der Beschreibung(beim Klick öffnet sich die Beschreibung)
    
     $(document).ready(function(){
         $('.beschreibung').addClass("hidden");
         $('.button').addClass("hidden");
         
       

        $('.quizkachel').click(function() {
            var $this = $(this);

            var $beschreibung = $this.find(".beschreibung");
            var $button = $this.find(".button")
            
            if(devmode) console.log($beschreibung);
            $beschreibung.toggleClass("hidden");
            $button.toggleClass("hidden");
            
        });
    }); // Ende der vom Quizübersicht-Team erstellten Funktion
}
