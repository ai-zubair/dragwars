$(function () {
    function init(){
        var staggerTimeline=new TimelineMax({onComplete:createDraggable});
        staggerTimeline.staggerFrom('.letter', 0.5, { opacity: 0,scale:2, cycle: { rotationX: [-180,180],x:[-100],y:[-100,100]}, ease: Linear.easeInOut}, 0.05);
        staggerTimeline.staggerTo('.letter', 0.2, { textShadow: "0px 6px #c4c4c4", ease: Back.easeOut.config(3)},0.1);
        staggerTimeline.from('.left-page',1,{rotationY:72.3,scale:0,ease:Back.easeOut.config(1.5)});
        staggerTimeline.from('.right-page',1,{rotationY:-72.3,scale:0,ease:Back.easeOut.config(1.5)},"-=1");
        staggerTimeline.staggerFrom('.dragItem', 0.5, { opacity: 0, scale: 0, ease: Back.easeOut.config(3)},0.2);
        staggerTimeline.staggerFrom('.target', 0.5, { opacity: 0, scale: 0, ease: Back.easeOut.config(3) }, 0.2,"-=1.5");
        staggerTimeline.from('.instruction',0.5,{opacity:0,scale:0,ease:Back.easeInOut});        
    }
    function createDraggable() {
        Draggable.create(".dragItem",{
            bounds:$('.gameBoard'),
            egdeResistance:0,
            onPress:function(){
                this.startX=this.x;
                this.startY=this.y;
                this.offsetTop=$(this.target).position().top;
                this.offsetLeft=$(this.target).position().left;
            },
            onDragEnd:function(){
                var dragThing=this;
                var hitTestId=this.target.id+"Drop";
                $(".target").each(function (idx,targetSpot) {
                    var pos=$(targetSpot).position();
                    var posX=pos.left-dragThing.offsetLeft;
                    var posY=pos.top-dragThing.offsetTop;
                    if(hitTestId===targetSpot.id){
                        if(dragThing.hitTest(targetSpot,"30%")){
                            TweenMax.to(dragThing.target, 0.2, { x: posX, y: posY, ease: Back.easeOut, onComplete: hideMatches, onCompleteParams: [dragThing.target, targetSpot]})
                            TweenMax.from(".correct",.5,{scale:1.5,autoAlpha:1});
                        }
                        else{
                            TweenMax.to(dragThing.target,0.5,{x:dragThing.startX,y:dragThing.startY,ease:Back.easeOut});
                            TweenMax.from(".tryAgain",.5,{scale:2,autoAlpha:1});
                        }
                    }
                });
            }
        })
    }
    var totalHits=0;
    function hideMatches(dragImg,landImg){
        totalHits++;
        TweenMax.to([dragImg,landImg],0.5,{scale:0,ease:Back.easeOut,onComplete:checkHits});
    }
    function checkHits(){
        if(totalHits===6){
            TweenMax.to('.modal',.5,{autoAlpha:1,ease:Back.easeOut});
            TweenMax.from('.modal',.5,{scale:0,ease:Back.easeOut});
        }
    }
    init();
})