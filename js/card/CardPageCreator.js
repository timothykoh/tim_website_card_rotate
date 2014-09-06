define(["CardPage"], function(CardPage){
    var CardPageCreator = function(){
        this.createDefault = function(properties){
            var cardSpreadAmt = 10;
            var mainCardSpreadAmt = 15;
            var cardSize = 200;

            var numRows = Math.floor($(document).height() / (cardSize + cardSpreadAmt*2));
            var numCols = Math.floor($(document).width() / (cardSize + cardSpreadAmt*2));

            var cardPage = new CardPage({
                bgUrl: properties.bgUrl,
                bgBlurUrl: properties.bgBlurUrl,
                imgWidth: 1920,
                imgHeight: 1280,
                numRows: numRows,
                numCols: numCols,
                numMainCardRows: properties.numMainCardRows,
                numMainCardCols: properties.numMainCardCols,
                cardSize: cardSize,
                xOffsetFromCenter: 0,
                yOffsetFromCenter: 0,
                pageIndex: properties.pageIndex,
                cardSpreadAmt: cardSpreadAmt,
                mainCardSpreadAmt: mainCardSpreadAmt
            });
            return cardPage;
        };
    };
    return CardPageCreator;
});

