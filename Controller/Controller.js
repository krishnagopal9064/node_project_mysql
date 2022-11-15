const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let mysql=require("../connection").con


exports.about=(req,res)=>{
    res.render("about")
}
exports.contact=(req,res)=>{
    res.render("contact")
}
exports.register=(req,res)=>{
    res.render("register")
}
exports.postregister=(req,res)=>{
    const { name, contact, password } = req.body;
    mysql.query(`SELECT contact from users WHERE contact = ${contact}`,  (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.render("register")
            }
        }
        let hashedPassword =  bcrypt.hash(password, 8);
        console.log(hashedPassword);

        mysql.query('INSERT INTO users SET ?', { name: name, contact:contact, password: hashedPassword }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.render("login");
            }
        })
    })
    // res.send("Form submitted");
}
exports.login=(req,res)=>{
    res.render("login")
}
exports.postlogin=(req,res)=>{
    const contact=req.body.contact
    mysql.query(`SELECT * FROM users WHERE contact = ${contact}`,   (err, results) => {
        console.log(results);
        if (!err) {
            const hashpassword=results.password;
            if(bcrypt.compare(req.body.password, hashpassword)){
                const token=jwt.sign({
                    user_id:results.user_id,
                    name:results.name
                },{expiresIn:'10m'});
                res.cookie('token',token)
                console.log(results);
                res.status(200).redirect("/allusers");
            }
}
})
}

exports.allusers=(req,res)=>{
    mysql.query("select * from users",(err,results)=>{
        res.render("allusers",{
            results:results
        })
    })
}
exports.edituser=(req,res)=>{
    let id=req.params.id;
    mysql.query(`Select * from users where user_id=${id}`, (err,result)=>{
        if(!err){
            res.render("edituser",{
                result:result[0]
            })
        }
    })
}
exports.updateuser=(req,res)=>{
    const { name, contact, password } = req.body;
    let hashedPassword =  bcrypt.hash(req.body.password, 8)
    let qry = "update users SET name='"+req.body.name+"',  contact='"+req.body.contact+"',  password='"+hashedPassword+"' where user_id ="+req.body.user_id;
    mysql.query(qry,(err, results) => {
      if(err) throw err;
      res.redirect('/allusers');
    });
}
exports.deleteuser=(req,res)=>{
    let id=req.params.id;
    mysql.query(`Delete from users where user_id=${id}`,(err,result)=>{
        if(!err){
            res.redirect('/allusers')
        }
    })
}


