const express = require('express');
const app = express();
const {Client} = require('pg');

const client = new Client({
    host : "db.defrcjzlroxlityrlktz.supabase.co",
    user : "postgres",
    port : 6543,
    password : "m0n1c4rlAPIproject",
    database : "postgres" 
});

client.connect();

client.query(`SELECT * FROM admins`, (err, res) => {
    if (!err){
        console.log(res.rows);
    }else{
        console.log(err);
    }

    client.end;
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running in PORT: ${port}, go to http://localhost:${port}`);
});

