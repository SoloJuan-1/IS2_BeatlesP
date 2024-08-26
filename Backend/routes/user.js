const express = require('express');
const connection = require('../db/connection');
/*
const {JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const nodemailer= require('nodemailer');
*/
const router = express.Router();
require('dotenv').config();

router.post('/signup', (req, res) => {
  let user = req.body;
  query = "select Correo,Contraseña,Tipo_Usuario,status from usuario where Correo=?"
  connection.query(query, [user.Correo], (error, results) => {
    if (!error) {
      if (results.length <= 0) {
        query = "insert into usuario(Correo,Nombres,Apellidos,Contraseña,Tipo_Usuario,status) values(?,?,?,?,'Fan','true')"
        connection.query(query, [user.Correo, user.Nombre, user.Apellido, user.Contraseña], (error, results) => {
          if (!error) {
            return res.status(200).json({ message: "Registrado Exitosamente" });
          } else {
            return res.status(500).json(error);
          }
        })
      } else {
        return res.status(400).json({ message: "El Correo ingresado ya existe" })
      }
    }
    else {
      return res.status(500).json(error);
    }
  })
})

router.post('/login', (req, res) => {
  const user = req.body;
  query = "Select Correo,Contraseña,Tipo_Usuario,status from usuario where Correo=?";
  connection.query(query, [user.Correo], (error, results) => {
    if (!error) {
      if (results.length <= 0 || results[0].Contraseña != user.Contraseña) {
        return res.status(401).json({ message: "Usuario o Contraseña Incorrecta" });
      }
      else if (results[0].status === 'false') {
        return res.status(401).json({ message: "Espere a que el administrador apruebe su usuario" });
      }
      else if (results[0].Contraseña == user.Contraseña) {
        const response = { Correo: results[0].Correo, status: results[0].status }
        //const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '12h' })
        res.status(200).json({ message: "Inicio Session correctamente" });
      }
      else {
        return res.status(400).json({ message: "Algo salio mal. Porfavor intenta mas tarde." });
      }
    } else {
      return res.status(500).json(error);
    }
  })
})

/*
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})
*/
/*
router.post('/forgotpassword',(req,res)=>{
  const user = req.body;
  query = "Select Correo,Contraseña from usuario where Correo=?";
  connection.query(query,[user.Correo],(error,results)=>{
    if(!error){
      if(results.length <= 0){
        return res.status(200).json({message:"Contraseña enviada correctamente a su correo"});
      }
      else{
        var OpcionesMail = {
            from: process.env.EMAIL,
            to: results[0].email,
            subject: 'Contraseña de los Sitio Proyecto Beatles Ing Soft 2',
            html: '<p><b>Los Detalles de inicio de sesion para el Sitio Beatles</b><br><b>Correo: </b>'+results[0].Correo+'<br><b>Contraseña: </b>'+results[0].Contraseña+'<br><a href="http://localhost:4200/">Click aqui para iniciar sesion</p>'
        };
        transporter.sendMail(OpcionesMail,function(error,info){
          if(error){
            console.log(error);
          }else{
            console.log('Correo enviado:'+info.response);
          }
        });
        return res.status(200).json({message:"Contraseña enviada exitosamente al correo"});
      }
    }else{
      return res.status(500).json(error);
    }
  })
})
*/
router.get('/getuser',(req,res)=>{
  var query = "select id_usuario,Correo,Nombres,Apellidos,status from usuario where Tipo_Usuario ='Fan'";
  connection.query(query,(error,results)=>{
    if(!error){
      return res.status(200).json(results);
    }else{
      return res.status(500).json(error);
    }
  })
})

router.get('/getuserAdmin',(req,res)=>{
  var query = "select id_usuario,Correo,Nombres,Apellidos,status from usuario where Tipo_Usuario ='Administrador'";
  connection.query(query,(error,results)=>{
    if(!error){
      return res.status(200).json(results);
    }else{
      return res.status(500).json(error);
    }
  })
})

router.patch('/updateuser',(req,res)=>{
  let user = req.body;
  var query = "Update Usuario set status=? where id=?";
  connection.query(query,[user.status,user.id_usuario],(error,results)=>{
    if(!error){
      if(results.affectedRows == 0){
        return res.status(404).json({message: "El id del Usuario no existe"})
      }
      return res.status(200).json({message: "Status del Usuario Actualizado exitosamente"})
    }else{
      return res.status(500).json(error)
    }
  })
})
/*
router.get('/checkToken',(req,res)=>{
  return res.status(200).json({message: "true"});
})

router.post('/changePassword',(req,res)=>{
  
})
*/
module.exports = router;