
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/create',(req,res)=>{
  let escala_coroinha = req.body;
  let query_consulta=('select missa,data,mes,dia,hora,comunidade,acolito1,acolito2,acolito3,coroinha1,coroinha2,coroinha3,coroinha4,coroinha5 from escala_coroinha where id=?');
  connection.query(query_consulta,[escala_coroinha.missa],(err,results)=>{
      if(!err){
            if(results.length <= 0){
              if(escala_coroinha.missa === 'Domingo: Missa/Celebração Santa Teresinha 7h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Domingo','7h','Santa Terezinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                (err,results)=>{
                  if(!err){
                    res.status(200).json({message:'Escala Cadastrada com sucesso'});
                  }else{
                    res.status(500).json(err);
                  }
                });
              }else if(escala_coroinha.missa === 'Domingo: Missa/Celebração N.S.Rosário 7h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Domingo','7h','N.S.Rosário',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    
                    if(!err){
                      res.status(200).json({message:'Escala Cadastrada com sucesso'});
                  }else{
                      res.status(500).json(err);
                  }
              });
              }else if(escala_coroinha.missa === 'Domingo: Missa/Celebração N.S.Perpétuo Socorro 8h30'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Domingo','8h30','N.S.Perpétuo Socorro',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    if(!err){
                      res.status(200).json({message:'Escala Cadastrada com sucesso'});
                    }else{
                      res.status(500).json(err);
                    }
                  });
              }else if(escala_coroinha.missa === 'Domingo: Missa/Celebração N.S.Rosário 17h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Domingo','17h','N.S.Rosário',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    if(!err){
                      res.status(200).json({message:'Escala Cadastrada com sucesso'});
                    }else{
                      res.status(500).json(err);
                    }
                  });
              }else if(escala_coroinha.missa === 'Domingo: Missa/Celebração Santa Teresinha 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Domingo','17h','N.S.Rosário',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    if(!err){
                      res.status(200).json({message:'Escala Cadastrada com sucesso'});
                    }else{
                      res.status(500).json(err);
                    }
                  });
              }else if(escala_coroinha.missa === 'Terça: Novena com Adoração e Celebração Eucarística Santa Teresinha 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Terça','19h','Santa Teresinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                    }else{
                        res.status(500).json(err);
                    }
                  });
              }else if(escala_coroinha.missa === 'Terça: Novena com Adoração e Celebração Eucarística São Pedro 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Terça','19h','São Pedro',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                  (err,results)=>{
                    if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                    }else{
                        res.status(500).json(err);
                    }
                  });
              }else if(escala_coroinha.missa === 'Terça: Novena com Adoração e Celebração Eucarística N. S. Perpétuo Socorro 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Terça','19h','N. S. Perpétuo Socorro',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Quarta: Terço dos Homens Ministração da Palavra de Deus Santa Teresinha 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Quarta','19h','Santa Teresinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Quarta: Terço dos Homens Ministração da Palavra de Deus Santa Teresinha 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Quarta','19h','Santa Teresinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Quinta: Novena com Adoração e Celebração Eucarística N.S.Rosário 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Quinta','19h','N.S.Rosário',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Quinta: Adoração ao Santíssimo Grupo de Oração Santa Teresinha 20h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Quinta','20h','Santa Teresinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Sábado: Missa/Celebração São Pedro 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Sábado','19h','São Pedro',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Sábado: Missa/Celebração Sagrado Coração de Jesus 19h'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Sábado','19h','Sagrado Coração de Jesus',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }else if(escala_coroinha.missa === 'Sábado: Missa em Reparação ao Imaculado Coração de Maria Santa Teresinha 17h45'){
                let query_criar = ("insert into escala_coroinha values(default,?,?,?,'Sábado','17h45','Santa Teresinha',?,?,?,?,?,?,?,?)");
                connection.query(query_criar,[escala_coroinha.missa,escala_coroinha.data,escala_coroinha.mes,escala_coroinha.acolito1,escala_coroinha.acolito2,
                 escala_coroinha.acolito3,escala_coroinha.coroinha1,escala_coroinha.coroinha2,escala_coroinha.coroinha3,escala_coroinha.coroinha4,escala_coroinha.coroinha5],
                   (err,results)=>{
                      if(!err){
                        res.status(200).json({message:'Escala Cadastrada com sucesso'});
                      }else{
                        res.status(500).json(err);
                      }
                    });
              }
            
            }else{
                res.status(500).json(err);
            }//results.length
      }//!err
  });//CONNECTION
});//ROUTER

