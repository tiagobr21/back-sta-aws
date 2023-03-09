const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.get('/read',(req,res)=>{
   let escala_ministro = req.body;
   let query_read=('select missa,data,mes,ano,dia,hora,comunidade,ministros from escala_ministro where id = ?');
   connection.query(query_read,[escala_ministro.missa],(err,results)=>{
    if(!err){
       if(results.length <= 0){
            let query = ('select id,missa,data,mes,ano,dia,hora,comunidade,ministros from escala_ministro order by id DESC');
            connection.query(query,(err,results)=>{
               if(!err){
                 res.status(200).json(results);
               }else{
                 res.status(500).json(err);
               }
            });//connection2
       }else{
         res.status(400).json({message:'erro!'});
       }//results 
     }else{
        res.status(500).json(err);
     }//err
   });//connection
});//router

router.post('/create',(req,res)=>{
   let escala_ministro = req.body;
   let query_consulta = ('select id,missa,data,mes,ano,dia,hora,comunidade,ministros from escala_ministro where id = ? ');
   connection.query(query_consulta,[escala_ministro.missa],(err,results)=>{
     if(!err){
       if(results.length<= 0){
          let query_criar = ("insert into escala_ministro values(default,?,?,?,?,?,?,?,?)");
          connection.query(query_criar,[escala_ministro.missa,escala_ministro.data,escala_ministro.mes,escala_ministro.ano,escala_ministro.dia,escala_ministro.hora,escala_ministro.comunidade,escala_ministro.ministros],(err,results)=>{
             if(!err){
               res.status(200).json({message:'Escala Criada com Sucesso!!!'});
             }else{
               res.status(500).json(err);
             }
          });
       }else{
         res.status(400).json({message:'erro!'});
       }
     }else{
        res.status(500).json(err);
     }
   })
});




router.delete('/delete/:id',(req,res)=>{
  let id = req.params.id
  let query = ('delete from escala_ministro where id = ?');
  connection.query(query,[id],(err,result)=>{
    if(!err){
       if(result.affectedRows == 0){
          res.status(400).json({message:'id não encontrado'});
       }else{
          res.status(200).json({message:'Escala deletada'});
       }
    }else{
      res.status(500).json(err);
    }
  })
});


router.put('/update/:id',(req,res)=>{
  let id = req.params.id;
  let body = req.body;
  let query = ("update escala_ministro set missa = ?, data = ?,mes = ?,ano = ?,dia = ?, hora = ?, comunidade = ?, ministros = ?");
  connection.query(query,[body.missa,body.data,body.mes,body.ano,body.dia, body.hora, body.comunidade, body.ministros,id],(err,result)=>{
    if(!err){
      return res.status(200).json({message:'Escala Atualizada'});
    }else{
      res.status(500).json(err);
    }
    res.status(404).json({message:'id não encontrado'});
  });
});

router.get('/select_ministro',(req,res)=>{
   let body = req.body;
   let query = ('select nome from ministros order by nome');
   connection.query(query,(err,result)=>{
     if(!err){
        res.status(200).json(result);
     }else{
        res.status(500).json(err);
     }
   });
});


router.get('/select_comunidade',(req,res)=>{
  let body = req.body;
  let query = ('select nome from comunidades');
  connection.query(query,(err,result)=>{
    if(!err){
      res.status(200).json(result);
    }else{
      res.status(500).json(err);
    }
  });
});

router.get('/select_missa',(req,res)=>{
  let body = req.body;
  let query = ('select nome from missa_celebracao');
  connection.query(query,(err,result)=>{
    if(!err){
       res.status(200).json(result);
    }else{
       res.status(500).json(err);
    }
  })
});

// funcões do administrador

router.post('/create_ministro',(req,res)=>{
  let body = req.body
  let query_consulta = ('select id,nome from ministros');
  connection.query(query_consulta,[query_consulta.nome],(err,results)=>{
    if(!err){
          let query = ('insert into ministros values (default,?)');
          connection.query(query,[body.nome],(err,result)=>{
            if(!err){
              res.status(200).json({message:'Ministro criado com sucesso'});
            }else{
              res.status(500).json(err);
            }
          });
     
    }else{
      res.status(500).json(err);
    }
  }); 
});



router.put('/update_ministro/:id',(req,res)=>{
  let id = req.params.id
  let body = req.body;
  let query = ('update ministros set nome = ? where id = ?');
  connection.query(query,[body.nome,id],(err,result)=>{
    if(!err){
      res.status(200).json({message:'Ministro atualizado com sucesso!!!'});
    }else{
      res.status(500).json(err);
    }
    res.status(400).json({message:'id não encontrado'});
  }); 
});


router.delete('/delete_ministro/:id',(req,res)=>{
  let id = req.params.id
  let body = req.body;
  let query = ('delete from ministros where id = ?');
  connection.query(query,[id],(err,result)=>{
    if(!err){
      res.status(200).json({message:'Ministro deletado com sucesso!!!'});
    }else{
      res.status(500).json(err);
    }
    res.status(400).json({message:'id não encontrado'});
  }); 
});

module.exports = router;