/* 2016 
 * Tuan Dang (on the BioLinker project, as Postdoc for EVL, UIC)
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */
 
var y_svg;
var cellHeight2 = 11;
var graphs = {};
var mutiPlanes = mutiPlanes || {};

graphs["Context_Species"] = {};
graphs["Context_Species"]["nouse"]= {};
graphs["Context_Species"]["nouse"].nodes = [];
graphs["Context_Species"]["nouse"].links = [];

function addStacking(){

  y_svg = 0; // inital y position     

    mutiPlanes.clear();

    var sortedInteractionTypes = addStacking2("type", "Interaction types");
    mutiPlanes.setInteractionTypeNetworks(sortedInteractionTypes["tip_type"]);

    var sortedContextSpecies = addStacking2("Context_Species", "Context-Species", speciesMap);
    mutiPlanes.setSpeciesNetworks(sortedContextSpecies["tip_Context_Species"]);

    var sortedContextCellType = addStacking2("Context_CellType", "Context-CellType",celltypeMap);
    mutiPlanes.setCellTypeNetworks(sortedContextCellType["tip_Context_CellType"]);

    var sortedContextOrgan = addStacking2("Context_Organ", "Context-Organ", organMap);
    mutiPlanes.setOrganNetworks(sortedContextOrgan["tip_Context_Organ"]);


    mutiPlanes.runNetwork();


    d3.select(".contextView")
    .attr("height", y_svg+10);

}  

function addStacking2(fieldName,label, map){
  y_svg += 18; // inital y position     
  console.log(fieldName+" "+y_svg);
  var obj = {};
  sort_tlinks(); // In TimeArcs.js 

   // Compute statistics for neighbors ***************************************
  var types = new Object();
  for (var i=0; i<tlinks.length;i++){
    var l = tlinks[i];

    var name = getContextFromID(""+l.ref[fieldName],map);
    if (name==undefined)
      name="?";
    l[fieldName+"_name"] = name;
    if (types[name]==undefined){
        types[name] = new Object();
        types[name].count = 1;
    }
    else{
        types[name].count++;   
    }
    if (types[name].list==undefined)
      types[name].list = [];
    types[name].list.push(l); 
  }
        
  if (obj["tip_"+fieldName]==undefined){
    obj["tip_"+fieldName] = [];
    obj["ylabel_"+fieldName] = y_svg-4;
    for (key in types) {
      var e= new Object;
      e[fieldName] = key;
      e.count= types[key].count;
      e.list= types[key].list;        
      obj["tip_"+fieldName].push(e);
      obj["tip_"+fieldName][e[fieldName]] =e; // hash from type to the actual element
    }
  }

  // Sort by number of links for each type
  obj["tip_"+fieldName].sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  });  
  // Initialize the type list postion and values
  obj["tip_"+fieldName].forEach(function(e){
    e.yStacking = y_svg;  
    y_svg+=cellHeight2;  // the next y position
    e.isEnable = true;
    e.backgroundColor = "#fff";
    e.stroke= "#000";    
  });


     


    function mouseoverType(d){
      svgContext.selectAll(".tipTypeRect_"+fieldName)
          .style("fill" , function(d2){
            if (d[fieldName]==d2[fieldName]){
              return "#fca";
            }
            else
              return d2.backgroundColor;
      });  

      // Link brushing to other views
      for (var i=0;i<tlinks.length;i++){
        tlinks[i].mouseover = false;
      } 

      for (var i=0; i<d.list.length;i++){
         d.list[i].mouseover = true;
      }   
      updateLinks();
    } 

    function mouseoutType(d2){
      setTypeColor(d2);
      resetLinks();  
    } 
    
    function clickType(d2){
      d2.isEnable = !d2.isEnable;
      for (var i=0; i<curNode.directLinks.length;i++){
        var l = curNode.directLinks[i];
        item.isEnable = d2.isEnable;
      }
      setTypeColor(d2);
    } 

    function setTypeColor(d2){

    }



  obj["tip_"+fieldName].forEach(function(d2){   // make sure disable types are greyout on the second mouse over
    mouseoutType(d2);
  });

  return obj;
}

function getContextFromID(id_, map){
  if (id_.indexOf("uniprot:")>-1){
    var id = id_.replace("uniprot:","");
    return uniprotMap[id];
  }
  else if (id_.indexOf("taxonomy:")>-1){
    var id = id_.replace("taxonomy:", "");
    return map[id];
  }
  else if (id_.indexOf("uazid:")>-1){
    var id = id_.replace("uazid:", "");
    return map[id];
  } 
  else{
    return id_;
  } 
}  
