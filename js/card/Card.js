define(["jquery", "SkrollrAnimationBuilder"], function($, SkrollrAnimationBuilder){
    var Card = function(properties){
        var _top = properties.top;
        var _left = properties.left;

        var _jqElem = $("<div/>").addClass("card")
                                 .css({
                                   top: properties.top,
                                   left: properties.left,
                                   height: properties.height,
                                   width: properties.width
                                 });
                                 console.log(properties.bgSize);
        var _front = $("<div/>").addClass("front")
                                .css({
                                  backgroundImage: "url(" + properties.bgUrl + ")",
                                  backgroundPosition:  properties.bgPos
                                });
        var _back = $("<div/>").addClass("back");

        // content that will be showed in the modal when the card is clicked.
        var _modalContent = $("<div/>").addClass("modal-content");

        _back.append(_modalContent);
        _jqElem.append(_front);
        _jqElem.append(_back);

        // for correctness check. any added scroll pos must always be higher than the prev one
        var _prevScrollPos = -1;

        var _skrollrAnimationBuilder = new SkrollrAnimationBuilder(_jqElem);

        this.addSimpleAnimation = function(scrollPos, propName, propValue){
            if (scrollPos < _prevScrollPos){
                throw "Error in Card.addSimpleAnimation: Scroll position less than previous scroll position.";
            }
            _skrollrAnimationBuilder.addSimple(scrollPos, propName, propValue);
            _prevScrollPos = scrollPos;
        };

        this.addComplexAnimation = function(scrollPos, propName, propKey, propValue){
            if (scrollPos < _prevScrollPos){
                throw "Error in Card.addComplexAnimation: Scroll position less than previous scroll position.";
            }
            _skrollrAnimationBuilder.addComplex(scrollPos, propName, propKey, propValue);
            _prevScrollPos = scrollPos;
        };

        this.addFlipMoveAnimation = function(scrollPosStart, scrollPosEnd, newLeft, newTop){
            this.addComplexAnimation(scrollPosStart, "transform", "rotateY", "(0deg)");
            this.addComplexAnimation(scrollPosEnd, "transform", "rotateY", "(180deg)");
            this.addComplexAnimation(scrollPosEnd, "transform", "translateX", "(" + (newLeft - _left) + "px)");
            this.addComplexAnimation(scrollPosEnd, "transform", "translateY", "(" + (newTop - _top) + "px)");
        };

        this.addRandomFlyOutAnimation = function(properties){
            var scrollPosStart = properties.scrollPosStart;
            var scrollPosEnd = properties.scrollPosEnd;
            var xMin = properties.xMinTranslate;
            var xMax = properties.xMaxTranslate;
            var yMin = properties.yMinTranslate;
            var yMax = properties.yMaxTranslate;
            
            var randRotate = "(" + Math.floor(Math.random() * 100) + "," 
                                 + Math.floor(Math.random() * 100) + ","
                                 + Math.floor(Math.random() * 100) + ","
                                 + "180deg)";
            var xDir = Math.random() < 0.5 ? -1 : 1;
            var yDir = Math.random() < 0.5 ? -1 : 1;
            var randTranslateX = "(" + (xDir * (Math.random() * (xMax - xMin) + xMin)) + "px)";
            var randTranslateY = "(" + (yDir * (Math.random() * (yMax - yMin) + yMin)) + "px)";

            this.addComplexAnimation(scrollPosStart, "transform", "rotate3d", "(0,0,0,0deg)");
            this.addSimpleAnimation(scrollPosStart, "display", "block");
            this.addSimpleAnimation(scrollPosStart, "opacity", "1");
            this.addSimpleAnimation(scrollPosEnd-1, "opacity", "0");
            this.addComplexAnimation(scrollPosEnd-1, "transform", "rotate3d", randRotate);
            this.addComplexAnimation(scrollPosEnd-1, "transform", "translateX", randTranslateX);
            this.addComplexAnimation(scrollPosEnd-1, "transform", "translateY", randTranslateY);
            this.addSimpleAnimation(scrollPosEnd-1, "display", "none");
            this.addSimpleAnimation(scrollPosEnd, "display", "none");
        };

        this.buildAnimation = function(){
            _skrollrAnimationBuilder.build();
        };

        this.appendTo = function(jqSelector){
            $(jqSelector).append(_jqElem);
        };
        
        this.getJqElem = function(){
            return _jqElem;
        };

        this.appendOnBack = function(elem){
            _back.append(elem);
        };

        this.setBackClickable = function(){
            _back.addClass("clickable");
        };

        this.addModalContent = function(elem){
            _modalContent.append(elem);
        };

        this.setTitleCard = function(){
            _back.addClass("title-card");
        };
    };

    return Card;
});