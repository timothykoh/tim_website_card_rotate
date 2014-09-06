define(["jquery"], function($){
    var ModalManager = function(){
        var _modalElem = $("<div/>").addClass("modal");

        var _closeButton = $("<span/>").addClass("modal-close")
                                       .html("x");

        var _openModalWidth = $(document).width() * 85/100;
        var _openModalHeight = $(document).height() * 85/100;
        var _modalBg = $("<div/>").addClass("modal-bg")
                                  .css({
                                    backgroundSize: _openModalWidth + "px " + _openModalHeight + "px"
                                  });

        var _bgOverlay = $("<div/>").addClass("modal-bg-overlay");
        var _header = $("<h1/>").addClass("modal-header");
        var _content = $("<div/>");

        _modalElem.append(_closeButton)
                  .append(_modalBg)
                  .append(_bgOverlay)
                  .append(_header)
                  .append(_content);

        $("body").on("click", ".modal-close", function(){
            $(this).parent().removeClass("open");
            $("body").removeClass("noscroll");
        });

        this.updateBg = function(newBg){
            _modalBg.css("background-image", newBg);
        };

        this.updateHeader = function(headerText){
            _header.html(headerText);
        };

        this.updateContent = function(newContent){
            _content.empty();
            _content.append(newContent);
        };

        this.open = function(){
            _modalElem.addClass("open");
        };

        this.close = function(){
            _modalElem.removeClass("open");
        }

        this.appendModalTo = function(jqSelector){
            $(jqSelector).append(_modalElem);
        };

        this.setLeft = function(leftPos){
            _modalElem.css("left", leftPos);
        };

        this.setTop = function(topPos){
            _modalElem.css("top", topPos);
        };

        this.updateBgSize = function(){
            _openModalWidth = $(document).width() * 85/100;
            _openModalHeight = $(document).height() * 85/100;
            _modalBg.css({
                        backgroundSize: _openModalWidth + "px " + _openModalHeight + "px"
                      });
        };
    };
    return ModalManager;
});