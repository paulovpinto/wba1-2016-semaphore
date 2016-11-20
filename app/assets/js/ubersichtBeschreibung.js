function beschreibungAnzeigen(){
       $('.Quizkachel .Beschreibung').addClass("hidden");

        $('.Quizkachel').click(function() {
            var $this = $(this);

            var $beschreibung = $this.find(".Beschreibung");
            
            console.log($beschreibung);
            $beschreibung.toggleClass("hidden");
            
        });
});
