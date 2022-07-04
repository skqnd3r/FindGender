const express = require("express");
const app = express();
const { DB } = require("./controller/Parameters.js");
const { Session } = require("./controller/Parameters.js");
const PORT = 8000;


DB.getConnection(error => {
    if (error) throw error;
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and Server is Listening on Port ", PORT);
    })
});


//EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

const Game = require("./controller/Game.js");
const Party = new Session;

const { WIN } = require("./controller/Parameters.js");
const { LOOSE } = require("./controller/Parameters.js");


// var context;
app.get("/", (req, res) => {
    let context = {content:"start"};
    res.render("index",context);
});

//START
app.get("/start", async (req, res) => {
    if(Party.db_len==null){
        await Game.TabLen(DB,Party);
    }
    Party.Reset();
    res.redirect("/play");
});

// PLAY
app.get("/play", async (req, res) =>{
    await Game.Pick(DB,Party);
    let context = {content:"play",points: Party.points, name: Party.name};
    res.render("index",context);
});

// REPONSE
app.get("/play/:gender", async (req, res) => {
    await Game.Answer(req.params.gender,Party);
    if(Party.points == WIN || Party.points == LOOSE){
        res.redirect("/gameover");
    } else {
        res.redirect("/play");
    }
});

//GAME OVER
app.get("/gameover", (req, res) => {
    switch(Party.points){
        case WIN:
            res.render("index",{content:"gameover", state: "You Win !"});
            break;
        case LOOSE:    
            res.render("index",{content:"gameover", state: "You Loose !"});
            break;
        default:
            res.redirect("/");
            break;
    }
});

// // MENU CONTINUE // RESTART
// app.get("/menu", (req, res)=>{
//     console.log("yes");
// })