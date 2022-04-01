const express = require("express");
const app = express();

const { v4: uuidv4 } = require('uuid');

const { createClient } = require('@supabase/supabase-js');

let port = process.env.PORT || 3000;

const supabaseUrl = 'https://defrcjzlroxlityrlktz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZnJjanpscm94bGl0eXJsa3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4NTI5NDIsImV4cCI6MTk2MzQyODk0Mn0.BF60xED4WnQLCmLTIbsHw8Grc-y6jHQm_4rcL84TKyY';
const supabase = createClient(supabaseUrl, supabaseKey);

let result;
app.use(express.json());

app.get("/", (req, res) => {

    const main = async () => {
        let { data, error } = await supabase
            .from('admins').select('*');

        result = data;
        if (error) {
            result = error;
            return;
        }

    }

    main();

    res.json(result);

});

app.post('/api/admin', (req, res) => {

    const adminData = {
        id: uuidv4(),
        firstname: req.body.firstname,
        middlename: req.body.middlename || "",
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };

    const main = async () => {
        let { data, error } = await supabase
            .from('admins')
            .insert([

                {
                    admin_id: adminData.id,
                    firstname: adminData.firstname,
                    middlename: adminData.middlename,
                    lastname: adminData.lastname,
                    username: adminData.username,
                    password: adminData.password
                }
            ]);

        result = data;

        if (error) {
            result = error;
            return;
        }

    }

    main();

    console.log(result);

    res.json(adminData);

})


app.put('/api/admin/:id', (req, res) => {

    const adminData = {
        id: req.params.id,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };

    const main = async () => {
        let { data, error } = await supabase
            .from('admins')
            .update({
                firstname: adminData.firstname,
                middlename: adminData.middlename,
                lastname: adminData.lastname,
                password: adminData.password
            })
            .eq('admin_id', adminData.id);

        result = data;

        if (error) {
            console.log(error);
            return;
        }
    }

    main();
    console.log(result);
    res.json(adminData);
})

app.delete('/api/admin/:id', (req, res) => {
    const main = async () => {
        let id = req.params.id;
        let { data, error } = await supabase
            .from('admins')
            .delete()
            .eq('admin_id', id);
        result = data;
        if (error) {
            console.log(error);
            return;
        }
    }
    main();
    res.send(result);
})


app.listen(port, () => {
    console.log(`Running in PORT: ${port}, go to http://localhost:${port}`);
});