router.get('/read',(req,res)=>{
  let escala_coroinha = req.body;
  let query_read=('select missa,data,mes,dia,hora,comunidade,acolito1,acolito2,acolito3,coroinha1,coroinha2,coroinha3,coroinha4,coroinha5 from escala_coroinha where id=?');
  connection.query(query_read,[escala_coroinha.missa],(err,results)=>{
    if(!err){
        if(results.length <= 0){
            let query = ('select id,missa,data,mes,dia,hora,comunidade,acolito1,acolito2,acolito3,coroinha1,coroinha2,coroinha3,coroinha4,coroinha5 from escala_coroinha order by id DESC');
            connection.query(query,(err,results)=>{
                if(!err){
                    res.status(200).json(results);
                }else{
                    res.status(500).json(err);
                }
            });
        }else{
            res.status(400).json({message:'erro!'});
        }
    }
    else{
        res.status(500).json(err);
    }
  });
});

router.delete('/delete/:id',(req,res)=>{
  let id = req.params.id;
  let query = ('delete from escala_coroinha where id=?');
  connection.query(query,[id],(err,results)=>{
    if(!err){
        if(results.affectedRows==0){
            res.status(404).json({message:'id não encontrado'});
        }
        return res.status(200).json({message:'Escala deletada'});
    }else{
        res.status(500).json(err);
    }
});
});

router.put('/update/:id',(req,res)=>{
    let id = req.params.id;
    let query = ('update from escala_coroinha where id=?');
    connection.query(query,[id],(err,results)=>{
      if(!err){
          res.status(404).json({message:'id não encontrado'});
      }else{
          res.status(500).json(err);
      }
      
      return res.status(200).json({message:'Escala Alterada com sucesso'});
  });
  });
          
  router.get('/getSingleData',(req,res)=>{
    let id = req.body;
    let query = ('select missa,data,dia,hora,comunidade,acolito1,acolito2,acolito3,coroinha1,coroinha2,coroinha3,coroinha4,coroinha5 from escala_coroinha where id=?');
    connection.query(query,(err,results)=>{
      if(!err){
          if(results.affectedRows==0){
              res.status(404).json({message:'id não encontrado'});
          }
          return res.status(200).json({message:'Escala deletada'});
      }else{
          res.status(500).json(err);
      }
  });
  });


router.get("/select_coroinha",(req,res)=>{
    let coroinhas = req.body
    let query="select nome from coroinhas order by nome"
    connection.query(query,(err,results)=>{
      if(!err){
        res.status(200).json(results);
      }else{
        res.status(500).json(err);
      }
    });
  });

  router.get("/select_acolito",(req,res)=>{
    let acolitos = req.body
    let query="select nome from acolitos order by nome"
    connection.query(query,(err,results)=>{
      if(!err){
        res.status(200).json(results);
      }else{
        res.status(500).json(err);
      }
    });
  });

  router.get("/select_comunidades",(req,res)=>{
    let locais = req.body
    let query="select nome from comunidades"
    connection.query(query,(err,results)=>{
      if(!err){
        res.status(200).json(results);
      }else{
        res.status(500).json(err);
      }
    });
  });

  router.get("/select_missa",(req,res)=>{
    let missa = req.body
    let query="select nome from missa_celebracao"
    connection.query(query,(err,results)=>{
      if(!err){
        res.status(200).json(results);
      }else{
        res.status(500).json(err);
      }
    });
  });
  
  

module.exports = router;