let mysql=require("../connection").con

exports.index=(req,res)=>{

    mysql.query("select * from products",(err,result)=>{
        res.render('home',{
            result:result
        });
    })
}
exports.allproduct=(req,res)=>{
    mysql.query("select * from products",(err,results)=>{
        res.render("allproduct",{
            results:results
        })
    })
}
exports.addproduct=(req,res)=>{
    res.render("add_product")
}
exports.addproducttodb=(req,res)=>{
    const image=req.file;
    const { name, price} = req.body;
    mysql.query('INSERT INTO products SET ?',{ name: name, price:price, image: path },(err,results)=>{
        if (err) {
            console.log(err);
        } else {
            return res.render("allproduct");
        }
    })
}
exports.editproduct=(req,res)=>{
    res.render("editproduct")
}
exports.updateproduct=(req,res)=>{
    res.send("Product updated...")
}
exports.deleteproduct=(req,res)=>{
    res.send("Product deleted...")
}