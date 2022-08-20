const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

// All Library and Compiler
const { createDataBase, getAddDataToDb, getFindAll, getFindData, getFindIdData } = require('../lib/methodMew');

// Module
module.exports = {
    // Create Database
    addDb: createDataBase,
    // Add Full Data
    pushTo: getAddDataToDb,
    // Get Find Data
    findFilter: getFindData,
    // Find One Data Person Or Thing
    findId: getFindIdData,
    // Get Find All
    findAll: getFindAll
}