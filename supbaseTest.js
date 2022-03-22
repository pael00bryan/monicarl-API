const express = require("express");
const app = express();

const { createClient } = require('@supabase/supabase-js');
const req = require("express/lib/request");
const res = require("express/lib/response");

let port = process.env.PORT || 3000;

const supabaseUrl = 'https://defrcjzlroxlityrlktz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZnJjanpscm94bGl0eXJsa3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4NTI5NDIsImV4cCI6MTk2MzQyODk0Mn0.BF60xED4WnQLCmLTIbsHw8Grc-y6jHQm_4rcL84TKyY';
const supabase = createClient(supabaseUrl, supabaseKey);

let result;

app.get("/", (req, res) =>{
    
    const main = async() =>{
        let {data, error} = await supabase
        .from('admins').select('*'); 

        result = data;
        if(error){
            result = error;
            return;
        }
        
    }

    main();

    res.json(result);
    
});




app.listen(port, () => {
    console.log(`Running in PORT: ${port}, go to http://localhost:${port}`);
});