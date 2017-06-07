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
var width =500;
var height =180;
var minPValue = 0.2;


var lineColor = d3.scaleLinear()
    .domain([0,100])
    .range([ '#f00','#00f'])

var typeColor = function(){
    return "#000";
}
//d3.scaleOrdinal(d3.schemeCategory10);

var tip1 = d3.tip()
    .attr('class', 'd3-tip d3-tooltip')
    .direction('e')
    .offset([0, 20])
    .html(function(d) {
        return d;
        // return '<table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>name</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>' + d + "</table>";
    });

var svg1,svg2,svg3,svg4,svgRight11, svgRight21, svgRight31, svgRight41,svgRight12, svgRight22, svgRight32, svgRight42;
var svgRights = [];
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
        return  proteinarr.indexOf(d.symbol.toLowerCase())>=0;
    });
     svg1 = d3.select("#column1").append("svg")
         .attr("id","svg1")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg2 = d3.select("#column2").append("svg")
         .attr("id","svg2")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg3 = d3.select("#column3").append("svg")
         .attr("id","svg3")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
     svg4 = d3.select("#column4").append("svg")
         .attr("id","svg4")
        .attr("width", width-10)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 0 + ")");
    svgRight11 = d3.select("#right1").append("svg")
        .attr("width", 200)
        .attr("height", height+62)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 40 + ")");
    svgRight21 = d3.select("#right2").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRight31 = d3.select("#right3").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRight41 = d3.select("#right4").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRight12 = d3.select("#right1").append("svg")
        .attr("width", 200)
        .attr("height", height+62)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 40 + ")");
    svgRight22 = d3.select("#right2").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRight32 = d3.select("#right3").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRight42= d3.select("#right4").append("svg")
        .attr("width", 200)
        .attr("height", height+32)
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");
    svgRights.push(svgRight11);
    svgRights.push(svgRight21);
    svgRights.push(svgRight31);
    svgRights.push(svgRight41);
    svgRights.push(svgRight12);
    svgRights.push(svgRight22);
    svgRights.push(svgRight32);
    svgRights.push(svgRight42);

    barChart(svg1, vars[0]);
    barChart(svg2, vars[1]);
    barChart(svg3, vars[2]);
    barChart(svg4, vars[3]);

    scatterPlot();
    BubbleChart();
    ProteinForceDirectedGraph();
    updateProteinTransparent(globalData);
});

var maxV;
var minV;
var ProteinScale = d3.scaleLinear()
    .domain([-7.8, 8.48])
    .range([3, 13]);
