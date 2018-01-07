define(['require','oxjs', './scroll_attract'], function (require,OX, scrollAttract) {

    var sectionCount = 5;
    var tpl;
    var drawhistorical = function (node, symbol) {
            require(['./drawhistorical'], function (fn) {
                fn(node, symbol)
            })
        },
        drawdistribution = function (node, symbol) {
            require(['./drawdistribution'], function (fn) {
                fn(node, symbol)
            })
        };

    var fillMainInfo = function ($node, symbol) {
        return
        /*
        OX.getJSON('http://momofox.com:8000/analyze/overview?symbol=' + symbol.toUpperCase() + '&historicalLimit=250&sectionCount=' + sectionCount, function (r) {
            var data = {
                marketcap: ((r.issue * r.lastPrice) / 10e8).toFixed(1) + 'B',
                avgPercent: (r.avgLow * 100).toFixed(1) + '%',
                medPercent: (r.medLow * 100).toFixed(1) + '%',
                frequent: r.frequent.join('~'),
                frequentPercent: (r.frequentCount / 250 * 100).toFixed(1) + '%',
                range: r.min + '~' + r.max

            };
            //r = $.extend(r, data);
            $node.html(Mustache.render(tpl,$.extend(r, data)))
          
        });
        */

    };

    return {

        init: function ($mod) {


            
            var mainNode = $mod.find('div.J_mainInfo'),
                hisNode = $mod.find('div.J_historicalChart'),
                disNode = $mod.find('div.J_distributionChart'),
                currentSymbol=mainNode.attr('data-symbol'),
                attrKey = 'data-rendered';
        
            scrollAttract.init($mod);
            var checkScroll = function () {//console.log('scroll')
                var index = Math.round(this.scrollLeft / this.clientWidth);
                if (!currentSymbol) {
                    //mainNode.html('<div class="placeholder">select a symbol</div>')
                    return
                }

                switch (index) {
                    case 1:
                        if (!hisNode.attr(attrKey)) {
                            hisNode.attr(attrKey, 1)
                            $mod.OXGet({
                                'stock-historical':{
                                    symbol:currentSymbol,

                                }
                            },function(r){
                                drawhistorical(hisNode, currentSymbol,r&&r['stock-historical'])

                            })
                        }
                        break
                    case 2:
                        if (!disNode.attr(attrKey)) {
                            disNode.attr(attrKey, 1)
                            $mod.OXGet({
                                'maybelow-distribution':{
                                    symbol:currentSymbol,
                                    sectioncount:5
                                }
                            },function(r){
                                drawdistribution(disNode, currentSymbol,r&&r['maybelow-distribution'])
                            })
                            
                        }
                        break
                    default :
                        if (!mainNode.attr(attrKey)) {
                            mainNode.attr(attrKey, 1);
                            fillMainInfo(mainNode, currentSymbol);
                        }
                        break
                }
            };
            //console.log(OX.getENV()=='local')
            $mod.on(OX.getENV()=='local'?'scroll':'scrollEnd', checkScroll);
            /*
             $mod.on('swipeDown',function(e){

             $mod.addClass('hidden')
             })*/
            checkScroll.call($mod[0]);
        }
    }
})
