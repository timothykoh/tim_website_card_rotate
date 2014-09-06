define(["jquery"], function($){
    var TurntableModalContent = function(){
        var _descriptionElem = $("<p class='modal-desc'>Distributed Turntable is awesome.</p>");
        
        this.get = function(){
            return $("<div/>").append(_descriptionElem);
        };
    };
    return TurntableModalContent;
});