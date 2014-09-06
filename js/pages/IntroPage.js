define([], function(){
    var IntroPage = function(pageIndex, cardPageCreator){
        var _cardPage = cardPageCreator.createDefault({
            bgUrl: "images/ocean.jpg",
            bgBlurUrl: "images/ocean_blur.jpg",
            numMainCardRows: 2,
            numMainCardCols: 3,
            pageIndex: pageIndex
        });

        _cardPage.appendTo("body");
        _cardPage.addAnimation();
        _cardPage.buildAnimations();
    };
    return IntroPage;
});