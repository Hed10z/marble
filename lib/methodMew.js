'use strict'

const ciql = require('ciql-json');
const fs = require('fs');

const { mewModel } = require('../conf/mewCompiler');
const { CatchError } = require('../app/utils/BasicError');

/**
 * @param {String} getAddDataToDb this function
 * @param {String} nameModel This Name Model
 * @param {String} dataSync  This Data Return To Function And Work
 * @param {String} modelSync This Chalback Model for Working with DataSync
 * @returns 
 */

exports.createDataBase = (nameModel, dataSync) => {
    function returnHistoryData() {
        try {
            const dataSyncRead = fs.readFileSync('./mewstore/mewstore.json', {
                encoding: 'utf8',
                flag: 'r'
            });
            return dataSyncRead;
        } catch (error) {
            return false;
        }
    };
    let newtranstion = Object.assign({}, returnHistoryData(), {"tests":[]})
    console.log(newtranstion)
}

// pushTo
exports.getAddDataToDb = (nameModel, dataSync, modelSync) => {

    const returnFunctionModel = mewModel(dataSync, modelSync);
    // Reading False or True
    if (returnFunctionModel == true) {
        // Return History Data
        function returnHistoryData() {
            try {
                const dataSyncRead = fs.readFileSync('./mewstore/mewstore.json', {
                    encoding: 'utf8',
                    flag: 'r'
                });
                return dataSyncRead;
            } catch (error) {
                return false;
            }
        };

        // Display
        const callBackData = returnHistoryData();

        // If History Data True or False
        if (callBackData == false) {

            fs.writeFile('./mewstore/mewstore.json', `{"${nameModel}":[]}`, (err) => {
                if (err) {
                    new CatchError("Sorry Proccess not Complete", 40001).log();
                } else {
                    const JsonNew = dataSync;

                    ciql.open('./mewstore/mewstore.json')
                        .pushTo(nameModel, JsonNew)
                        .save('./mewstore/mewstore.json')

                    console.log("Process Success✨", 20000);
                }
            });

        } else {

            try {
                const JsonNew = dataSync
                ciql.open('./mewstore/mewstore.json')
                    .pushTo(nameModel, JsonNew)
                    .save('./mewstore/mewstore.json')

            } catch (error) {
                new CatchError("Sorry Process Add Data not Complete", 40002).log()
            }

        };

    } else {
        new CatchError("Sorry Not found Data Please Check your Model or Data Object", 40003).log();
        return false
    };

    return true;
};

// Filter
exports.getFindData = (nameModel, dataSync) => {
    try {
        // Reading file Database
        const dataJsonFile = fs.readFileSync('./mewstore/mewstore.json', { encoding: 'utf8', flag: 'r' });

        var obj = JSON.parse(dataJsonFile);
        var dataNameModel = nameModel


        if (typeof dataSync === 'string') {
    
            // Reading and filter data
            let letobj = obj[dataNameModel].filter((oj) => {
                for (const objKey of Object.keys(oj)) {
                    
                    if (oj[objKey] === dataSync) {
                        return true
                    }
                }
            });

            let dataRes = letobj
            return dataRes;
        
        // Function for Object
        } else if (typeof dataSync === 'object') {

            // Reading and filter data
            let letobj = obj[dataNameModel].filter((oj) => {
                for (const objKey of Object.keys(oj, dataSync)) {
                    // Varible
                    if (oj[objKey] === dataSync[objKey]) {
                        return true
                    }
                }
            });

            let dataRes = letobj;
            return dataRes;
        }

    } catch (error) {
        new CatchError("Sorry Proccess Get Find Data not Complete", 40004).log();
    }


    // --------------------------------------------------------
    // In New Version Find:{} Object Avaible
    // --------------------------------------------------------
    // if(typeof dataSync == 'object'){
    //     let letobj = obj[dataNameModel].filter( (oj) => {
    //         for(const objKeys of Object.keys( oj, dataSync)){
    //             if(oj[objKeys] == dataSync[objKeys]){
    //                 console.log(`Its Oj => ${oj[objKeys]} || its => ${dataSync[objKeys]}`)
    //             }
    //         }
    //     })
    //     console.log( letobj)
    // }else{}

};

// Find All Data
exports.getFindAll = (nameModel) => {
    try {
        
        // Reading file Database
        const dataJsonFile = fs.readFileSync('./mewstore/mewstore.json', { encoding: 'utf8', flag: 'r' });

        const dataJsonWork = JSON.parse(dataJsonFile);
        return dataJsonWork[nameModel]

    } catch (error) {
        new CatchError("Sorry Proccess Get Find Data not Complete", 40004).log();
    }
};

// Just Find Id
exports.getFindIdData = (nameModel, dataSync) => {

    try {

        // Reading file Database
        const dataJsonFile = fs.readFileSync('./mewstore/mewstore.json', {
            encoding: 'utf8',
            flag: 'r'
        });
        var dataNameModel = nameModel;
        var obj = JSON.parse(dataJsonFile);

        // Reading and filter data
        let letobj = obj[dataNameModel].find((oj) => {
            
                for (const objKey of Object.keys(oj)) {

                    if (oj[objKey] == dataSync) {
                        return true
                    }else{
                        return false
                    }
                }
            
        });

        let returnFunctionDataObject = letobj === undefined ? new CatchError("Sorry Not Found Id Please Check Id", 40007).log() : letobj
        return returnFunctionDataObject

    } catch (error) {
        new CatchError("Sorry Proccess Get FindOne Data not Complete", 40005).log()
    }

};