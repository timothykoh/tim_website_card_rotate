define(["CssPropertyStore"], function(CssPropertyStore){
    var run = function(){
        test("CssPropertyStore: addValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addValue("propName1", "propValue1");
            equal(cssPropStore.toString(), "propName1:propValue1;");
            cssPropStore.addValue("propName2", "propValue2");
            equal(cssPropStore.toString(), "propName1:propValue1;"+
                                           "propName2:propValue2;");
        });

        test("CssPropertyStore: updateValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addValue("propName1", "propValue1");
            cssPropStore.updateValue("propName1", "newValue");
            equal(cssPropStore.toString(), "propName1:newValue;");
            cssPropStore.addValue("propName2","propValue2");
            cssPropStore.updateValue("propName1", "newValue1");
            cssPropStore.updateValue("propName2", "newValue2");
            equal(cssPropStore.toString(), "propName1:newValue1;"+
                                           "propName2:newValue2;");
        });

        test("CssPropertyStore: addOrUpdateValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addOrUpdateValue("p1", "v1");
            equal(cssPropStore.toString(), "p1:v1;");
            cssPropStore.addOrUpdateValue("p2", "v2");
            equal(cssPropStore.toString(), "p1:v1;p2:v2;");
            cssPropStore.addOrUpdateValue("p1", "n1");
            equal(cssPropStore.toString(), "p1:n1;p2:v2;");
            cssPropStore.addOrUpdateValue("p3", "v3");
            equal(cssPropStore.toString(), "p1:n1;p2:v2;p3:v3;");
            cssPropStore.addOrUpdateValue("p3", "n3");
            equal(cssPropStore.toString(), "p1:n1;p2:v2;p3:n3;");
            cssPropStore.addOrUpdateValue("p2", "n2");
            equal(cssPropStore.toString(), "p1:n1;p2:n2;p3:n3;");
        });

        test("CssPropertyStore: addKeyValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addKeyValue("p1","k1","v1");
            equal(cssPropStore.toString(), "p1:k1v1;");
            cssPropStore.addKeyValue("p2","k1","v1");
            equal(cssPropStore.toString(), "p1:k1v1;p2:k1v1;");
            cssPropStore.addKeyValue("p2","k2","v2");
            equal(cssPropStore.toString(), "p1:k1v1;p2:k1v1 k2v2;");
        });

        test("CssPropertyStore: updateKeyValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addKeyValue("p1","k1","v1");
            cssPropStore.addKeyValue("p1","k2","v2");
            cssPropStore.updateKeyValue("p1","k1","n1");
            equal(cssPropStore.toString(), "p1:k1n1 k2v2;");
            cssPropStore.updateKeyValue("p1","k2","n2");
            equal(cssPropStore.toString(), "p1:k1n1 k2n2;");
        });

        test("CssPropertyStore: addOrUpdateKeyValue", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addOrUpdateKeyValue("p1","k1","v1");
            cssPropStore.addOrUpdateKeyValue("p1","k2","v2");
            equal(cssPropStore.toString(), "p1:k1v1 k2v2;");
            cssPropStore.addOrUpdateKeyValue("p2","k1","v1");
            equal(cssPropStore.toString(), "p1:k1v1 k2v2;p2:k1v1;");
            cssPropStore.addOrUpdateKeyValue("p1","k2","v3");
            equal(cssPropStore.toString(), "p1:k1v1 k2v3;p2:k1v1;");
            cssPropStore.addOrUpdateKeyValue("p2","k2","v2");
            equal(cssPropStore.toString(), "p1:k1v1 k2v3;p2:k1v1 k2v2;");
        });

        test("CssPropertyStore: Adding both values and keyvalues", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addOrUpdateValue("color", "#000000");
            equal(cssPropStore.toString(), "color:#000000;");
            cssPropStore.addOrUpdateKeyValue("transform", "translate","(0px,0px)");
            equal(cssPropStore.toString(), "color:#000000;transform:translate(0px,0px);");
            cssPropStore.addOrUpdateValue("display", "block");
            equal(cssPropStore.toString(), "color:#000000;display:block;transform:translate(0px,0px);");
            cssPropStore.addOrUpdateKeyValue("transform", "rotate","(0deg)");
            equal(cssPropStore.toString(), "color:#000000;display:block;transform:translate(0px,0px) rotate(0deg);");
            cssPropStore.addOrUpdateKeyValue("transform", "translate","(10px,10px)");
            equal(cssPropStore.toString(), "color:#000000;display:block;transform:translate(10px,10px) rotate(0deg);");
            cssPropStore.addOrUpdateKeyValue("transform", "rotate","(90deg)");
            equal(cssPropStore.toString(), "color:#000000;display:block;transform:translate(10px,10px) rotate(90deg);");
        });

        test("CssPropertyStore: getSubsetCssPropertyStore", function(){
            var cssPropStore = new CssPropertyStore();
            cssPropStore.addOrUpdateValue("color", "#000000");
            cssPropStore.addOrUpdateKeyValue("transform", "translate","(0px,0px)");
            cssPropStore.addOrUpdateKeyValue("transform", "rotate","(0deg)");
            cssPropStore.addOrUpdateValue("display", "block");
            var newCssPropStore = cssPropStore.getSubsetCssPropertyStore(["color","transform"]);
            equal(newCssPropStore.toString(), "color:#000000;transform:translate(0px,0px) rotate(0deg);");
        });
    };
    return {run: run};
});