define(["KeyValueSequence"], function(KeyValueSequence){
    var run = function(){
        test("KeyValueSequenceTest: add", function(){
            var kvSeq = new KeyValueSequence();
            kvSeq.add("key1", "value1");
            deepEqual(kvSeq._keyArr, ["key1"]);
            deepEqual(kvSeq._map, {"key1": "value1"});
            kvSeq.add("key2", "value2");
            deepEqual(kvSeq._keyArr, ["key1", "key2"]);
            deepEqual(kvSeq._map, {"key1": "value1", "key2": "value2"});
        });

        test("KeyValueSequenceTest: update", function(){
            var kvSeq = new KeyValueSequence();
            kvSeq.add("key1", "value1");
            kvSeq.update("key1", "updatedValue");
            deepEqual(kvSeq._keyArr, ["key1"]);
            deepEqual(kvSeq._map, {"key1":"updatedValue"});
            kvSeq.add("key2", "value2");
            kvSeq.update("key2", "updatedValue2");
            kvSeq.update("key1", "updatedValue1");
            deepEqual(kvSeq._keyArr, ["key1", "key2"]);
            deepEqual(kvSeq._map,{"key1":"updatedValue1",
                                  "key2":"updatedValue2"});
        });

        test("KeyValueSequenceTest: toString", function(){
            var kvSeq = new KeyValueSequence();
            kvSeq.add("key1", "value1");
            kvSeq.add("key2", "value2");
            equal(kvSeq.toString(),"key1value1 key2value2");
            kvSeq.add("key3", "value3");
            equal(kvSeq.toString(),"key1value1 key2value2 key3value3");
        });
    };
    return {run: run};
});