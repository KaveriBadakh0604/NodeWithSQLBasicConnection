const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');

require('dotenv').config();

//express
const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");
//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));//to parse form data

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

//inser bulk of records
let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
    ];
}
//console.log(getRandonUser());

//find total count of 
//home route
app.get("/", (req, res)=>{
    let q = "select count(*) from user";
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            console.log(result);
            //res.send(result);
            res.render("home.ejs", {count});
        });
    }catch(err){
        console.log(err);
        res.send("Some error occurred");
    }
    //connection.end();
    //res.send("Welcome to homepage");
})

//show route
app.get("/user", (req, res)=>{
    let q = `SELECT * FROM user`;
    try{
        connection.query(q, (err, users)=>{
            if(err) throw err;
            let count = users[0]["count(*)"];
            res.render("showUsers.ejs", {users});
        });
    }catch(err){
        console.log(err);
        res.send("Some error occurred");
    }
});

//edit route
app.get("/user/:id/edit", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    }catch(err){
        console.log(err);
        res.send("Some error occurred");
    }
})

//update route (Edit in database)
app.patch("/user/:id", (req, res) =>{
    let {id} = req.params;
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            if(formPass != user.password){
                res.send("wrong password");
            }else{
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
                connection.query(q2, (err, result)=>{
                    if (err) throw err;
                    res.redirect("/user");
                })
            }
        });
    }catch(err){
        console.log(err);
        res.send("Some error occurred");
    }
})

//start server
app.listen("8080", ()=>{
    console.log("Server is listening to port 8080");
});

//inserting new data
/*let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";

let user = ["123", "123Pass", "abc@gmail.com", "abc"];
try{
    connection.query(q, user, (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
}catch(err){
    console.log(err);
}
connection.end();
*/

// insert many records
//let q = "INSERT INTO user (id, username, email, password) VALUES ?";
/*let users = [["123b", "123Passb", "abc@gmail.comb", "abcb"],["123c", "123Passc", "abc@gmail.comc", "abcc"]];
try{
    connection.query(q, [users], (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
}catch(err){
    console.log(err);
}
connection.end();
*/


/*let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let data = [];
for(let i = 1; i<=100; i++){
    data.push(getRandomUser());
}*/

//show message if the database query runs properly
/*try{
    connection.query(q, [data], (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
}catch(err){
    console.log(err);
}
connection.end();
*/