const Route = require("express").Router();
const userController = require("../Controller/Controller");
const productController = require("../Controller/ProductController")

Route.get('/about',userController.about)
Route.get('/contact',userController.contact)
Route.get('/login',userController.login)
Route.post('/postlogin',userController.postlogin)
Route.get('/register',userController.register)
Route.post('/postregister',userController.postregister)
// Route.get('/logout',userController.logout)
Route.get('/allusers',userController.allusers)
Route.get('/edituser/:id',userController.edituser)
Route.post('/updateuser',userController.updateuser)
Route.get('/deleteuser/:id',userController.deleteuser)


Route.get('/',productController.index)
Route.get('/allproduct',productController.allproduct)
Route.get('/addproduct',productController.addproduct)

module.exports=Route;
