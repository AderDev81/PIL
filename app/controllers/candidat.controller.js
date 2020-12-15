const db = require("../models");
const Candidat = db.candidat;
const Op = db.Sequelize.Op;
//-----------------------------------------------------------------------------------------
// Creer une nouvelle offre
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "nom can not be empty!"
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "email can not be empty!"
    });
    return;
  }
    
 
// Creer une variable offre et récuperer les valeurs a partir de la requete
  // npm install randomstring   :  module randomstring pour la génération une chaine aléatoire
  var randomstring = require("randomstring");
  var token1 = randomstring.generate(60);

  const candidat = {
  	idcandidat : req.body.idcandidat,
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    date_nais: req.body.date_nais,
    email: req.body.email,
    motpasse: req.body.motpasse,
    token: token1,
    etat: "désactiver"
  };
  //

  // enregistrer l'offre dans la base de données
  Candidat.create(candidat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la creation d'un candidat."
      });
    });
    //ENVOYER UN EMAIL DE CONFIMATION 
    //1-The Nodemailer module makes it easy to send emails from your computer.
    // npm install nodemailer
    //2- tester le mailing avec Mailtrap https://mailtrap.io 
    ///
    var nodemailer = require('nodemailer');

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "635a694a395b32",// on le recupere à partir de mailtrap
        pass: "d8e4005d9b6e90"//on le recupere à partir de mailtrap
      }
    });

    const message = {
        from: 'admin@societe.com', // adresse source
        to: req.body.email,         // adresse destinataire
        subject: 'Confimation de votre compte', // titre
        html: '<h1>Bienvenue '+req.body.nom+' '+req.body.prenom+'</h1><br>Cliquez sur ce lien pour activer votre compte:<br><br> <a href="http://societe/PIL/api/confirm?id='+req.body.idcandidat+'&token='+token1+'">http://societe/PIL/api/candidats/confirm?id='+req.body.idcandidat+'&token='+token1+'</a>'  // Plain text body   
      };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
};
//-----------------------------------------------------------------------------------------
// select * from offre.  OR  select * from offre where email= req.query.intitule_offre
exports.findAll = (req, res) => {
	const email = req.query.email;
   
  	var condition1 = email ? {  email: { [Op.like]: `%${email}%` } } : null ;
    
    Candidat.findAll( {where: condition1} )
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
// select * from offre where etat = req.query.etat
exports.findAllActive = (req, res) => {
  const etat = req.query.etat;
  
    var condition2 = etat ? {  etat: { [Op.like]: `%${etat}%` } } : null ;
    Candidat.findAll( {where:  condition2} )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la recherche d'un candidat."
      });
    });
  
};
//------------------------  -----------------------------------------------------------------
// s'authentifier
exports.logIn = (req, res) => {
  const email = req.query.email;
  const motpasse = req.query.motpasse;
  
  var condition1 = email ;
  var condition2 = motpasse ;
  Candidat.findAll({
    where: {
    [Op.and]: [
      { email: condition1 },
      { motpasse: condition2 }
    ]
  }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la recherche d'un candidat."
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// select * from offre where idoffre = ??
exports.findOne = (req, res) => {
	const idcandidat = req.params.id;

  Candidat.findByPk(idcandidat )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la recherche d'un candidat id = " + id
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// mettre à jour une offre
exports.update = (req, res) => {
	const idcandidat = req.params.id;

  Candidat.update(req.body, {
    where: { idcandidat: idcandidat }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "candidat est mise à jour avec succes."
        });
      } else {
        res.send({
          message: `impossible de modifier le candidat avec id=${idcandidat}. aybe le candidat was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating candidat with id=" + idoffre
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// confirmation de l'inscription par email
exports.confirm = (req, res) => {
  const idcandidat = req.query.idcandidat;
  const token = req.query.token;

  Candidat.update(
    { etat: 'active' } ,
    { where:  
      {
        [Op.and]: [
        { idcandidat: idcandidat },
        { token: token }
      ]
      }
     
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "candidat est mise à jour avec succes."
        });
      } else {
        res.send({
          message: `impossible de modifier le candidat avec id=${idcandidat}. !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating candidat with id=" + idoffre
      });
    });
  
};
//-----------------------------------------------------------------------------------------
// supprimer une offre
exports.delete = (req, res) => {
	const idc = req.params.id;

  Candidat.destroy({
    where: { idcandidat: idc }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "candidat supprimer!"
        });
      } else {
        res.send({
          message: `impossible de supprimer le candidat avec  id=${idc}. le candidat n'existe pas!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le candidat numero" + idc
      });
    });
  
};

