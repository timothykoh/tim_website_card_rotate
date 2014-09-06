define(["js/modalcontent/TurntableModalContent",
        "js/modalcontent/MapMeetModalContent",
        "js/modalcontent/MazeSolverModalContent",
        "js/modalcontent/TowerBattleModalContent"], 
        function(TurntableModalContent,
                 MapMeetModalContent,
                 MazeSolverModalContent,
                 TowerBattleModalContent){
    var ProjectPage = function(pageIndex, cardPageCreator){
        var _cardPage = cardPageCreator.createDefault({
            bgUrl: "images/mission_peak_path.jpg",
            bgBlurUrl: "images/mission_peak_path_blur.jpg",
            numMainCardRows: 2,
            numMainCardCols: 3,
            pageIndex: pageIndex
        });

        _cardPage.appendTo("body");
        
        (function _initMainCards(){
            _cardPage.setTitleMainCard(0);
            _cardPage.addMainCardContent(0, "<h1 class='card-page-header'>Projects</h1>");

            var turntableImg = $("<div/>").addClass("card-image")
                                          .css({
                                            backgroundImage: "url(card_images/turntable2.jpg)"
                                          });
            _cardPage.addMainCardContent(1, turntableImg);
            _cardPage.addMainCardContent(1, "<div class='card-overlay'></div>");
            _cardPage.addMainCardContent(1, "<span class='card-label'>Distributed Turntable</span>");
            _cardPage.addMainCardModalContent(1, new TurntableModalContent());
            _cardPage.setMainCardClickable(1);

            var mapMeetImg = $("<div/>").addClass("card-image")
                                        .css({
                                            backgroundImage: "url(card_images/map2.jpg)",
                                            backgroundPosition: "center"
                                        });
            _cardPage.addMainCardContent(2, mapMeetImg);
            _cardPage.addMainCardContent(2, "<div class='card-overlay'></div>");
            _cardPage.addMainCardContent(2, "<span class='card-label'>Map Meet</span>");
            _cardPage.addMainCardModalContent(2, new MapMeetModalContent());
            _cardPage.setMainCardClickable(2);

            var mazeSolverImg = $("<div/>").addClass("card-image")
                                           .css({
                                               backgroundImage: "url(card_images/maze2.jpg)"
                                           });
            _cardPage.addMainCardContent(3, mazeSolverImg);
            _cardPage.addMainCardContent(3, "<div class='card-overlay'></div>");
            _cardPage.addMainCardContent(3, "<span class='card-label'>NXT Robot Maze Solver</span>");
            _cardPage.addMainCardModalContent(3, new MazeSolverModalContent());
            _cardPage.setMainCardClickable(3);

            var towerBattleImg = $("<div/>").addClass("card-image")
                                            .css({
                                              backgroundImage: "url(card_images/tower2.jpg)",
                                              backgroundPosition: "right"
                                            });
            _cardPage.addMainCardContent(4, towerBattleImg);
            _cardPage.addMainCardContent(4, "<div class='card-overlay'></div>");
            _cardPage.addMainCardContent(4, "<span class='card-label'>Tower Battle</span>");
            _cardPage.addMainCardModalContent(4, new TowerBattleModalContent());
            _cardPage.setMainCardClickable(4);

            var dineImg = $("<div/>").addClass("card-image")
                                     .css({
                                         backgroundImage: "url(card_images/dine2.jpg)",
                                         backgroundPosition: "center"
                                     });
            _cardPage.addMainCardContent(5, dineImg);
            _cardPage.addMainCardContent(5, "<div class='card-overlay'></div>");
            _cardPage.addMainCardContent(5, "<span class='card-label'>Dine With Dinex</span>");
            _cardPage.setMainCardClickable(5);
        })();

        _cardPage.addAnimation();
        _cardPage.buildAnimations();
    };
    return ProjectPage;
});