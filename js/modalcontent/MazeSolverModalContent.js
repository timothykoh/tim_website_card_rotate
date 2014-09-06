define(["jquery"], function($){
    var MapMeetModalContent = function(){
        var _descriptionElem = $("<p/>").addClass("modal-desc")
                                        .html("Line Following Maze Solver robot implemented using a PID (Proportional, Integral, Derivative) controller "+
                                              "for smooth line following. The robot maintains a simple map of the routes it has taken to make more intelligent decisions when "+
                                              "deciding where to turn in the maze.");
                                        
        var _youtubeElem = $('<iframe class="modal-vid" width="560" height="315" src="//www.youtube.com/embed/jFFRZi5HtlE?list=UUVpQShDKT5Od7Wccp5ugjeQ" frameborder="0" allowfullscreen></iframe>');
        this.get = function(){
            return $("<div/>").append(_descriptionElem)
                              .append(_youtubeElem);
        };
    };
    return MapMeetModalContent;
});