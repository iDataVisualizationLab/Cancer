var fs = require('fs');
var parse = require('csv-parse');
var jsonfile = require('jsonfile');



var file = 'cardsWithContextData.json';
var mappingUniprotToMgi = {};


var readExistingMGIId = function() {

    var ignoreHeader = true;
    fs.createReadStream('mgi-id-to-uniprot-id.csv')
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
                if (ignoreHeader) {
                    ignoreHeader = false;
                    return;
                }

                if (csvrow.length <8) {
                    return;
                }

                let uniProtIds = csvrow[7];
                if (uniProtIds.length < 1) {
                    return;
                }

                let ids = uniProtIds.match(/.{1,6}/g);
                ids.forEach(function (id) {
                    if (id.length < 6) {
                        console.log("Error with id: " + uniProtIds);
                        return;
                    }

                    mappingUniprotToMgi[id] = csvrow[2];

                });
        })
        .on('end',function() {
            jsonfile.readFile(file, handleReadContextCard);
        });
};

readExistingMGIId();

function handleReadContextCard(err, jsonData) {

    jsonfile.writeFile("my-mgi-cart-context.json", jsonData, {flag: 'a'}, function (err) {
        console.error(err)
    });

    // var myJson = JSON.stringify(jsonData);
    // writer.
    // debugger;
    // jsonData.forEach(function (d, index) {
    //     if (2000 < index && index < 3000) {  // Limit to 1000 first index cards ********************************************
    //         //var a = d.card.extracted_information.participant_a;
    //         //var b = d.card.extracted_information.participant_b;
    //         var a = d.extracted_information.participant_a;
    //         var b = d.extracted_information.participant_b;
    //         var e = "";
    //         if (d.evidence) {
    //             for (var i = 0; i < 1; i++) {
    //                 e += " " + d.evidence[i];
    //             }
    //         }
    //
    //         var type = d.extracted_information.interaction_type;
    //
    //         var node1 = processNode(a);
    //         var node2 = processNode(b);
    //         var l = new Object();
    //         l.source = node1;
    //         l.target = node2;
    //         l.type = type;
    //         l.evidence = e;
    //         l["Context_Species"] = d.extracted_information.context.Species;
    //         l["Context_Organ"] = d.extracted_information.context.Organ;
    //         l["Context_CellType"] = d.extracted_information.context.CellType;
    //         l.pmc_id = d.pmc_id;
    //         l.name = node1.fields.entity_text + "__" + node2.fields.entity_text;
    //         l.ref = d;
    //         if (linkNames[l.name + "_" + l.pmc_id] == undefined) {
    //             links.push(l);
    //             linkNames[l.name + "_" + l.pmc_id] = l;
    //         }
    //
    //     }
    // });
}
