const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Pessoa = require("./../model/pessoas"); // import do modelo pessoa

router.get('/', (req,res) =>{
    res.status(200).json({message:"rota pessoas ok"});
})

router.get('/listar', async (req,res) => {
    await Pessoa.find({}).then((pessoas) =>{ //pega todo mundo do banco
        console.log(pessoas);
        res.status(200).json(pessoas);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

router.get('/findnome/:nome', async (req,res) => {
    const nome = req.params.nome; //recebendo nome por parametro
    await Pessoa.findOne({ nome:nome }).then((pessoa) => { //findOne retorna o primeiro que der match com o item passado
        console.log(pessoa);
        if(pessoa == null){ //validando se retorna null
            res.status(404).json({message: "não foi encontrado"});
        }else{
            res.status(200).json(pessoa);
        }

    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });

})

router.post('/add', async (req,res) => { //add nova pessoa no banco
    //validando as entradas do usuario
    if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;
    }else if(!req.body.altura){
        res.status(400).json({message: "esta faltando altura"});
        return;
    }
    else if(!req.body.idade){
        res.status(400).json({message: "esta faltando idade"});
        return; // nao esquecer dos returns dentro dos ifs
    }

    await Pessoa.create(req.body).then(() => {
        res.status(200).json({message: "cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "algo esta errado"});
        console.error(err);
    })

});

router.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({message: "esta faltando id na URL"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;
    }else if(!req.body.altura){
        res.status(400).json({message: "esta faltando altura"});
        return;
    }
    else if(!req.body.idade){
        res.status(400).json({message: "esta faltando idade"});
        return;
    }

    await Pessoa.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "algo esta errado"});
    });
});

router.delete('/del/:id', async (req,res) => {
    if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
        await Pessoa.deleteOne({_id:req.params.id}).then(() => { //deleta o primeiro que der match
            res.status(200).json({message: "Deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "algo esta errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router;