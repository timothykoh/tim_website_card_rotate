define(["QUnit",
        "KeyValueSequenceTest",
        "CssPropertyStoreTest",
        "SkrollrAnimationBuilderTest"
        ], 
        function(QUnit,
                 KeyValueSequenceTest,
                 CssPropertyStoreTest,
                 SkrollrAnimationBuilderTest){
    var run = function(){
        KeyValueSequenceTest.run();
        CssPropertyStoreTest.run();
        SkrollrAnimationBuilderTest.run();
        QUnit.load();
        QUnit.start();
    };
    return {run: run};
});