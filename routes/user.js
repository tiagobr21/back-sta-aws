const express = require('express');
const connection =require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
const nodemailer = require('nodemailer');
const multer = require('multer');
const multerConfig = require('../config/multer');
require('dotenv').config();



router.post("/uploadimage", multer(multerConfig).single("file"),async (req,res)=>{
    
    //return res.json(req.file)


    const post = {
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url:""
    }

    return res.json(post)
    /* let img_name = file.name;
    let query = 'update user set image = ? where id = ?'
    if(!req.files){
       return res.status(400).json('Nenhum arquivo foi enviado')
    }
    if(file.mimetype == "image/jpeg" || file.mimetype == 'image/png' || file.mimetype == 'image/gif'){
      file.mv('public/images/'+img_name,(err,results)=>{
         if(err){
             return res.status(500).json(err);
         }
         connection.query(query,[file.name,id],(err,results)=>{
             if(!err){
                 res.status(200).json({"message":"imagem enviada com sucesso"})
             }else{
                 res.status(500).json(err)
             }
         })
      })
    }else{
     res.status(404).json({"message":"O formato não permitido, por favor envie um arquivo '.png','.gif','.jpg'"});
    } */
    
 })
 

router.post('/signup',(req,res)=>{
    let user = req.body;
    let query = "select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
       if(!err){             
        if(results.length <=0){
         
           var query = "insert into user(name,email,password,status,role) values(?,?,?,'false','user')"

            connection.query(query,[user.name,user.email,user.password],(err,results)=>{
                if(!err){
                   return res.status(200).json({message:"Cadastrado com Sucesso"})
                }else{
                   return res.status(500).json(err)
                }
            })

        }else{
           return res.status(400).json({message: "Email já Existe."}) 
        }
       }    
         else{
            return res.status(500).json(err);
        }
    })
})  

router.post('/login',(req,res)=>{

    const user = req.body;
    let query = "select name,email,password,status,role from user where email = ?"

    connection.query(query, [user.email] , (err,results)=>{

        if(!err){

            if(results.length <=0 || results[0].password != user.password){
                return res.status(401).json({mesagge:"Usuário ou Senha Incorreto"});


            }else if(results[0].status === 'false'){

                return res.status(404).json({message:"Espere o Administrador Aprovar"});

            }else if(results[0].password == user.password){

                const response = {email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn:'8h'})
                res.status(200).json({message:'Usuário '+ results[0].name +' logado com sucesso',user:results[0].name, role:results[0].role, token: accessToken})

            }else{
                return res.status(400).json({message: "Algo ocorreu errado, tente novamente mais tarde"});
            }
        }else{
            return res.status(500).json(err);
        }
    })
})


router.post('/sendemail',(req,res)=>{
    
    const transport = nodemailer.createTransport({
        host:'smtp.office365.com',
        port: 587,
        secure: false,
        auth:{
            user:'paroquiasantateresinhatest@outlook.com',
            pass:'Bondade07!'
        }
    })
    var mailOptions = {
        from: 'Sistema Santa Teresinha <paroquiasantateresinhatest@outlook.com>',
        to: 'paroquiasantateresinhatest@outlook.com',
        subject: 'Senha do Sta',
        html: '<p> <b> Seu Login da Sta</b> <br> <b>Email:</b>'+'paroquiasantateresinhatest@outlook.com'+'<br> <b>Senha:</b> '+'paroquiasantateresinhatest@outlook.com'+' <br> <a href="http://localhost:4200/"> Clique aqui para Entrar </a>  </p>',
        text: 'Olá , test'
      }
      transport.sendMail(mailOptions,function(error,info){
          if(error){
              console.log(error);
          }else{
              console.log('Email enviado: '+info.response);
          }
      }); 
});



router.post('/forgotpassword',(req,res)=>{ 
    const user = req.body;
    let query = "select email,password from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            console.log(results);
             if(results.length <= 0){
               return res.status(200).json({message: "Recuperação de senha enviado com sucesso para seu email !!!"});
            }else{
                const transport = nodemailer.createTransport({
                    host:'smtp.office365.com',
                    port: 587,
                    secure: false,
                    auth:{
                        user:'paroquiasantateresinhatest@outlook.com',
                        pass:'Bondade07!'
                    }
                })
                var mailOptions = {
                  from: 'Sistema Santa Teresinha <paroquiasantateresinhatest@outlook.com>',
                  to: results[0].email,
                  subject: 'Senha do Sta',
                  html: '<p> <b> Seu Login da Sta</b> <br> <b>Email:</b>'+results[0].email+'<br> <b>Senha:</b> '+results[0].password+' <br> <a href="http://localhost:4200/"> Clique aqui para Entrar </a>  </p>',
                  text: 'Olá , test'
                }
                transport.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Email enviado: '+info.response);
                        res.status(200).json({message: "Recuperação de senha enviado com sucesso para seu email !!!"});
                    }
                }); 
                
            }
        }else{
            res.status(500).json(err)
        }
    })
})      




router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let query = "select id,name,email,status,role from user"
    connection.query(query,(err,results)=>{
        if(!err){
           return res.status(200).json(results);
        }else{
           return res.status(500).json(err);
        }
    })
})


router.get('/getbyid/:id',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let id = req.params.id;
    let query = ('select *from user where id=?');
    connection.query(query,[id],(err,results)=>{
      if(!err){
        if(results.affectedRows==0){
            res.status(404).json({message:'id não encontrado'});
        }
        return res.status(200).json(results);
    }else{
        res.status(500).json(err);
    }
  });
  });

router.patch('/updateuser/:id',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let id = req.params.id
    let user = req.body;
    let query = "update user set name=?, email=? , status=? , role=? where id=?"
    connection.query(query,[user.name,user.email,user.status,user.role,id],(err,results)=>{
        if(!err){
          if(results.affectedRows == 0){
            return res.status(404).json({message:"O Usuário não existe "});
          }
          return res.status(200).json({message:"Usuário Atualizado com Sucesso!!!"});
        }else{
          return res.status(500).json(err);
        }
    })
});

router.delete("/delete/:id",auth.authenticateToken,checkRole.checkRole,(req,res)=>{
   let id = req.params.id
   let query = 'delete from user where id = ?';
   connection.query(query,[id],(err,results)=>{
      if(!err){
        if(results.affectedRows == 0){
           res.status(404).json({mesagge:'usuário não encontrado'})
        }
        res.status(200).json({message:'Usuário deletado com sucesso !!!'})
      }else{
        res.status(500).json(err)
      }
   })
})



router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})

router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const user = req.body;
    const email = res.locals.email;
    console.log(email)
    let query = "select * from user where email=? and password=?";
    connection.query(query,[email,user.oldPassword],(err,results)=>{
        if(!err){
           if(results.length <=0){

             return res.status(400).json({message:"Senha atual incorreta!"});

           }else if(results[0].password == user.oldPassword){
               let query = "update user set password=? where email=?";
               connection.query(query,[user.newPassword,email],(err,results)=>{
                  if(!err){
                      return res.status(200).json({message:"Senha trocada com sucesso !!!"})
                  }else{
                    return res.status(500).json(err)
                  }
               }) 
           }else{
              return res.status(400).json({message:"Alguma coisa aconteceu errado. Por favor tente novamente mais tarde"});
           }

        }else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;