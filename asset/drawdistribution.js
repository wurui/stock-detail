define(['oxjs','./highcharts'],function(OX,Highcharts){
    var Highcharts=Highcharts||window.Highcharts;


    var drawChart=function($node,data){
        // console.log(JSON.stringify(data.series))
        Highcharts.chart($node.attr('id'),{
            chart: {
                type: 'column',
                backgroundColor:'rgba(0,0,0,0)',
                //zoomType: 'x',
                spacingLeft:10,
                spacingRight:10,
                height:200
            },
            credits:{
                enabled:false
            },
            title: {
                text: ''//data.symbol+' ['+data.min+'~'+data.max+']'
            },
            subtitle: {
                style:{color:'#eee'},
                text: data.symbol+' ['+data.min+'~'+data.max+']'//'Last:<b>'+data.lastPrice+'</b>;  Avg:<b>'+data.avg+'</b>;  Med:<b>'+data.med+'</b>'
            },
            xAxis: {
                type: 'category',
                //max:data.max-0,
                //min:data.min-0,
                //categories: data.categories,//[undefined, undefined, undefined],
                labels: {
                    rotation: 0,
                    x:-25,

                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                showLastLabel:true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                offset:-30,
                labels:{

                    padding:0,
                    reserveSpace:false,
                    y:10
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Fq: <b>{point.y:1f} </b>'
            },
            series: [{
                name: 'Frequency',
                data:data.series,
                dataLabels: {
                    enabled: true,
                    //rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    };


    var createSeries=function(data,sectionCount){

        var sec=data.min;
        var unit=(data.max-data.min)/sectionCount;
        var series=[];
        var i=0;
        while(i<data.sections.length){
            var fq=data.sections[i++];
            series.push([sec.toFixed(2),fq])
            sec+=unit;
        }

        return series;
    };




    var drawDistribution=function($node,symbol,sectionCount){
        if(!$node.attr('id')) {
            $node.attr('id', 'J_chart' + Math.random().toString().substr(2, 8))
        }
        var sectionCount=sectionCount||5;
        OX.getJSON('http://momofox.com:8000/analyze/overview?symbol='+symbol.toUpperCase()+'&historicalLimit=250&sectionCount='+sectionCount,function(r){
            r.series=createSeries(r,sectionCount);

            drawChart($node,r)
        })
    };
    return drawDistribution


})
