/* 2016 
 * Tuan Dang (on the BioLinker project, as Postdoc for EVL, UIC)
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

// This is the MAIN class javasrcipt
var globalData;
var termsData;
var avgP53Val;
var avgCASVal;
var avgRASVal;
var finalHighVal=0;


var width =1000;
var height =200;


var lineColor = d3.scaleLinear()
    .domain([0,100])
    .range(['#00f', '#f00'])

var tip1 = d3.tip()
    .attr('class', 'd3-tip d3-tooltip')
    .direction('e')
    .offset([0, 20])
    .html(function(d) {
        return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });

/*var tip2 = d3.tip()
    .attr('class', 'd3-tipTwo d3-tooltip')
    .direction('e')
    .offset([0, 20])
    .html(function(d) {
        return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });

var tip3 = d3.tip()
    .attr('class', 'd3-tipThree d3-tooltip')
    .direction('e')
    .offset([0, 20])
    .html(function(d) {
        return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });

var tip4 = d3.tip()
    .attr('class', 'd3-tipFour d3-tooltip')
    .direction('e')
    .offset([0, 20])
    .html(function(d) {
        return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });*/


// Read in .csv data and make graph
d3.csv("data/data.csv", function(error, data) {
    // var parseDate = d3.time.format("%Y-%m-%d");;
    // var format = d3.time.format("%Y-%m-%d");
    var i = 2;
    data.forEach(function(d) {
        d.col1 = +d["P53KO-O1"];
        d.col2 = +d["p53KO-O2"];
        d.avgP53 = (d.col1+d.col2)/2;
        d.col3 = +d["p53KO-O-CAS1"];
        d.col4 = +d["p53KO-O-CAS2"];
        d.avgCAS = (d.col3+d.col4)/2;
        d.col5 = +d["p53KO-O-RAS1"];
        d.col6 = +d["p53KO-O-RAS2"];
        d.avgRAS = (d.col5+d.col6)/2;
        d.col7 = +d["WT-O1"];
        d.col8 = +d["WT-O2"];
        d.avgWT = (d.col7+d.col8)/2;
        d.id = i++;
    });

    globalData = data;

    var svg1 = d3.select("#column1").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 70 + "," + 10 + ")");
    barChart(svg1);
    var svg2 = d3.select("#column2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 70 + "," + 10 + ")");
    barChart(svg1);
    var svg3 = d3.select("#column3").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 70 + "," + 10 + ")");
    barChart(svg1);
    var svg4 = d3.select("#column4").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 70 + "," + 10 + ")");

    // roseChart(data);

});


function barChart(svg) {
    // console.log(data);
    var allData =globalData;
    var minVal = (d3.min(globalData, function(d) { return d.avgP53; }));
    var maxVal = (d3.max(globalData, function(d) { return d.avgP53; }));

    var width =  600;
    var height = 130;
    avgP53Val = d3.extent(globalData.map(function (d) {
        return (d.avgP53);
    }))
    avgCASVal = d3.extent(globalData.map(function (d) {
        return (d.avgRAS);
    }))
    if(avgCASVal[1]>avgP53Val)
        finalHighVal = avgCASVal[1];

    avgRASVal = d3.extent(globalData.map(function (d) {
        return (d.avgRAS);
    }))
    if(avgRASVal[1]>finalHighVal)
        finalHighVal = avgRASVal[1];

    colWTVal = d3.extent(globalData.map(function (d) {
        return (d.avgWT);
    }))
    if(colWTVal[1]>finalHighVal)
        finalHighVal = colWTVal[1];

    console.log(finalHighVal);


    lineColor.domain([0, finalHighVal]);

    var x = d3.scaleLinear()
        .domain([0,1])
        .range([0, width-80]);

    var y = d3.scaleLinear()
        .domain([0, finalHighVal])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(0)

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)

    var count = 0;
    // put the graph in the "twitterViz" div

    var attrX = 1;
    svg.call(tip1);
    // set up the bars
    var bar = svg.selectAll(".bar")
        .data(globalData)
        .enter().append("rect")
        .attr("id", function(d, i){
            return "avgP53"+d.id;
        })
        .attr("x", function(d,i){
            if((d.avgP53+d.avgCAS+d.avgRAS+d.avgWT)>1000){
                // console.log((d.avgP53+d.avgCAS+d.avgRAS+d.avgWT))
                count++;
                return attrX+(count);

            }
        })
        .attr("width", 2)
        .attr("y", function(d){
            if((d.avgP53+d.avgCAS+d.avgRAS+d.avgWT)>1000)
                return y(d.avgP53);
        })
        .attr("height", function(d) {
            if((d.avgP53+d.avgCAS+d.avgRAS+d.avgWT)>1000)
                return height - y(d.avgP53); })
        .attr("fill", function(d){
            if((d.avgP53+d.avgCAS+d.avgRAS+d.avgWT)>1000)
                return lineColor(d.avgP53);
        })
        .on('mouseover', function(d){
            var tipContent = "";
            tipContent = tipContent + '<tr><td>' + d.chr + "</td>" + '<td>' +d.start + '</td><td>' +d.end + '</td><td>' + d.strand +'</td><td>' +d.symbol +'</td><td>' +d.length + '</td><td>' + d.col1 + '</td><td>' +d.col2  + '</td><td>' +d.col3 + '</td><td>' +d.col4 + '</td><td>' +d.col5+ '</td><td>' +d.col6+ '</td><td>' +d.col7+ '</td><td>' +d.col8 + "</td></tr>";
            tip1.show(tipContent, this);
            selectId = "#avgP53" + d.id;
            d3.select(selectId)
                .attr("fill", "#ff8707");

            selectId = "#avgCAS" + d.id;
            d3.select(selectId)
                .attr("fill", "#ff8707");

            selectId = "#avgRAS" + d.id;
            d3.select(selectId)
                .attr("fill", "#ff8707");

            selectId = "#avgWT" + d.id;
            d3.select(selectId)
                .attr("fill", "#ff8707");

            d3.select("#roseChart svg").remove();
            roseChart(d);

            d3.select("#roseChart svg").remove();
            roseChart(d);
        })
        .on('mouseout', function(d){
            tip1.hide();
            selectId = "#avgP53" + d.id;
            d3.select(selectId)
                .attr("fill", function(d){
                    return lineColor(d.avgP53);
                })

            selectId = "#avgCAS" + d.id;
            d3.select(selectId)
                .attr("fill", function(d){
                    return lineColor(d.avgCAS);
                })

            selectId = "#avgRAS" + d.id;
            d3.select(selectId)
                .attr("fill", function(d){
                    return lineColor(d.avgRAS);
                })
            selectId = "#avgWT" + d.id;
            d3.select(selectId)
                .attr("fill", function(d){
                    return lineColor(d.avgWT);
                })
        })
    // add the x axis and x-label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", "-50")
        .attr("transform", "rotate(-90)");
    svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", 600)
        .text("");
    // add the y axis and y-label
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
    svg.append("text")
        .attr("class", "ylabel")
        .attr("y", 10) // x and y switched due to rotation
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Value");
}



