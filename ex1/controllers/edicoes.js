var Edicao = require('../models/edicoes');
var Musica = require('../controllers/musicas');

module.exports.getEdicoes = () => {
    return Edicao.find().exec();
}

module.exports.getEdicaoById = (id) => {
    return Edicao.findById(id).exec();
    //Outra opção (como sabemos que é só 1 resultado findOne em vez de find)
    //return Contrato.findOne({_id: id}).exec();
}

module.exports.getEdicoesByOrganizacao = (org) => {
    //find devolve lista (findOne devolve objeto)
    return Edicao.find({organizacao: org}).exec();
}


module.exports.getPaisesOrg = () => {
  return Edicao
    .aggregate([
      {
        $group: {
          _id: "$organizacao",
          anos: { $push: "$anoEdicao" }
        }
      },
      {
        $project: {
          pais: "$_id",
          anos: { $sortArray: { input: "$anos", sortBy: 1 } },
          _id: 0
        }
      },
      {
        $sort: { pais: 1 }
      }
    ])
    .exec();
}

module.exports.getPaisesVenc = () => {
  return Edicao
    .aggregate([
      {
        $match: { vencedor: { $ne: "" } }
      },
      {
        $group: {
          _id: "$vencedor",
          anos: { $push: "$anoEdicao" }
        }
      },
      {
        $project: {
          pais: "$_id",
          anos: { $sortArray: { input: "$anos", sortBy: 1 } },
          _id: 0
        }
      },
      {
        $sort: { pais: 1 }
      }
    ])
    .exec();
}


module.exports.insert = async (edicaoData) => {
  try {
    const { musicas, ...edicaoSemMusicas } = edicaoData;
    
    const edicaoToSave = new Edicao(edicaoSemMusicas);
    const edicaoSalva = await edicaoToSave.save();
    
    if (musicas && musicas.length > 0) {
      const musicasComEdicao = musicas.map(musica => ({
        ...musica,
        id_edicao: edicaoSalva._id
      }));
      
      // Inserir todas as músicas
      await Musica.insertMany(musicasComEdicao);
    }
    
    return edicaoSalva;
  } catch (error) {
    throw error;
  }
}

module.exports.update = async (id, edicaoData) => {
  try {
    const { musicas, ...edicaoSemMusicas } = edicaoData;
    
    const edicaoAtualizada = await Edicao.findByIdAndUpdate(
      id, 
      edicaoSemMusicas, 
      { new: true }
    );
    
    if (!edicaoAtualizada) {
      throw new Error('Edição não encontrada');
    }
    
    if (musicas) {
      await Musica.deleteMany({ id_edicao: id });
      
      if (musicas.length > 0) {
        const musicasComEdicao = musicas.map(musica => ({
          ...musica,
          id_edicao: id
        }));
        
        await Musica.insertMany(musicasComEdicao);
      }
    }
    
    return edicaoAtualizada;
  } catch (error) {
    throw error;
  }
}

module.exports.delete = (id) => {
  return Musica.deleteMany({ id_edicao: id })
    .then(() => Edicao.findByIdAndDelete(id));
}