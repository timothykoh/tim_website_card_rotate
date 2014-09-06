define(["jquery"], function($){

    var LoadingPage = function(){
        console.log("new loading page");
        var _loadingPageBg = $("<div/>").addClass("loading-page-bg");
        var _loadingPageBgBlur = $("<div/>").addClass("loading-page-bg-blur");
        var _loadingPageOverlay = $("<div/>").addClass("loading-page-overlay");
        var _loadingPageContent = $("<div/>").addClass("loading-page-content");
        var _loadingPageHeader = $("<h1/>").addClass("loading-page-header")
                                           .html("Timothy Koh");
        var _loadingIcon = $("<div/>").addClass("loading-icon")
                                      .addClass("spinning")
                                      .html("&#8250");
        var _instructions = $("<span/>").addClass("loading-instructions")
                                        .addClass("hidden")
                                        .html("scroll");
        _loadingPageContent.append(_loadingPageHeader)
                           .append(_loadingIcon)
                           .append(_instructions)
                           .append("<div class='dot hidden dot1'></div>")
                           .append("<div class='dot hidden dot2'></div>");
        _loadingPageOverlay.append(_loadingPageContent);
        var _loadingPage = $("<div/>").addClass("loading-page")
                              .append(_loadingPageBgBlur)
                              .append(_loadingPageBg)
                              .append(_loadingPageOverlay);
        $("body").append(_loadingPage);

        // _loadingPageBg.attr("data-0", "opacity: 1");
        // _loadingPageBg.attr("data-600", "opacity: 0");
        var loadingIconTop = _loadingIcon.offset().top;
        var loadingIconHeight = _loadingIcon.height();
        var pageBottom = $(document).height();
        _loadingIcon.attr("data-0", "transform: rotate(90deg) translateX(0px)");
        _loadingIcon.attr("data-600", "transform: rotate(90deg) translateX(" + (pageBottom - loadingIconTop - loadingIconHeight/2) + "px)");

        _loadingPageBg.attr("data-600", "transform: translateY(0px)");
        _loadingPageBg.attr("data-800", "transform: translateY(-300px)");


        _loadingPageOverlay.attr("data-600", "top: 0px");
        _loadingPageOverlay.attr("data-800", "top: " + (- $(document).height()) + "px");
    };
    return LoadingPage;
});