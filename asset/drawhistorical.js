define(['oxjs','./highcharts'],function(OX,Highcharts){
    var Highcharts=Highcharts||window.Highcharts;
    var getMed=function(){
        var rows=this.concat.call([],this);
        if(rows.length==1){return rows[0]}

        rows.sort(function(a,b){return a-b});
        var mid=(rows.length-1)/2;

        //console.log(rows.length,mid)
        if(mid%1){
            mid=Math.floor(mid);

            return ((rows[mid]+rows[mid+1])/2).toFixed(2)-0;
        }else{
            return rows[mid];
        }
    };
    var getAvg=function(){
        var len=this.length,sum=0;
        for(var i=0;i<len;i++){
            sum+=this[i];
        }
        return sum/len;
    };
    var drawChart=function($node,data){
        // console.log(JSON.stringify(data.series))
        //Highcharts.chart
        Highcharts.chart($node.attr('id'),{
            colors: ['#7cb5ec',  '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],

            chart: {
                backgroundColor:'rgba(0,0,0,0)',
                //zoomType: 'x',
                spacingLeft:10,
                spacingRight:10,
                height:200,
                description:'openxsl.com',
            },

            title: {
                text:''
                //text: data.symbol+'['+slashDate(data.startDate)+' ~ '+slashDate(data.endDate)+']'
            },
            subtitle: {
                text:'' //document.ontouchstart === undefined ?
                //'Click and drag in the plot area to zoom in'

            },
            xAxis: {
                type: 'datetime',

                minRange: 14 * 24 * 3600000 // fourteen days
            },
            yAxis: {
                offset:-36,
                //visible:false,
                gridLineColor:'#999',
                minPadding:0,
                title: {
                    text: ''
                },
                labels:{

                    padding:0,
                    reserveSpace:false,
                    y:10
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series:data.series
        });
    };


    var number2date=function(d){
        d= d.toString();
        return Date.UTC(d.substr(0,4)-0,d.substr(4,2)-1,d.substr(6,2)-0)
    };
    var createChartData=function(r){
        var rows= r.data;

        if(!rows || !rows.length){
            throw new Error('createSeries error: no data')
            return;
        };
        rows.reverse();
        var startDate=number2date(rows[0].date);

        var data={},
            closePrices=[],
            arrMed=[],
            arrClose=[],arrAvg=[];

        for(var i= 0,row;row=rows[i++];){


            var date=number2date(row.date);

            closePrices.push(row.close);
            arrMed.push([date,getMed.call(closePrices)])
            arrAvg.push([date,getAvg.call(closePrices).toFixed(3) -0  ])
            arrClose.push([date, row.close])
        }
        //  series.data=data;
        data.series=[{
            // type: 'area',
            name: 'close',
            pointInterval: 24 * 3600 * 1000,
            pointStart: startDate,
            data:arrClose
        },{
            // type: 'area',
            name: 'avg',
            pointInterval: 24 * 3600 * 1000,
            pointStart: startDate,
            data:arrAvg
        },{
            // type: 'area',
            name: 'med',
            pointInterval: 24 * 3600 * 1000,
            pointStart: startDate,
            data:arrMed
        }];
        //data.symbol=symbol;
        data.startDate=rows[0].date;
        data.endDate=rows[rows.length-1].date;
        return data;
    };

    var drawHistorical=function($node,symbol){
        if(!$node.attr('id')) {
            $node.attr('id', 'J_chart' + Math.random().toString().substr(2, 8))
        }
        OX.getJSON('http://momofox.com:8000/historical/gethistory?symbol='+symbol.toUpperCase()+'&limit=250',function(r){

            drawChart($node,createChartData(r))
        })

    };

    return drawHistorical


})
