const mysql=require("mysql")
const con = mysql.createConnection({
    hest:"localhost",
    user:"root",
    password:"",
    database:"node_user_data"
})
con.connect((err)=>{
    if(err) throw err
    console.log("Connection created");
})
module.exports.con = con;