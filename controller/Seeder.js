const fs = require("fs");

const { DB } = require("./Parameters");
const { INIT_DB } = require("./Parameters");
const { FILEPATH } = require("./Parameters");
const { DB_NAME } = require("./Parameters");

const RED = "\x1B[31m";
const GREEN = "\x1B[32m";
const NONE = "\033[0m";

function Query(db, query){
    return new Promise((resolve,reject)=>{
        db.query(query,(error ,result)=>{
            if(error){
                if(error.errno!=1062){
                    console.log(RED+error.code+"\n"+error.errno+NONE+" "+error.sqlMessage+"\n");
                }
                reject();
            } else {
                resolve();
            }
        });
    });
}

async function Seeder_DB(arg){
    try{
        await Query(INIT_DB,"CREATE DATABASE "+DB_NAME);
        if(arg=="unique"){
            await Query(DB,"CREATE TABLE names(id int, name VARCHAR(255) UNIQUE, PRIMARY KEY(id))");
        } else {
            await Query(DB,"CREATE TABLE names(id int, name VARCHAR(255), PRIMARY KEY(id))");
        }
    } catch(error){
        console.log("PLEASE RUN "+RED+"npm run reset"+NONE+"\n");
        process.exit();
    }
    fs.readFile(__dirname+"/"+"../"+FILEPATH, 'utf8', async (err, data)=>{
        if (err) throw err;
        let l_data = data.split("\n");
        let i=0;
        let count=0;
        while(count<300 && i<l_data.length-1){
            try{
                await Query(DB,"INSERT INTO names (id,name) VALUES (\""+(count+1)+"\", \""+l_data[i].split(" ")[0]+"\")");
            }catch (error){
                count--;
            }
            i++;
            count++;
        }
        console.log(GREEN+"DATABASE INITIALIZED"+NONE+"\n");
        process.exit();
    });
}

async function Reset_DB(arg){
    try{
        await Query(INIT_DB,"DROP DATABASE "+DB_NAME);
        console.log(GREEN+"DATABASE REMOVED"+NONE);
    } catch(error) {}
    Seeder_DB(arg);
}

module.exports = {
    seed: Seeder_DB,
    reset: Reset_DB,
}