const db = require("../models");
const Typeoffre = db.typeoffres;
const Offre = db.offres;
const Op = db.Sequelize.Op;
//-----------------------------------------------------------------------------------------
// Creer une nouvelle offre
exports.create = (req, res) => {
  // valider la requette , test de controle du champs intitule_typeoffre
  if (!req.body.intitule_typeoffre) {
    res.status(400).send({
      message: "l'intitule type offre doit contenir une valeur !"
    });
    return;
  }

  // Creer une variable typeoffre contenant le résultat de la requete req
  const typeoffre = {
  	idtypeoffre : req.body.idtypeoffre,
    intitule_typeoffre: req.body.intitule_typeoffre,
    
  };

  // Enregistrer dans la base de données 
  //create est une méthode prédéfnit par Sequelize pour assiter les requetes de BD 
  Typeoffre.create(typeoffre)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la creation d un type d offre."
      });
    });
};
//-----------------------------------------------------------------------------------------
// select * from typeoffre join offre.
exports.findAll = (req, res) => {
  Typeoffre.findAll({
    attributes: ['idtypeoffre', 'intitule_typeoffre'],
    include: [{
      model: Offre,
      where: { idtypeoffre: db.Sequelize.col('typeoffre.idtypeoffre') },
      attributes: ['idoffre', 'intitule_offre', 'etat_offre']

    }]
  }).then(typeoffres => {
     res.send(typeoffres);
  });
};
//-----------------------------------------------------------------------------------------
// select * from typeoffre join offre where intitule_offre like  %intituletypeoffre%
exports.findAllCrit = (req, res) => {
  const v_intoff = req.params.intituletypeoffre;
  Typeoffre.findAll({
    attributes: ['idtypeoffre', 'intitule_typeoffre'],
    include: [{
      model: Offre,
      where: { idtypeoffre: db.Sequelize.col('typeoffre.idtypeoffre') },
      attributes: ['idoffre', 'intitule_offre', 'etat_offre']

    }],
    where: {intitule_typeoffre : { [Op.like]: '%' + v_intoff +'%'}}
  }).then(typeoffres => {
     res.send(typeoffres);
  });
};

//-----------------------------------------------------------------------------------------
// select * from offre where idoffre = v_id
exports.findOne = (req, res) => {
  const v_id = req.params.id;

  Typeoffre.findByPk(v_id,{
    attributes: ['idtypeoffre', 'intitule_typeoffre'],
    include: [{
      model: Offre,
      where: { idtypeoffre: db.Sequelize.col('typeoffre.idtypeoffre') },
      attributes: ['idoffre', 'intitule_offre', 'etat_offre']
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la recherche d'une offre id = " + id
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// modifier une offre
exports.update = (req, res) => {
  const id = req.params.id;

  Typeoffre.update(req.body, {
    where: { idtypeoffre: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Type offre est mise à jour avec succes."
        });
      } else {
        res.send({
          message: `impossible de modifier le typeoffre avec id=${id}. !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "impossible de modifier le type offre numéro =" + id
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// supprimer un type d offre
exports.delete = (req, res) => {
  const id = req.params.id;

  Typeoffre.destroy({
    where: { idtypeoffre: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le type offre !" + id + " est supprimer"
        });
      } else {
        res.send({
          message: `Imposible de supprimer le type d'offre avec id=${id}. Type d'offre n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le type offre avec un identifiant égale à " + id
      });
    });
  
};


