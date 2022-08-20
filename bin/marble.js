#!/usr/bin/env node

const fs = require('fs')
const { CatchError } = require("../app/utils/BasicError")

// Controll Main
class Controll{
    constructor(){
        this.argv = process.argv[2]
    }

    // // All config and function in her work
    GetCreateConfigFile(){
        fs.writeFile('./mewstore.json', "", (err) => {
            const value = err ? new CatchError("Process Error Please TryAgain", 40006) : console.log("Working ✨")
            console.log(value)
        })
    }

}

// Main file in Here RunCode
class Main extends Controll{
    // Compiler cli run And Controll
    RunCode(){

        const methodTerCli = this.argv

        switch(methodTerCli){
            case("--config"):
                this.GetCreateConfigFile()
                break

            // Default any Thing
            default:
                console.log("Sorry, Not found Command!")
        }

    }
}

const mewStore = new Main
mewStore.RunCode()