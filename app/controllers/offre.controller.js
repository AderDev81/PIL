const db = require("../models");
const Offre = db.offres;
const Typeoffre = db.typeoffres;
const Op = db.Sequelize.Op;
//-----------------------------------------------------------------------------------------
// Creer une nouvelle offre
exports.create = (req, res) => {
  // Validate request
  if (!req.body.intitule_offre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
// Creer une variable offre et récuperer les valeurs a partir de la requete 
  const offre = {
  	idoffre : req.body.idoffre,
    intitule_offre: req.body.intitule_offre,
    etat_offre: req.body.etat_offre,
    debut_offre: req.body.debut_offre,
    fin_offre: req.body.fin_offre,
    idtypeoffre: req.body.idtypeoffre,
  };

  // enregistrer l'offre dans la base de données
  Offre.create(offre)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la creation d'une offre."
      });
    });
};
//-----------------------------------------------------------------------------------------
// select * from offre.  OR  select * from offre where intitule_offre= req.query.intitule_offre
exports.findAll = (req, res) => {
	const intitule_offre = req.query.intitule_offre;
  const etat_offre = req.query.etat_offre;
  
  	var condition1 = intitule_offre ? {  intitule_offre: { [Op.like]: `%${intitule_offre}%` } } : null ;
    
    Offre.findAll({ 

      attributes: ['idoffre', 'intitule_offre', 'etat_offre' , 'debut_offre','fin_offre'],
      include: [{
        model: Typeoffre,
        where: { idtypeoffre: db.Sequelize.col('offre.idtypeoffre') },
        attributes: ['idtypeoffre', 'intitule_typeoffre']

      }],
      where:   condition1 
      //where: {[Op.or]: [condition1,condition2]}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la recherche d'une offre."
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// select * from offre where etat_offre = req.query.etat_offre
exports.findAllActive = (req, res) => {
  const etat_offre = req.query.etat_offre;
  
    var condition2 = etat_offre ? {  etat_offre: { [Op.like]: `%${etat_offre}%` } } : null ;
    Offre.findAll({ 

      attributes: ['idoffre', 'intitule_offre', 'etat_offre' , 'debut_offre','fin_offre'],
      include: [{
        model: Typeoffre,
        where: { idtypeoffre: db.Sequelize.col('offre.idtypeoffre') },
        attributes: ['idtypeoffre', 'intitule_typeoffre']

      }],
      where:  condition2 
      //where: {[Op.or]: [condition1,condition2]}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la recherche d'une offre."
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// select * from offre where idoffre = ??
exports.findOne = (req, res) => {
	const idoffre = req.params.id;

  Offre.findByPk(idoffre )
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
// mettre à jour une offre
exports.update = (req, res) => {
	const idoffre = req.params.id;

  Offre.update(req.body, {
    where: { idoffre: idoffre }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Offre est mise à jour avec succes."
        });
      } else {
        res.send({
          message: `impossible de modifier l offre avec id=${idoffre}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating offre with id=" + idoffre
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// supprimer une offre
exports.delete = (req, res) => {
	const idoffre = req.params.id;

  Offre.destroy({
    where: { idoffre: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "offre supprimer!"
        });
      } else {
        res.send({
          message: `impossible de supprimer l'offre avec  id=${id}. l offre n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer l'offre numero" + id
      });
    });
  
};

