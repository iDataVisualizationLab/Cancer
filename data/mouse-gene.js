var fs = require('fs');
var parse = require('csv-parse');
var jsonfile = require('jsonfile');



var file = 'cardsWithContextData.json';
var mappingUniprotToMgi = {};


var readExistingMGIId = function() {

    var ignoreHeader = true;
    fs.createReadStream('mgi-id-to-uniprot-id.csv')
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow, i) {
                if (ignoreHeader) {
                    ignoreHeader = false;
                    return;
                }

                if (csvrow.length <8) {
                    console.log("Invalid row: " + i);

                    return;
                }

                let uniProtIds = csvrow[7];
                if (uniProtIds.length < 1) {
                    console.log("Empty Error with id: " + uniProtIds);

                    return;
                }

                let ids = uniProtIds.match(/.{1,6}/g);
                ids.forEach(function (id) {
                    if (id.length < 6) {
                        console.log("Error with id: " + uniProtIds);
                        return;
                    }

                    mappingUniprotToMgi["uniprot:" + id] = csvrow[2];

                });
        })
        .on('end',function() {
            jsonfile.readFile(file, handleReadContextCard);
        });
};

readExistingMGIId();

function handleReadContextCard(err, jsonData) {

    let myData = jsonData.filter(function (card) {
            let a = card.extracted_information.participant_a;
            let b = card.extracted_information.participant_b;

            let uniProtIdA = a.identifier;
            let uniProtIdB = b.identifier;

            return !!mappingUniprotToMgi[uniProtIdA] && !!mappingUniprotToMgi[uniProtIdB];
    });

    jsonfile.writeFile("my-mgi-cart-context.json", myData, function (err) {
        console.error(err)
    });
}
