const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password: "sonic5404",
    host: "localhost",
    port: 5432,
    database: "userbase"
}); 

module.exports = pool;