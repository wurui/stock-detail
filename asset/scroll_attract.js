define(['zepto'],function(){
    var scrollto=function(box,left,fn){

        if(box.scrollLeft!=left) {

            var delta=(left-box.scrollLeft)/10;
            //console.log('origin',delta)
            delta=Math.abs(delta)<1?(delta>0?1:-1):delta;
//console.log(delta,box.scrollLeft,left)
            box.scrollLeft+=delta;
            if(scrollto.TO){
                clearTimeout(scrollto.TO);
            }
            scrollto.TO=setTimeout(function () {
                scrollto(box, left,fn);
            },16)
        }else{
            fn && fn()
        }
    };
    var attract=function($container,fn){
        var el=$container[0];

        var width=el.clientWidth,
            scrollLeft=el.scrollLeft,
            index=Math.round(scrollLeft/width),
            aimScrollLeft=width * index;

        scrollto(el,aimScrollLeft,fn)
    };
    var turnPage=function($container,direction,fn){
        var el=$container[0];

        var width=el.clientWidth,
            scrollLeft=el.scrollLeft,
            index=direction>0?Math.ceil(scrollLeft/width):Math.floor(scrollLeft/width),
            aimScrollLeft=width * index;

        scrollto(el,aimScrollLeft,fn)
    };
    return {
        init:function($container){
            var lastTouchParam=null;
            var onScrollEnd=function(){
                $container.trigger('scrollEnd')
            };

            $container.on('touchstart touchend',function(e){
                switch (e.type){
                    case 'touchstart':
                        lastTouchParam={
                            startX: e.changedTouches[0].clientX,
                            startTS:Date.now()
                        };
                        break
                    case 'touchend':
                        lastTouchParam.endX=e.changedTouches[0].clientX;
                        lastTouchParam.endTS=Date.now();
                        break
                }

            });
            $container.on('swipeLeft swipeRight',function(e){
                e.preventDefault();

                if(lastTouchParam){
                    var speed=(lastTouchParam.endX-lastTouchParam.startX)/(lastTouchParam.endTS-lastTouchParam.startTS);
                }
                if(speed && Math.abs(speed)<0.15){
                    attract($container,onScrollEnd)
                }else {
                    turnPage($container, e.type == 'swipeLeft' ? 1 : -1,onScrollEnd);
                }

            });

        }
    }
})
