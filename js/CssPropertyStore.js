define(["KeyValueSequence"], function(KeyValueSequence){
    var CssPropertyStore = function(){
        this._kvSeqMap = {};
        this._strMap = {};

        this.containsName = function(propName){
            return this._kvSeqMap[propName] !== undefined || this._strMap[propName] !== undefined;
        };

        this.containsKey = function(propName, propKey){
            if (this._kvSeqMap[propName] === undefined){
                return false;
            } else{
                var kvSeq = this._kvSeqMap[propName];
                return kvSeq.contains(propKey);
            }
        };

        this.addValue = function(propName, propValue){
            if (this._strMap[propName] !== undefined){
                throw "Error in CssPropertyStore.addValue: property name already exists";
            }
            this._strMap[propName] = propValue;
        };

        this.updateValue = function(propName, propValue){
            if (this._strMap[propName] === undefined){
                throw "Error in CssPropertyStore.updateValue: property name does not exist";
            }
            this._strMap[propName] =  propValue;
        };

        this.addOrUpdateValue = function(propName, propValue){
            this._strMap[propName] = propValue;
        };

        this._getOrCreateKvSeq = function(propName){
            if (this._kvSeqMap[propName] === undefined){
                var kvSeq = new KeyValueSequence();
                this._kvSeqMap[propName] = kvSeq;
            } else{
                kvSeq = this._kvSeqMap[propName];
            }
            return kvSeq;
        }

        this.addKeyValue = function(propName, propKey, propValue){
            var kvSeq = this._getOrCreateKvSeq(propName);
            if (kvSeq.contains(propKey)){
                throw ("Error in CssPropertyStore.addKeyValue: property key already exists.");
            }
            kvSeq.add(propKey, propValue);
        };

        this.updateKeyValue = function(propName, propKey, propValue){
            var kvSeq = this._getOrCreateKvSeq(propName);
            if (!kvSeq.contains(propKey)){
                throw "Error in CssPropertyStore.updateKeyValue: property key does not exist";
            }
            kvSeq.update(propKey, propValue);
        };

        this.addOrUpdateKeyValue = function(propName, propKey, propValue){
            var kvSeq = this._getOrCreateKvSeq(propName);
            kvSeq.addOrUpdate(propKey, propValue);
        };

        this.toString = function(){
            var s = "";
            for (var propName in this._strMap){
                var propValue = this._strMap[propName];
                s += propName + ":" + propValue + ";";
            }
            for (var propName in this._kvSeqMap){
                var kvSeq = this._kvSeqMap[propName];
                s += propName + ":" + kvSeq.toString() + ";";
            }
            return s;
        };

        /**
         * returns a CssPropertyStore with a subset of property names of the current store.
         */
        this.getSubsetCssPropertyStore = function(propNameArr){
            var newStrMap = {};
            for (var propName in this._strMap){
                if (propNameArr.indexOf(propName) !== -1){
                    newStrMap[propName] = this._strMap[propName];
                }
            }
            var newKvSeqMap = {};
            for (var propName in this._kvSeqMap){
                if (propNameArr.indexOf(propName) !== -1){
                    newKvSeqMap[propName] = this._kvSeqMap[propName].clone();
                }
            }
            var cssPropStore = new CssPropertyStore();
            cssPropStore._strMap = newStrMap;
            cssPropStore._kvSeqMap = newKvSeqMap;
            return cssPropStore;
        };

        this.merge = function(cssPropStore){
            for (var propName in cssPropStore._strMap){
                if (this._strMap[propName] === undefined){
                    this._strMap[propName] = cssPropStore._strMap[propName];
                }
            }
            for (var propName in cssPropStore._kvSeqMap){
                if (this._kvSeqMap[propName] === undefined){
                    this._kvSeqMap[propName] = cssPropStore._kvSeqMap[propName].clone();
                }
            }
        };
    };

    return CssPropertyStore;
});