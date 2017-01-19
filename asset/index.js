define(['require','mustache','oxjs', './scroll_attract'], function (require,Mustache,OX, scrollAttract) {

    OX.config({
        devHost: 'https://www.openxsl.com'
    });
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
            //console.log(r)
            /*
             $node.find('[data-key]').each(function () {
             //console.log(n,this)
             this.innerHTML = r[this.getAttribute('data-key')] || ''
             });
             */
        });

    };

    return {

        init: function ($mod) {


            tpl=$mod.find('.TPL_main').html();
            //console.log(tpl)

            var qs = $mod.attr('data-qs')
            var currentSymbol = OX.queryString(qs);
            var mainNode = $mod.find('div.J_mainInfo'),
                hisNode = $mod.find('div.J_historicalChart'),
                disNode = $mod.find('div.J_distributionChart');




            var attrKey = 'data-rendered';
            //drawhistorical(hisNode,'FMX');
            //drawdistribution(disNode,'FMX');



            /**
             *
             * jsonp2({"issue":1789113135,"name":"Fomento Economico Mexicano S.A.B. de C.V.","symbol":"FMX","lastDate":20170109,"lastPrice":74.19,"medLow":-0.187,"avgLow":-0.175,"frequentLow":[-0.176,-0.221],"avg":89.914,"med":91.25,"frequent":[89.982,95.246],"frequentIndex":3,"frequentCount":115,"max":100.51,"min":74.19,"maxCount":43,"minCount":32,"sections":[32,8,52,115,43]})
             * */



            OX.onstatechanged(function () {
                mainNode.removeAttr(attrKey);
                hisNode.removeAttr(attrKey);
                disNode.removeAttr(attrKey);
                currentSymbol = OX.queryString(qs);//location.hash.substr(1);
                //console.log('onstatechanged',currentSymbol,JSON.stringify(history.state))
                checkScroll.call($mod[0]);
            });


            scrollAttract.init($mod);
            var checkScroll = function () {
                var index = Math.round(this.scrollLeft / this.clientWidth);
                if (!currentSymbol) {
                    mainNode.html('<div class="placeholder">select a symbol</div>')
                    return
                }

                switch (index) {
                    case 1:
                        if (!hisNode.attr(attrKey)) {
                            hisNode.attr(attrKey, 1)
                            drawhistorical(hisNode, currentSymbol)
                        }
                        break
                    case 2:
                        if (!disNode.attr(attrKey)) {
                            disNode.attr(attrKey, 1)
                            drawdistribution(disNode, currentSymbol)
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
            $mod.on('scrollEnd', checkScroll);
            /*
             $mod.on('swipeDown',function(e){

             $mod.addClass('hidden')
             })*/
            checkScroll.call($mod[0]);
        }
    }
})
