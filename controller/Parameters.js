//DEFINE END
const LOOSE = 8;
const WIN = 13;

// DIFFICULTY
const MIXED_VALUE = 60;
const RIGHT = 1;
const WRONG = -1;

// DB SETTINGS
const mysql = require("mysql");
const DB_NAME = "test";
const FILEPATH = "names.txt";

// DB CONNEXION
const INIT_DB = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: ''
});

const DB = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DB_NAME
});

class Session {
    constructor(){
        this._points=10;
        this._list=[];
        this._name=null;
        this._gender=null;
        this._accuracy=null;
        this._db_len=null;
    }

    // POINTS
    get points(){ return this._points; }
    set points(req){ this._points += req; }

    // LIST
    get list(){ return this._list; }
    set list(req){ this._list.push(req); }

    // NAME
    get name(){ return this._name; }
    set name(req){ this._name = req; }

    // API GENDER
    get gender(){ return this._gender; }
    set gender(req){ this._gender = req; }
    
    // API ACCURACY
    get accuracy(){ return this._accuracy; }
    set accuracy(req){ this._accuracy = req; }
    
    // DB LEN
    get db_len(){ return this._db_len; }
    set db_len(req){ this._db_len = req; }

    Reset(){
        this._points=10;
        this._list=[];
        this._name=null;
        this._gender=null;
        this._accuracy=null;
    }

    Init(){
        this._name=null;
        this._gender=null;
        this._accuracy=null;
    }
};

module.exports={
    MIXED_VALUE: MIXED_VALUE,
    RIGHT: RIGHT,
    WRONG: WRONG,
    LOOSE: LOOSE,
    WIN: WIN,
    DB: DB,
    INIT_DB: INIT_DB,
    DB_NAME: DB_NAME,
    FILEPATH: FILEPATH,
    Session: Session,
}