function barChart(svg, varName) {
    var height = 100;
    maxV = 0;
    minV = 0;
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

    // Draw the top
    for (var v = 0; v < 4; v++) {
        globalData.sort(function(a, b) {   // Order by average P53 by default
            return b[vars[v]] - a[vars[v]];
        });

        svgRights[v].selectAll("*").remove();
        addBarChart(globalData[0],svgRights[v],v,"Highest ");
    }
    // Draw the bottom
    for (var v = 0; v < 4; v++) {
        globalData.sort(function(a, b) {   // Order by average P53 by default
            return a[vars[v]] - b[vars[v]];
        });

        svgRights[4+v].selectAll("*").remove();
        addBarChart(globalData[0],svgRights[4+v],v,"Lowest ");
    }


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
        .attr("width", 3)
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
        .attr("fill-opacity", function(d){
                return minPValue+d["PValue"+varName]*(1-minPValue);
        })
        .on('mouseover', function(d,i){
           var ul = document.createElement("ul");
           var index=1;
            data.children.forEach(function (c) {
                if(c.protein.indexOf(d.symbol.toUpperCase())>=0){
                    var li = document.createElement("li");
                    li.style.textShadow="1px 1px #000000";
                    li.style.color = getColor(c.index);
                    li.innerHTML=index+". "+c.name;
                    ul.appendChild(li);
                    index++;
                }
            });
            var tipContent = '<p> Name: ' + d.Name + '</p><table id="tiptable">' + '<tr><td> chr</td><td> start</td><td> end </td><td> strand </td><td> symbol </td><td> length</td><td> P53KO-O1 </td><td> P53KO-O2 </td><td> p53KO-O-CAS1 </td><td>p53KO-O-CAS2</td><td>p53KO-O-RAS1 </td><td>p53KO-O-RAS2 </td><td> WT-O1 </td><td> WT-O2</td>' 
            + '<td>'+vars[0]+'</td>'
            + '<td>'+vars[1]+'</td>'
            + '<td>'+vars[2]+'</td>'
            + '<td>'+vars[3]+'</td></tr>';
            tipContent = tipContent + '<tr><td>' + d.chr + "</td>" + '<td>' +d.start + '</td><td>' +d.end + '</td><td>' + d.strand +'</td><td><b>' +d.symbol + '</b></td><td>' +d.length + '</td><td>' + d.col1 + '</td><td>' +d.col2  + '</td><td>' +d.col3 + '</td><td>' +d.col4 + '</td><td>' +d.col5+ '</td><td>' +d.col6+ '</td><td>' 
                            +d.col7+ '</td><td>' +d.col8 + '</td><td>' +d[vars[0]] + '</td><td>' +d[vars[1]] + '</td><td>' +d[vars[2]] + '</td><td>' +d[vars[3]] + '</td></tr></table>';
             if(hBCount!=0){
                     d3.select("#hoverBar svg").remove();
                     hBCount++;
             }
            var barsvg = d3.select("#hoverBar").append("svg")
                 .attr("class", "mouseOverBar")
                .attr("width", 200)
                .attr("height", 200)
                .append("g")
                .attr("transform", "translate(" + 30 + "," + 0 + ")");

             addBarChart(d,barsvg);
             hBCount++;
             var hoverData = d3.select("#hoverBar");
             tipContent = tipContent  + hoverData._groups[0][0].innerHTML+"<br><br> Related Cancers: "+ ul.outerHTML;

             tip1.show(tipContent, this);
            d3.select("#hoverBar svg").remove();
            mouseOver(i);

            //Process protein
            var protein = d3.select("#svgprotein").selectAll("g");
            protein.style("opacity",0.1);
            d3.selectAll("#"+d.symbol.toUpperCase()).style("opacity",1);

            //process studies
            var bubble = d3.select("#svgbubble").selectAll(".gnode");
            bubble.style("opacity",function (b) {
                if(b.data.protein.indexOf(d.symbol.toUpperCase())==-1) return 0.1;
                else return 1;
            })


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
             ProteinForceDirectedGraph();
            updateProteinTransparent(globalData);
            var protein = d3.select("#svgprotein").selectAll("g");
            protein.style("opacity",1);

            //process studies
            var bubble = d3.select("#svgbubble").selectAll(".gnode");
            bubble.style("opacity",1)

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
        bars[vars[v]].transition().duration(50)
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

function addBarChart(data,barsvg,varIndex,str){
    var height = 100;
     var barsVal = [];
        barsVal[0] = +data['RAS/CAS'];
        barsVal[1] = +data['RAS/WT'];
        barsVal[2] = +data['P53KO/WT'];
        barsVal[3] = +data['CAS/WT'];

  lineColor.domain([finalLowVal, finalHighVal]);
    var x = d3.scaleLinear()
        .domain([0,1])
        .range([0, height]);
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
            // console.log(d)
            return 2+i*25;
        })
        .attr("width", 24)
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
        .attr("fill-opacity", function(d,i){
            var val = minPValue+data["PValue"+vars[i]]*(1-minPValue);
            return val;
        });

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
    if (varIndex!=undefined){
        barsvg.append("text")
            .attr("class", "titleRight ")
            .attr("y", 0)
            .attr("x", 60)
            .style("text-anchor", "middle")
            .text(str+vars[varIndex]);
    }
    barsvg.append("text")
        .attr("class", "titleRight ")
        .attr("y", 200)
        .attr("x", 60)
        .style("text-anchor", "middle")
        .text("Gene symbol="+data.symbol );

}



function updateChartsAscending(varName){
    var stepX = (width-50)/globalData.length;
    globalData.sort(function(a, b) {   // Order by average P53 by default
        return b[varName] - a[varName];
    });
    globalData.forEach(function (d,i) {
        d.x = i*stepX;
        globalProtein.nodes.forEach(function (p) {
            if(d.symbol.toLowerCase()==p.label.toLowerCase()){
                p.pie.forEach(function (data) {
                    data.radius=ProteinScale(+d[varName]);
                })

            }
        })
    });
    for (var v = 0; v<4;v++) {
        bars[vars[v]].transition().duration(500)
            .attr("x", function (d) {
                return d.x;
            });
    }
    ProteinForceDirectedGraph();
    updateProteinTransparent(globalData);
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
    ProteinForceDirectedGraph();
    updateProteinTransparent(globalData);
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
function scatterPlot(){
    var data = globalData;
    var width = 1500,
        size = 150,
        padding = 20;

    var x = d3.scaleLinear()
        .range([padding / 2, size - padding / 2]);
        // .range([0,1])

    var y = d3.scaleLinear()
        .range([size - padding / 2, padding / 2]);
        // .range([0,1])


    var x1 = d3.scaleLinear()
        .range([padding / 2, size - padding / 2]);
        // .range([-1,1])

    var y1 = d3.scaleLinear()
        .range([size - padding / 2, padding / 2]);
        // .range([-1,1])

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(6);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(6);


      var domainByTrait = {},
          traits = ["RAS/CAS","RAS/WT","P53KO/WT","CAS/WT","avgP53","avgCAS","avgRAS","avgWT"],
              // traits = ["avgP53","avgCAS","avgRAS","avgWT"],

          n = traits.length;

         // console.log(traits)
     var count = 1;
      traits.forEach(function(trait) {
       // console.log(d3.extent(data, function(d) { return d[trait]; }))
        // domainByTrait[trait] = [finalLowVal, finalHighVal];
        if(count>4)
         domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
        else
        {
            domainByTrait[trait] = [finalLowVal, finalHighVal];
            count++;
        }
      });

      xAxis.tickSize(size * n);
      yAxis.tickSize(-size * n);

      var svg = d3.select("#sPlot").append("svg")
        .attr("class", "scatterSvg")
          .attr("width", size * (n+.5) + padding)
          .attr("height", size * (n+.5) + padding)
        .append("g")
          .attr("transform", "translate(" + 50 + "," + padding / 2 + ")");

      svg.selectAll(".x.axis")
          .data(traits)
        .enter().append("g")
          .attr("class", "x axis")
          .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
          .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

      svg.selectAll(".y.axis")
          .data(traits)
        .enter().append("g")
          .attr("class", "y axis")
          .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
          .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

      var cell = svg.selectAll(".cell")
          .data(cross(traits, traits))
        .enter().append("g")
          .attr("class", "cell")
          .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
          .each(plot);

      // Titles for the diagonal.
      cell.filter(function(d) { return d.i === d.j; }).append("text")
          .attr("x", padding)
          .attr("y", padding)
          .attr("dy", ".71em")
          .text(function(d) { return d.x; });

      // cell.call(brush);
        svg.call(tip1);
      function plot(p) {
        var cell = d3.select(this);
        // console.log(p)
        x.domain(domainByTrait[p.x]);
        y.domain(domainByTrait[p.y]);
        x1.domain(domainByTrait[p.x]);
        y1.domain(domainByTrait[p.y]);

        cell.append("rect")
            .attr("class", "frame")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);

        cell.selectAll("circle")
            .data(data)
          .enter().append("circle")
            .attr("cx", function(d) { 
                // if(d[p.x] > finalHighVal)
                return x(d[p.x]); })
            .attr("cy", function(d) { 
                // if(d[p.y] > finalHighVal)
                return y(d[p.y]); })
            .attr("r", 2)
            // .style("fill", function(d,i) { 
            //   // console.log(d);
            //   return "#000"; })
            .on('mouseover', function(d,i){
                var tipContent = '<p><b>Name: </b>' + d.Name + '</p><table id="tiptable">' + '<tr><th> <b>chr</th><th> <b>start</th><th> <b>end</b> </th><th> <b>strand</b> </th><th> <b>symbol</b> </th><th> <b>length</b> </th><th> <b>P53KO-O1</b> </th><th> <b>P53KO-O2</b> </th><th> <b>p53KO-O-CAS1</b> </th><th> <b>p53KO-O-CAS2</b> </th><th> <b>p53KO-O-RAS1</b> </th><th> <b>p53KO-O-RAS2</b> </th><th> <b>WT-O1</b> </th><th> <b>WT-O2</b> </th></tr>';
                tipContent = tipContent + '<tr><td>' + d.chr + "</td>" + '<td>' +d.start + '</td><td>' +d.end + '</td><td>' + d.strand +'</td><td>' +d.symbol + '</td><td>' +d.length + '</td><td>' + d.col1 + '</td><td>' +d.col2  + '</td><td>' +d.col3 + '</td><td>' +d.col4 + '</td><td>' +d.col5+ '</td><td>' +d.col6+ '</td><td>' +d.col7+ '</td><td>' +d.col8 + "</td></tr></table>";
                    if(hBCount!=0){
                         d3.select("#hoverBar svg").remove();
                         hBCount++;
                     }
                var barsvg = d3.select("#hoverBar").append("svg")
                     .attr("class", "mouseOverBar")
                    .attr("width", 200)
                    .attr("height", 200)
                    .append("g")
                    .attr("transform", "translate(" + 30 + "," + 0 + ")");

                 addBarChart(d,barsvg);
                 hBCount++;
                 var hoverData = d3.select("#hoverBar"); 
                 tipContent = tipContent  + hoverData._groups[0][0].innerHTML;
                 tip1.show(tipContent, this);
                d3.select("#hoverBar svg").remove();

            })
            .on('mouseout', function(d){
                tip1.hide();
                d3.select("#hoverBar svg").remove();
            })

  }

  var brushCell;

  // Clear the previously-active brush, if any.
  function brushstart(p) {
    if (brushCell !== this) {
      d3.select(brushCell).call(brush.clear());
      x.domain(domainByTrait[p.x]);
      y.domain(domainByTrait[p.y]);
      brushCell = this;
    }
  }

  // Highlight the selected circles.
  function brushmove(p) {
    var e = brush.extent();
    svg.selectAll("circle").classed("hidden", function(d) {
      return e[0][0] > d[p.x] || d[p.x] > e[1][0]
          || e[0][1] > d[p.y] || d[p.y] > e[1][1];
    });
  }

  // If the brush is empty, select all circles.
  function brushend() {
    if (!brush) svg.selectAll(".hidden").classed("hidden", false);
  }
// });

function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
  return c;
}
}
