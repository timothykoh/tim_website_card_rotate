require.config({
    paths: {
        "jquery" : "lib/js/jquery.min",
        "skrollr" : "lib/js/skrollr",
        "QUnit" : "lib/js/qunit",
        "CardPageCreator" : "js/card/CardPageCreator",
        "CardPageAnimator" : "js/card/CardPageAnimator",
        "CardPage" : "js/card/CardPage",
        "Card" : "js/card/Card",
        "SkrollrAnimationBuilder" : "js/SkrollrAnimationBuilder",
        "CssPropertyStore" : "js/CssPropertyStore",
        "KeyValueSequence" : "js/KeyValueSequence",
        "KeyValueSequenceTest" : "test/KeyValueSequenceTest",
        "CssPropertyStoreTest" : "test/CssPropertyStoreTest",
        "SkrollrAnimationBuilderTest" : "test/SkrollrAnimationBuilderTest",
        "ModalManager" : "js/ModalManager",
        "ProjectPage" : "js/pages/ProjectPage",
        "IntroPage" : "js/pages/IntroPage",
        "LoadingPage" : "js/pages/LoadingPage",
        "PageManager" : "js/PageManager",
    },
    shim: {
        "jquery": {
            exports: "$"
        },
        "QUnit": {
            exports: "QUnit",
            init: function(){
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require(["jquery",
         "skrollr",
         "QUnit",
         "test/TestMain",
         "CardPageCreator",
         "CardPageAnimator",
         "ModalManager",
         "ProjectPage",
         "PageManager"],
         function($,
                  skrollr,
                  QUnit,
                  TestMain,
                  CardPageCreator,
                  CardPageAnimator,
                  ModalManager,
                  ProjectPage,
                  PageManager
                  ){
    $("body").addClass("noscroll");

    var testingMode = false;

    if (testingMode){
        TestMain.run();
        return;
    }
    
    window.modalManager = new ModalManager();
    modalManager.appendModalTo("body");
    // modalManager.open();

    $("body").on("click", ".card .back.clickable", function(){
        // var modalContent = $("<div/>").addClass("modal-content");
        var cardImageBg = $(this).find(".card-image").css("background-image");
        var cardLabel = $(this).find(".card-label").html();

        // copy the modal content stored in the card
        var modalContent = $("<div/>").addClass("modal-content")
                                      .append($(this).find(".modal-content").html());

        modalManager.updateBg(cardImageBg);
        modalManager.updateHeader(cardLabel);
        modalManager.updateContent(modalContent);

        var pos = $(this).parent().offset();
        var scrollTop = $(document).scrollTop();
        var leftPos = pos.left;
        var topPos = pos.top - scrollTop;
        modalManager.setLeft(leftPos + "px");
        modalManager.setTop(topPos + "px");
        modalManager.open();

        // setTimeout so that this is called after the animation is triggered.
        setTimeout(function(){
            modalManager.setLeft("7.5%");
            modalManager.setTop("7.5%");    
        },0);

        $("body").addClass("noscroll");
    });

    var skrollrInstance;

    var pageManager = new PageManager();
    pageManager.initLoadingPage();
    pageManager.initPages();

    skrollrInstance = skrollr.init();
    setTimeout(function(){
        $(".loading-page .loading-icon").removeClass("spinning");
        $("body").removeClass("noscroll");
        setTimeout(function(){
            $(".loading-page .loading-instructions").removeClass("hidden");
            setTimeout(function(){
                $(".loading-page .dot1").removeClass("hidden");
                setTimeout(function(){
                    $(".loading-page .dot2").removeClass("hidden");
                },300);
            }, 300);
        }, 300);
    }, 1000);

    var buildPageTimeout;

    $(window).resize(function(){
        clearTimeout(buildPageTimeout);
        if (skrollrInstance !== undefined){
            skrollrInstance.destroy();
        }
        $("body").empty();
        pageManager.initLoadingPage();
        buildPageTimeout = setTimeout(function(){
            modalManager.close();
            modalManager.updateBgSize();
            $("body").removeClass("noscroll");
            modalManager.appendModalTo("body");
            pageManager.initPages();
            skrollrInstance = skrollr.init();
            $(".loading-page .loading-icon").removeClass("spinning");
        }, 300);
    });
});


