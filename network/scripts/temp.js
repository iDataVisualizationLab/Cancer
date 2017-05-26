/**
 * Created by vinhtngu on 3/14/17.
 */
d3.select("#bubbleset").select("svg").remove();
var width = 500,
    height = 500;

// The color functions: in this example I'm coloring all the convex hulls at the same layer the same to more easily see the result.
var color = d3.scale.linear().domain([-2, 4]).range(["#252525", "#cccccc"]), //This is used to scale the gray color based on the propertyValue
    groupHullColor = "#e7cb94",  //d3.scale.category10(),
    subgroupHullColor = " #9ecae1",
    subsubgroupHullColor = "#ff9896";

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#bubbleset").append("svg")
    .attr("width", width)
    .attr("height", height);

var theGraphData = {
    "nodes":[
        {"id":0,"propertyValue":0.8},
        {"id":1,"propertyValue":1.0},
        {"id":2,"propertyValue":0.5},
        {"id":3,"propertyValue":0.8},
        {"id":4,"propertyValue":0.6},
        {"id":5,"propertyValue":0.3},
        {"id":6,"propertyValue":0.5},
        {"id":7,"propertyValue":0.2},
        {"id":8,"propertyValue":0.05},
    ],
    "links":[
        {"source":2,"target":0,"value":1},
        {"source":2,"target":1,"value":8},
        {"source":8,"target":2,"value":10},
        {"source":3,"target":2,"value":6},
        {"source":4,"target":2,"value":1},
        {"source":3,"target":4,"value":1},
        {"source":3,"target":5,"value":6},
        {"source":4,"target":5,"value":1},
        {"source":4,"target":6,"value":1},
        {"source":6,"target":7,"value":1},
        {"source":0,"target":1,"value":3}
    ]
}

graph = theGraphData

// The data for grouping nodes.
// The groups are not partitions, some nodes belong to more than one group.
// The subgroups and the subsubgroups are (possibly non-exhaustive) subsets of the higher layer (incomplete hierarchy).
var groups = [[0,1,2,3,4],[3,4,5],[4,6,7]];
var subgroups = [[0,1,2],[5],[6,7]];
var subsubgroups = [[0,1],[5],[7]];

// This takes the list of group members and converts into lists lof lists of nodes
var groupNodes = groups.map(function(group,index){
    return group.map(function(member){return graph.nodes[member] });
});
var subgroupNodes = subgroups.map(function(group,index){
    return group.map(function(member){return graph.nodes[member] });
});
var subsubgroupNodes = subsubgroups.map(function(group,index){
    return group.map(function(member){return graph.nodes[member] });
});
//console.log(subgroupNodes);

var minNodeSize = 2
function radiusOf(element) {return (minNodeSize + (8 * Math.sqrt(element.propertyValue))) };

var groupPath = function(d) {
    var fakePoints = [];
    d.forEach(function(element) { fakePoints = fakePoints.concat([   // "0.7071" is the sine and cosine of 45 degree for corner points.
        [(element.x), (element.y + (radiusOf(element) - minNodeSize))],
        [(element.x + (0.7071 * (radiusOf(element) - minNodeSize))), (element.y + (0.7071 * (radiusOf(element) - minNodeSize)))],
        [(element.x + (radiusOf(element) - minNodeSize)), (element.y)],
        [(element.x + (0.7071 * (radiusOf(element) - minNodeSize))), (element.y - (0.7071 * (radiusOf(element) - minNodeSize)))],
        [(element.x), (element.y - (radiusOf(element) - minNodeSize))],
        [(element.x - (0.7071 * (radiusOf(element) - minNodeSize))), (element.y - (0.7071 * (radiusOf(element) - minNodeSize)))],
        [(element.x - (radiusOf(element) - minNodeSize)), (element.y)],
        [(element.x - (0.7071 * (radiusOf(element) - minNodeSize))), (element.y + (0.7071 * (radiusOf(element) - minNodeSize)))]
    ]); })
    return "M" + d3.geom.hull( fakePoints ).join("L") + "Z";
};

