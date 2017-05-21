/* 2017
 * Tommy Dang (on the Cancer project, as Assistant Professor at TTU)
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

// This is the MAIN class javasrcipt
var globalData;
var termsData;
var finalHighVal=0;
var finalLowVal = 0;
var hBCount = 0;

var width =1000;
var height =205;


var lineColor = d3.scaleLinear()
    .domain([0,100])
    .range([ '#f00','#00f'])

var typeColor = d3.scaleOrdinal(d3.schemeCategory10);




var tip1 = d3.tip()
    .attr('class', 'd3-tip d3-tooltip')
    .direction('e')
    .offset([0, 120])
    .html(function(d) {
        return d;
        // return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>name</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });

var svg1,svg2,svg3,svg4,svgRight1, svgRight2, svgRight3, svgRight4;
var vars = ["RAS/CAS","RAS/WT","P53KO/WT","CAS/WT"];
var avgVars = ["avgP53","avgCAS","avgRAS","avgWT"];
var bars={};
//d3.csv("data/data.csv", function(error, data) {
d3.csv("data/DATA_RKO2.csv", function(error, data) {
    var i = 1;
    globalData = data.filter(function(d) {
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

        var diff = 0.75;
        return  (d.avgP53+d.avgCAS+d.avgRAS+d.avgWT>500)
            && Math.abs(d[vars[0]])>diff
            && Math.abs(d[vars[1]])>diff
            && Math.abs(d[vars[2]])>diff
            && Math.abs(d[vars[3]])>diff;
    });

     svg1 = d3.select("#column1").append("svg")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg2 = d3.select("#column2").append("svg")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg3 = d3.select("#column3").append("svg")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg4 = d3.select("#column4").append("svg")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
    barChart(svg1, vars[0]);
    barChart(svg2, vars[1]);
    barChart(svg3, vars[2]);
    barChart(svg4, vars[3]);


    svgRight1 = d3.select("#right1").append("svg")
        .attr("width", width-10)
        .attr("height", height+45)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
    svgRight2 = d3.select("#right2").append("svg")
        .attr("width", width-10)
        .attr("height", height+23)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
    svgRight3 = d3.select("#right3").append("svg")
        .attr("width", width-10)
        .attr("height", height+23)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
    svgRight4 = d3.select("#right4").append("svg")
        .attr("width", width-10)
        .attr("height", height+23)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");

console.log(data);
});


function barChart(svg, varName) {
    var height = 100;
    var maxV = 0;
    var minV = 0;
    for (var v = 0; v<4;v++){
        var ext = d3.extent(globalData.map(function (d) {
            return +d[vars[v]];
        }))
        if(ext[1]>maxV)
            maxV = ext[1];
        if(ext[0]<minV)
            minV = ext[0];
    }

    lineColor.domain([minV, maxV]);
    finalLowVal = minV;
    finalHighVal = maxV;

    var x = d3.scaleLinear()
        .domain([0,1])
        .range([0, width-41]);

    var y = d3.scaleLinear()
        .domain([minV, maxV])
        .range([-height, height]);

    var y2 = d3.scaleLinear()
        .domain([-maxV, maxV])
        .range([height,-height]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(0)

    var yAxis = d3.axisLeft()
        .scale(y2)
        .ticks(5)


    globalData.sort(function(a, b) {   // Order by average P53 by default
        return b.avgP53 - a.avgP53;
    });

    svg.call(tip1);
    // set up the bars
    var stepX = (width-10)/globalData.length;
    bars[varName] = svg.selectAll(".bar")
        .data(globalData)
        .enter().append("rect")
        .attr("id", function(d, i){
            return varName.replace("/","")+d.id;
        })
        .attr("x", function(d,i){
            return i*stepX;
        })
        .attr("width", 2)
        .attr("y", function(d){
            if (y(d[varName])>=0)
                return height - y(d[varName]);
            else
                return height;
        })
        .attr("height", function(d) {
            if (y(d[varName])>=0)
                return y(d[varName]);
            else
                return -y(d[varName]);
        })
        .attr("fill", function(d){
                return typeColor(varName);
        })
        .attr("fill-opacity", 0.7)
        .on('mouseover', function(d,i){
            var tipContent = '<p><b>Name: </b>' + d.Name + '</p><table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>';
            tipContent = tipContent + '<tr><td>' + d.chr + "</td>" + '<td>' +d.start + '</td><td>' +d.end + '</td><td>' + d.strand +'</td><td>' +d.symbol + '</td><td>' +d.length + '</td><td>' + d.col1 + '</td><td>' +d.col2  + '</td><td>' +d.col3 + '</td><td>' +d.col4 + '</td><td>' +d.col5+ '</td><td>' +d.col6+ '</td><td>' +d.col7+ '</td><td>' +d.col8 + "</td></tr></table>";
             if(hBCount!=0){
                     d3.select("#hoverBar svg").remove();
                     hBCount++;
             }
            var barsvg = d3.select("#hoverBar").append("svg")
                .attr("width", 200)
                .attr("height", 200)
                .append("g")
                .attr("transform", "translate(" + 30 + "," + 0 + ")");
             hoverBar(d,barsvg);
             hBCount++;
             var hoverData = d3.select("#hoverBar"); 
             tipContent = tipContent  + hoverData._groups[0][0].innerHTML;
             tip1.show(tipContent, this);

            mouseOver(i);
        })
        .on('mouseout', function(d){
            tip1.hide();
            d3.select("#hoverBar svg").remove();
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
            for (var v = 0; v<4;v++) {
                var selectId = "#"+vars[v].replace("/","") + d.id;
                d3.select(selectId)
                    .attr("fill", typeColor(vars[v]));
            }
        })



    // add the x axis and x-label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", "-50")
        .attr("transform", "rotate(-90)");
    // add the y axis and y-label
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,100)")
        .call(yAxis);
    svg.append("text")
        .attr("class", "title")
        .attr("y", 14)
        .attr("x", (width / 2))
        .style("text-anchor", "middle")
        .text(varName);
}

function mouseOver(index) {
    for (var v = 0; v < 4; v++) {
        bars[vars[v]].transition().duration(500)
            .attr("stroke", function (d, i) {
                if (index == i) {
                    return "#000";
                }
            })
            .attr("fill", function (d, i) {
                if (index == i) {
                    return "#ff0";
                }
                else {
                    return typeColor(vars[v]);
                }
            });
    }
}

function hoverBar(data,barsvg){
    var height = 100;
     var barsVal = [];
        barsVal[0] = +data['RAS/CAS'];
        barsVal[1] = +data['RAS/WT'];
        barsVal[2] = +data['P53KO/WT'];
        barsVal[3] = +data['CAS/WT'];

  lineColor.domain([finalLowVal, finalHighVal]);
    var x = d3.scaleLinear()
        .domain([0,1])
        .range([0, width-80]);

    var y = d3.scaleLinear()
        .domain([finalLowVal, finalHighVal])
        .range([-height, height]);

    var y2 = d3.scaleLinear()
        .domain([-finalHighVal, finalHighVal])
        .range([height,-height]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(0)

    var yAxis = d3.axisLeft()
        .scale(y2)
        .ticks(5)


      var bar = barsvg.selectAll("rect")
        .data(barsVal)
        .enter().append("rect")
        .attr("x", function(d,i){
            console.log(d)
            return i*4;
        })
        .attr("width", 4)
        .attr("y", function(d){
            if (d>=0)
                return height - y(d);
            else
                return height;
        })
        .attr("height", function(d) {
            if (y(d)>=0)
                return y(d);
            else
                return -y(d);
        })
        .attr("fill", function(d,i){
                return typeColor(vars[i]);
        })
        .attr("fill-opacity", 0.7);

    // add the x axis and x-label
    barsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", "-50")
        .attr("transform", "rotate(-90)");
    // add the y axis and y-label
    barsvg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,100)")
        .call(yAxis);
    barsvg.append("text")
        .attr("class", "title")
        .attr("y", 14)
        .attr("x", (width / 2))
        .style("text-anchor", "middle")
        // .text(varName);
}



function updateChartsAscending(varName){
    var stepX = (width-50)/globalData.length;
    globalData.sort(function(a, b) {   // Order by average P53 by default
        return b[varName] - a[varName];
    });
    globalData.forEach(function (d,i) {
        d.x = i*stepX;
    });
    for (var v = 0; v<4;v++) {
        bars[vars[v]].transition().duration(500)
            .attr("x", function (d) {
                return d.x;
            });
    }
}

function updateChartsDescending(varName){
    var stepX = (width-50)/globalData.length;
    globalData.sort(function(a, b) {   // Order by average P53 by default
        return a[varName] - b[varName];
    });
    globalData.forEach(function (d,i) {
        d.x = i*stepX;
    });
    for (var v = 0; v<4;v++) {
        bars[vars[v]].transition().duration(500)
            .attr("x", function (d) {
                return d.x;
            });
    }
}
function updateChartsReset(varName){
    var stepX = (width-50)/globalData.length;
    globalData.sort(function(a, b) {   // Order by average P53 by default
        return b[varName] - a[varName];
    });
    globalData.forEach(function (d,i) {
        d.x = i*stepX;
    });
    for (var v = 0; v<4;v++) {
        bars[vars[v]].transition().duration(500)
            .attr("x", function (d) {
                return d.x;
            });
    }
}

