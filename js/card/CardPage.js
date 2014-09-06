define(["jquery", "Card", "CardPageAnimator"], function($, Card, CardPageAnimator){
    var CardPage = function(properties){
        var _bgUrl = properties.bgUrl;
        var _bgBlurUrl = properties.bgBlurUrl;
        var _imgWidth = properties.imgWidth;
        var _imgHeight = properties.imgHeight;
        var _numRows = properties.numRows;
        var _numCols = properties.numCols;
        var _numMainCardRows = properties.numMainCardRows;
        var _numMainCardCols = properties.numMainCardCols;
        var _cardSize = properties.cardSize;
        var _xOffsetFromCenter = properties.xOffsetFromCenter;
        var _yOffsetFromCenter = properties.yOffsetFromCenter;
        var _cardSpreadAmt = properties.cardSpreadAmt;
        var _mainCardSpreadAmt = properties.mainCardSpreadAmt;
        var _pageIndex = properties.pageIndex; // the index of the page. 0 for 1st page, 1 for 2nd page, etc.
        var _pageWidth = _numCols * _cardSize;
        var _pageHeight = _numRows * _cardSize;
        var _documentWidth = $(document).width();
        var _documentHeight = $(document).height();
        var _animationScrollAmt = 400; // the amount of scrollTop to complete a full animation
        var _pageTransitionScrollAmt = 200; // the amount of scroll top to transition bewteen pages
        var _delayBetweenPages = 200; // the amount of scrollTop after the full animation completes,
                                      // but before the next page transitions in
        var _scrollOffset = (_animationScrollAmt + _pageTransitionScrollAmt + _delayBetweenPages) * _pageIndex;

        var _cardArr = [];
        var _bgElem;
        var _bgBlurElem;
        var _jqElem;

        var _titleCardIdx;

        var _cardPageAnimator = new CardPageAnimator();

        (function buildDomElems(){
            var _getBackgroundPos = function(rowIdx, colIdx){
                var centerRowIdx = _numRows/2;
                var centerColIdx = _numCols/2;
                var xPos = (_imgWidth/2 - _xOffsetFromCenter) - ((colIdx - centerColIdx) * _cardSize);
                var yPos = (_imgHeight/2 - _yOffsetFromCenter) - ((rowIdx - centerRowIdx) * _cardSize);
                return xPos + "px " + yPos + "px";
            };

            var _getCardTop = function(rowIdx){
                var centerRowIdx = _numRows/2;
                return (_documentHeight/2 + _yOffsetFromCenter) + ((rowIdx - centerRowIdx) * _cardSize);
            };

            var _getCardLeft = function(colIdx){
                var centerColIdx = _numCols/2;
                return (_documentWidth/2 + _xOffsetFromCenter) + ((colIdx - centerColIdx) * _cardSize);
            };

            _jqElem = $("<div/>").addClass("card-page");
            _bgBlurElem = $("<div/>").addClass("card-bg")
                                     .addClass("card-bg-blur")
                                     .css({
                                        backgroundImage: "url(" + _bgBlurUrl + ")",
                                        top: _documentHeight + "px"
                                     })
                                     .attr("data-" + (_scrollOffset - _pageTransitionScrollAmt), "top: " + _documentHeight + "px")
                                     .attr("data-" + _scrollOffset, "top: 0px");                          
            _bgElem = $("<div/>").addClass("card-bg")
                                 .css({
                                     backgroundImage: "url(" + _bgUrl + ")",
                                     top: _scrollOffset + "px"
                                   })
                                 .attr("data-" + (_scrollOffset - _pageTransitionScrollAmt), "top: " + _documentHeight + "px")
                                 .attr("data-" + _scrollOffset, "top: 0px");
            _jqElem.append(_bgBlurElem);
            _jqElem.append(_bgElem);
            for (var i = 0; i < _numRows; i++){
                var cardColArr = [];
                for (var j = 0; j < _numCols; j++){
                    var cardTop = _getCardTop(i);
                    var cardLeft = _getCardLeft(j);
                    var card = new Card({
                        bgUrl: _bgUrl,
                        bgPos: _getBackgroundPos(i, j),
                        bgSize: _documentWidth + "px " + _documentHeight + "px",
                        top: cardTop,
                        left: cardLeft,
                        height: _cardSize,
                        width: _cardSize
                    });
                    var cardJqElem = card.getJqElem();
                    card.addSimpleAnimation(0, "display", "none");
                    card.addSimpleAnimation(_scrollOffset - _pageTransitionScrollAmt, "top", cardTop + _documentHeight + "px");
                    card.addSimpleAnimation(_scrollOffset - 1, "display", "block");
                    card.addSimpleAnimation(_scrollOffset, "top", cardTop + "px");
                    card.appendTo(_jqElem);
                    cardColArr.push(card);

                }
                _cardArr.push(cardColArr);
            }
        })();

        var _mainCardArr = [];
        var _flyCardArr = [];

        (function partitionCards(){
            var _shuffle = function(arr) {
                for (var i = arr.length-1; i >=0; i--) {
                    var randomIndex = Math.floor(Math.random()*(i+1));
                    var itemAtIndex = arr[randomIndex];
                     
                    arr[randomIndex] = arr[i]; 
                    arr[i] = itemAtIndex;
                }
            };

            var numCards = _numRows * _numCols;
            var numMainCards = _numMainCardRows * _numMainCardCols;
            if (numMainCards > numCards){
                throw "Error in CardPageAnimator._partitionCards: number of mainCards specified " +
                      "exceeds number of cards in the page.";
            }
            
            // create a random sequence of indicies which will become main cards
            var cardIdxSeq = new Array(numCards);
            for (var i = 0; i < cardIdxSeq.length; i++){
                cardIdxSeq[i] = i;
            }
            _shuffle(cardIdxSeq);
            var mainCardIdxSeq = cardIdxSeq.slice(0, numMainCards);

            // partition all the cards into main cards or fly cards
            // based on whether the card number is in our randomly generated seq
            for (var i = 0; i < numCards; i++){
                var rowIdx = Math.floor(i / _numCols);
                var colIdx = i % _numCols;
                var card = _cardArr[rowIdx][colIdx];
                if (mainCardIdxSeq.indexOf(i) !== -1){
                    _mainCardArr.push(card);
                } else{
                    _flyCardArr.push(card);
                }
            }
        })();

        this.getCard = function(rowIdx, colIdx){
            return _cardArr[rowIdx][colIdx];
        };

        this.getMainCard = function(idx){
            return _mainCardArr[idx];
        }

        this.getNumRows = function(){
            return _numRows;
        };

        this.getNumCols = function(){
            return _numCols;
        };

        this.getBgElem = function(){
            return _bgElem;
        };

        this.getCardSize = function(){
            return _cardSize;
        };

        this.appendTo = function(jqSelector){
            $(jqSelector).append(_jqElem);
        };

        this.addAnimation = function(){
            _bgElem.attr("data-" + (_scrollOffset + 1), "opacity: 1");
            _bgElem.attr("data-" + (_scrollOffset + 200), "opacity: 0.1");
            _bgElem.attr("data-" + (_scrollOffset + 400), "opacity: 0");

            _cardPageAnimator.animateSpread(_cardArr, _scrollOffset + 1, _scrollOffset + 200, _cardSpreadAmt);

            _cardPageAnimator.animateMainCards(_mainCardArr, {
                scrollPosStart: _scrollOffset + 200,
                scrollPosEnd: _scrollOffset + 400,
                cardSize: _cardSize,
                spreadAmt: _mainCardSpreadAmt,
                numRows: _numMainCardRows,
                numCols: _numMainCardCols,
                titleCardIdx: _titleCardIdx
            });
            
            _cardPageAnimator.animateFlyCards(_flyCardArr, {
                scrollPosStart: _scrollOffset + 200,
                scrollPosEnd: _scrollOffset + 400
            });
        };

        this.buildAnimations = function(){
            for (var i = 0; i < _cardArr.length; i++){
                for (var j = 0; j < _cardArr[i].length; j++){
                    var card = _cardArr[i][j];
                    card.buildAnimation();
                }
            }
        };

        this.addMainCardContent = function(mainCardIdx, elem){
            if (mainCardIdx < 0 || mainCardIdx >= _mainCardArr.length){
                throw "Error in CardPage.addMainCardContent: index out of range";
            }
            _mainCardArr[mainCardIdx].appendOnBack(elem);
        };

        this.setMainCardClickable = function(mainCardIdx){
            _mainCardArr[mainCardIdx].setBackClickable();
        };

        this.addMainCardModalContent = function(mainCardIdx, modalContentObj){
            var mainCard = _mainCardArr[mainCardIdx];
            var modalContent = modalContentObj.get();
            mainCard.addModalContent(modalContent);
        };

        this.setTitleMainCard = function(mainCardIdx){
            _mainCardArr[mainCardIdx].setTitleCard();
            _titleCardIdx = mainCardIdx;
        }

    };

    return CardPage;
});

