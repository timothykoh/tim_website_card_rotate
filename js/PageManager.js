define(["CardPageCreator", "IntroPage", "ProjectPage", "LoadingPage"], function(CardPageCreator, IntroPage, ProjectPage, LoadingPage){
    var PageManager = function(){
        this.initLoadingPage = function(){
            var loadingPage = new LoadingPage();            
        }
        this.initPages = function(){
            var cardPageCreator = new CardPageCreator();
            var projectPage = new ProjectPage(1, cardPageCreator);
            // var introPage = new IntroPage(2, cardPageCreator);

        };
    };
    return PageManager;
});