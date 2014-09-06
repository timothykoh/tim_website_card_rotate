define(["CssPropertyStore"], function(CssPropertyStore){
    var SkrollrAnimationBuilder = function(jqElem){
        // var _totalScrollPosArr = [];
        // var _simpleScrollPosArr = [];
        // var _complexScrollPosArr = [];
        var _scrollPosArr = [];
        var _cssPropStoreMap = {};
        // var _attrSeqMap = {};
        var _jqElem = jqElem;

        var _getOrCreateCssPropStore = function(scrollPos){
            if (_cssPropStoreMap[scrollPos] === undefined){
                var cssPropStore = new CssPropertyStore();
                _cssPropStoreMap[scrollPos] = cssPropStore;
                _scrollPosArr.push(scrollPos);

            } else{
                cssPropStore = _cssPropStoreMap[scrollPos];
            }
            return cssPropStore;
        };

        this.addSimple = function(scrollPos, propName, propValue){
            var cssPropStore = _getOrCreateCssPropStore(scrollPos);
            cssPropStore.addOrUpdateValue(propName, propValue);
        };

        var _addFirstComplex = function(scrollPos, propName, propKey, propValue){
            var cssPropStore = _getOrCreateCssPropStore(scrollPos);
            cssPropStore.addKeyValue(propName, propKey, propValue);
        };

        var _addSubsequentComplex = function(scrollPos, propName, propKey, propValue){
            var cssPropStore = _getOrCreateCssPropStore(scrollPos);

            // Create a CssPropertyStore that is the subset of the last CssPropertyStore 
            // that has the same propName. It is a subset in the sense that it will have 
            // the same propKeys and propValues for the specified propName. Merge this with
            // the css propStore to ensure it has the relevant values for the propName.
            // This is to ensure skrollr's interpolation works for that propName.
            for (var i = _scrollPosArr.length - 1; i >= 0; i--){
                var key = _scrollPosArr[i];
                var lastCssPropStore = _cssPropStoreMap[key];
                if (lastCssPropStore.containsName(propName)){
                    break;
                }
            }

            var subsetCssPropStore = lastCssPropStore.getSubsetCssPropertyStore([propName]);
            cssPropStore.merge(subsetCssPropStore);

            // update all previous css properties with the same property name but don't contain the propKey.
            // To interpolate between 2 scroll positions, skrollr requires that for each property name,
            // the sequence of property keys matches exactly.
            // Example: data-0 = transform: translate(0px,0px) rotate(0deg)
            // matches with data-0 = transform:translate(0px,0px) rotate(90deg)
            // but not data-0 = transform: rotate(90deg)
            for (var scrollPosKey in _cssPropStoreMap){
                var cssPropStore = _cssPropStoreMap[scrollPosKey];
                if (String(scrollPosKey) === String(scrollPos)){
                    // if it is the scrollPos we want to add, then add the keyValue no matter what.
                    cssPropStore.addOrUpdateKeyValue(propName, propKey, propValue);
                } else{
                    // for all other scrollPos's, only add if it contains the name but not the key
                    if (cssPropStore.containsName(propName) && !cssPropStore.containsKey(propName, propKey)){
                        cssPropStore.addKeyValue(propName, propKey, propValue);
                    }
                }
            }
            
        }

        this.addComplex = function(scrollPos, propName, propKey, propValue){
            if (_scrollPosArr.length === 0){
                _addFirstComplex(scrollPos, propName, propKey, propValue);
            } else{
                _addSubsequentComplex(scrollPos, propName, propKey, propValue);
            }
        };

        this.build = function(){
            for (var i = 0; i < _scrollPosArr.length; i++){
                var scrollPos = _scrollPosArr[i];
                var cssPropStore = _cssPropStoreMap[scrollPos];
                _jqElem.attr("data-" + scrollPos, cssPropStore.toString());
            }
        };

        this.toMap = function(){
            var map = {};
            for (var i = 0; i < _scrollPosArr.length; i++){
                var scrollPos = _scrollPosArr[i];
                var cssPropStore = _cssPropStoreMap[scrollPos];
                map["data-" + scrollPos] = cssPropStore.toString();
            }
            return map;
        }
    };

    return SkrollrAnimationBuilder; 
});