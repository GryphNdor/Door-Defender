const express = require('express')
const app = express();
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a user
app.post("/users", async(req,res) => {
    try{
        console.log(req.body)
        const { description } = req.body;
        const newPerson = await pool.query("INSERT INTO usertable (description) VALUES($1) RETURNING *", [description]);
        res.json(newPerson.rows[0])
        console.log(description)
    } catch(err) {
        console.error(err.message);
    }
})
//get all users

app.get("/users", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM usertable")
        res.json(allTodos.rows);
    } catch (err) {
        console.error(errrr.message);
        
    }
})

//get a user

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const person = await pool.query("SELECT * FROM usertable WHERE todo_id = $1," [id]);
        res.json(person.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a user

app.put("/users/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        console.log(`id = ${id} description = ${description}`)
        const updatePerson = await pool.query("UPDATE usertable SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("DB was updated")
    } catch (err) {
        console.error(err.message)
        
    }
})

//delete a user

app.delete("/users/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deletePerson = await pool.query("DELETE FROM  userbase WHERE todo_id = $1,"[id]);
        res.json("person got deletes")//rip lolmao
        
    } catch (err) {
        console.error(err.message)
        
    }
})

app.listen(5000, () =>{
    console.log('has started on port 5000')
});
