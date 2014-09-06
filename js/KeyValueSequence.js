define([], function(){
    var KeyValueSequence = function(){
        this._keyArr = [];
        this._map = {};

        this.add = function(key, value){
            if (this._map[key] !== undefined){
                throw "Error in KeyValueSequence.add: key already exists.";
            }
            this._keyArr.push(key);
            this._map[key] = value;
        };

        this.update = function(key, newValue){
            if (this._map[key] === undefined){
                throw "Error in KeyValueSequence.update: key does not exist";
            }
            this._map[key] = newValue;
        };

        this.contains = function(key){
            return this._map[key] !== undefined;
        }

        this.addOrUpdate = function(key, value){
            if (this.contains(key)){
                this.update(key, value);
            } else{
                this.add(key, value);
            }
        };

        /**
         * returns string in the form key1value1 key2value2 key3value3
         */
        this.toString = function(){
            var s = "";
            for (var i = 0; i < this._keyArr.length; i++){
                var key = this._keyArr[i];
                var value = this._map[key];
                s += key + value + " ";
            }
            s = s.replace(/\s*$/, "");
            return s;
        };

        this.clone = function(){
            var newKeyArr = this._keyArr.slice();
            var newMap = {};
            for (var i = 0; i < newKeyArr.length; i++){
                var key = newKeyArr[i];
                newMap[key] = this._map[key];
            }
            var newKvSeq = new KeyValueSequence();
            newKvSeq._keyArr = newKeyArr;
            newKvSeq._map = newMap;
            return newKvSeq;
        }
    };
    return KeyValueSequence;
});