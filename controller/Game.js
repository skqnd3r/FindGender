const api = require("./GenderApi.js");

const { RIGHT } = require("./Parameters.js");
const { WRONG } = require("./Parameters.js");
const { MIXED_VALUE } = require("./Parameters.js");

function TabLen(DB,Party){
    return new Promise((resolve)=>{
        DB.query("SELECT COUNT(*) FROM names",(error,result)=>{
            if(error) throw error;
            Party.db_len=result[0]['COUNT(*)'];
            resolve();
        });
    });
};

function NameQuery(DB,id_num,Party){
    return new Promise((resolve)=>{
        DB.query("SELECT name FROM names WHERE id="+id_num,(error ,result)=>{
            if(error){
                throw error;
            }
            Party.name=result[0].name;
            resolve();
        });
    });
};

function Random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

async function Pick(DB,Party){
    Party.Init();
    let id_num;
    console.log(Party.db_len);
    while(id_num == null || Party.list.includes(id_num)){
        id_num = Random(1,Party.db_len+1);
    }
    Party.list=id_num;
    await NameQuery(DB,id_num,Party);
    return;
}

async function Answer(gender,Party){
    await api.FindGender(Party);
    if(Party.accuracy >= MIXED_VALUE && gender != Party.gender){
        Party.points= WRONG;
    } else {
        Party.points= RIGHT;
    }
    return;
}

module.exports = {
    Pick: Pick,
    Answer: Answer,
    TabLen: TabLen,
};