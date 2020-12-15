//-----------------------------------------------------------
//définir un model
//-----------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
  const Candidat = sequelize.define("candidat", {
    idcandidat: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    sexe: {
      type: Sequelize.STRING
    },
    date_nais: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    motpasse: {
      type: Sequelize.STRING
    },
    token: {
    	type: Sequelize.STRING	
    },
    etat: {
    	type: Sequelize.STRING
    }

  });

  return Candidat;
};