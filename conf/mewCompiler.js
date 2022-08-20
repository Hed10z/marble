'use strict'

// MewCompile Using for Compile Model Database and dataSync

const { CatchError } = require('../app/utils/BasicError');

// Main Model Controll
function modelControll(dataSync, modelSync){
    try {

        for ( const key of Object.keys(dataSync, modelSync)){
            // catch Error
            
            console.log("--------------------------------------------------------------------------------------------------------");
            
            if(modelSync[key] == undefined || dataSync[key] == undefined){
                new CatchError(" Data Invaild writting Please Check Your Model or Data Object ", 40001).log()
                return false
                break
            // Id Value
            }else if( modelSync[key] == "_id" && typeof dataSync[key] == 'number'){
                console.log(`Model Type: ${modelSync[key]}`)

            // String Value
            }else if( modelSync[key] == "String" && typeof dataSync[key] == 'string' ){
                console.log(`Model Type: ${modelSync[key]} || DataSync is: ${dataSync[key]} Type ${typeof dataSync[key]}`)

            // Number Value
            }else if( modelSync[key] == "Number" && typeof dataSync[key] == 'number' ){
                console.log(`Model Type: ${modelSync[key]} || DataSync is: ${dataSync[key]} Type ${typeof dataSync[key]}`)

            // Boolean Value
            }else if( modelSync[key] == "Boolean" && typeof dataSync[key] == 'boolean' ){
                console.log(`Model Type: ${modelSync[key]} || DataSync is: ${dataSync[key]} Type ${typeof dataSync[key]}`)
                
            // Object Value
            }else if(typeof modelSync[key] == 'object' && typeof dataSync[key] == 'object'){
                console.log(`Object Model Type: ${modelSync[key]} || DataSync is: ${dataSync[key]} Type ${typeof dataSync[key]}`)

                if(modelSync[key] == '[object Object]'){
                    for(const keyTsc of Object.keys(modelSync[key])){
                        const modelObject = modelSync[key]
                        console.log(`In Object Open: {${keyTsc} => ${modelObject[keyTsc]}}`)
                    }
                }
                
            }else{new CatchError("Sorry Proccess end but not complete", 30001)}

        }
        return true

    } catch (error) {
        return false
    }

}

// UPDATE IN NEW VERSION
// -----------------------------------------------------------------------------------------------------------------------
// Array Value
// Object Value
// -----------------------------------------------------------------------------------------------------------------------

module.exports ={
    mewModel: modelControll,
}