var groupHullFill = function(d, i) { return groupHullColor; };
var subgroupHullFill = function(d, i) { return subgroupHullColor; };
var subsubgroupHullFill = function(d, i) { return subsubgroupHullColor; };

force
    .nodes(graph.nodes)
    .links(graph.links)
    .linkDistance(function(thisLink) {
        var myLength = 100, theSource = thisLink.source, theTarget = thisLink.target;
        groupNodes.forEach(function(groupList) {
            if (groupList.indexOf(theSource) >= 0 && groupList.indexOf(theTarget) >= 0) {
                myLength = myLength * 0.7;
            }
        });
        subgroupNodes.forEach(function(groupList) {
            if (groupList.indexOf(theSource) >= 0 && groupList.indexOf(theTarget) >= 0) {
                myLength = myLength * 0.4;
            }
        });
        subsubgroupNodes.forEach(function(groupList) {
            if (groupList.indexOf(theSource) >= 0 && groupList.indexOf(theTarget) >= 0) {
                myLength = myLength * 0.2;
            }
        });
        return myLength; } )
    .linkStrength(function(l, i) { return 1; } )
    .gravity(0.05)
    .charge(-600)
    .friction(0.5)
    .start();

var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", function(d) { return radiusOf(d); })
    .style("fill", function(d) { return color(d.propertyValue); })
    .style("stroke-width", 1.5)
    .call(force.drag);

node.append("title")
    .text(function(d) { return d.name; });

force.on("tick", function() {

    /*
     // This part works to get the subsubgroup nodes to be fixed along a circle
     // use to scale node index to theta value
     var scale = d3.scale.linear()
     .domain([0, subsubgroupNodes.length])
     .range([0, 2 * Math.PI]);

     // calculate theta for each subsubgroup
     subsubgroupNodes.forEach(function(group, i) {
     // calculate polar coordinates
     var theta = scale(i);
     var radius = 150;
     group.forEach(function(element, k){
     // convert to cartesian coordinates for each node in the subsubgroup
     element.x = (width / 2) + (radius * Math.sin(theta + k));   //fix this so it spaces out multi-element groups
     element.y = (height / 2) + (radius * Math.cos(theta + k));
     });
     }); */

    // this updates the convex hulls
    svg.selectAll("path").remove()

    svg.selectAll("path#group")
        .data(groupNodes)
        .attr("d", groupPath)
        .enter().insert("path", "circle")
        .style("fill", groupHullFill)
        .style("stroke", groupHullFill)
        .style("stroke-width", 10)
        .style("stroke-linejoin", "round")
        .style("opacity", .2)
        .attr("ID","group")
        .attr("d", groupPath);

    svg.selectAll("path#subgroup")
        .data(subgroupNodes)
        .attr("d", groupPath)
        .enter().insert("path", "circle")
        .style("fill", subgroupHullFill)
        .style("stroke", subgroupHullFill)
        .style("stroke-width", 10)
        .style("stroke-linejoin", "round")
        .style("opacity", .8)
        .attr("ID","subgroup")
        .attr("d", groupPath);

    svg.selectAll("path#subsubgroup")
        .data(subsubgroupNodes)
        .attr("d", groupPath)
        .enter().insert("path", "circle")
        .style("fill", subsubgroupHullFill)
        .style("stroke", subsubgroupHullFill)
        .style("stroke-width", 5)
        .style("stroke-linejoin", "round")
        .style("opacity", 1)
        .attr("ID","subsubgroup")
        .attr("d", groupPath);

    // this redraws the links on top of the convex hulls
    svg.selectAll("line").remove()
    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    // this redraws the nodes on top of the links and convex hulls
    svg.selectAll("circle").remove()
    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 3)
        .style("fill", function(d) { return color(d.propertyValue); })
        .style("stroke-width", 1.5)
        .call(force.drag);

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

});
