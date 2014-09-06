define(["SkrollrAnimationBuilder"], function(SkrollrAnimationBuilder){
    var run = function(){
        test("SkrollrAnimationBuilder: addSimple", function(){
            var skrollrAnimationBuilder = new SkrollrAnimationBuilder();
            skrollrAnimationBuilder.addSimple(0, "color", "rgba(0,0,0,0)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);"});
            skrollrAnimationBuilder.addSimple(0, "position", "absolute");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);position:absolute;"});
            skrollrAnimationBuilder.addSimple(100, "color", "rgba(0,0,0,1)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);position:absolute;",
                                                        "data-100":"color:rgba(0,0,0,1);"
                                                        });
        });

        test("SkrollrAnimationBuilder: addComplex", function(){
            var skrollrAnimationBuilder = new SkrollrAnimationBuilder();
            skrollrAnimationBuilder.addComplex(0, "transform", "translate","(0px,0px)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px);"});
            skrollrAnimationBuilder.addComplex(0, "transform", "rotateX", "(0deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px) rotateX(0deg);"});
            skrollrAnimationBuilder.addComplex(0, "name", "key", "val");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px) rotateX(0deg);"+
                                                                 "name:keyval;"});
            skrollrAnimationBuilder.addComplex(100, "transform", "rotateX", "(30deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px) rotateX(0deg);"+
                                                                 "name:keyval;",
                                                        "data-100":"transform:translate(0px,0px) rotateX(30deg);"});
            skrollrAnimationBuilder.addComplex(200, "transform", "rotateY", "(10deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px) rotateX(0deg) rotateY(10deg);"+
                                                                 "name:keyval;",
                                                        "data-100":"transform:translate(0px,0px) rotateX(30deg) rotateY(10deg);",
                                                        "data-200":"transform:translate(0px,0px) rotateX(30deg) rotateY(10deg);"});
        });

        test("SkrollrAnimationBuilder: Adding both simple and complex", function(){
            var skrollrAnimationBuilder = new SkrollrAnimationBuilder();
            skrollrAnimationBuilder.addSimple(0, "color", "rgba(0,0,0,0)");
            skrollrAnimationBuilder.addComplex(0, "transform", "translate", "(0px,0px)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px);"});
            skrollrAnimationBuilder.addComplex(100, "transform", "translate", "(10px,10px)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px);",
                                                        "data-100":"transform:translate(10px,10px);"});
            skrollrAnimationBuilder.addSimple(100, "color", "rgba(0,0,0,1)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px);",
                                                        "data-100":"color:rgba(0,0,0,1);transform:translate(10px,10px);"});
            skrollrAnimationBuilder.addComplex(200, "transform", "rotateX", "(0deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px) rotateX(0deg);",
                                                        "data-100":"color:rgba(0,0,0,1);transform:translate(10px,10px) rotateX(0deg);",
                                                        "data-200":"transform:translate(10px,10px) rotateX(0deg);"});
            skrollrAnimationBuilder.addComplex(300, "transform", "rotateX", "(90deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px) rotateX(0deg);",
                                                        "data-100":"color:rgba(0,0,0,1);transform:translate(10px,10px) rotateX(0deg);",
                                                        "data-200":"transform:translate(10px,10px) rotateX(0deg);",
                                                        "data-300":"transform:translate(10px,10px) rotateX(90deg);"});
            skrollrAnimationBuilder.addComplex(300, "transform", "rotateY", "(0deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px) rotateX(0deg) rotateY(0deg);",
                                                        "data-100":"color:rgba(0,0,0,1);transform:translate(10px,10px) rotateX(0deg) rotateY(0deg);",
                                                        "data-200":"transform:translate(10px,10px) rotateX(0deg) rotateY(0deg);",
                                                        "data-300":"transform:translate(10px,10px) rotateX(90deg) rotateY(0deg);"});
            skrollrAnimationBuilder.addComplex(400, "transform", "rotateY", "(30deg)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"color:rgba(0,0,0,0);transform:translate(0px,0px) rotateX(0deg) rotateY(0deg);",
                                                        "data-100":"color:rgba(0,0,0,1);transform:translate(10px,10px) rotateX(0deg) rotateY(0deg);",
                                                        "data-200":"transform:translate(10px,10px) rotateX(0deg) rotateY(0deg);",
                                                        "data-300":"transform:translate(10px,10px) rotateX(90deg) rotateY(0deg);",
                                                        "data-400":"transform:translate(10px,10px) rotateX(90deg) rotateY(30deg);"});
        });

        test("SkrollrAnimationBuilder: Test 1", function(){
            var skrollrAnimationBuilder = new SkrollrAnimationBuilder();
            skrollrAnimationBuilder.addComplex(0, "transform", "translate", "(0px,0px)");
            skrollrAnimationBuilder.addSimple(100, "opacity", "1");
            skrollrAnimationBuilder.addSimple(200, "opacity", "0");
            skrollrAnimationBuilder.addComplex(200, "transform", "rotateX", "(0px)");
            deepEqual(skrollrAnimationBuilder.toMap(), {"data-0":"transform:translate(0px,0px) rotateX(0px);",
                                                        "data-100":"opacity:1;",
                                                        "data-200":"opacity:0;transform:translate(0px,0px) rotateX(0px);"});
        });
    };
    return {run: run};
});