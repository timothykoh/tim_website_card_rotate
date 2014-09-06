define(["jquery"], function($){
    var MapMeetModalContent = function(){
        var _descriptionElem = $("<p/>").addClass("modal-desc")
                                        .html("MapMeet aims to simply the process of meeting up with friends. Instead of constantly " +
                                              "texting to ask where everyone is, you simply open the app and view the their location " +
                                              "on a map.");
        
        var _youtubeElem = $('<iframe class="modal-vid" width="560" height="315" src="//www.youtube.com/embed/V_J4u5_mzrA?list=UUVpQShDKT5Od7Wccp5ugjeQ" frameborder="0" allowfullscreen></iframe>');
        this.get = function(){
            return $("<div/>").append(_descriptionElem)
                              .append(_youtubeElem);
        };
    };
    return MapMeetModalContent;
});