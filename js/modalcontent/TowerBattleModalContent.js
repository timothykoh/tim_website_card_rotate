define(["jquery"], function($){
    var TowerBattle = function(){
        var _descriptionElem = $("<p/>").addClass("modal-desc")
                                        .html("Challenge yourself in this multiplayer version of the classic tower defense game genre. "+
                                              "Defending is not the only thing that matters now. Summon creeps on the enemy to breach "+
                                              "their defences and earn income for yourself. Manage defending, attacking and building "+
                                              "your economy at the same time. Do you have what it takes? "+
                                              "(Assets taken from various sources for academic used only, not to be published or sold.)");
                                        
        var _youtubeElem = $('<iframe class="modal-vid" width="560" height="315" src="//www.youtube.com/embed/X3cFH9MHI5s?list=UUVpQShDKT5Od7Wccp5ugjeQ" frameborder="0" allowfullscreen></iframe>');
        this.get = function(){
            return $("<div/>").append(_descriptionElem)
                              .append(_youtubeElem);
        };
    };
    return TowerBattle;
});