function updateChartsAscending(){
    console.log("yes")
    globalData.sort(function(a, b) {
        return a.avgP53 - b.avgP53;
    });
    d3.select("#column1 svg").remove();
    d3.select("#column3 svg").remove();
    d3.select("#column5 svg").remove();
    d3.select("#chart4 svg").remove();
    chartOne(globalData);
    chartTwo(globalData);
    chartThree(globalData);
    chartFour(globalData);

}

function updateChartsDescending(){
    console.log("yes")
    globalData.sort(function(a, b) {
        return b.avgP53 - a.avgP53;
    });
    d3.select("#column1 svg").remove();
    d3.select("#column3 svg").remove();
    d3.select("#column5 svg").remove();
    d3.select("#chart4 svg").remove();
    chartOne(globalData);
    chartTwo(globalData);
    chartThree(globalData);
    chartFour(globalData);

}
function updateChartsReset(){
    console.log("yes")
    globalData.sort(function(a, b) {
        return a.id - b.id;
    });
    d3.select("#column1 svg").remove();
    d3.select("#column3 svg").remove();
    d3.select("#column5 svg").remove();
    d3.select("#chart4 svg").remove();
    chartOne(globalData);
    chartTwo(globalData);
    chartThree(globalData);
    chartFour(globalData);

}

function roseChart(dataVal){
    var data = [];
    data.push(dataVal);
    var rose = Chart.rose(),
        height = 400,
        format = d3.timeParse('%m/%Y'),
        causes = ['disease', 'wounds', 'other'],
        labels = ['53KO', 'CAS', 'RAS', 'WT'];

    console.log(data)
    // Load the JSON data:
    // d3.json('data.json', function( data ) {
    // Data from: http://ocp.hul.harvard.edu/dl/contagion/010164675
    var dataObj = [];
    // Format the date and rework the data:
    var scalar;
    data.forEach( function(d,i) {
        var obj1 = {"val": d.avgP53, "label": labels[0]};
        dataObj.push(obj1);
        var obj2 = {"val": d.avgCAS, "label": labels[1]};
        dataObj.push(obj2);
        var obj3 = {"val": d.avgRAS, "label": labels[2]};
        dataObj.push(obj3);
        var obj4 = {"val": d.avgWT, "label": labels[3]};
        dataObj.push(obj4);
    } );
    data = dataObj;
    // Get the maximum value:
    var maxVal = finalHighVal;

    // Where the maximum value gives us the maximum radius:
    var maxRadius = Math.sqrt(maxVal*12 / Math.PI);

    // Divide the dataset in two:
    // var dataset2 = data.slice(12,24),
    // dataset1 = data.slice(0,12);

    // Append a new figure to the DOM:
    figure = d3.select( 'body' )
        .append( 'figure' );

    // Get the figure width:
    width = 600;

    // Update the chart generator settings:
    rose.legend( causes )
        .width( width )
        .height( height )
        .delay( 0 )
        .duration( 500 )
        .domain( [0, maxRadius] )
        .angle( function(d,i) {  console.log(d); return i; } )
        .area( function(d, i) { return [d.val]; } );

    // Bind the data and generate a new chart:
    figure.datum( data )
        .attr('class', 'chart figure1')
        .call( rose );

    // Append a new figure to the DOM:
    figure = d3.select( 'body' )
        .append( 'figure' );

    // Get the figure width:
    width = 600;

    // Update the chart generator settings:
    rose.width( width )
        .delay( 100 );
    // });

}

