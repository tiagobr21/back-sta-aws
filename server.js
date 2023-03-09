// importar express
const express = require('express');
//iniciar express
const app = express();
// nome da pasta no dist que será feito o build
const appName = 'back-sta';
// local onde build ira gerar os arquivos
const outputPath = `${__dirname}/dist/${appName}`;

// seta o diretorio de build para servir o conteudo Angular
app.use(express.static(outputPath));

app.get('/*',(req,res)=>{
    res.sendFile(`${outputPath}/index`);
});

//ouvir a porta que o Heroku disponibilizar 
app.listen(process.env.PORT);