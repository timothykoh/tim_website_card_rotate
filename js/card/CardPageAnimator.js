define(["SkrollrAnimationBuilder"], function(SkrollrAnimationBuilder){
    var CardPageAnimator = function(){
        this.animateMainCards = function(mainCardArr, properties){
            var scrollPosStart = properties.scrollPosStart;
            var scrollPosEnd = properties.scrollPosEnd;
            var cardSize = properties.cardSize;
            var spreadAmt = properties.spreadAmt;
            var numRows = properties.numRows;
            var numCols = properties.numCols;
            var titleCardIdx = properties.titleCardIdx;

            var pageWidth = $(document).width();
            var pageHeight = $(document).height();
            var mainCardsWidth = (cardSize * numCols) + (spreadAmt * (numCols - 1));
            var mainCardsHeight = (cardSize * numRows) + (spreadAmt * (numRows - 1));
            var offsetX = pageWidth/2 - mainCardsWidth/2;
            var offsetY = pageHeight/2 - mainCardsHeight/2;

            for (var i = 0; i < mainCardArr.length; i++){
                var mainCard = mainCardArr[i];
                var rowIdx = Math.floor(i / numCols);
                var colIdx = i % numCols;
                var xPos = (cardSize + spreadAmt) * colIdx + offsetX;
                var yPos = (cardSize + spreadAmt) * rowIdx + offsetY;
                mainCard.addFlipMoveAnimation(scrollPosStart,scrollPosEnd,xPos,yPos);
                if (i === titleCardIdx){
                    // remove shadow for title card
                    mainCard.addSimpleAnimation(scrollPosEnd, "box-shadow", "0px 0px 10px rgba(0,0,0,0)");
                }
            }
        };

        this.animateFlyCards = function(flyCardArr, properties){
            var scrollPosStart = properties.scrollPosStart;
            var scrollPosEnd = properties.scrollPosEnd;

            for (var i = 0; i < flyCardArr.length; i++){
                flyCardArr[i].addRandomFlyOutAnimation({
                    scrollPosStart: scrollPosStart,
                    scrollPosEnd: scrollPosEnd,
                    xMinTranslate: 100,
                    xMaxTranslate: 400,
                    yMinTranslate: 100,
                    yMaxTranslate: 400
                });
            }
        };

        this.animateSpread = function(cardArr, scrollPosStart, scrollPosEnd, spreadAmt){
            var numRows = cardArr.length;
            var numCols = cardArr[0].length;
            var centerRowIdx = numRows/2;
            var centerColIdx = numCols/2;
            // add initial spread
            for (var i = 0; i < numRows; i++){
                for (var j = 0; j < numCols; j++){
                    var card = cardArr[i][j];
                    card.addSimpleAnimation(scrollPosStart, "box-shadow", "0px 0px 5px rgba(0,0,0,0)");
                    card.addComplexAnimation(scrollPosStart, "transform", "translateX", "(0px)");
                    card.addComplexAnimation(scrollPosStart, "transform", "translateY", "(0px)");
                    card.addSimpleAnimation(scrollPosEnd, "box-shadow", "0px 0px 5px rgba(0,0,0,0.8)");
                    var spreadX = (j - centerColIdx) * spreadAmt + "px";
                    var spreadY = (i - centerRowIdx) * spreadAmt + "px";
                    card.addComplexAnimation(scrollPosEnd, "transform", "translateX","(" + spreadX + ")");
                    card.addComplexAnimation(scrollPosEnd, "transform", "translateY","(" + spreadY + ")");
                }
            }
        };
    };

    return CardPageAnimator;
});