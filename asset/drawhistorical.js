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
    var drawChart=function(nodeId,title,series){
        // console.log(JSON.stringify(data.series))
        //Highcharts.chart
        Highcharts.chart(nodeId,{
            colors: ['#7cb5ec',  '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
            credits:{
                enabled:false
            },
            tooltip:{
                enabled:false
            },

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
                style:{color:'#fff'},
                text:title //document.ontouchstart === undefined ?
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
            series:series
        });
    };


    var number2date=function(d){
        d= d.toString();
        return Date.UTC(d.substr(0,4)-0,d.substr(4,2)-1,d.substr(6,2)-0)
    };
    var createChartData=function(rows){
        //var rows= r.data;

        if(!rows || !rows.length){
            throw new Error('createSeries error: no data')
            return;
        };
        //rows.reverse();
        rows.sort(function(a,b){
            return a.date- b.date;
        });
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
        //data.symbol= r.symbol;
        data.startDate=rows[0].date;
        data.endDate=rows[rows.length-1].date;
        return data;
    };

    var drawHistorical=function($node,symbol,r){
        var r=r||[{"date":20180105,"symbol":"GE","open":18.86,"high":18.87,"low":18.5,"close":18.54,"volume":79879652},{"date":20180104,"symbol":"GE","open":18.38,"high":18.62,"low":18.3,"close":18.53,"volume":82554503},{"date":20180103,"symbol":"GE","open":18.3,"high":18.34,"low":18.03,"close":18.15,"volume":81472286},{"date":20180102,"symbol":"GE","open":17.58,"high":17.99,"low":17.53,"close":17.98,"volume":77570344},{"date":20171229,"symbol":"GE","open":17.27,"high":17.53,"low":17.27,"close":17.45,"volume":76149513},{"date":20171228,"symbol":"GE","open":17.35,"high":17.4,"low":17.25,"close":17.36,"volume":60934882},{"date":20171227,"symbol":"GE","open":17.46,"high":17.63,"low":17.31,"close":17.38,"volume":60126681},{"date":20171226,"symbol":"GE","open":17.45,"high":17.66,"low":17.4,"close":17.43,"volume":55337926},{"date":20171222,"symbol":"GE","open":17.51,"high":17.56,"low":17.4,"close":17.5,"volume":46370351},{"date":20171221,"symbol":"GE","open":17.46,"high":17.69,"low":17.4375,"close":17.47,"volume":67877696},{"date":20171220,"symbol":"GE","open":17.63,"high":17.65,"low":17.36,"close":17.45,"volume":75364978},{"date":20171219,"symbol":"GE","open":17.77,"high":17.8,"low":17.55,"close":17.59,"volume":65496111},{"date":20171218,"symbol":"GE","open":17.87,"high":18.05,"low":17.75,"close":17.76,"volume":53913436},{"date":20171215,"symbol":"GE","open":17.78,"high":17.83,"low":17.66,"close":17.82,"volume":88381861},{"date":20171214,"symbol":"GE","open":17.77,"high":17.82,"low":17.64,"close":17.64,"volume":48534329},{"date":20171213,"symbol":"GE","open":17.92,"high":17.99,"low":17.76,"close":17.76,"volume":42102653},{"date":20171212,"symbol":"GE","open":17.66,"high":18.04,"low":17.65,"close":17.91,"volume":66832390},{"date":20171211,"symbol":"GE","open":17.72,"high":17.79,"low":17.53,"close":17.65,"volume":58171204},{"date":20171208,"symbol":"GE","open":17.74,"high":17.82,"low":17.66,"close":17.71,"volume":54441158},{"date":20171207,"symbol":"GE","open":17.66,"high":18.06,"low":17.63,"close":17.71,"volume":55580893},{"date":20171206,"symbol":"GE","open":17.75,"high":17.84,"low":17.6,"close":17.66,"volume":43912725},{"date":20171205,"symbol":"GE","open":17.98,"high":18.01,"low":17.67,"close":17.76,"volume":65788904},{"date":20171204,"symbol":"GE","open":18,"high":18.06,"low":17.88,"close":17.95,"volume":68347911},{"date":20171201,"symbol":"GE","open":18.28,"high":18.28,"low":17.86,"close":17.88,"volume":82027214},{"date":20171130,"symbol":"GE","open":18.56,"high":18.59,"low":18.18,"close":18.29,"volume":68069428},{"date":20171129,"symbol":"GE","open":18.45,"high":18.54,"low":18.31,"close":18.48,"volume":55159284},{"date":20171128,"symbol":"GE","open":18.17,"high":18.44,"low":18.06,"close":18.41,"volume":56115382},{"date":20171127,"symbol":"GE","open":18.34,"high":18.5,"low":18.09,"close":18.12,"volume":78850210},{"date":20171124,"symbol":"GE","open":18.38,"high":18.38,"low":18.15,"close":18.19,"volume":24897701},{"date":20171122,"symbol":"GE","open":17.87,"high":18.25,"low":17.84,"close":18.15,"volume":54846811},{"date":20171121,"symbol":"GE","open":17.95,"high":18.07,"low":17.7,"close":17.83,"volume":77918915},{"date":20171120,"symbol":"GE","open":18.13,"high":18.13,"low":17.83,"close":17.98,"volume":63934053},{"date":20171117,"symbol":"GE","open":18.34,"high":18.47,"low":18.21,"close":18.21,"volume":60457162},{"date":20171116,"symbol":"GE","open":18.48,"high":18.48,"low":18.05,"close":18.25,"volume":89376592},{"date":20171115,"symbol":"GE","open":17.51,"high":18.38,"low":17.5,"close":18.26,"volume":144368004},{"date":20171114,"symbol":"GE","open":18.79,"high":18.88,"low":17.46,"close":17.9,"volume":312556809},{"date":20171113,"symbol":"GE","open":20.26,"high":20.75,"low":18.7501,"close":19.02,"volume":261557413},{"date":20171110,"symbol":"GE","open":19.98,"high":20.68,"low":19.9,"close":20.49,"volume":100732937},{"date":20171109,"symbol":"GE","open":20.04,"high":20.071,"low":19.85,"close":19.99,"volume":50850505},{"date":20171108,"symbol":"GE","open":20.21,"high":20.32,"low":20.07,"close":20.12,"volume":39682539},{"date":20171107,"symbol":"GE","open":20.17,"high":20.25,"low":20.12,"close":20.21,"volume":41657097},{"date":20171106,"symbol":"GE","open":20.52,"high":20.53,"low":20.08,"close":20.13,"volume":60679528},{"date":20171103,"symbol":"GE","open":19.92,"high":20.33,"low":19.86,"close":20.14,"volume":67860954},{"date":20171102,"symbol":"GE","open":20.05,"high":20.075,"low":19.63,"close":19.94,"volume":81531699},{"date":20171101,"symbol":"GE","open":20.07,"high":20.52,"low":19.96,"close":20.02,"volume":91714426},{"date":20171031,"symbol":"GE","open":20.26,"high":20.4,"low":20.05,"close":20.16,"volume":98007061},{"date":20171030,"symbol":"GE","open":20.62,"high":20.72,"low":20.26,"close":20.41,"volume":98385544},{"date":20171027,"symbol":"GE","open":21.26,"high":21.3,"low":20.64,"close":20.79,"volume":98534637},{"date":20171026,"symbol":"GE","open":21.57,"high":21.65,"low":21.2,"close":21.32,"volume":86283723},{"date":20171025,"symbol":"GE","open":21.84,"high":21.89,"low":21.3,"close":21.5,"volume":110518207},{"date":20171024,"symbol":"GE","open":22.12,"high":22.31,"low":21.75,"close":21.89,"volume":133615914},{"date":20171023,"symbol":"GE","open":23.44,"high":23.44,"low":22.18,"close":22.32,"volume":187340912},{"date":20171020,"symbol":"GE","open":22.14,"high":23.84,"low":22.1,"close":23.83,"volume":192404370},{"date":20171019,"symbol":"GE","open":23.14,"high":23.78,"low":23.05,"close":23.58,"volume":75574053},{"date":20171018,"symbol":"GE","open":23.2,"high":23.28,"low":23.07,"close":23.12,"volume":34970681},{"date":20171017,"symbol":"GE","open":23.22,"high":23.25,"low":23,"close":23.19,"volume":58639089},{"date":20171016,"symbol":"GE","open":22.99,"high":23.48,"low":22.93,"close":23.36,"volume":49757813},{"date":20171013,"symbol":"GE","open":23.15,"high":23.23,"low":22.96,"close":22.98,"volume":40391802},{"date":20171012,"symbol":"GE","open":23.05,"high":23.09,"low":22.83,"close":23.05,"volume":60366453},{"date":20171011,"symbol":"GE","open":23.13,"high":23.27,"low":22.9,"close":23.07,"volume":81172916},{"date":20171010,"symbol":"GE","open":23.7,"high":23.8553,"low":23.32,"close":23.36,"volume":81009798},{"date":20171009,"symbol":"GE","open":24.1,"high":24.15,"low":23.25,"close":23.43,"volume":140302771},{"date":20171006,"symbol":"GE","open":24.41,"high":24.54,"low":24.13,"close":24.39,"volume":40729835},{"date":20171005,"symbol":"GE","open":24.39,"high":24.57,"low":24.15,"close":24.54,"volume":34758948},{"date":20171004,"symbol":"GE","open":24.88,"high":24.89,"low":24.43,"close":24.48,"volume":32149416},{"date":20171003,"symbol":"GE","open":24.61,"high":24.83,"low":24.33,"close":24.8,"volume":33907539},{"date":20171002,"symbol":"GE","open":24.22,"high":24.61,"low":24.1,"close":24.57,"volume":42501167},{"date":20170929,"symbol":"GE","open":24.22,"high":24.29,"low":24.01,"close":24.18,"volume":33673712},{"date":20170928,"symbol":"GE","open":24.39,"high":24.45,"low":24.16,"close":24.24,"volume":36154413},{"date":20170927,"symbol":"GE","open":25,"high":25.05,"low":24.28,"close":24.37,"volume":56488971},{"date":20170926,"symbol":"GE","open":25.15,"high":25.21,"low":24.92,"close":24.93,"volume":40753220},{"date":20170925,"symbol":"GE","open":24.92,"high":25.18,"low":24.851,"close":25.11,"volume":42487988},{"date":20170922,"symbol":"GE","open":24.84,"high":25.0399,"low":24.77,"close":24.87,"volume":39717546},{"date":20170921,"symbol":"GE","open":24.33,"high":24.84,"low":24.17,"close":24.75,"volume":52115545},{"date":20170920,"symbol":"GE","open":24.2,"high":24.41,"low":24.19,"close":24.32,"volume":39770268},{"date":20170919,"symbol":"GE","open":24.46,"high":24.47,"low":24.015,"close":24.2,"volume":45340484},{"date":20170918,"symbol":"GE","open":23.96,"high":24.55,"low":23.93,"close":24.46,"volume":52504484},{"date":20170915,"symbol":"GE","open":24.1,"high":24.17,"low":23.75,"close":23.93,"volume":66559977},{"date":20170914,"symbol":"GE","open":24.1,"high":24.27,"low":23.94,"close":24.26,"volume":42084528},{"date":20170913,"symbol":"GE","open":23.93,"high":24.18,"low":23.92,"close":24.11,"volume":38629676},{"date":20170912,"symbol":"GE","open":23.82,"high":23.91,"low":23.71,"close":23.91,"volume":49662623},{"date":20170911,"symbol":"GE","open":23.8,"high":23.89,"low":23.62,"close":23.72,"volume":43306557},{"date":20170908,"symbol":"GE","open":23.95,"high":24,"low":23.58,"close":23.82,"volume":44604454},{"date":20170907,"symbol":"GE","open":24.51,"high":24.55,"low":23.83,"close":24.02,"volume":80108579},{"date":20170906,"symbol":"GE","open":24.89,"high":25.02,"low":24.82,"close":24.92,"volume":55024972},{"date":20170905,"symbol":"GE","open":25.06,"high":25.06,"low":24.5713,"close":24.76,"volume":46852663},{"date":20170901,"symbol":"GE","open":24.6,"high":25.3,"low":24.49,"close":25.14,"volume":58848107},{"date":20170831,"symbol":"GE","open":24.41,"high":24.7,"low":24.28,"close":24.55,"volume":55284334},{"date":20170830,"symbol":"GE","open":24.49,"high":24.49,"low":24.15,"close":24.28,"volume":33875996},{"date":20170829,"symbol":"GE","open":24.33,"high":24.46,"low":24.28,"close":24.44,"volume":23910062},{"date":20170828,"symbol":"GE","open":24.53,"high":24.6665,"low":24.35,"close":24.47,"volume":23937590},{"date":20170825,"symbol":"GE","open":24.39,"high":24.6,"low":24.35,"close":24.49,"volume":22867795},{"date":20170824,"symbol":"GE","open":24.43,"high":24.54,"low":24.3,"close":24.3,"volume":25547869},{"date":20170823,"symbol":"GE","open":24.52,"high":24.56,"low":24.335,"close":24.39,"volume":34533588},{"date":20170822,"symbol":"GE","open":24.57,"high":24.74,"low":24.4822,"close":24.6,"volume":29969104},{"date":20170821,"symbol":"GE","open":24.49,"high":24.595,"low":24.32,"close":24.49,"volume":46055015},{"date":20170818,"symbol":"GE","open":24.63,"high":24.74,"low":24.44,"close":24.55,"volume":34273076},{"symbol":"GE","date":20170817,"open":25.07,"high":25.1,"low":24.72,"close":24.75,"volume":31221726},{"symbol":"GE","date":20170816,"open":25.12,"high":25.25,"low":25.05,"close":25.1,"volume":27473822},{"symbol":"GE","date":20170815,"open":25.21,"high":25.32,"low":25.1,"close":25.14,"volume":27334936},{"symbol":"GE","date":20170814,"open":25.28,"high":25.55,"low":25.25,"close":25.36,"volume":24292077},{"symbol":"GE","date":20170811,"open":25.4,"high":25.45,"low":25.19,"close":25.2,"volume":19217278},{"symbol":"GE","date":20170810,"open":25.71,"high":25.71,"low":25.27,"close":25.3,"volume":29678945},{"symbol":"GE","date":20170809,"open":25.55,"high":25.72,"low":25.46,"close":25.71,"volume":29670988},{"symbol":"GE","date":20170808,"open":25.63,"high":25.89,"low":25.515,"close":25.56,"volume":27143601},{"symbol":"GE","date":20170807,"open":25.74,"high":25.79,"low":25.55,"close":25.63,"volume":18870367},{"symbol":"GE","date":20170804,"open":25.75,"high":25.85,"low":25.62,"close":25.78,"volume":23312961},{"symbol":"GE","date":20170803,"open":25.59,"high":25.78,"low":25.37,"close":25.76,"volume":30916656},{"symbol":"GE","date":20170802,"open":25.44,"high":25.57,"low":25.39,"close":25.52,"volume":27387013},{"symbol":"GE","date":20170801,"open":25.63,"high":25.66,"low":25.33,"close":25.44,"volume":41911312},{"symbol":"GE","date":20170731,"open":25.54,"high":25.69,"low":25.49,"close":25.61,"volume":30616287},{"symbol":"GE","date":20170728,"open":25.86,"high":25.88,"low":25.4,"close":25.53,"volume":28286777},{"symbol":"GE","date":20170727,"open":25.59,"high":25.8,"low":25.52,"close":25.79,"volume":39888012},{"symbol":"GE","date":20170726,"open":25.59,"high":25.69,"low":25.37,"close":25.59,"volume":40733416},{"symbol":"GE","date":20170725,"open":25.57,"high":25.73,"low":25.36,"close":25.44,"volume":46181545},{"symbol":"GE","date":20170724,"open":25.78,"high":25.85,"low":25.35,"close":25.43,"volume":56872280},{"symbol":"GE","date":20170721,"open":25.38,"high":26.005,"low":25.26,"close":25.91,"volume":90649890},{"symbol":"GE","date":20170720,"open":27.02,"high":27.05,"low":26.6,"close":26.69,"volume":55158141},{"symbol":"GE","date":20170719,"open":26.85,"high":27.03,"low":26.84,"close":26.94,"volume":24792361},{"symbol":"GE","date":20170718,"open":26.76,"high":26.92,"low":26.735,"close":26.89,"volume":26146078},{"symbol":"GE","date":20170717,"open":26.76,"high":26.88,"low":26.72,"close":26.82,"volume":27695627},{"symbol":"GE","date":20170714,"open":26.74,"high":26.9,"low":26.73,"close":26.78,"volume":21058280},{"symbol":"GE","date":20170713,"open":26.58,"high":26.83,"low":26.5,"close":26.79,"volume":27767620},{"symbol":"GE","date":20170712,"open":26.54,"high":26.805,"low":26.37,"close":26.58,"volume":50986283},{"symbol":"GE","date":20170711,"open":26.03,"high":26.45,"low":25.91,"close":26.38,"volume":41251603},{"symbol":"GE","date":20170710,"open":26.13,"high":26.19,"low":25.85,"close":26.04,"volume":46755231},{"symbol":"GE","date":20170707,"open":26.25,"high":26.3,"low":25.98,"close":26.15,"volume":40543122},{"symbol":"GE","date":20170706,"open":26.86,"high":27.0494,"low":26.1,"close":26.31,"volume":76645911},{"symbol":"GE","date":20170705,"open":27.54,"high":27.56,"low":27.23,"close":27.35,"volume":21270222},{"symbol":"GE","date":20170703,"open":27.16,"high":27.59,"low":27.06,"close":27.45,"volume":20674754},{"symbol":"GE","date":20170630,"open":27.09,"high":27.19,"low":26.91,"close":27.01,"volume":26254238},{"symbol":"GE","date":20170629,"open":27.16,"high":27.41,"low":26.79,"close":27.02,"volume":36732082},{"symbol":"GE","date":20170628,"open":27.26,"high":27.4,"low":27.05,"close":27.08,"volume":31015779},{"symbol":"GE","date":20170627,"open":27.52,"high":27.585,"low":27.2,"close":27.21,"volume":41329428},{"symbol":"GE","date":20170626,"open":27.59,"high":27.68,"low":27.5,"close":27.61,"volume":28501563},{"symbol":"GE","date":20170623,"open":27.79,"high":27.79,"low":27.5,"close":27.57,"volume":31736487},{"symbol":"GE","date":20170622,"open":27.77,"high":27.83,"low":27.54,"close":27.55,"volume":36384635},{"symbol":"GE","date":20170621,"open":28.18,"high":28.19,"low":27.645,"close":27.78,"volume":33758069},{"symbol":"GE","date":20170620,"open":28.71,"high":28.72,"low":28.08,"close":28.13,"volume":47542911},{"symbol":"GE","date":20170619,"open":28.96,"high":29,"low":28.74,"close":28.8,"volume":30504721},{"symbol":"GE","date":20170616,"open":28.98,"high":29.01,"low":28.62,"close":29,"volume":81565622},{"symbol":"GE","date":20170615,"open":28.48,"high":28.95,"low":28.43,"close":28.94,"volume":47868093},{"symbol":"GE","date":20170614,"open":28.48,"high":28.8,"low":28.37,"close":28.69,"volume":41120302},{"symbol":"GE","date":20170613,"open":29.12,"high":29.16,"low":28.34,"close":28.45,"volume":58823660},{"symbol":"GE","date":20170612,"open":29.24,"high":29.47,"low":28.73,"close":28.94,"volume":139089520},{"symbol":"GE","date":20170609,"open":27.63,"high":27.97,"low":27.59,"close":27.94,"volume":25362831},{"symbol":"GE","date":20170608,"open":27.66,"high":27.82,"low":27.53,"close":27.59,"volume":40919811},{"symbol":"GE","date":20170607,"open":27.95,"high":27.96,"low":27.4,"close":27.68,"volume":43539099},{"symbol":"GE","date":20170606,"open":27.98,"high":28.04,"low":27.81,"close":27.93,"volume":33721157},{"symbol":"GE","date":20170605,"open":27.9,"high":28.07,"low":27.81,"close":27.98,"volume":43509471},{"symbol":"GE","date":20170602,"open":27.87,"high":27.94,"low":27.62,"close":27.88,"volume":37007626},{"symbol":"GE","date":20170601,"open":27.51,"high":27.876,"low":27.5,"close":27.72,"volume":32387712},{"symbol":"GE","date":20170531,"open":27.33,"high":27.435,"low":27.19,"close":27.38,"volume":35610474},{"symbol":"GE","date":20170530,"open":27.31,"high":27.45,"low":27.16,"close":27.36,"volume":36435745},{"symbol":"GE","date":20170526,"open":27.46,"high":27.55,"low":27.29,"close":27.45,"volume":30624045},{"symbol":"GE","date":20170525,"open":27.79,"high":27.9,"low":27.42,"close":27.49,"volume":39254436},{"symbol":"GE","date":20170524,"open":28.32,"high":28.5,"low":27.62,"close":27.83,"volume":53867078},{"symbol":"GE","date":20170523,"open":28.21,"high":28.28,"low":28.11,"close":28.28,"volume":23877122},{"symbol":"GE","date":20170522,"open":28.23,"high":28.3,"low":28.06,"close":28.18,"volume":27810667},{"symbol":"GE","date":20170519,"open":27.55,"high":28.165,"low":27.5,"close":28.05,"volume":48488671},{"symbol":"GE","date":20170518,"open":27.26,"high":27.65,"low":27.1,"close":27.48,"volume":48447556},{"symbol":"GE","date":20170517,"open":27.82,"high":27.87,"low":27.41,"close":27.41,"volume":52461830},{"symbol":"GE","date":20170516,"open":28.25,"high":28.28,"low":28,"close":28.04,"volume":29509159},{"symbol":"GE","date":20170515,"open":28.07,"high":28.24,"low":27.97,"close":28.18,"volume":39767489},{"symbol":"GE","date":20170512,"open":28.36,"high":28.45,"low":27.85,"close":28.27,"volume":68433185},{"symbol":"GE","date":20170511,"open":28.68,"high":28.89,"low":28.5,"close":28.87,"volume":28015381},{"symbol":"GE","date":20170510,"open":28.92,"high":28.93,"low":28.6,"close":28.7,"volume":26047230},{"symbol":"GE","date":20170509,"open":29.08,"high":29.09,"low":28.86,"close":28.93,"volume":23838711},{"symbol":"GE","date":20170508,"open":29.16,"high":29.245,"low":29,"close":29.07,"volume":21630294},{"symbol":"GE","date":20170505,"open":29.13,"high":29.24,"low":29.11,"close":29.22,"volume":16927056},{"symbol":"GE","date":20170504,"open":29.27,"high":29.31,"low":29.05,"close":29.2,"volume":19614214},{"symbol":"GE","date":20170503,"open":28.92,"high":29.29,"low":28.85,"close":29.23,"volume":26893250},{"symbol":"GE","date":20170502,"open":29.01,"high":29.05,"low":28.91,"close":28.99,"volume":33760037},{"symbol":"GE","date":20170501,"open":29.01,"high":29.17,"low":28.93,"close":28.94,"volume":24015753},{"symbol":"GE","date":20170428,"open":29.1,"high":29.16,"low":28.93,"close":28.99,"volume":24079191},{"symbol":"GE","date":20170427,"open":29.29,"high":29.31,"low":29.02,"close":29.08,"volume":32939845},{"symbol":"GE","date":20170426,"open":29.52,"high":29.55,"low":29.26,"close":29.26,"volume":37368373},{"symbol":"GE","date":20170425,"open":29.45,"high":29.6,"low":29.32,"close":29.45,"volume":39854055},{"symbol":"GE","date":20170424,"open":29.85,"high":29.93,"low":29.49,"close":29.55,"volume":48585162},{"symbol":"GE","date":20170421,"open":30.27,"high":30.38,"low":29.45,"close":29.55,"volume":72351353},{"symbol":"GE","date":20170420,"open":30.05,"high":30.54,"low":30.03,"close":30.27,"volume":37081558},{"symbol":"GE","date":20170419,"open":29.89,"high":30.06,"low":29.87,"close":30,"volume":26594394},{"symbol":"GE","date":20170418,"open":29.6,"high":29.9,"low":29.58,"close":29.84,"volume":25706585},{"symbol":"GE","date":20170417,"open":29.62,"high":29.7,"low":29.55,"close":29.64,"volume":21776555},{"symbol":"GE","date":20170413,"open":29.7,"high":29.8,"low":29.55,"close":29.56,"volume":19998013},{"symbol":"GE","date":20170412,"open":29.88,"high":29.9,"low":29.65,"close":29.77,"volume":27041348},{"symbol":"GE","date":20170411,"open":30,"high":30.1,"low":29.84,"close":30.04,"volume":22040223},{"symbol":"GE","date":20170410,"open":30.07,"high":30.23,"low":29.96,"close":30.01,"volume":18505150},{"symbol":"GE","date":20170407,"open":29.92,"high":30.19,"low":29.92,"close":29.99,"volume":18975740},{"symbol":"GE","date":20170406,"open":30,"high":30.18,"low":29.92,"close":29.93,"volume":21549950},{"symbol":"GE","date":20170405,"open":30.09,"high":30.42,"low":29.95,"close":29.97,"volume":25837471},{"symbol":"GE","date":20170404,"open":29.9,"high":30.09,"low":29.7,"close":30.02,"volume":25057168},{"symbol":"GE","date":20170403,"open":29.76,"high":30,"low":29.75,"close":29.88,"volume":29912275},{"symbol":"GE","date":20170331,"open":29.86,"high":30.04,"low":29.74,"close":29.8,"volume":50796542},{"symbol":"GE","date":20170330,"open":29.66,"high":29.99,"low":29.63,"close":29.87,"volume":35961302},{"symbol":"GE","date":20170329,"open":29.52,"high":29.71,"low":29.46,"close":29.68,"volume":27558771},{"symbol":"GE","date":20170328,"open":29.31,"high":29.73,"low":29.25,"close":29.62,"volume":27847655},{"symbol":"GE","date":20170327,"open":29.45,"high":29.51,"low":29.25,"close":29.44,"volume":28986703},{"symbol":"GE","date":20170324,"open":29.59,"high":29.81,"low":29.53,"close":29.72,"volume":27880234},{"symbol":"GE","date":20170323,"open":29.5,"high":29.73,"low":29.38,"close":29.62,"volume":24674960},{"symbol":"GE","date":20170322,"open":29.56,"high":29.71,"low":29.31,"close":29.53,"volume":26000688},{"symbol":"GE","date":20170321,"open":29.86,"high":29.86,"low":29.34,"close":29.39,"volume":26834807},{"symbol":"GE","date":20170320,"open":29.9,"high":29.92,"low":29.69,"close":29.74,"volume":18877431},{"symbol":"GE","date":20170317,"open":29.85,"high":30.04,"low":29.77,"close":29.88,"volume":43638968},{"symbol":"GE","date":20170316,"open":29.8,"high":29.82,"low":29.62,"close":29.75,"volume":21207002},{"symbol":"GE","date":20170315,"open":29.55,"high":29.83,"low":29.47,"close":29.76,"volume":25142833},{"symbol":"GE","date":20170314,"open":29.76,"high":29.79,"low":29.47,"close":29.54,"volume":22801581},{"symbol":"GE","date":20170313,"open":30.23,"high":30.26,"low":29.79,"close":29.86,"volume":30187808},{"symbol":"GE","date":20170310,"open":29.84,"high":30.43,"low":29.63,"close":30.28,"volume":59211872},{"symbol":"GE","date":20170309,"open":29.75,"high":29.83,"low":29.56,"close":29.66,"volume":25940215},{"symbol":"GE","date":20170308,"open":29.89,"high":29.94,"low":29.73,"close":29.8,"volume":32308399},{"symbol":"GE","date":20170307,"open":29.93,"high":29.99,"low":29.79,"close":29.86,"volume":29982940},{"symbol":"GE","date":20170306,"open":30,"high":30.08,"low":29.92,"close":30,"volume":23420603},{"symbol":"GE","date":20170303,"open":30.19,"high":30.22,"low":30.05,"close":30.12,"volume":19984561},{"symbol":"GE","date":20170302,"open":30.23,"high":30.23,"low":30,"close":30.19,"volume":27614070},{"symbol":"GE","date":20170301,"open":29.98,"high":30.35,"low":29.82,"close":30.19,"volume":36839740},{"symbol":"GE","date":20170228,"open":29.99,"high":30.08,"low":29.67,"close":29.81,"volume":39092390},{"symbol":"GE","date":20170227,"open":30.05,"high":30.1489,"low":29.9,"close":29.94,"volume":23509520},{"symbol":"GE","date":20170224,"open":29.84,"high":30.19,"low":29.78,"close":30.19,"volume":27294870},{"symbol":"GE","date":20170223,"open":30.04,"high":30.08,"low":29.85,"close":30.02,"volume":28943890},{"symbol":"GE","date":20170222,"open":30.52,"high":30.55,"low":30.26,"close":30.33,"volume":30088380},{"symbol":"GE","date":20170221,"open":30.41,"high":30.59,"low":30.34,"close":30.52,"volume":30223220},{"symbol":"GE","date":20170217,"open":30.41,"high":30.44,"low":30.2,"close":30.37,"volume":21835860},{"symbol":"GE","date":20170216,"open":30.35,"high":30.47,"low":30.3,"close":30.45,"volume":25932010},{"symbol":"GE","date":20170215,"open":30.29,"high":30.35,"low":30.18,"close":30.35,"volume":25460790},{"symbol":"GE","date":20170214,"open":30.13,"high":30.28,"low":29.92,"close":30.28,"volume":35025920},{"symbol":"GE","date":20170213,"open":29.88,"high":30.06,"low":29.73,"close":30.04,"volume":36552890},{"symbol":"GE","date":20170210,"open":29.74,"high":29.75,"low":29.55,"close":29.72,"volume":22775760},{"symbol":"GE","date":20170209,"open":29.52,"high":29.7,"low":29.46,"close":29.59,"volume":21661110},{"symbol":"GE","date":20170208,"open":29.51,"high":29.54,"low":29.26,"close":29.43,"volume":32116280},{"symbol":"GE","date":20170207,"open":29.75,"high":29.81,"low":29.53,"close":29.56,"volume":23774940},{"symbol":"GE","date":20170206,"open":29.68,"high":29.75,"low":29.57,"close":29.66,"volume":23518770},{"symbol":"GE","date":20170203,"open":29.79,"high":29.8,"low":29.54,"close":29.7,"volume":31102850},{"symbol":"GE","date":20170202,"open":29.58,"high":29.71,"low":29.5,"close":29.68,"volume":21705590},{"symbol":"GE","date":20170201,"open":29.73,"high":29.81,"low":29.56,"close":29.69,"volume":25670630},{"symbol":"GE","date":20170131,"open":29.85,"high":29.9,"low":29.5,"close":29.7,"volume":38699250},{"symbol":"GE","date":20170130,"open":29.96,"high":30.1,"low":29.77,"close":29.96,"volume":26211070},{"symbol":"GE","date":20170127,"open":30.4,"high":30.44,"low":29.935,"close":30.01,"volume":29979810},{"symbol":"GE","date":20170126,"open":30.44,"high":30.49,"low":30.13,"close":30.32,"volume":26761410},{"symbol":"GE","date":20170125,"open":30.42,"high":30.47,"low":30.215,"close":30.37,"volume":38064850},{"symbol":"GE","date":20170124,"open":29.86,"high":30.06,"low":29.82,"close":30,"volume":31934430},{"symbol":"GE","date":20170123,"open":30.5,"high":30.51,"low":29.58,"close":29.75,"volume":59059650},{"symbol":"GE","date":20170120,"open":30.76,"high":30.9,"low":30.3,"close":30.53,"volume":83260720},{"symbol":"GE","date":20170119,"open":31.25,"high":31.34,"low":31.05,"close":31.21,"volume":37669200},{"symbol":"GE","date":20170118,"open":31.21,"high":31.335,"low":31.13,"close":31.23,"volume":24701020},{"symbol":"GE","date":20170117,"open":31.17,"high":31.45,"low":31.16,"close":31.27,"volume":28817010},{"symbol":"GE","date":20170113,"open":31.36,"high":31.45,"low":31.25,"close":31.36,"volume":24319260},{"symbol":"GE","date":20170112,"open":31.45,"high":31.47,"low":31.13,"close":31.39,"volume":29841240},{"symbol":"GE","date":20170111,"open":31.24,"high":31.52,"low":31.24,"close":31.47,"volume":28279820},{"symbol":"GE","date":20170110,"open":31.46,"high":31.62,"low":31.37,"close":31.37,"volume":27185630}]
        if(!$node.attr('id')) {
            $node.attr('id', 'J_chart' + Math.random().toString().substr(2, 8))
        }
        var data=createChartData(r);
        drawChart($node.attr('id'),symbol+' ['+data.startDate+' ~ '+data.endDate+']',data.series)
        

    };

    return drawHistorical


})
